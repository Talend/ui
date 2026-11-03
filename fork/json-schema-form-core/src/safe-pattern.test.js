import { findUnsafePattern, isSafePattern, MAX_PATTERN_LENGTH } from './safe-pattern';

describe('isSafePattern', () => {
	it.each([
		'^(a|a)+$',
		'^(\\w+\\s?)*$',
		'^(a+)+$',
		'(.*a){20}',
		'^(a|ab)*$',
		'^((a)+)*$',
		'^(?:\\d+\\.?)+$',
		'^(a',
		'a)',
		'[a',
		'^(a?a?)+$',
		'^(a?b|b)+$',
		'^((a|a))+$',
		'^(?:(?:a|ab)c)+$',
		'^(\\t|\t)+$',
		'^(\\n|\n)*$',
		'^a+a+a+a+a+a+a+a+$',
		'^\\d+\\d*$',
		'^a*b?a*$',
		'^a?a?a?a?a?a?a?aaaaaaa$',
		'^.*.*$',
		'*',
		'[z-a]',
		'a{2}{3}',
		`^${'a'.repeat(MAX_PATTERN_LENGTH)}$`,
	])('should reject %s', pattern => {
		expect(isSafePattern(pattern)).toBe(false);
	});

	it.each([
		'^[a-z]+$',
		'^\\d{3}-\\d{4}$',
		'^(foo|bar)+$',
		'^(?:ab|ac)*$',
		'^(https?|ftp)://[^\\s]+$',
		'^[\\w.+-]+@[\\w-]+\\.[\\w.]+$',
		'^(\\d+)$',
		'^a{2,5}$',
		'^[(]+$',
		'^\\d+-\\d+$',
		'^\\d{3}\\d{4}$',
		'^a+b*c+$',
		'^(?:a|b|c|d)+$',
	])('should accept %s', pattern => {
		expect(isSafePattern(pattern)).toBe(true);
	});
});

describe('isSafePattern with many alternatives', () => {
	it('should accept many disjoint alternatives in a repeated group', () => {
		const alternatives = Array.from({ length: 500 }, (_, i) => `x${String(i).padStart(4, '0')}`);
		expect(isSafePattern(`^(${alternatives.join('|')})+$`)).toBe(true);
	});

	it('should reject many alternatives when one prefixes another', () => {
		const alternatives = Array.from({ length: 500 }, (_, i) => `x${String(i).padStart(4, '0')}`);
		expect(isSafePattern(`^(${alternatives.join('|')}|x00)+$`)).toBe(false);
	});
});

describe('findUnsafePattern', () => {
	it('should return undefined for a safe schema', () => {
		expect(findUnsafePattern({ type: 'string', pattern: '^[a-z]+$' })).toBeUndefined();
	});

	it('should find patterns in nested schemas and patternProperties', () => {
		expect(findUnsafePattern({ properties: { a: { items: { pattern: '^(a|a)+$' } } } })).toBe(
			'^(a|a)+$',
		);
		expect(findUnsafePattern({ patternProperties: { '^(a+)+$': {} } })).toBe('^(a+)+$');
	});

	it('should ignore instance data', () => {
		expect(findUnsafePattern({ default: { pattern: '^(a|a)+$' } })).toBeUndefined();
		expect(findUnsafePattern({ enum: [{ pattern: '^(a|a)+$' }] })).toBeUndefined();
	});

	it('should not take the names of properties for keywords', () => {
		const unsafe = { type: 'string', pattern: '^(a|a)+$' };
		expect(findUnsafePattern({ properties: { default: unsafe } })).toBe('^(a|a)+$');
		expect(findUnsafePattern({ properties: { enum: unsafe } })).toBe('^(a|a)+$');
		expect(findUnsafePattern({ definitions: { const: unsafe } })).toBe('^(a|a)+$');
		expect(findUnsafePattern({ allOf: [unsafe] })).toBe('^(a|a)+$');
		expect(findUnsafePattern({ properties: { pattern: { type: 'string' } } })).toBeUndefined();
	});

	it('should not loop on circular schemas', () => {
		const schema = { type: 'object' };
		schema.self = schema;
		expect(findUnsafePattern(schema)).toBeUndefined();
	});
});
