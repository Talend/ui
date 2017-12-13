import { Map } from 'immutable';

import { reducer, calculatePortsPosition, defaultState } from './flow.reducer';
import * as nodeActions from '../actions/node.actions';
import * as portActions from '../actions/port.actions';
import { NodeRecord, PortRecord } from '../constants/flowdesigner.model';
import { PORT_SOURCE } from '../constants/flowdesigner.constants';

describe('FLOWDESIGNER_FLOW_ADD_ELEMENTS', () => {
	it('should batch one element creation', () => {
		expect(
			reducer(defaultState, {
				type: 'FLOWDESIGNER.FLOW_ADD_ELEMENTS',
				listOfActionCreation: [
					nodeActions.addNode('nodeId', undefined, {
						data: {},
						graphicalAttributes: {
							nodeSize: { height: 10, width: 10 },
							position: { x: 10, y: 10 },
						},
					}),
				],
			}),
		).toMatchSnapshot();
	});

	it('should batch many elements creation', () => {
		expect(
			reducer(defaultState, {
				type: 'FLOWDESIGNER.FLOW_ADD_ELEMENTS',
				listOfActionCreation: [
					nodeActions.addNode('nodeId', undefined, {
						data: {},
						graphicalAttributes: {
							nodeSize: { height: 10, width: 10 },
							position: { x: 10, y: 10 },
						},
					}),
					nodeActions.addNode('node2', undefined, {
						data: {},
						graphicalAttributes: {
							nodeSize: { height: 10, width: 10 },
							position: { x: 10, y: 10 },
						},
					}),
					portActions.addPort('nodeId', 'portId', {
						graphicalAttributes: {
							properties: {
								type: PORT_SOURCE,
							},
						},
					}),
				],
			}),
		).toMatchSnapshot();
	});

	it('should handle throwing sub reducer by returning old state', () => {
		expect(
			reducer(defaultState, {
				type: 'FLOWDESIGNER.FLOW_ADD_ELEMENTS',
				listOfActionCreation: [
					nodeActions.addNode('nodeId', undefined, {
						data: {},
						graphicalAttributes: {
							nodeSize: { height: 10, width: 10 },
							position: { x: 10, y: 10 },
						},
					}),
					nodeActions.addNode('node2', undefined, {
						data: {},
						graphicalAttributes: {
							nodeSize: { height: 10, width: 10 },
							position: { x: 10, y: 10 },
						},
					}),
					portActions.addPort('node3', 'portId', {
						data: undefined,
						graphicalAttributes: undefined,
					}),
				],
			}),
		).toMatchSnapshot();
	});
});

describe('FLOWDESIGNER_FLOW_LOAD should reset old flow state and load news not touching flow config', () => {
	it('should load elements', () => {
		expect(
			reducer(defaultState, {
				type: 'FLOWDESIGNER.FLOW_LOAD',
				listOfActionCreation: [
					nodeActions.addNode('nodeId', undefined, {
						data: {},
						graphicalAttributes: {
							nodeSize: { height: 10, width: 10 },
							position: { x: 10, y: 10 },
						},
					}),
					nodeActions.addNode('node2', undefined, {
						data: {},
						graphicalAttributes: {
							nodeSize: { height: 10, width: 10 },
							position: { x: 10, y: 10 },
						},
					}),
					portActions.addPort('nodeId', 'portId', {
						graphicalAttributes: {
							properties: {
								type: PORT_SOURCE,
							},
						},
					}),
				],
			}),
		).toMatchSnapshot();
	});
});

describe('FLOWDESIGNER_PAN_TO set a calculated transformation into transformToApply', () => {
	it('', () => {
		expect(
			reducer(defaultState, {
				type: 'FLOWDESIGNER_PAN_TO',
				x: 400,
				y: 400,
			}),
		).toMatchSnapshot();
	});
});

describe('calculatePortsPosition behavior', () => {
	const state = defaultState
		.set(
			'nodes',
			new Map().set(
				'42',
				new NodeRecord({
					id: '42',
					graphicalAttributes: new Map({
						nodeType: '42',
					}),
				}),
			),
		)
		.set(
			'ports',
			new Map().set(
				'42',
				new PortRecord({
					id: '42',
					nodeId: '42',
				}),
			),
		)
		.set('nodeTypes', new Map().set('42', new Map().set('component', {})));

	it('should trigger only if NODE/PORT/FLOW action are dispatched', () => {
		const calculatePortPosition = jest.fn();
		const givenState = state.setIn(['nodeTypes', '42', 'component'], { calculatePortPosition });
		calculatePortsPosition(givenState, {
			type: 'FLOWDESIGNER_NODE_MOVE',
		});
		calculatePortsPosition(givenState, {
			type: 'FLOWDESIGNER_PORT_ADD',
		});
		calculatePortsPosition(givenState, {
			type: 'FLOWDESIGNER_FLOW_RESET',
		});
		expect(calculatePortPosition.mock.calls.length).toEqual(3);
	});

	it('should not trigger on FLOWDESIGNER_NODE_REMOVE and FLOWDESIGNER_PORT_REMOVE', () => {
		const calculatePortPosition = jest.fn();
		const givenState = state.setIn(['nodeTypes', '42', 'component'], { calculatePortPosition });
		calculatePortsPosition(givenState, {
			type: 'FLOWDESIGNER_NODE_REMOVE',
		});
		calculatePortsPosition(givenState, {
			type: 'FLOWDESIGNER_PORT_REMOVE',
		});
		expect(calculatePortPosition.mock.calls.length).toEqual(0);
	});
});
