import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

import {
	addOrReplaceCollection,
	removeCollection,
} from '../../src/actions/collectionsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test collection management action creators', () => {
	it('addOrReplaceCollection dispatch well formed action object', () => {
		expect(addOrReplaceCollection('collectionId', 'data can be anything')).toEqual({
			type: 'REACT_CMF.COLLECTION_ADD_OR_REPLACE',
			collectionId: 'collectionId',
			data: 'data can be anything',
		});
	});

	it('removeCollection dispatch well formed action object', () => {
		const expectedActions = [{
			type: 'REACT_CMF.COLLECTION_REMOVE',
			collectionId: 'collectionId',
		}];

		const store = mockStore({
			cmf: {
				collections: new Map().set('collectionId', 'data'),
			},
		});

		store.dispatch(removeCollection('collectionId'));
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('removeCollection throw when collection doesn\'t exist', () => {
		const store = mockStore({
			cmf: {
				collections: new Map(),
			},
		});
		expect(() => {
			store.dispatch(removeCollection('unknown collection'));
		}).toThrowError('Can\'t remove collection unknown collection since it doesn\'t already exist.');
	});
});
