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
		'^a?a?a?a?a?a?a?aaaaaaa$',
		'^[\\s]+[^\\x00-\\xff]+[\\s]+$',
		'^(a+)(a+)(a+)(a+)(a+)(a+)(a+)(a+)$',
		'^a+aa+aa+aa+aa+aa+aa+aa+$',
		'^((a+a+)(a+a+))((a+a+)(a+a+))$',
		'^((a+a+)(a+))$',
		'^(?:(?:a+)(?:a+))(?:a+)$',
		`^${'(a|aa)'.repeat(22)}$`,
		`^${'a+(b*)'.repeat(8)}a+$`,
		`^${Array(8).fill('a+').join('(?!b)')}$`,
		`^${Array(8).fill('a+').join('(?=)')}$`,
		`^${Array(8).fill('a+').join('\\b')}$`,
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
		'^a+b+a+$',
		'^(?:a+)(?:a*)$',
		'^\\S+@\\S+$',
		'^\\d+\\d*$',
		'^a*b?a*$',
		'^[ab]+b[bc]+$',
		'^[\\s]+[^\\x00-\\xff]+$',
		'^a+(?!b)a+$',
		'^(a|aa)(a|aa)$',
		'^[\\s]+[^\\s]+$',
		'^(a+)b(a+)$',
		'^(a+)ab$',
		'^(?:a+a+)b$',
		'^(?:a+a+)(?:b+b+)$',
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

	it('should not take the data of default, enum or extension keywords for schemas', () => {
		expect(findUnsafePattern({ default: { pattern: '^(a|a)+$' } })).toBeUndefined();
		expect(findUnsafePattern({ enum: [{ pattern: '^(a|a)+$' }] })).toBeUndefined();
		expect(findUnsafePattern({ 'x-metadata': { pattern: '^(a+)+$' } })).toBeUndefined();
		expect(
			findUnsafePattern({
				properties: { a: { type: 'object', default: { pattern: '^(a+)+$' } } },
			}),
		).toBeUndefined();
	});

	it('should check the data a local $ref targets', () => {
		expect(
			findUnsafePattern({
				properties: {
					hero: { $ref: '#/properties/hero/default', default: { pattern: '^(a|a)+$' } },
				},
			}),
		).toBe('^(a|a)+$');
		expect(
			findUnsafePattern({
				properties: { a: { $ref: '#/x-metadata/a~1b/%24defs' } },
				'x-metadata': { 'a/b': { $defs: { pattern: '^(a+)+$' } } },
			}),
		).toBe('^(a+)+$');
		expect(
			findUnsafePattern({ properties: { a: { $ref: '#/default' } }, default: { pattern: 'a+' } }),
		).toBeUndefined();
	});

	it('should check every object when a reference may reach anything', () => {
		const unsafe = { pattern: '^(a|a)+$' };
		expect(findUnsafePattern({ $ref: 'http://example.com/schema', default: unsafe })).toBe(
			'^(a|a)+$',
		);
		expect(findUnsafePattern({ $ref: '#/missing', default: unsafe })).toBe('^(a|a)+$');
		expect(findUnsafePattern({ $ref: '#foo', enum: [unsafe] })).toBe('^(a|a)+$');
		expect(findUnsafePattern({ properties: { a: { id: 'other' } }, 'x-metadata': unsafe })).toBe(
			'^(a|a)+$',
		);
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
