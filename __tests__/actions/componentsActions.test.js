import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

import {
	addComponentState,
	mergeComponentState,
	removeComponentState,
} from '../../src/actions/componentsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test component state management action creators', () => {
	it('addComponentState dispatch well formed acton object', () => {
		const expectedActions = [{
			type: 'REACT_CMF.COMPONENT_ADD_STATE',
			componentName: 'componentName',
			key: 'key',
			initialComponentState: { searchQuery: '' },
		}];

		const store = mockStore({
			settings: {
				collections: new Map().set('collectionId', new Map()),
				components: new Map().set('component', new Map().set('key', new Map())),
			},
		});
		store.dispatch(addComponentState('componentName', 'key', { searchQuery: '' }));
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('addComponentState throw when a couple of componentName, key already exist', () => {
		const store = mockStore({
			settings: {
				collections: new Map().set('collectionId', new Map()),
				components: new Map().set('componentName', new Map().set('keyId', new Map())),
			},
		});
		let msg = 'Can\'t set up your component componentName on key';
		msg += ' keyId since this association already exist';
		expect(() => {
			store.dispatch(
				addComponentState(
					'componentName', 'keyId', { searchQuery: '' }
				)
			);
		}).toThrowError(msg);
	});

	it('mergeComponentState dispatch well formed acton object', () => {
		const expectedActions = [{
			type: 'REACT_CMF.COMPONENT_MERGE_STATE',
			componentName: 'componentName',
			key: 'key',
			componentState: { searchQuery: 'JSON' },
		}];
		const store = mockStore({
			settings: {
				collections: new Map().set('collectionId', new Map()),
				components: new Map().set('componentName', new Map().set('key', new Map())),
			},
		});
		store.dispatch(
			mergeComponentState(
				'componentName', 'key', { searchQuery: 'JSON' }
			)
		);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it(`mergeComponentState throw when a couple of
		componentName, keyId doesn't exist`,
		() => {
			const store = mockStore({
				settings: {
					collections: new Map().set('collection', new Map()),
					components: new Map().set('component', new Map().set('key', new Map())),
				},
			});
			let msg = 'The component state can\'t be merged since the ';
			msg += 'componentName, keyId association doesn\'t exist.';
			expect(() => {
				store.dispatch(mergeComponentState(
					'componentName', 'keyId', { searchQuery: 'JSON' }
				));
			}).toThrowError(msg);
			msg = 'The component state can\'t be merged since the ';
			msg += 'component, keyId association doesn\'t exist.';
			expect(() => {
				store.dispatch(mergeComponentState(
					'component', 'keyId', { searchQuery: 'JSON' }
				));
			}).toThrowError(msg);
			msg = 'The component state can\'t be merged since the ';
			msg += 'componentName, keyId association doesn\'t exist.';
			expect(() => {
				store.dispatch(mergeComponentState(
					'componentName', 'keyId', { searchQuery: 'JSON' }
				));
			}).toThrowError(msg);
		}
	);

	it('removeComponentState dispatch well formed acton object', () => {
		const expectedActions = [{
			type: 'REACT_CMF.COMPONENT_REMOVE_STATE',
			componentName: 'componentName',
			key: 'key',
		}];

		const store = mockStore({
			settings: {
				collections: new Map().set('collectionId', new Map()),
				components: new Map().set('componentName', new Map().set('key', new Map())),
			},
		});
		store.dispatch(removeComponentState('componentName', 'key'));
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('removeComponentState throw when a couple of componentName, collectionId doesn\'t exist', () => {
		const store = mockStore({
			settings: {
				collections: new Map().set('collection', new Map()),
				components: new Map().set('component', new Map().set('key', new Map())),
			},
		});
		expect(() => {
			store.dispatch(removeComponentState('componentName', 'keyId'));
		}).toThrowError('The component can\'t be removed since the componentName, keyId association doesn\'t exist.');
		expect(() => {
			store.dispatch(removeComponentState('component', 'keyId'));
		}).toThrowError('The component can\'t be removed since the component, keyId association doesn\'t exist.');
		expect(() => {
			store.dispatch(removeComponentState('componentName', 'keyId'));
		}).toThrowError('The component can\'t be removed since the componentName, keyId association doesn\'t exist.');
	});
});
