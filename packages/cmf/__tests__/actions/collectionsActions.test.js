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

	it('addOrReplaceCollection dispatch with path to nested collections (path can be either strings separated with dots or array of strings)', () => {
		expect(
			addOrReplace('collectionId.nestedCollection.nestedObjField', 'data can be anything')
		).toEqual({
			type: 'REACT_CMF.COLLECTION_ADD_OR_REPLACE',
			collectionId: 'collectionId.nestedCollection.nestedObjField',
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

	it('removeCollection dispatch with path to nested collections (path can be either strings separated with dots or array of strings)', () => {
		expect(remove('collectionId.nestedCollection.nestedObjField')).toEqual({
			type: 'REACT_CMF.COLLECTION_REMOVE',
			collectionId: 'collectionId.nestedCollection.nestedObjField',
		});
	});
});

describe('mutateCollection', () => {
	const operations = {
		add: [0, 1, 2],
		delete: [1],
		update: {
			key: {},
		},
	};
	it('dispatch well formed action object', () => {
		expect(mutate('collectionid', operations)).toEqual({
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionid',
			operations,
		});
	});

	it('dispatch well with path to nested collections (path can be either strings separated with dots or array of strings)', () => {
		expect(mutate('collectionId.nestedCollection.nestedObjField', operations)).toEqual({
			type: 'REACT_CMF.COLLECTION_MUTATE',
			id: 'collectionId.nestedCollection.nestedObjField',
			operations,
		});
	});
});
