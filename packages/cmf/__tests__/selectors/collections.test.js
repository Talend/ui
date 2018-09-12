import { Map, List } from 'immutable';
import cases from 'jest-in-case';
import selectors from '../../src/selectors';

describe('selectors.collections', () => {
	describe('toJS', () => {
		const state = {
			cmf: {
				collections: new Map({
					foo: new Map({
						bar: new Map({
							hello: 'world',
						}),
					}),
				}),
			},
		};
		const result1 = selectors.collections.toJS(state, 'foo.bar');
		const result2 = selectors.collections.toJS(state, 'foo.bar');
		expect(result1).toEqual({ hello: 'world' });
		expect(result1).toBe(result2);
	});
	describe('get', () => {
		const collection = new Map({ id: 'id' });
		const collectionSubset = new Map({ subset: 'subset' });
		const collectionWithSubset = new Map({ collectionSubset });
		const state = {
			cmf: {
				collections: new Map({
					collection,
					collectionWithSubset,
				}),
			},
		};
		it('try to find the collection if collectionPath is a string', () => {
			expect(selectors.collections.get(state, 'collection')).toEqual(collection);
		});

		it('try to find the collection subset if collectionPath is an array', () => {
			expect(
				selectors.collections.get(state, ['collectionWithSubset', 'collectionSubset']),
			).toEqual(collectionSubset);
		});

		it('throw an exception if collection path is neither a string or an array', () => {
			expect(() => {
				selectors.collections.get(state, {});
			}).toThrowError(`Type mismatch: collectionPath should be a string or an array of string
got [object Object]`);
		});
	});
});

const id = 'id';
const item = new Map({ id });
const collectionSubset = new List([item]);
const collectionWithSubset = new Map({ collectionSubset });
const state = {
	cmf: {
		collections: new Map({
			isList: new List([item]),
			isNotList: new Map({ id: item }),
			collectionWithSubset,
		}),
	},
};

cases(
	'find(state, pathDescriptor, resourceId)',
	opts => {
		expect(
			selectors.collections.findListItem(opts.state, opts.pathDescriptor, opts.resourceId),
		).toBe(opts.result);
	},
	[
		{
			name: 'work if collection path is a string',
			state,
			pathDescriptor: 'isList',
			resourceId: id,
			result: item,
		},
		{
			name: 'work if collection path is a Array<String>',
			state,
			pathDescriptor: ['collectionWithSubset', 'collectionSubset'],
			resourceId: id,
			result: item,
		},
		{
			name: "undefined if id doens't match",
			state,
			pathDescriptor: 'isList',
			resourceId: 'notFound',
			result: undefined,
		},
	],
);

cases(
	'selectors.collections.findListItem(state, pathDescriptor, resourceId)',
	opts => {
		expect(() => {
			selectors.collections.findListItem(opts.state, opts.pathDescriptor, opts.resourceId);
		}).toThrow(opts.result);
	},
	[
		{
			name: 'throw if collection path is not a List',
			state,
			pathDescriptor: 'isNotList',
			resourceId: id,
			result: `Type mismatch: isNotList does not resolve as an instance of Immutable.List,
got Map { "id": Map { "id": "id" } }`,
		},
		{
			name: "throw if collection can't be found",
			state,
			pathDescriptor: 'notFound',
			resourceId: id,
			result: `Type mismatch: notFound does not resolve as an instance of Immutable.List,
got undefined`,
		},
	],
);
