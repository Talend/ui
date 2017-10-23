import { Map } from 'immutable';

import reducer, {
	defaultState,
} from '../../src/reducers/componentsReducers';

global.console = { warn: jest.fn() };

describe('check component management reducer', () => {
	const initialState = defaultState
			.set('component1', new Map()
			.set('key1', new Map().set('searchQuery', '')));

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it(`REACT_CMF.COMPONENT_ADD_STATE should properly add component/collection
		state tracking to the store if nor the component/key exist`,
		() => {
			expect(reducer(initialState, {
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
			expect(reducer(initialState, {
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
			expect(reducer(initialState, {
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

	it('REACT_CMF.COMPONENT_ADD_STATE throw when a couple of componentName, key already exist', () => {
		const action = {
			type: 'REACT_CMF.COMPONENT_ADD_STATE',
			componentName: 'component1',
			key: 'key1',
			initialComponentState: 'initialState',
		};
		reducer(initialState, action);
		expect(console.warn).toBeCalled(); // eslint no-console: ["error", { allow: ["warn"] }]
		expect(console.warn.mock.calls[0][0]).toEqual(`Beware component component1 try to recreate an existing
 State namespace key1, meaning that the original one will be overloaded`); // eslint no-console: ["error", { allow: ["warn"] }]
	});
	it(`REACT_CMF.COMPONENT_MERGE_STATE should properly merge
		component/key state into the store`,
		() => {
			expect(reducer(initialState, {
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

	it(`REACT_CMF.COMPONENT_MERGE_STATE should throw when a couple of
		componentName, keyId doesn't exist`,
		() => {
			const action = {
				type: 'REACT_CMF.COMPONENT_MERGE_STATE',
				componentName: 'component',
				key: 'key',
				componentState: { searchQuery: 'data' },
			};
			expect(() => reducer(initialState, action)).toThrow(`Error, the component component try to mutate a non existing
 State namespace key, this namespace may be not yet created or already removed.`);
		}
	);


	it(`REACT_CMF.COMPONENT_REMOVE_STATE should properly add
		component/key state tracking to the store`,
		() => {
			expect(reducer(initialState, {
				type: 'REACT_CMF.COMPONENT_REMOVE_STATE',
				componentName: 'component1',
				key: 'key1',
			})).toEqual(new Map()
				.set('component1', new Map())
			);
		}
	);
	it(`removeComponentState throw when a couple of componentName,
		collectionId doesn't exist`, () => {
		const action = {
			type: 'REACT_CMF.COMPONENT_REMOVE_STATE',
			componentName: 'component',
			key: 'key',
		};
		reducer(initialState, action);
		expect(console.warn).toBeCalled();
		expect(console.warn.mock.calls[0][0]).toEqual(`Beware the component component try to remove a non existing
 State namespace key, it isn't a normal behavior execpt if two component are binded
 to this specific namespace`);
	});
	it('should recall itself on action.cmf.componentState', () => {
		const action = {
			type: 'REACT_CMF.COMPONENT_ADD_STATE',
			componentName: 'componentName',
			key: 'key',
			initialComponentState: { searchQuery: 'data' },
		};
		const subAction = {
			type: 'WHAT_EVER',
			cmf: {
				componentState: action,
			},
		};
		expect(reducer(initialState, action)).toEqual(reducer(initialState, subAction));
	});
});
