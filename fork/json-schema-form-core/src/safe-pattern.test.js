import {
	createSafeRegExp,
	isSafePattern,
	MAX_PATTERN_LENGTH,
	UNSAFE_PATTERN_MESSAGE,
} from './safe-pattern';

describe('safe-pattern (re2js linear-time engine)', () => {
	describe('createSafeRegExp', () => {
		it.each([
			['^[a-z]+$', 'batman', true],
			['^[a-z]+$', 'Batman1', false],
			['^\\S+@\\S+$', 'user@example.com', true],
			['^\\S+@\\S+$', 'invalid email', false],
			['^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', 'user@example.com', true],
			['^[0-9]{4}-[0-9]{2}-[0-9]{2}$', '2026-04-20', true],
			['foo', 'barfoobaz', true],
			['', 'anything', true],
		])('should match %s against %s => %s', (pattern, input, expected) => {
			expect(createSafeRegExp(pattern).test(input)).toBe(expected);
		});

		it('should support i, m, s, u, and g flags', () => {
			expect(createSafeRegExp('^foo$', 'i').test('FOO')).toBe(true);
			expect(createSafeRegExp('^foo$').test('a\nfoo\nb')).toBe(false);
			expect(createSafeRegExp('^foo$', 'm').test('a\nfoo\nb')).toBe(true);
			expect(createSafeRegExp('^a.b$').test('a\nb')).toBe(false);
			expect(createSafeRegExp('^a.b$', 's').test('a\nb')).toBe(true);
			expect(createSafeRegExp('^[a-z]+$', 'u').test('abc')).toBe(true);
			expect(createSafeRegExp('foo', 'g').test('barfoobaz')).toBe(true);
		});

		it.each([
			'^(a|a)+$',
			'^(a+)+$',
			'^(\\w+\\s?)*$',
			'a+$',
			'a+a+$',
			'^a+a+$',
			'^(?:a+){2,}$',
			'^\\S+@\\S+$',
			'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
		])('should evaluate pathological pattern %s in linear time', pattern => {
			const input = `${'a'.repeat(5000)}!`;
			const start = Date.now();
			const re = createSafeRegExp(pattern);
			expect(re.test(input)).toBe(false);
			expect(Date.now() - start).toBeLessThan(200);
		});

		it.each([
			['backreference', '^(\\w+)\\1$'],
			['lookahead', '^(?=a)a+$'],
			['lookbehind', '(?<=a)b'],
			['malformed control escape', '^\\c+c+c+$'],
			['invalid unicode property escape', '^(\\p{1,2})+$'],
			['unbalanced parenthesis', '^([a-z]+$'],
			['excessive repetition count', 'a{100000}'],
			['deeply nested groups', `${'('.repeat(2000)}a${')'.repeat(2000)}`],
			['pattern exceeding max length', 'a'.repeat(MAX_PATTERN_LENGTH + 1)],
		])('should reject unsupported or invalid pattern (%s)', (_label, pattern) => {
			expect(() => createSafeRegExp(pattern)).toThrow(UNSAFE_PATTERN_MESSAGE);
			expect(isSafePattern(pattern)).toBe(false);
		});

		it('should reject non-string patterns and unsupported flags', () => {
			expect(() => createSafeRegExp(null)).toThrow(UNSAFE_PATTERN_MESSAGE);
			expect(() => createSafeRegExp(123)).toThrow(UNSAFE_PATTERN_MESSAGE);
			expect(() => createSafeRegExp('^a$', 'y')).toThrow(UNSAFE_PATTERN_MESSAGE);
			expect(isSafePattern(null)).toBe(false);
			expect(isSafePattern('^a$', 'y')).toBe(false);
		});
	});
});
