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
	const collection = { id: 'id' };
	const collectionSubset = { subset: 'subset' };
	const collectionWithSubset = { collectionSubset };
	const state = {
		cmf: {
			collections: {
				collection,
				collectionWithSubset,
			},
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
	const collectionsMap = { foo: { bar: 'baz' } };
	const state = { cmf: { collections: collectionsMap } };

	it('returns the entire collections object', () => {
		expect(getAll(state)).toBe(collectionsMap);
	});
});

describe('collections.findListItem', () => {
	const id = 'id';
	const item = { id };
	const state = {
		cmf: {
			collections: {
				isList: [item],
				isNotList: { id: item },
			},
		},
	};

	it('finds an item by id in an Array collection', () => {
		expect(findListItem(state, 'isList', id)).toBe(item);
	});

	it('returns undefined when id does not match', () => {
		expect(findListItem(state, 'isList', 'notFound')).toBeUndefined();
	});

	it('throws when collection is not an Array', () => {
		expect(() => findListItem(state, 'isNotList', id)).toThrow('Type mismatch');
	});
});

describe('collections.toJS', () => {
	const state = {
		cmf: {
			collections: {
				foo: { bar: { hello: 'world' } },
			},
		},
	};

	it('returns the plain JS value at the given path', () => {
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
			collections: {
				myList: [{ id: '1', name: 'Alice' }],
			},
		},
	};

	it('returns the collection as-is when collectionId is found', () => {
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
			collections: {
				directList: [{ id: '1' }],
				wrappedList: { items: [{ id: '2' }] },
				emptyWrapped: { other: 'value' },
			},
		},
	};

	it('returns array when collection is a direct Array', () => {
		const result = getCollectionItems(state, 'directList');
		expect(result).toEqual([{ id: '1' }]);
		expect(Array.isArray(result)).toBe(true);
	});

	it('returns array from items key when collection is a plain object with items', () => {
		const result = getCollectionItems(state, 'wrappedList');
		expect(result).toEqual([{ id: '2' }]);
		expect(Array.isArray(result)).toBe(true);
	});

	it('returns undefined when collection is a plain object without items key', () => {
		expect(getCollectionItems(state, 'emptyWrapped')).toBeUndefined();
	});

	it('returns undefined when collectionId is not found', () => {
		expect(getCollectionItems(state, 'notFound')).toBeUndefined();
	});
});

describe('collections.getCollectionItem', () => {
	const items = [
		{ id: 'a', label: 'Alpha' },
		{ id: 'b', label: 'Beta' },
	];
	const state = {
		cmf: {
			collections: {
				directList: items,
				wrappedList: { items },
			},
		},
	};

	it('finds item by id in a direct Array collection', () => {
		const result = getCollectionItem(state, 'directList', 'a');
		expect(result).toEqual({ id: 'a', label: 'Alpha' });
		expect(result).not.toHaveProperty('get');
	});

	it('finds item by id in an object-wrapped collection', () => {
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
