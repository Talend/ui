/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

import * as portActions from './port.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Check that port action creators generate proper' +
	' action objects and perform checking', () => {
	it('addPort', () => {
		const expectedActions = [{
			type: 'FLOWDESIGNER_PORT_ADD',
			nodeId: 'nodeId',
			portId: 'portId',
			portType: 'portType',
			attributes: { selected: true },
		}];

		const store = mockStore({
			flowDesigner: {
				nodes: new Map({ nodeId: { id: 'nodeId', nodeType: 'type' } }),
				ports: new Map(),
			},
		});

		store.dispatch(portActions.addPort('nodeId', 'portId', 'portType', { selected: true }));
		expect(store.getActions()).toEqual(expectedActions);
	});


	it('setPortAttribute', () => {
		const expectedActions = [{
			type: 'FLOWDESIGNER_PORT_SET_ATTR',
			portId: 'id',
			attributes: { selected: true },
		}];

		const store = mockStore({
			flowDesigner: {
				ports: new Map({ id: { id: 'portId', portType: 'type' } }),
			},
		});

		store.dispatch(portActions.setPortAttribute('id', { selected: true }));

		expect(store.getActions()).toEqual(expectedActions);
	});

	it('removePortAttribute', () => {
		const expectedActions = [{
			type: 'FLOWDESIGNER_PORT_REMOVE_ATTR',
			portId: 'id',
			attributesKey: 'selected',
		}];

		const store = mockStore({
			flowDesigner: {
				ports: new Map({ id: { id: 'portId' } }),
			},
		});

		store.dispatch(portActions.removePortAttribute('id', 'selected'));

		expect(store.getActions()).toEqual(expectedActions);
	});

	it('removePort', () => {
		const expectedActions = [{
			type: 'FLOWDESIGNER_PORT_REMOVE',
			portId: 'portId',
		}];

		const store = mockStore({
			flowDesigner: {
				ports: new Map({ portId: { id: 'portId' } }),
			},
		});

		store.dispatch(portActions.removePort('portId'));
		expect(store.getActions()).toEqual(expectedActions);
	});
});
