import shouldRender from './condition';

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
		'===': [{ var: 'string' }, 'foo'],
	},
	{
		'===': [{ var: 'number' }, 2],
	},
	{
		'===': [{ var: 'object.title' }, 'Hello world'],
	},
	// check if array has at least one item
	{
		'!==': [{ var: 'arrayString.length' }, 0],
	},
	{
		'!==': [{ var: 'arrayString.length' }, 0],
	},
	// check if array is empty
	{
		'===': [{ var: 'arrayEmpty.length' }, 0],
	},
	{
		'==': [{ var: 'arrayEmpty.length' }, '0'],
	},
	// check if string is filled
	{
		'>': [{ var: 'string.length' }, 2], // foo is 3
	},
	{
		'==': [{ var: 'undefined' }, undefined],
	},
	{
		'==': [{ var: 'null' }, null],
	},
	// complex with children
	{
		and: [
			{
				or: [{ '>': [{ var: 'string.length' }, 2] }, { '>': [{ var: 'arrayObj.length' }, 0] }],
			},
			{
				'==': [{ var: 'undefined' }, undefined],
			},
			{
				'==': [{ var: 'null' }, null],
			},
		],
	},
	{
		in: [{ var: 'string' }, ['foo']],
	},
	{
		in: ['oo', { var: 'string' }],
	},
	{
		in: ['fo', { var: 'string' }],
	},
	{
		in: ['foo', { var: 'arrayString' }],
	},
	{
		in: ['oo', { lowercase: [{ var: 'stringUppercase' }] }],
	},
];

const FALSY_CONDITIONS = [
	{
		'>': [{ var: 'string.length' }, 3],
	},
	{
		'>': [{ var: 'string.length' }, { toNumber: '3' }],
	},
	{
		'==': [{ var: 'objectEmpty.title' }, 'foo'], // doesnt exist
	},
	// complex with children
	{
		and: [
			{
				'>': [{ var: 'string.length' }, 2],
			},
			{
				'==': [{ var: 'arrayObj.length' }, 0], // we make this one wrong to be false
			},
			{
				'==': [{ var: 'undefined' }, undefined],
			},
			{
				'==': [{ var: 'null' }, null],
			},
		],
	},
	{
		and: [
			{
				'==': [{ var: 'undefined' }, undefined],
			},
			{
				'==': [{ var: 'null' }, 'wrong'],
			},
		],
	},
	{
		in: [{ var: 'string' }, [0]],
	},
	{
		in: ['nothere', { var: 'arrayString' }],
	},
];

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
