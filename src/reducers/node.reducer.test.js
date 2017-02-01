import { Map } from 'immutable';

import { defaultState } from './flow.reducer';
import nodeReducer from './node.reducer';
import { NodeRecord, PositionRecord, NodeGraphicalAttributes } from '../constants/flowdesigner.model';

describe('Check node reducer', () => {
	const initialState = defaultState.setIn(['nodes', 'id1'], new NodeRecord({
		id: 'id1',
		type: 'type1',
		data: new Map({ type: 'test' }),
		graphicalAttributes: new NodeGraphicalAttributes({
			type: 'type1',
			selected: true,
			position: new PositionRecord({ x: 10, y: 10 }),
		}),
	})).setIn(['nodes', 'id2'], new NodeRecord({
		id: 'id2',
		type: 'type2',
		data: new Map({ type: 'test' }),
		graphicalAttributes: new NodeGraphicalAttributes({
			type: 'type2',
			selected: false,
			position: new PositionRecord({ x: 10, y: 10 }),
		}),
	}));

	it('FLOWDESIGNER_NODE_ADD properly add a new node to the node collection', () => {
		expect(nodeReducer(defaultState, {
			type: 'FLOWDESIGNER_NODE_ADD',
			nodeId: 'id',
			graphicalAttributes: {
				position: { x: 10, y: 10 },
			},
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_ADD add a new node to the node collection with the right type', () => {
		expect(nodeReducer(defaultState, {
			type: 'FLOWDESIGNER_NODE_ADD',
			nodeId: 'id',
			graphicalAttributes: {
				name: 'test',
				nodePosition: { x: 10, y: 10 },
				type: 'MY_NODE_TYPE',
			},
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_MOVE update node position', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_MOVE',
			nodeId: 'id2',
			nodePosition: { x: 50, y: 50 },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_SET_SIZE update node size property', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_SET_SIZE',
			nodeId: 'id1',
			nodeSize: { height: 200, width: 200 },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES should add { selected: false } attribute to node graphicalAttributes map', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES',
			nodeId: 'id1',
			graphicalAttributes: { selected: false },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES should remove {selected} attribute to node graphicalAttributes map', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES',
			nodeId: 'id1',
			graphicalAttributesKey: 'selected',
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_SET_DATA should add { type: \'string\' } attribute to node data map', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_SET_DATA',
			nodeId: 'id1',
			data: { type: 'string' },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_REMOVE_DATA should remove {type} attribute to node data map', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_REMOVE_DATA',
			nodeId: 'id1',
			data: 'type',
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_REMOVE should remove node from node collection', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_REMOVE',
			nodeId: 'id1',
		})).toMatchSnapshot();
	});
});

describe('FLOWDESIGNER_NODE_APPLY_MOVEMENT', () => {
	const initialState = defaultState.setIn(['nodes', 'id1'], new NodeRecord({
		id: 'id1',
		nodeType: 'type1',
		graphicalAttributes: new NodeGraphicalAttributes({
			position: new PositionRecord({ x: 10, y: 10 }),
		}),
	})).setIn(['nodes', 'id2'], new NodeRecord({
		id: 'id2',
		nodeType: 'type2',
		graphicalAttributes: new NodeGraphicalAttributes({
			position: new PositionRecord({ x: 10, y: 10 }),
		}),
	})).setIn(['nodes', 'id3'], new NodeRecord({
		id: 'id3',
		nodeType: 'type2',
		graphicalAttributes: new NodeGraphicalAttributes({
			position: new PositionRecord({ x: 10, y: 10 }),
		}),
	}));
	it('should apply the same relative movement to each node listed', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_APPLY_MOVEMENT',
			nodesId: ['id1', 'id2'],
			movement: { x: 10, y: 5 },
		})).toMatchSnapshot();
	});
});
