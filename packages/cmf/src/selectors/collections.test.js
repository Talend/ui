import { Map, List } from 'immutable';
import { describe, it, expect } from 'vitest';
import {
	get,
	getAll,
	findListItem,
	toJS,
	getCollectionPlain,
	getCollectionItems,
	getCollectionItem,
} from './collections';

describe('collections.get', () => {
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

	it('returns collection when path is a string', () => {
		expect(get(state, 'collection')).toEqual(collection);
	});

	it('returns collection subset when path is an array', () => {
		expect(get(state, ['collectionWithSubset', 'collectionSubset'])).toEqual(collectionSubset);
	});

	it('throws when path is not a string or array', () => {
		expect(() => get(state, {})).toThrow(
			'Type mismatch: collectionPath should be a string or an array of string',
		);
	});
});

describe('collections.getAll', () => {
	const collectionsMap = new Map({ foo: new Map({ bar: 'baz' }) });
	const state = { cmf: { collections: collectionsMap } };

	it('returns the entire collections map', () => {
		expect(getAll(state)).toBe(collectionsMap);
	});
});

describe('collections.findListItem', () => {
	const id = 'id';
	const item = new Map({ id });
	const state = {
		cmf: {
			collections: new Map({
				isList: new List([item]),
				isNotList: new Map({ id: item }),
			}),
		},
	};

	it('finds an item by id in a List collection', () => {
		expect(findListItem(state, 'isList', id)).toBe(item);
	});

	it('returns undefined when id does not match', () => {
		expect(findListItem(state, 'isList', 'notFound')).toBeUndefined();
	});

	it('throws when collection is not a List', () => {
		expect(() => findListItem(state, 'isNotList', id)).toThrow('Type mismatch');
	});
});

describe('collections.toJS', () => {
	const state = {
		cmf: {
			collections: new Map({
				foo: new Map({ bar: new Map({ hello: 'world' }) }),
			}),
		},
	};

	it('converts an Immutable object to plain JS', () => {
		expect(toJS(state, 'foo.bar')).toEqual({ hello: 'world' });
	});

	it('memoizes the result across identical state references', () => {
		const result1 = toJS(state, 'foo.bar');
		const result2 = toJS(state, 'foo.bar');
		expect(result1).toBe(result2);
	});
});

describe('collections.getCollectionPlain', () => {
	const state = {
		cmf: {
			collections: new Map({
				myList: new List([new Map({ id: '1', name: 'Alice' })]),
			}),
		},
	};

	it('returns a plain JS array for an Immutable List collection', () => {
		const result = getCollectionPlain(state, 'myList');
		expect(result).toEqual([{ id: '1', name: 'Alice' }]);
		expect(result).not.toHaveProperty('get');
	});

	it('returns undefined when collectionId is not found', () => {
		expect(getCollectionPlain(state, 'notFound')).toBeUndefined();
	});
});

describe('collections.getCollectionItems', () => {
	const state = {
		cmf: {
			collections: new Map({
				directList: new List([new Map({ id: '1' })]),
				wrappedList: new Map({ items: new List([new Map({ id: '2' })]) }),
				emptyWrapped: new Map({ other: 'value' }),
			}),
		},
	};

	it('returns plain array when collection is a direct List', () => {
		const result = getCollectionItems(state, 'directList');
		expect(result).toEqual([{ id: '1' }]);
		expect(Array.isArray(result)).toBe(true);
	});

	it('returns plain array from items key when collection is a Map wrapping items', () => {
		const result = getCollectionItems(state, 'wrappedList');
		expect(result).toEqual([{ id: '2' }]);
		expect(Array.isArray(result)).toBe(true);
	});

	it('returns undefined when collection is a Map without items key', () => {
		expect(getCollectionItems(state, 'emptyWrapped')).toBeUndefined();
	});

	it('returns undefined when collectionId is not found', () => {
		expect(getCollectionItems(state, 'notFound')).toBeUndefined();
	});
});

describe('collections.getCollectionItem', () => {
	const items = new List([
		new Map({ id: 'a', label: 'Alpha' }),
		new Map({ id: 'b', label: 'Beta' }),
	]);
	const state = {
		cmf: {
			collections: new Map({
				directList: items,
				wrappedList: new Map({ items }),
			}),
		},
	};

	it('finds item by id in a direct List collection', () => {
		const result = getCollectionItem(state, 'directList', 'a');
		expect(result).toEqual({ id: 'a', label: 'Alpha' });
		expect(result).not.toHaveProperty('get');
	});

	it('finds item by id in a Map-wrapped collection', () => {
		const result = getCollectionItem(state, 'wrappedList', 'b');
		expect(result).toEqual({ id: 'b', label: 'Beta' });
	});

	it('returns undefined when item id is not found', () => {
		expect(getCollectionItem(state, 'directList', 'xxx')).toBeUndefined();
	});

	it('returns undefined when collection is not found', () => {
		expect(getCollectionItem(state, 'notFound', 'a')).toBeUndefined();
	});
});
