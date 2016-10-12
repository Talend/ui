import { Map } from 'immutable';

import nodeReducer from './node.reducer';
import { NodeRecord, PositionRecord, SizeRecord } from '../constants/flowdesigner.model';

describe('Check node reducer', () => {
	const initialState = new Map().setIn(['nodes', 'id1'], new NodeRecord({
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
		expect(nodeReducer(new Map(), {
			type: 'FLOWDESIGNER_NODE_ADD',
			nodeId: 'id',
			nodePosition: { x: 10, y: 10 },
		})).toEqual(new Map().setIn(['nodes', 'id'], new NodeRecord({
			id: 'id',
			nodeType: undefined,
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeSize: new SizeRecord({ width: undefined, height: undefined }),
			attributes: new Map(),
		})));
	});

	it('FLOWDESIGNER_NODE_ADD add a new node to the node collection with the right type', () => {
		expect(nodeReducer(new Map(), {
			type: 'FLOWDESIGNER_NODE_ADD',
			nodeId: 'id',
			nodeType: 'MY_NODE_TYPE',
			nodePosition: { x: 10, y: 10 },
			attributes: { name: 'test' },
		})).toEqual(new Map().setIn(['nodes', 'id'], new NodeRecord({
			id: 'id',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeType: 'MY_NODE_TYPE',
			nodeSize: new SizeRecord({ width: undefined, height: undefined }),
			attributes: new Map().set('name', 'test'),
		})));
	});

	it('FLOWDESIGNER_NODE_MOVE update node position', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_MOVE',
			nodeId: 'id2',
			nodePosition: { x: 50, y: 50 },
		})).toEqual(new Map().setIn(['nodes', 'id1'], new NodeRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeType: 'type1',
			attributes: new Map({ selected: true }),
		})).setIn(['nodes', 'id2'], new NodeRecord({
			id: 'id2',
			position: new PositionRecord({ x: 50, y: 50 }),
			nodeType: 'type2',
			attributes: new Map({ selected: false }),
		})));
	});

	it('FLOWDESIGNER_NODE_SET_SIZE update node size property', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_SET_SIZE',
			nodeId: 'id1',
			nodeSize: { height: 200, width: 200 },
		})).toEqual(new Map().setIn(['nodes', 'id1'], new NodeRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeSize: new SizeRecord({ height: 200, width: 200 }),
			nodeType: 'type1',
			attributes: new Map({ selected: true }),
		})).setIn(['nodes', 'id2'], new NodeRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeType: 'type2',
			attributes: new Map({ selected: false }),
		})));
	});

	it('FLOWDESIGNER_NODE_SET_ATTR should add attribute to node attribute map', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_SET_ATTR',
			nodeId: 'id1',
			attributes: { selected: false },
		})).toEqual(new Map().setIn(['nodes', 'id1'], new NodeRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeType: 'type1',
			attributes: new Map({ selected: false }),
		})).setIn(['nodes', 'id2'], new NodeRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeType: 'type2',
			attributes: new Map({ selected: false }),
		})));
	});

	it('FLOWDESIGNER_NODE_REMOVE_ATTR should add attribute to node attribute map', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_REMOVE_ATTR',
			nodeId: 'id1',
			attributesKey: 'selected',
		})).toEqual(new Map().setIn(['nodes', 'id1'], new NodeRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeType: 'type1',
			attributes: new Map(),
		})).setIn(['nodes', 'id2'], new NodeRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeType: 'type2',
			attributes: new Map({ selected: false }),
		})));
	});

	it('FLOWDESIGNER_NODE_REMOVE should remove node from node collection', () => {
		expect(nodeReducer(initialState, {
			type: 'FLOWDESIGNER_NODE_REMOVE',
			nodeId: 'id1',
		})).toEqual(new Map().setIn(['nodes', 'id2'], new NodeRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
			nodeType: 'type2',
			attributes: new Map({ selected: false }),
		})));
	});
});
