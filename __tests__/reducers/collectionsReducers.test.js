import { Map } from 'immutable';

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
