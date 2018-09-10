import shouldRender, { $internals } from './condition';

const properties = {
	string: 'foo',
	stringUppercase: 'FOO',
	stringEmpty: '',
	number: 2,
	zero: 0,
	objectEmpty: {},
	object: {
		title: 'Hello world',
	},
	null: null,
	undefined,
	arrayEmpty: [],
	arrayString: ['foo', 'bar'],
	arrayObj: [{ foo: 'foo' }, { bar: 'bar' }],
};

const TRUTHY_CONDITIONS = [
	undefined,
	{
		values: ['foo'],
		path: 'string',
	},
	{
		values: [2],
		path: 'number',
	},
	{
		values: ['Hello world'],
		path: 'object.title',
	},
	// check if array has at least one item
	{
		shouldBe: false,
		values: [0],
		strategy: 'length',
		path: 'arrayString',
	},
	{
		shouldBe: false,
		values: [0],
		strategy: 'length',
		path: 'arrayObj',
	},
	// check if array is empty
	{
		values: [0],
		strategy: 'length',
		path: 'arrayEmpty',
	},
	{
		values: ['0'],
		strategy: 'length',
		path: 'arrayEmpty',
	},
	// check if string is filled
	{
		shouldBe: false,
		values: [0, 1, 2], // foo is 3
		strategy: 'length',
		path: 'string',
	},
	{
		values: [undefined],
		path: 'undefined',
	},
	{
		values: [null],
		path: 'null',
	},
	// complex with children
	{
		children: [
			{
				shouldBe: false,
				values: [0, 1, 2],
				strategy: 'length',
				path: 'string',
				children: [
					{
						shouldBe: false,
						values: [0],
						strategy: 'length',
						path: 'arrayObj',
					},
				],
			},
			{
				values: [undefined],
				path: 'undefined',
			},
			{
				values: [null],
				path: 'null',
			},
		],
	},
	{
		values: ['foo'],
		strategy: 'contains',
		path: 'string',
	},
	{
		values: ['oo'],
		strategy: 'contains',
		path: 'string',
	},
	{
		values: ['fo'],
		strategy: 'contains',
		path: 'string',
	},
	{
		values: ['foo'],
		strategy: 'contains',
		path: 'arrayString',
	},
	{
		values: ['oo'],
		strategy: 'contains(lowercase=true)',
		path: 'stringUppercase',
	},
	{
		values: ['2'],
		strategy: 'contains',
		path: 'number',
	},
	{
		shouldBe: false,
		values: ['2'],
		strategy: 'length',
		path: 'string',
	},
];

const FALSY_CONDITIONS = [
	{
		shouldBe: false,
		values: [0, 1, 2, 3], // foo is 3
		strategy: 'length',
		path: 'string',
	},
	{
		shouldBe: false,
		values: ['3'],
		strategy: 'length',
		path: 'string',
	},
	{
		values: ['foo'],
		path: 'objectEmpty.title', // doesnt exist
	},
	// complex with children
	{
		children: [
			{
				shouldBe: false,
				values: [0, 1, 2],
				strategy: 'length',
				path: 'string',
				children: [
					{
						shouldBe: true, // we make this one wrong to be false
						values: [0],
						strategy: 'length',
						path: 'arrayObj',
					},
				],
			},
			{
				values: [undefined],
				path: 'undefined',
			},
			{
				values: [null],
				path: 'null',
			},
		],
	},
	{
		children: [
			{
				values: [undefined],
				path: 'undefined',
			},
			{
				values: ['wrong'],
				path: 'null',
			},
		],
	},
	{
		values: [0],
		strategy: 'contains',
		path: 'string',
	},
	{
		values: ['nothere'],
		strategy: 'contains',
		path: 'arrayString',
	},
];

describe('parseParameters', () => {
	const parseParameters = $internals.parseParameters;

	it('should return an empty object from an empty string', () => {
		expect(Object.keys(parseParameters('')).length).toBe(0);
	});
	it('should return an object with one entry from a single parameter', () => {
		const parsed = parseParameters('a=b');
		expect(Object.keys(parsed).length).toBe(1);
		expect(parsed.a).toBe('b');
	});
	it('should return an object with two entry from two parameters', () => {
		const parsed = parseParameters('a=b;lowercase=true');
		expect(Object.keys(parsed).length).toBe(2);
		expect(parsed.a).toBe('b');
		expect(parsed.lowercase).toBe('true');
	});
	it('should skip trailing and leading spaces', () => {
		const parsed = parseParameters(' a = b ; lowercase = true ');
		expect(Object.keys(parsed).length).toBe(2);
		expect(parsed.a).toBe('b');
		expect(parsed.lowercase).toBe('true');
	});
});

describe('parseStrategy', () => {
	const parseStrategy = $internals.parseStrategy;

	it('should return a falsy value for undefined strategy', () => {
		expect(parseStrategy(undefined)).toBe($internals.DEFAULT_STRATEGY);
	});
	it('should return the strategy if there is no parameter', () => {
		const parsed = parseStrategy('foo');
		expect(parsed.name).toBe('foo');
		expect(Object.keys(parsed.params).length).toBe(0);
	});
	it('should return the strategy and parameters if any', () => {
		const parsed = parseStrategy('foo(a=b)');
		expect(parsed.name).toBe('foo');
		expect(Object.keys(parsed.params).length).toBe(1);
		expect(parsed.params.a).toBe('b');
	});
});

describe('condition', () => {
	TRUTHY_CONDITIONS.forEach(condition => {
		it(`truthy: ${JSON.stringify(condition)}`, () => {
			expect(shouldRender(condition, properties)).toBeTruthy();
		});
	});
	FALSY_CONDITIONS.forEach(condition => {
		it(`falsy: ${JSON.stringify(condition)}`, () => {
			expect(shouldRender(condition, properties)).toBeFalsy();
		});
	});
});
