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
	const listInitialState = defaultState.set(
		'collectionid',
		// fromJS([{ id: 0, label: 'test data 0' }, { id: 1, label: 'test data 1' }])
		new List().set(0, { id: 0, label: 'test data 0' }).set(1, { id: 1, label: 'test data 1' })
	);
	const mapInitialState = defaultState.set(
		'collectionid',
		// fromJS({
		// 	test0: 'test data 0',
		// 	test1: 'test data 1',
		// })
		new Map().set('test0', 'test data 0').set('test1', 'test data 1')
	);

	it('shouldn\'t mutate if id doesn\'t exist', () => {
		expect(collectionsReducers(mapInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'wrongCollectionid',
			operation: {},
		})).toEqual(mapInitialState);
	});

	it('shouldn\'t mutate if no operations', () => {
		expect(collectionsReducers(mapInitialState, {
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
		})).toEqual(mapInitialState);
	});

	describe('#add', () => {
		it('should insert elements to List properly', () => {
			const nextState = collectionsReducers(listInitialState, {
				type: 'REACT_CMF.COLLECTION_MUTATE',
				id: 'collectionid',
				operations: {
					add: [{ id: 2, label: 'test data 2' }],
				},
			});
			expect(nextState.get('collectionid').toJS()).toEqual([
				{ id: 0, label: 'test data 0' },
				{ id: 1, label: 'test data 1' },
				{ id: 2, label: 'test data 2' },
			]);
		});
		it('should insert elements to Map properly', () => {
			const nextState = collectionsReducers(mapInitialState, {
				type: 'REACT_CMF.COLLECTION_MUTATE',
				id: 'collectionid',
				operations: {
					add: [{ test2: 'test data 2' }],
				},
			});
			expect(nextState).toEqual(
				new Map().set('collectionid', fromJS({
					test0: 'test data 0',
					test1: 'test data 1',
					test2: 'test data 2',
				}))
			);
		});
	});

	describe('#delete', () => {
		it('should delete elements from List properly', () => {
			const nextState = collectionsReducers(listInitialState, {
				type: 'REACT_CMF.COLLECTION_MUTATE',
				id: 'collectionid',
				operations: {
					delete: [0],
				},
			});
			expect(nextState.get('collectionid').toJS()).toEqual([
				{ id: 1, label: 'test data 1' },
			]);
		});

		it('should delete elements from Map properly', () => {
			const nextState = collectionsReducers(mapInitialState, {
				type: 'REACT_CMF.COLLECTION_MUTATE',
				id: 'collectionid',
				operations: {
					delete: ['test0'],
				},
			});
			expect(nextState).toEqual(
				new Map().set('collectionid', fromJS({
					test1: 'test data 1',
				}))
			);
		});

		it('should delete nothing when ids don\'t match in List', () => {
			const nextState = collectionsReducers(listInitialState, {
				type: 'REACT_CMF.COLLECTION_MUTATE',
				id: 'collectionid',
				operations: {
					delete: ['unknown'],
				},
			});
			expect(nextState).toEqual(listInitialState);
		});

		it('should delete nothing when ids don\'t match in Map', () => {
			const nextState = collectionsReducers(mapInitialState, {
				type: 'REACT_CMF.COLLECTION_MUTATE',
				id: 'collectionid',
				operations: {
					delete: ['unknown'],
				},
			});
			expect(nextState).toEqual(mapInitialState);
		});
	});

	describe('#update', () => {
		it('should update elements of List properly', () => {
			const nextState = collectionsReducers(listInitialState, {
				type: 'REACT_CMF.COLLECTION_MUTATE',
				id: 'collectionid',
				operations: {
					update: {
						0: { id: 0, label: 'new test data 0' },
					},
				},
			});
			expect(nextState.get('collectionid').toJS()).toEqual([
				{ id: 0, label: 'new test data 0' },
				{ id: 1, label: 'test data 1' },
			]);
		});

		it('should update elements of Map properly', () => {
			const nextState = collectionsReducers(mapInitialState, {
				type: 'REACT_CMF.COLLECTION_MUTATE',
				id: 'collectionid',
				operations: {
					update: {
						'test0': 'new test data 0',
					},
				},
			});
			expect(nextState).toEqual(
				new Map().set('collectionid', fromJS({
					test0: 'new test data 0',
					test1: 'test data 1',
				}))
			);
		});
	});
});
