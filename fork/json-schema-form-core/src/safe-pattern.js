/**
 * JSON Schema `pattern` values are evaluated by the native (backtracking) RegExp engine on the main thread.
 * A catastrophic pattern such as `^(a|a)+$` or `^(\w+\s?)*$` can freeze the tab for as long as the attacker wants.
 *
 * This module statically rejects the patterns that are known to cause catastrophic backtracking:
 * - a repeated group that contains another repetition or an optional atom (nested quantifiers)
 * - a repeated group that contains alternatives (at any depth) which may overlap
 * - sequential repeated atoms that may match the same characters (e.g. `a+a+a+`)
 * - patterns that are not valid JavaScript regular expressions
 * - patterns longer than MAX_PATTERN_LENGTH
 *
 * It is a conservative analysis: some harmless patterns are rejected as well.
 */

export const UNSAFE_PATTERN_MESSAGE =
	'Unsafe pattern: nested or overlapping repetitions are rejected';

// The analysis cost depends on the size of the pattern, so the size is bounded.
export const MAX_PATTERN_LENGTH = 4096;

// keywords whose value is instance data, not schema
const DATA_KEYWORDS = ['default', 'enum', 'const', 'examples', 'example'];

// keywords whose value is a map of named subschemas: the keys are names, not keywords
const SUBSCHEMA_MAP_KEYWORDS = [
	'properties',
	'patternProperties',
	'definitions',
	'$defs',
	'dependencies',
	'dependentSchemas',
];

// characters used to decide if two atoms may match the same character: all the Latin-1 ones, and
// the ones above (white spaces, line terminators and others) that tell apart what an atom
// without \u, \p or non Latin-1 characters can match
const SAMPLES = [];
for (let code = 0; code < 256; code += 1) {
	SAMPLES.push(String.fromCharCode(code));
}
SAMPLES.push(
	'\u0100',
	'\u1680',
	'\u2000',
	'\u2028',
	'\u2029',
	'\u202f',
	'\u205f',
	'\u3000',
	'\ufeff',
	'\u4e00',
);

const SYNTAX_CHARACTERS = /[\^$\\.*+?()[\]{}|/-]/;
// eslint-disable-next-line no-control-regex
const COMPLEX_CLASS = /\\[uUpPk]|[^\x00-\xff]/;

class UnsafePatternError extends Error {}

const QUANTIFIER_RANGE = /\{(\d+)(,(\d*))?\}/y;

function readQuantifier(source, index) {
	const char = source[index];
	let min = 1;
	let max = 1;
	let end = index;
	if (char === '*') {
		min = 0;
		max = Infinity;
		end = index + 1;
	} else if (char === '+') {
		max = Infinity;
		end = index + 1;
	} else if (char === '?') {
		min = 0;
		end = index + 1;
	} else if (char === '{') {
		QUANTIFIER_RANGE.lastIndex = index;
		const match = QUANTIFIER_RANGE.exec(source);
		if (match) {
			min = Number(match[1]);
			if (match[2] === undefined) {
				max = min;
			} else {
				max = match[3] === '' ? Infinity : Number(match[3]);
			}
			end = index + match[0].length;
		}
	}
	if (end > index && source[end] === '?') {
		// lazy modifier
		end += 1;
	}
	return { min, max, end };
}

function isVariable(item) {
	return item.max > 1 || item.min < item.max;
}

function isLiteralBranch(items) {
	return items.every(item => item.literal !== undefined && item.min === 1 && item.max === 1);
}

function literalOf(items) {
	return items.map(item => item.literal).join('');
}

function areAlternativesDisjoint(branches) {
	if (branches.length < 2) {
		return true;
	}
	if (!branches.every(isLiteralBranch)) {
		return false;
	}
	const literals = branches.map(literalOf).sort();
	if (literals.some(literal => literal.length === 0)) {
		return false;
	}
	// when sorted, a literal that prefixes another one also prefixes its successor
	return literals.every((literal, i) => i === 0 || !literal.startsWith(literals[i - 1]));
}

/**
 * A repeated group is ambiguous if its body repeats, has optional atoms,
 * or has overlapping alternatives, whatever the depth.
 */
function isAmbiguousBody(branches) {
	if (!areAlternativesDisjoint(branches)) {
		return true;
	}
	return branches.some(items =>
		items.some(item => isVariable(item) || (item.branches && isAmbiguousBody(item.branches))),
	);
}

/**
 * @returns {boolean} true if the number of occurrences of the item, or of one of the atoms it contains, may vary.
 */
function containsVariable(item) {
	if (item.variable === undefined) {
		item.variable =
			item.max > item.min ||
			(item.branches !== undefined &&
				item.branches.some(items => items.some(child => containsVariable(child))));
	}
	return item.variable;
}

/**
 * @returns {Uint8Array|null} the SAMPLES matched by the item (or by any of the atoms of a group),
 * null if it is unknown: it may then match anything.
 */
function samplesOf(item) {
	if (item.samples !== undefined) {
		return item.samples;
	}
	let samples = null;
	if (item.branches) {
		const union = new Uint8Array(SAMPLES.length);
		const known = item.branches.every(items =>
			items.every(child => {
				const childSamples = samplesOf(child);
				if (childSamples) {
					childSamples.forEach((value, i) => {
						union[i] = union[i] || value;
					});
				}
				return childSamples !== null;
			}),
		);
		samples = known ? union : null;
	} else if (!item.complex) {
		samples = new Uint8Array(SAMPLES.length);
		if (item.literal !== undefined) {
			samples[SAMPLES.indexOf(item.literal)] = 1;
		} else {
			let atom;
			try {
				atom = new RegExp(`^(?:${item.src})$`);
			} catch {
				throw new UnsafePatternError('Invalid atom');
			}
			SAMPLES.forEach((sample, i) => {
				samples[i] = atom.test(sample) ? 1 : 0;
			});
		}
	}
	// eslint-disable-next-line no-param-reassign
	item.samples = samples;
	return samples;
}

function newChain() {
	return { samples: new Uint8Array(SAMPLES.length), any: false, empty: true };
}

function conflictsWith(chain, samples) {
	return (
		!chain.empty &&
		(samples === null ||
			chain.any ||
			chain.samples.some((value, i) => value === 1 && samples[i] === 1))
	);
}

function addToChain(chain, samples) {
	// eslint-disable-next-line no-param-reassign
	chain.empty = false;
	if (samples === null) {
		// eslint-disable-next-line no-param-reassign
		chain.any = true;
	} else {
		samples.forEach((value, i) => {
			// eslint-disable-next-line no-param-reassign
			chain.samples[i] = chain.samples[i] || value;
		});
	}
}

/**
 * Reject the repetitions (also hidden in groups) that follow each other and may match the same character:
 * the number of ways to split the input between them grows polynomially, or exponentially,
 * with the input length.
 * Only an atom that cannot match any character of the preceding repetitions separates them.
 */
function checkSequence(items) {
	let chain = newChain();
	items.forEach(item => {
		const variable = containsVariable(item);
		if (!variable && (item.min === 0 || chain.empty)) {
			return;
		}
		const samples = samplesOf(item);
		const conflict = conflictsWith(chain, samples);
		if (variable) {
			if (conflict) {
				throw new UnsafePatternError('Overlapping sequential repetitions');
			}
			if (item.min > 0) {
				chain = newChain();
			}
			addToChain(chain, samples);
		} else if (conflict) {
			// it may consume characters that the repetitions could match: not a separator
			addToChain(chain, samples);
		} else {
			chain = newChain();
		}
	});
}

function skipClass(source, index) {
	let i = index + 1;
	if (source[i] === '^') {
		i += 1;
	}
	while (i < source.length) {
		if (source[i] === '\\') {
			i += 2;
		} else if (source[i] === ']') {
			return i + 1;
		} else {
			i += 1;
		}
	}
	throw new UnsafePatternError('Unterminated character class');
}

function matchAt(sticky, source, index) {
	// eslint-disable-next-line no-param-reassign
	sticky.lastIndex = index;
	const match = sticky.exec(source);
	return match ? match[0] : undefined;
}

const BACK_REFERENCE = /\\[0-9]+/y;
const NAMED_GROUP = /\?<[^=!>][^>]*>/y;
const GROUP_KIND = /\?(?:<=|<!|:|=|!)/y;

const ESCAPE_SEQUENCES = {
	x: { pattern: /\\x[0-9a-fA-F]{2}/y, complex: false },
	u: { pattern: /\\u(?:[0-9a-fA-F]{4}|\{[0-9a-fA-F]+\})/y, complex: true },
	p: { pattern: /\\p\{[^}]*\}/y, complex: true },
	P: { pattern: /\\P\{[^}]*\}/y, complex: true },
	k: { pattern: /\\k<[^>]*>/y, complex: true },
	c: { pattern: /\\c[a-zA-Z]/y, complex: false },
};

/**
 * Read the escape sequence starting at index (a backslash).
 * Only escaped syntax characters are literals: \d, \t, \n, \b, back-references... are not.
 */
function readEscape(source, index) {
	const next = source[index + 1];
	if (next === undefined) {
		throw new UnsafePatternError('Trailing backslash');
	}
	if (SYNTAX_CHARACTERS.test(next)) {
		return { item: { literal: next }, end: index + 2 };
	}
	const sequence = ESCAPE_SEQUENCES[next];
	if (sequence) {
		const text = matchAt(sequence.pattern, source, index);
		if (text !== undefined) {
			return { item: { src: text, complex: sequence.complex }, end: index + text.length };
		}
	}
	if (/[0-9]/.test(next)) {
		// back-reference or octal/null escape
		const text = matchAt(BACK_REFERENCE, source, index);
		return { item: { src: text, complex: true }, end: index + text.length };
	}
	return {
		item: { src: `\\${next}`, complex: /[bB]/.test(next) },
		end: index + 2,
	};
}

function parseGroupPrefix(source, index) {
	// index is just after "("
	if (source[index] !== '?') {
		return index;
	}
	const named = matchAt(NAMED_GROUP, source, index);
	if (named) {
		return index + named.length;
	}
	const kind = matchAt(GROUP_KIND, source, index);
	if (kind) {
		return index + kind.length;
	}
	throw new UnsafePatternError('Unsupported group');
}

function parseBranches(source, start, nested) {
	const branches = [[]];
	let i = start;
	let end;
	while (i < source.length && end === undefined) {
		const char = source[i];
		if (char === ')') {
			if (!nested) {
				throw new UnsafePatternError('Unbalanced parenthesis');
			}
			end = i + 1;
			break;
		}
		if (char === '|') {
			branches.push([]);
			i += 1;
			continue;
		}
		let item;
		if (char === '(') {
			const bodyStart = parseGroupPrefix(source, i + 1);
			const body = parseBranches(source, bodyStart, true);
			item = { branches: body.branches };
			i = body.end;
		} else if (char === '[') {
			const classEnd = skipClass(source, i);
			const src = source.slice(i, classEnd);
			item = { src, complex: COMPLEX_CLASS.test(src) };
			i = classEnd;
		} else if (char === '\\') {
			const escape = readEscape(source, i);
			item = escape.item;
			i = escape.end;
		} else if (char === '^' || char === '$') {
			i += 1;
			continue;
		} else if (char === '.') {
			item = { src: '.' };
			i += 1;
		} else {
			item = { literal: char, complex: char.charCodeAt(0) > 255 };
			i += 1;
		}
		const quantifier = readQuantifier(source, i);
		item.min = quantifier.min;
		item.max = quantifier.max;
		i = quantifier.end;
		if (item.branches && item.max > 1 && isAmbiguousBody(item.branches)) {
			throw new UnsafePatternError('Nested or overlapping repetition');
		}
		branches[branches.length - 1].push(item);
	}
	if (nested && end === undefined) {
		throw new UnsafePatternError('Unbalanced parenthesis');
	}
	branches.forEach(checkSequence);
	return { branches, end: end === undefined ? i : end };
}

/**
 * @param {string} pattern a JSON Schema pattern
 * @returns {boolean} false if the pattern is invalid or may trigger catastrophic backtracking.
 */
export function isSafePattern(pattern) {
	if (typeof pattern !== 'string' || pattern.length > MAX_PATTERN_LENGTH) {
		return false;
	}
	try {
		parseBranches(pattern, 0, false);
		// compiling a RegExp does not execute it: this only checks the syntax
		// eslint-disable-next-line no-new
		new RegExp(pattern);
		return true;
	} catch (e) {
		if (e instanceof UnsafePatternError || e instanceof SyntaxError) {
			return false;
		}
		throw e;
	}
}

/**
 * Look for the first unsafe `pattern` or `patternProperties` key in a schema.
 * @param {Object} schema A JSON Schema
 * @returns {string|undefined} The unsafe pattern, if any.
 */
export function findUnsafePattern(schema) {
	const seenSchemas = new Set();
	const seenMaps = new Set();
	const visit = (node, isSubschemaMap) => {
		const seen = isSubschemaMap ? seenMaps : seenSchemas;
		if (!node || typeof node !== 'object' || seen.has(node)) {
			return undefined;
		}
		seen.add(node);
		if (Array.isArray(node) || isSubschemaMap) {
			// a list of schemas, or a map of named schemas whose keys are not keywords
			const values = Object.values(node);
			for (let i = 0; i < values.length; i += 1) {
				const found = visit(values[i], false);
				if (found !== undefined) {
					return found;
				}
			}
			return undefined;
		}
		if (typeof node.pattern === 'string' && !isSafePattern(node.pattern)) {
			return node.pattern;
		}
		if (node.patternProperties && typeof node.patternProperties === 'object') {
			const unsafeKey = Object.keys(node.patternProperties).find(key => !isSafePattern(key));
			if (unsafeKey !== undefined) {
				return unsafeKey;
			}
		}
		const keys = Object.keys(node).filter(key => !DATA_KEYWORDS.includes(key));
		for (let i = 0; i < keys.length; i += 1) {
			const found = visit(node[keys[i]], SUBSCHEMA_MAP_KEYWORDS.includes(keys[i]));
			if (found !== undefined) {
				return found;
			}
		}
		return undefined;
	};
	return visit(schema, false);
}
