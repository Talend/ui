import shouldRender from './condition';

const properties = {
	string: 'foo',
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
];

const FALSY_CONDITIONS = [
	{
		shouldBe: false,
		values: [0, 1, 2, 3], // foo is 3
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
];

describe('condition', () => {
	it('should return true if condition is filled', () => {
		TRUTHY_CONDITIONS.forEach(condition => {
			expect(shouldRender(condition, properties)).toBeTruthy();
		});
	});
	it('should return false if condition is not filled', () => {
		FALSY_CONDITIONS.forEach(condition => {
			expect(shouldRender(condition, properties)).toBeFalsy();
		});
	});
});
