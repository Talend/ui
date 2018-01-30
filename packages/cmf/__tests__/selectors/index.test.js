import { Map, List } from 'immutable';
import cases from 'jest-in-case';
import { getCollectionFromPath, findCollectionPathListItem } from '../../src/selectors';

describe('getCollectionFromPath', () => {
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
		expect(getCollectionFromPath(state, 'collection')).toEqual(collection);
	});

	it('try to find the collection subset if collectionPath is an array', () => {
		expect(getCollectionFromPath(state, ['collectionWithSubset', 'collectionSubset'])).toEqual(
			collectionSubset,
		);
	});

	it('throw an exception if collection path is neither a string or an array', () => {
		expect(() => {
			getCollectionFromPath(state, {});
		}).toThrowError(`Type mismatch: collectionPath should be a string or an array of string
got [object Object]`);
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
	'findCollectionPathListItem(state, pathDescriptor, resourceId)',
	opts => {
		expect(findCollectionPathListItem(opts.state, opts.pathDescriptor, opts.resourceId)).toBe(
			opts.result,
		);
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
	'findCollectionPathListItem(state, pathDescriptor, resourceId)',
	opts => {
		expect(() => {
			findCollectionPathListItem(opts.state, opts.pathDescriptor, opts.resourceId);
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
			name: 'throw if collection can\'t be found',
			state,
			pathDescriptor: 'notFound',
			resourceId: id,
			result: `Type mismatch: notFound does not resolve as an instance of Immutable.List, 
got undefined`,
		},
	],
);
