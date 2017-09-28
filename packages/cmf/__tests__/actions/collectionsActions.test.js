import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

import {
	addOrReplace,
	remove,
	mutate,
} from '../../src/actions/collectionsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test collection management action creators', () => {
	it('addOrReplaceCollection dispatch well formed action object', () => {
		expect(addOrReplace('collectionId', 'data can be anything')).toEqual({
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

		store.dispatch(remove('collectionId'));
		expect(store.getActions()).toEqual(expectedActions);
	});
});

describe('mutateCollection', () => {
	it('dispatch well formed action object', () => {
		const operations = {
			add: [0, 1, 2],
			delete: [1],
			update: {
				key: {},
			},
		};
		expect(mutate('collectionid', operations)).toEqual({
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
			operations,
		});
	});
});
