import { Map, List, fromJS } from 'immutable';

import collectionsReducers, { defaultState } from '../../src/reducers/collectionsReducers';

describe('check collection management reducer', () => {
	const initialState = defaultState.set('collection1', 'super data');

	it('REACT_CMF.COLLECTION_ADD_OR_REPLACE should properly add data into store', () => {
		expect(collectionsReducers(initialState, {
			type: 'REACT_CMF.COLLECTION_ADD_OR_REPLACE',
			collectionId: 'collectionId',
			data: 'data can be anything',
		})).toEqual(new Map()
			.set('collection1', 'super data')
			.set('collectionId', 'data can be anything'));
	});

	it('REACT_CMF.COLLECTION_ADD_OR_REPLACE should properly replace data into store', () => {
		expect(collectionsReducers(initialState, {
			type: 'REACT_CMF.COLLECTION_ADD_OR_REPLACE',
			collectionId: 'collection1',
			data: 'data can be anything',
		})).toEqual(new Map().set('collection1', 'data can be anything'));
	});

	it('REACT_CMF.COLLECTION_REMOVE should properly remove collection from the store', () => {
		expect(collectionsReducers(initialState, {
			type: 'REACT_CMF.COLLECTION_REMOVE',
			collectionId: 'collection1',
		})).toEqual(new Map());
	});
});

describe('REACT_CMF.COLLECTION_MUTATE', () => {
	const listInitialState = defaultState.set('collectionid', new List().set(-1, 'test data'));
	const mapInitialState = defaultState.set('collectionid', new Map().set('test', 'test data'));

	it('Collection id doesn\'t exist', () => {
		expect(collectionsReducers(mapInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'wrongCollectionid',
			operation: {},
		})).toEqual(mapInitialState);
	});
	it('Doesn\'t mutate if no operations', () => {
		expect(collectionsReducers(mapInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
		})).toEqual(mapInitialState);
	});

	it('Adds elements to List properly', () => {
		expect(collectionsReducers(listInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
			operations: {
				add: ['test1'],
			},
		})).toEqual(new Map()
			.set('collectionid', fromJS(['test data', 'test1'])));
	});
	it('Adds elements to Map properly', () => {
		expect(collectionsReducers(mapInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
			operations: {
				add: [{ test2: 'test2' }],
			},
		})).toEqual(new Map()
			.set('collectionid', fromJS({
				test: 'test data',
				test2: 'test2',
			})));
	});

	it('Deletes elements from List properly', () => {
		expect(collectionsReducers(listInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
			operations: {
				delete: [0],
			},
		})).toEqual(new Map().set('collectionid', new List()));
	});
	it('Deletes elements from Map properly', () => {
		expect(collectionsReducers(mapInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
			operations: {
				delete: ['test'],
			},
		})).toEqual(new Map().set('collectionid', new Map()));
	});

	it('Updates elements of List properly', () => {
		expect(collectionsReducers(listInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
			operations: {
				update: {
					0: 'new test data',
				},
			},
		})).toEqual(new Map()
			.set('collectionid', new List().set(-1, 'new test data')));
	});
	it('Updates elements of Map properly', () => {
		expect(collectionsReducers(mapInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
			operations: {
				update: {
					test: 'new test data',
				},
			},
		})).toEqual(new Map()
			.set('collectionid', new Map().set('test', 'new test data')));
	});
});
