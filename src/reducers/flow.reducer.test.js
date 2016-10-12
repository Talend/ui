import { Map, OrderedMap } from 'immutable';

import { reducer, calculatePortsPosition } from './flow.reducer';
import * as nodeActions from '../actions/node.actions';
import * as portActions from '../actions/port.actions';
import {
	NodeRecord,
	PortRecord,
	SizeRecord,
	PositionRecord,
} from '../constants/flowdesigner.model';

describe('FLOWDESIGNER_FLOW_ADD_ELEMENTS is batching elements creation', () => {
	it('should batch one element creation', () => {
		expect(reducer(new Map(), {
			type: 'FLOWDESIGNER.FLOW_ADD_ELEMENTS',
			listOfActionCreation: [
				nodeActions.addNode(
					'nodeId',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
			],
		})).toEqual(new Map()
			.set('nodes', new Map()
				.set('nodeId', new NodeRecord({
					id: 'nodeId',
					position: new PositionRecord({
						x: 10,
						y: 10,
					}),
					nodeSize: new SizeRecord({
						height: 10,
						width: 10,
					}),
					nodeType: undefined,
					attributes: new Map(),
				}))
			));
	});

	it('should batch many elements creation', () => {
		expect(reducer(new Map(), {
			type: 'FLOWDESIGNER.FLOW_ADD_ELEMENTS',
			listOfActionCreation: [
				nodeActions.addNode(
					'nodeId',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				nodeActions.addNode(
					'node2',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				portActions.addPort(
					'nodeId',
					'portId',
					undefined,
					{},
				),
			],
		})).toEqual(new Map()
			.set('nodes', new Map()
				.set('nodeId', new NodeRecord({
					id: 'nodeId',
					position: new PositionRecord({
						x: 10,
						y: 10,
					}),
					nodeSize: new SizeRecord({
						height: 10,
						width: 10,
					}),
					nodeType: undefined,
					attributes: new Map(),
				}))
				.set('node2', new NodeRecord({
					id: 'node2',
					position: new PositionRecord({
						x: 10,
						y: 10,
					}),
					nodeSize: new SizeRecord({
						height: 10,
						width: 10,
					}),
					nodeType: undefined,
					attributes: new Map(),
				}))
			).set('ports', new Map()
				.set('portId', new PortRecord({
					id: 'portId',
					nodeId: 'nodeId',
					portType: undefined,
					position: undefined,
					attributes: new Map(),
				})))
			);
	});

	it('should handle throwing sub reducer by returning old state', () => {
		expect(reducer(new Map(), {
			type: 'FLOWDESIGNER.FLOW_ADD_ELEMENTS',
			listOfActionCreation: [
				nodeActions.addNode(
					'nodeId',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				nodeActions.addNode(
					'node2',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				portActions.addPort(
					'node3',
					'portId',
					undefined,
					{},
				),
			],
		})).toEqual(new Map());
	});
});

describe('FLOWDESIGNER_FLOW_LOAD should reset old flow state and load news not touching flow config', () => {
	it('should load elements', () => {
		expect(reducer(new Map({ nports: new Map(), links: new Map(), ports: new Map(), nodeTypes: new Map() }), {
			type: 'FLOWDESIGNER.FLOW_LOAD',
			listOfActionCreation: [
				nodeActions.addNode(
					'nodeId',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				nodeActions.addNode(
					'node2',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				portActions.addPort(
					'nodeId',
					'portId',
					undefined,
					{},
				),
			],
		})).toEqual(new Map()
			.set('nodes', new Map()
				.set('nodeId', new NodeRecord({
					id: 'nodeId',
					position: new PositionRecord({
						x: 10,
						y: 10,
					}),
					nodeSize: new SizeRecord({
						height: 10,
						width: 10,
					}),
					nodeType: undefined,
					attributes: new Map(),
				}))
				.set('node2', new NodeRecord({
					id: 'node2',
					position: new PositionRecord({
						x: 10,
						y: 10,
					}),
					nodeSize: new SizeRecord({
						height: 10,
						width: 10,
					}),
					nodeType: undefined,
					attributes: new Map(),
				}))
			).set('links', new Map())
			.set('ports', new OrderedMap()
				.set('portId', new PortRecord({
					id: 'portId',
					nodeId: 'nodeId',
					portType: undefined,
					position: undefined,
					attributes: new Map(),
				}))
			)
			.set('nodeTypes', new Map())
			.set('transform', {
				k: 1,
				x: 0,
				y: 0,
			})
			);
	});
});


describe('calculatePortsPosition behavior', () => {
	const state = new Map()
		.set('nodes', new Map()
			.set('42', new NodeRecord({
				id: '42',
				position: new PositionRecord({}),
				nodeSize: new SizeRecord({}),
				nodeType: '42',
			}))
		)
		.set('ports', new Map()
			.set('42', new PortRecord({
				id: '42',
				nodeId: '42',
			}))
		)
		.set('nodeTypes', new Map()
			.set('42', new Map()
				.set('component', {}),
		)
		);

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
