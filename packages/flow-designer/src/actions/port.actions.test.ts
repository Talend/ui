/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import { Map } from 'immutable';

import * as portActions from './port.actions';
import { PORT_SINK } from '../constants/flowdesigner.constants';

const mockStore = configureMockStore();

describe('Check that port action creators generate proper action objects and perform checking', () => {
	it('addPort', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: Map({ nodeId: { id: 'nodeId', nodeType: 'type' } }),
				ports: Map(),
			},
		});

		store.dispatch(
			portActions.addPort('nodeId', 'portId', {
				graphicalAttributes: {
					portType: 'test',
					properties: {
						type: PORT_SINK,
					},
				},
				data: {
					flowType: 'string',
				},
			}),
		);
		expect(store.getActions()).toMatchSnapshot();
	});

	it('setPortGraphicalAttribute', () => {
		const store = mockStore({
			flowDesigner: {
				ports: Map({ id: { id: 'portId', portType: 'type' } }),
			},
		});

		store.dispatch(portActions.setPortGraphicalAttribute('id', { selected: true }));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removePortAttribute', () => {
		const store = mockStore({
			flowDesigner: {
				ports: Map({ id: { id: 'portId' } }),
			},
		});

		store.dispatch(portActions.removePortGraphicalAttribute('id', 'selected'));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('setPortData', () => {
		const store = mockStore({
			flowDesigner: {
				ports: Map({ id: { id: 'portId', portType: 'type' } }),
			},
		});

		store.dispatch(portActions.setPortdata('id', { type: 'test' }));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removePortData', () => {
		const store = mockStore({
			flowDesigner: {
				ports: Map({ id: { id: 'portId' }, data: Map({ type: 'test' }) }),
			},
		});

		store.dispatch(portActions.removePortData('id', 'type'));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removePort', () => {
		const store = mockStore({
			flowDesigner: {
				ports: { portId: { id: 'portId' } },
			},
		});

		store.dispatch(portActions.removePort('portId'));
		expect(store.getActions()).toMatchSnapshot();
	});
});
