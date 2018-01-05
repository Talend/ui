import { Map, List } from 'immutable';

import { getCollectionPath, findCollectionPathListItem } from '../../src/selectors';

describe('getCollectionPath', () => {
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
	it('if collectionPath is a string, try to find the collection', () => {
		expect(getCollectionPath(state, 'collection')).toEqual(collection);
	});

	it('if collectionPath is an array, try to find the collection subset', () => {
		expect(getCollectionPath(state, ['collectionWithSubset', 'collectionSubset'])).toEqual(
			collectionSubset,
		);
	});

	it('if collection path is neither a string or an array, throw an exception', () => {
		expect(() => {
			getCollectionPath(state, {});
		}).toThrowError(`Type mismatch: collectionPath should be a string or an array of string
got [object Object]`);
	});
});

describe('findCollectionPathListItem', () => {
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

	it(`if collectionPath is an existing collection
    if this collection is an instance of List
    and this list contains an item with a properties id equals to the given itemId
    return said item`, () => {
		expect(findCollectionPathListItem(state, 'isList', id)).toEqual(item);
	});

	it(`if collectionPath is an existing collection subset
    if this collection subset is an instance of List
    and this list contains an item with a properties id equals to the given itemId
    return said item`, () => {
		expect(findCollectionPathListItem(state, ['collectionWithSubset', 'collectionSubset'], id)).toEqual(item);
	});

	it(`if collectionPath is an existing collection or collection subset
    if this collection is an instance of List
    and this list does not contains an item with a properties id equals to the given itemId
    return undefined`, () => {
		expect(findCollectionPathListItem(state, 'isList', 'notFound')).toEqual(undefined);
	});

	it(`if collectionPath is an existing collection or collection subset
    if this collection is not instance of List
    throw an exception`, () => {
		expect(() => {
			findCollectionPathListItem(state, 'isNotList', 'id');
		}).toThrowError(`Type mismatch: isNotList does not resolve as an instance of Immutable.List, 
got Map { "id": Map { "id": "id" } }`);
	});

	it(`if collectionPath is not an existing collection or collection subset
    throw an exception`, () => {
		expect(() => {
			findCollectionPathListItem(state, 'notFound', 'id');
		}).toThrowError(`Type mismatch: notFound does not resolve as an instance of Immutable.List, 
got undefined`);
	});
});
