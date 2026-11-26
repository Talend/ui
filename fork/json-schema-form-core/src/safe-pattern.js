import { RE2JS } from 're2js';

export const MAX_PATTERN_LENGTH = 4096;
export const UNSAFE_PATTERN_MESSAGE =
	'Pattern is invalid or unsupported by the linear-time regex engine';

function toRe2Flags(flags) {
	if (!flags) {
		return 0;
	}
	if (typeof flags !== 'string') {
		throw new Error(`${UNSAFE_PATTERN_MESSAGE}: invalid flags`);
	}
	let re2Flags = 0;
	for (let i = 0; i < flags.length; i += 1) {
		switch (flags[i]) {
			case 'i':
				re2Flags |= RE2JS.CASE_INSENSITIVE;
				break;
			case 'm':
				re2Flags |= RE2JS.MULTILINE;
				break;
			case 's':
				re2Flags |= RE2JS.DOTALL;
				break;
			case 'u':
			case 'g':
				// RE2JS is Unicode-aware by default; `g` has no effect on stateless `test()`.
				break;
			default:
				throw new Error(`${UNSAFE_PATTERN_MESSAGE}: unsupported flag "${flags[i]}"`);
		}
	}
	return re2Flags;
}

/**
 * Compiles a regular expression using the linear-time RE2 engine (re2js),
 * eliminating catastrophic backtracking (ReDoS).
 *
 * @param {string} pattern Regular expression source
 * @param {string} [flags=''] Optional JS RegExp flags (i, m, s, u, g)
 * @returns {{ test: (input: string) => boolean }}
 */
export function createSafeRegExp(pattern, flags = '') {
	if (typeof pattern !== 'string') {
		throw new Error(`${UNSAFE_PATTERN_MESSAGE}: pattern must be a string`);
	}
	if (pattern.length > MAX_PATTERN_LENGTH) {
		throw new Error(
			`${UNSAFE_PATTERN_MESSAGE}: pattern exceeds maximum length of ${MAX_PATTERN_LENGTH}`,
		);
	}
	const re2Flags = toRe2Flags(flags);
	let compiled;
	try {
		compiled = RE2JS.compile(pattern, re2Flags);
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		throw new Error(`${UNSAFE_PATTERN_MESSAGE}: ${reason}`);
	}
	return {
		test(input) {
			return compiled.matcher(String(input)).find();
		},
	};
}

/**
 * Returns true if the pattern can be compiled by the linear-time RE2 engine.
 *
 * @param {string} pattern Regular expression source
 * @param {string} [flags=''] Optional JS RegExp flags
 * @returns {boolean}
 */
export function isSafePattern(pattern, flags = '') {
	try {
		createSafeRegExp(pattern, flags);
		return true;
	} catch {
		return false;
	}
}
