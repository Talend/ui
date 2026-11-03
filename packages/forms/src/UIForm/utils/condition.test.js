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

describe('array condition', () => {
	it('should auto populate indices in array condition', () => {
		// given
		const formData = {
			user: {
				names: [{ value: 'Gary' }, { value: 'Moore' }],
			},
		};
		const key = ['user', 'names', 1, 'value'];
		const falsyCondition = {
			and: [{ '==': [{ var: 'user.names[].value' }, ['Gary']] }],
		};
		const truthyCondition = {
			and: [{ '==': [{ var: 'user.names[].value' }, ['Moore']] }],
		};

		// when
		const falsyResult = shouldRender(falsyCondition, formData, key);
		const truthyResult = shouldRender(truthyCondition, formData, key);

		// then
		expect(falsyResult).toBeFalsy();
		expect(truthyResult).toBeTruthy();
	});

	it('should auto populate indices recursively', () => {
		// given
		const formData = {
			user: {
				names: [{ primary: { firstname: ['Gary'] } }, { primary: { firstname: ['Moore'] } }],
			},
		};
		const key = ['user', 'names', 1, 'primary', 'firstname', 0];
		const falsyCondition = {
			'==': [{ var: 'user.names[].primary.firstname[]' }, 'Gary'],
		};
		const truthyCondition = {
			'==': [{ var: 'user.names[].primary.firstname[]' }, 'Moore'],
		};

		// when
		const falsyResult = shouldRender(falsyCondition, formData, key);
		const truthyResult = shouldRender(truthyCondition, formData, key);

		// then
		expect(falsyResult).toBeFalsy();
		expect(truthyResult).toBeTruthy();
	});
});

describe('shouldRender security', () => {
	it('should reject the method operator', () => {
		const spy = vi.fn();
		globalThis.__pwned = spy;
		const condition = {
			method: [
				{ method: [{ var: 'constructor' }, 'constructor', ['globalThis.__pwned()']] },
				'call',
				[null],
			],
		};
		expect(shouldRender(condition, { a: 1 })).toBe(false);
		expect(spy).not.toHaveBeenCalled();
		delete globalThis.__pwned;
	});

	it('should reject unsafe var paths', () => {
		expect(shouldRender({ '!!': [{ var: 'constructor' }] }, {})).toBe(false);
		expect(shouldRender({ '!!': [{ var: '__proto__.x' }] }, {})).toBe(false);
	});

	it('should reject unsafe paths produced by array notation resolution', () => {
		const condition = { '!!': [{ var: 'items[].x' }] };
		expect(shouldRender(condition, { items: [{ x: 1 }] }, ['items', 'constructor'])).toBe(false);
		expect(shouldRender(condition, { items: [{ x: 1 }] }, ['items', '__proto__'])).toBe(false);
		expect(shouldRender(condition, { items: [{ x: 1 }] }, ['items', 0])).toBe(true);
	});

	it('should not crash on null values in condition', () => {
		expect(shouldRender({ '===': [{ var: 'a' }, null] }, { a: null })).toBe(true);
	});

	it('should still evaluate allowed conditions', () => {
		expect(shouldRender({ '===': [{ var: 'a.b' }, 1] }, { a: { b: 1 } })).toBe(true);
		expect(shouldRender({ and: [{ '!==': [{ var: 'a' }, 2] }, true] }, { a: 1 })).toBe(true);
	});

	describe('evaluation cost', () => {
		function nestedMap(depth) {
			let rule = 1;
			for (let i = 0; i < depth; i += 1) {
				rule = { map: [new Array(10).fill(0), rule] };
			}
			return rule;
		}

		it('should reject a reduce whose accumulator doubles with merge', () => {
			const condition = {
				'!!': [
					{
						reduce: [
							{ var: 'items' },
							{ merge: [{ var: 'accumulator' }, { var: 'accumulator' }] },
							[1],
						],
					},
				],
			};
			const items = new Array(40).fill(0);
			const start = Date.now();
			expect(shouldRender(condition, { items })).toBe(false);
			expect(Date.now() - start).toBeLessThan(100);
		});

		it('should reject a reduce whose accumulator doubles with cat', () => {
			const condition = {
				reduce: [{ var: 'items' }, { cat: [{ var: 'accumulator' }, { var: 'accumulator' }] }, 'ab'],
			};
			expect(shouldRender(condition, { items: new Array(40).fill(0) })).toBe(false);
		});

		it('should reject a reduce whose accumulator doubles with nested arrays', () => {
			const condition = {
				'!!': [
					{
						reduce: [
							{ var: 'items' },
							{ '+': [[{ var: 'accumulator' }, { var: 'accumulator' }]] },
							[1],
						],
					},
				],
			};
			expect(shouldRender(condition, { items: new Array(40).fill(0) })).toBe(false);
		});

		it('should reject a reduce whose accumulator grows with missing', () => {
			const condition = {
				'!!': [
					{
						reduce: [
							{ var: 'items' },
							{ missing: ['current', { var: 'accumulator' }, { var: 'accumulator' }] },
							'current',
						],
					},
				],
			};
			const start = Date.now();
			expect(shouldRender(condition, { items: new Array(40).fill(null) })).toBe(false);
			expect(Date.now() - start).toBeLessThan(100);
		});

		it('should reject a reduce whose accumulator grows with missing_some', () => {
			const condition = {
				reduce: [
					{ var: 'items' },
					{ missing_some: [3, ['current', { var: 'accumulator' }, { var: 'accumulator' }]] },
					'current',
				],
			};
			expect(shouldRender(condition, { items: new Array(40).fill(null) })).toBe(false);
		});

		it('should reject iteration operators inside a reduce logic', () => {
			const condition = {
				'!!': [
					{
						reduce: [
							{ var: 'items' },
							{ map: [{ var: 'accumulator' }, { var: '' }] },
							{ var: 'items' },
						],
					},
				],
			};
			const items = new Array(10000).fill(0);
			const start = Date.now();
			expect(shouldRender(condition, { items })).toBe(false);
			expect(Date.now() - start).toBeLessThan(100);
		});

		it('should reject an in scan inside a reduce logic', () => {
			const condition = {
				'!!': [
					{
						reduce: [
							{ var: 'items' },
							{ or: [{ in: [-1, { var: 'accumulator' }] }, { var: 'accumulator' }] },
							{ var: 'items' },
						],
					},
				],
			};
			const start = Date.now();
			expect(shouldRender(condition, { items: new Array(100000).fill(0) })).toBe(false);
			expect(Date.now() - start).toBeLessThan(100);
		});

		it.each([
			['==', { '==': [{ var: 'accumulator' }, -1] }],
			['<', { '<': [{ var: 'accumulator' }, -1] }],
			['substr', { '!!': [{ substr: [{ var: 'accumulator' }, 1] }] }],
		])('should reject a reduce coercing the accumulator and keeping it with %s', (_, coercion) => {
			const condition = {
				'!!': [
					{
						reduce: [
							{ var: 'items' },
							{ or: [coercion, { var: 'accumulator' }] },
							{ var: 'items' },
						],
					},
				],
			};
			const start = Date.now();
			expect(shouldRender(condition, { items: new Array(100000).fill(0) })).toBe(false);
			expect(Date.now() - start).toBeLessThan(100);
		});

		it('should reject a reduce coercing a path computed from the accumulator', () => {
			const condition = {
				'!!': [
					{
						reduce: [
							{ var: 'items' },
							{ or: [{ var: { var: 'accumulator' } }, { var: 'accumulator' }] },
							{ var: 'items' },
						],
					},
				],
			};
			expect(shouldRender(condition, { items: new Array(100000).fill(0) })).toBe(false);
		});

		it('should evaluate a reduce coercing operands when it returns a scalar', () => {
			const data = { items: [3, 1, 2] };
			const condition = {
				'===': [
					{
						reduce: [
							{ var: 'items' },
							{
								if: [
									{ '>': [{ var: 'current' }, { var: 'accumulator' }] },
									1,
									{ max: [{ var: 'current' }, { var: 'accumulator' }] },
								],
							},
							0,
						],
					},
					1,
				],
			};
			expect(shouldRender(condition, data)).toBe(true);
		});

		it('should reject deeply nested iteration operators', () => {
			const start = Date.now();
			expect(shouldRender({ '!!': [nestedMap(9)] }, {})).toBe(false);
			expect(Date.now() - start).toBeLessThan(100);
		});

		it('should reject conditions that are too deep or too big', () => {
			let deep = { var: 'a' };
			for (let i = 0; i < 100; i += 1) {
				deep = { '!': [deep] };
			}
			expect(shouldRender(deep, { a: 1 })).toBe(false);
			const big = { and: new Array(1000).fill({ '===': [{ var: 'a' }, 1] }) };
			expect(shouldRender(big, { a: 1 })).toBe(false);
		});

		it('should reject nested iteration operators up to the exponential cost', () => {
			const start = Date.now();
			expect(shouldRender({ '!!': [nestedMap(6)] }, {})).toBe(false);
			expect(Date.now() - start).toBeLessThan(100);
		});

		it('should still evaluate bounded iteration operators', () => {
			const data = { items: [{ v: 1 }, { v: 2 }], matrix: [[1, 2], [3]] };
			expect(shouldRender({ some: [{ var: 'items' }, { '===': [{ var: 'v' }, 2] }] }, data)).toBe(
				true,
			);
			expect(
				shouldRender(
					{
						'===': [
							{
								reduce: [
									{ var: 'items' },
									{ '+': [{ var: 'current.v' }, { var: 'accumulator' }] },
									0,
								],
							},
							3,
						],
					},
					data,
				),
			).toBe(true);
			expect(
				shouldRender(
					{ all: [{ var: 'matrix' }, { some: [{ var: '' }, { '>': [{ var: '' }, 2] }] }] },
					data,
				),
			).toBe(false);
			expect(
				shouldRender({ in: [2, { merge: [{ var: 'matrix.0' }, { var: 'matrix.1' }] }] }, data),
			).toBe(true);
		});
	});
});
