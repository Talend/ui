import { Map } from 'immutable';

import componentsReducers, { defaultState } from '../../src/reducers/componentsReducers';

describe('check component management reducer', () => {
	const initialState = defaultState
			.set('component1', new Map()
			.set('key1', new Map().set('searchQuery', '')));

	it(`REACT_CMF.COMPONENT_ADD_STATE should properly add component/collection
		state tracking to the store if nor the component/key exist`,
		() => {
			expect(componentsReducers(initialState, {
				type: 'REACT_CMF.COMPONENT_ADD_STATE',
				componentName: 'componentName',
				key: 'key',
				initialComponentState: { searchQuery: 'data' },
			})).toEqual(new Map()
				.set('component1', new Map()
					.set('key1', new Map()
						.set('searchQuery', '')
					)
				).set('componentName', new Map()
					.set('key', new Map()
						.set('searchQuery', 'data')
					)
				)
			);
		}
	);

	it(`REACT_CMF.COMPONENT_ADD_STATE should properly add component/collection
		state tracking to the store if nor the component/key exist
		event if initialState is undefined`,
		() => {
			expect(componentsReducers(initialState, {
				type: 'REACT_CMF.COMPONENT_ADD_STATE',
				componentName: 'componentName',
				key: 'key',
				initialComponentState: undefined,
			})).toEqual(new Map()
				.set('component1', new Map()
					.set('key1', new Map()
						.set('searchQuery', '')
					)
				).set('componentName', new Map()
					.set('key', new Map())
				)
			);
		}
	);

	it(`REACT_CMF.COMPONENT_ADD_STATE should properly add component/collection
		state tracking to the store if the key don't exist`,
		() => {
			expect(componentsReducers(initialState, {
				type: 'REACT_CMF.COMPONENT_ADD_STATE',
				componentName: 'component1',
				key: 'key',
				initialComponentState: 'initialState',
			})).toEqual(new Map()
				.set('component1', new Map()
					.set('key1', new Map()
						.set('searchQuery', '')
					)
					.set('key', 'initialState')
			));
		}
	);

	it(`REACT_CMF.COMPONENT_MERGE_STATE should properly merge
		component/key state into the store`,
		() => {
			expect(componentsReducers(initialState, {
				type: 'REACT_CMF.COMPONENT_MERGE_STATE',
				componentName: 'component1',
				key: 'key1',
				componentState: { searchQuery: 'data' },
			})).toEqual(new Map()
				.set('component1', new Map()
					.set('key1', new Map()
						.set('searchQuery', 'data')
				)
			));
		}
	);

	it(`REACT_CMF.COMPONENT_REMOVE_STATE should properly add
		component/key state tracking to the store`,
		() => {
			expect(componentsReducers(initialState, {
				type: 'REACT_CMF.COMPONENT_REMOVE_STATE',
				componentName: 'component1',
				key: 'key1',
			})).toEqual(new Map()
				.set('component1', new Map())
			);
		}
	);

	xit('addComponentState throw when a couple of componentName, key already exist', () => {
		/*const store = mockStore({
			cmf: {
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
		}).toThrowError(msg);*/
	});

	xit(`mergeComponentState throw when a couple of
		componentName, keyId doesn't exist`,
		() => {
/*			const store = mockStore({
				cmf: {
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
			}).toThrowError(msg);*/
		}
	);

	xit('removeComponentState throw when a couple of componentName, collectionId doesn\'t exist', () => {  // eslint-disable-line
		/*const store = mockStore({
			cmf: {
				collections: new Map().set('collection', new Map()),
				components: new Map().set('component', new Map().set('key', new Map())),
			},
		});
		const msg = 'The component can\'t be removed since the componentName, keyId association doesn\'t exist.';  // eslint-disable-line
		const msgbis = 'The component can\'t be removed since the component, keyId association doesn\'t exist.';  // eslint-disable-line
		expect(() => {
			store.dispatch(removeComponentState('componentName', 'keyId'));
		})
		.toThrowError(msg);
		expect(() => {
			store.dispatch(removeComponentState('component', 'keyId'));
		})
		.toThrowError(msgbis);
		expect(() => {
			store.dispatch(removeComponentState('componentName', 'keyId'));
		})
		.toThrowError(msg);*/
	});
});
