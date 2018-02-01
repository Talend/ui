/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map, OrderedMap } from 'immutable';

import * as nodeActions from './node.actions';
import { FLOWDESIGNER_NODE_SET_TYPE } from '../constants/flowdesigner.constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Check that node action creators generate proper action objects and perform checking', () => {
	it('addNode generate action with 0 configuration', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({}),
			},
		});

		store.dispatch(
			nodeActions.addNode('id', 'label', 'description', {
				data: {},
				graphicalAttributes: {
					nodePosition: { x: 75, y: 75 },
					nodeSize: { width: 50, heigth: 50 },
					nodeType: 'nodeType',
				},
			}),
		);

		expect(store.getActions()).toMatchSnapshot();
	});

	it('moveNode generate a proper action object witch nodeId and nodePosition parameter', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({ nodeId: { id: 'nodeId', type: 'type' } }),
				nodeTypes: new Map({
					type: new Map({
						component: { calculatePortPosition: () => ({}) },
					}),
				}),
				ports: new OrderedMap(),
			},
		});

		store.dispatch(nodeActions.moveNodeTo('nodeId', { x: 10, y: 20 }, {}));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('setNodeSize', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({ nodeId: { id: 'nodeId', type: 'type' } }),
			},
		});

		store.dispatch(nodeActions.setNodeSize('nodeId', { width: 100, height: 100 }));
		expect(store.getActions()).toMatchSnapshot();
	});

	it('setNodeType', () => {
		const nodeId = 'nodeId';
		const nodeType = 'newNodeType';
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({ nodeId: { id: nodeId, type: 'type' } }),
			},
		});

		store.dispatch(nodeActions.setNodeType(nodeId, nodeType));
		expect(store.getActions()[0]).toEqual({
			type: FLOWDESIGNER_NODE_SET_TYPE,
			nodeId,
			nodeType,
		});
	});

	it('setNodeGraphicalAttributes', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({ id: { id: 'nodeId', type: 'type' } }),
			},
		});

		store.dispatch(nodeActions.setNodeGraphicalAttributes('id', { selected: true }));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removeNodeGraphicalAttribute', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({ id: { id: 'nodeId', type: 'type' } }),
			},
		});

		store.dispatch(nodeActions.removeNodeGraphicalAttribute('id', 'selected'));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('setNodeData', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({ id: { id: 'nodeId', type: 'type' } }),
			},
		});

		store.dispatch(nodeActions.setNodeData('id', { type: 'test' }));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removeNodeData', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({
					id: { id: 'nodeId', type: 'type', data: new Map({ testProperties: 'testProperties' }) },
				}),
			},
		});

		store.dispatch(nodeActions.removeNodeData('id', 'type'));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removeNode', () => {
		const store = mockStore({
			flowDesigner: {
				nodes: new Map({ id: { id: 'nodeId', type: 'type' } }),
			},
		});

		store.dispatch(nodeActions.removeNode('id'));

		expect(store.getActions()).toMatchSnapshot();
	});
});

describe('applyMovementTo', () => {
	it('generate proper action', () => {
		expect(nodeActions.applyMovementTo([1, 2, 3], { x: 10, y: 5 })).toMatchSnapshot();
	});
});
