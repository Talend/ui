/**
 * JSON Schema `pattern` values are evaluated by the native (backtracking) RegExp engine on the main thread.
 * A catastrophic pattern such as `^(a|a)+$` or `^(\w+\s?)*$` can freeze the tab for as long as the attacker wants.
 *
 * This module statically rejects the patterns that are known to cause exponential backtracking:
 * - a repeated group that contains another repetition (nested quantifiers)
 * - a repeated group that contains alternatives which may overlap
 *
 * It is a conservative analysis: some harmless patterns are rejected as well.
 */

export const UNSAFE_PATTERN_MESSAGE =
	'Unsafe pattern: nested or overlapping repetitions are rejected';

// keywords whose value is instance data, not schema
const DATA_KEYWORDS = ['default', 'enum', 'const', 'examples', 'example'];

class UnsafePatternError extends Error {}

function readQuantifier(source, index) {
	const char = source[index];
	let max = 1;
	let end = index;
	if (char === '*' || char === '+') {
		max = Infinity;
		end = index + 1;
	} else if (char === '?') {
		end = index + 1;
	} else if (char === '{') {
		const match = /^\{(\d+)(,(\d*))?\}/.exec(source.slice(index));
		if (match) {
			if (match[2] === undefined) {
				max = Number(match[1]);
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
	return { max, end };
}

function hasRepetition(branches) {
	return branches.some(items =>
		items.some(item => item.max > 1 || (item.branches && hasRepetition(item.branches))),
	);
}

function isLiteralBranch(items) {
	return items.every(item => item.literal !== undefined && item.max <= 1);
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
	const literals = branches.map(literalOf);
	return literals.every((a, i) =>
		literals.every((b, j) => i === j || (a.length > 0 && b.length > 0 && !b.startsWith(a))),
	);
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

function parseGroupPrefix(source, index) {
	// index is just after "("
	if (source[index] !== '?') {
		return index;
	}
	const named = /^\?<[^=!>][^>]*>/.exec(source.slice(index));
	if (named) {
		return index + named[0].length;
	}
	const kind = /^\?(<=|<!|:|=|!)/.exec(source.slice(index));
	if (kind) {
		return index + kind[0].length;
	}
	throw new UnsafePatternError('Unsupported group');
}

function parseBranches(source, start, nested) {
	const branches = [[]];
	let i = start;
	while (i < source.length) {
		const char = source[i];
		if (char === ')') {
			if (!nested) {
				throw new UnsafePatternError('Unbalanced parenthesis');
			}
			return { branches, end: i + 1 };
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
			item = { branches: body.branches, max: 1 };
			i = body.end;
		} else if (char === '[') {
			item = { max: 1 };
			i = skipClass(source, i);
		} else if (char === '\\') {
			const next = source[i + 1];
			if (next === undefined) {
				throw new UnsafePatternError('Trailing backslash');
			}
			// \d \w \s \b \k \p \u \x \c and back-references are not plain literals
			item = { max: 1, literal: /[dDwWsSbBkKpPuxc0-9]/.test(next) ? undefined : next };
			i += 2;
		} else if (char === '^' || char === '$') {
			i += 1;
			continue;
		} else {
			item = { max: 1, literal: char === '.' ? undefined : char };
			i += 1;
		}
		const quantifier = readQuantifier(source, i);
		item.max = quantifier.max;
		i = quantifier.end;
		if (item.branches && item.max > 1) {
			if (hasRepetition(item.branches) || !areAlternativesDisjoint(item.branches)) {
				throw new UnsafePatternError('Nested or overlapping repetition');
			}
		}
		branches[branches.length - 1].push(item);
	}
	if (nested) {
		throw new UnsafePatternError('Unbalanced parenthesis');
	}
	return { branches, end: i };
}

/**
 * @param {string} pattern a JSON Schema pattern
 * @returns {boolean} false if the pattern is invalid or may trigger catastrophic backtracking.
 */
export function isSafePattern(pattern) {
	try {
		parseBranches(pattern, 0, false);
		return true;
	} catch (e) {
		if (e instanceof UnsafePatternError) {
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
	const seen = new Set();
	const visit = node => {
		if (!node || typeof node !== 'object' || seen.has(node)) {
			return undefined;
		}
		seen.add(node);
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
			const found = visit(node[keys[i]]);
			if (found !== undefined) {
				return found;
			}
		}
		return undefined;
	};
	return visit(schema);
}
