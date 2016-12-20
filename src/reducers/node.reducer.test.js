import { Map } from 'immutable';

import { defaultState } from './flow.reducer';
import nodeReducer from './node.reducer';
import { NodeRecord, PositionRecord } from '../constants/flowdesigner.model';

describe('Check node reducer', () => {
	const initialState = defaultState.setIn(['nodes', 'id1'], new NodeRecord({
		id: 'id1',
		nodeType: 'type1',
		position: new PositionRecord({ x: 10, y: 10 }),
		attributes: new Map({ selected: true }),
	})).setIn(['nodes', 'id2'], new NodeRecord({
		id: 'id2',
		nodeType: 'type2',
		position: new PositionRecord({ x: 10, y: 10 }),
		attributes: new Map({ selected: false }),
	}));

	it('FLOWDESIGNER_NODE_ADD properly add a new node to the node collection', () => {
		expect(nodeReducer(defaultState, {
			type: 'FLOWDESIGNER_NODE_ADD',
			nodeId: 'id',
			nodePosition: { x: 10, y: 10 },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_ADD add a new node to the node collection with the right type', () => {
		expect(nodeReducer(defaultState, {
			type: 'FLOWDESIGNER_NODE_ADD',
			nodeId: 'id',
			nodeType: 'MY_NODE_TYPE',
			nodePosition: { x: 10, y: 10 },
			attributes: { name: 'test' },
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

	it('FLOWDESIGNER_NODE_SET_ATTR should add attribute to node attribute map', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_SET_ATTR',
			nodeId: 'id1',
			attributes: { selected: false },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_REMOVE_ATTR should add attribute to node attribute map', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_REMOVE_ATTR',
			nodeId: 'id1',
			attributesKey: 'selected',
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
		position: new PositionRecord({ x: 10, y: 10 }),
		attributes: new Map({ selected: true }),
	})).setIn(['nodes', 'id2'], new NodeRecord({
		id: 'id2',
		nodeType: 'type2',
		position: new PositionRecord({ x: 10, y: 10 }),
		attributes: new Map({ selected: false }),
	})).setIn(['nodes', 'id3'], new NodeRecord({
		id: 'id3',
		nodeType: 'type2',
		position: new PositionRecord({ x: 10, y: 10 }),
		attributes: new Map({ selected: false }),
	}));
	it('should apply the same relative movement to each node listed', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_APPLY_MOVEMENT',
			nodesId: ['id1', 'id2'],
			movement: { x: 10, y: 5 },
		})).toMatchSnapshot();
	});
});
