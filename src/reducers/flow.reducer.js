import { Map, OrderedMap } from 'immutable';
import invariant from 'invariant';
import { zoomIdentity } from 'd3-zoom';
import {
	FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	FLOWDESIGNER_FLOW_RESET,
	FLOWDESIGNER_FLOW_LOAD,
	FLOWDESIGNER_FLOW_SET_ZOOM,
	FLOWDESIGNER_PAN_TO,
} from '../constants/flowdesigner.constants';
import nodesReducer from './node.reducer';
import linksReducer from './link.reducer';
import portsReducer from './port.reducer';
import nodeTypeReducer from './nodeType.reducer';

export const defaultState = new Map({
	nodes: new Map(),
	links: new Map(),
	ports: new OrderedMap(),
	out: new Map(),
	in: new Map(),
	childrens: new Map(),
	parents: new Map(),
	nodeTypes: new Map(),
	transform: { k: 1, x: 0, y: 0 },
	transformToApply: undefined,
});

function combinedReducer(state = defaultState, action) {
	return [nodesReducer, linksReducer, portsReducer, nodeTypeReducer]
	.reduce(
		(cumulatedState, reducer) => reducer(cumulatedState, action),
		state,
	);
}

export function reducer(state, action) {
	switch (action.type) {
	case FLOWDESIGNER_FLOW_ADD_ELEMENTS:
		try {
			return action.listOfActionCreation.reduce(
				(cumulativeState, actionCreation) => combinedReducer(cumulativeState, actionCreation),
				state,
			);
		} catch (error) {
			invariant(
				true,
				`Something happenned preventing FLOWDESIGNER_FLOW_ADD_ELEMENTS to be applied :${error}`,
			);
			return state;
		}
	case FLOWDESIGNER_FLOW_RESET:
		return defaultState.set('nodeTypes', state.get('nodeTypes'));
	case FLOWDESIGNER_FLOW_LOAD:
		try {
			return action.listOfActionCreation.reduce(
				(cumulativeState, actionCreation) => combinedReducer(cumulativeState, actionCreation),
				defaultState.set('nodeTypes', state.get('nodeTypes')),
			);
		} catch (error) {
			invariant(
				true,
				`Something happenned preventing FLOWDESIGNER_FLOW_LOAD to be applied :${error}`,
			);
			return state;
		}
	case FLOWDESIGNER_FLOW_SET_ZOOM:
		return state.set('transform', action.transform);
	case FLOWDESIGNER_PAN_TO:
		return state.update('transformToApply', () => (
			zoomIdentity
				.translate(state.get('transform').x, state.get('transform').y)
				.scale(state.get('transform').k)
				.scale(1 / state.get('transform').k).translate(
					-((state.get('transform').x + action.x)),
					-((state.get('transform').y + action.y)),
				)
		));
	default:
		return combinedReducer(state, action);
	}
}

/**
 * Calculate port position with the methods provided by port parent node
 * calcul is done only if node moved or list of attached port have its size changed
 * Beware could be slow if the calculus methode provided is slow
 * @params {object} state react-flow-designer state
 * @params {object} oldState react-flow-designer precedentState
 *
 * @return {object} new state
 */
export function calculatePortsPosition(state, action) {
	let nodes = [];
	// TODO: NOT a big fan of this way to optimize port recalculations, don't feel future proof
	if ((/FLOWDESIGNER_NODE_/.exec(action.type) && action.type !== 'FLOWDESIGNER_NODE_REMOVE') ||
		(/FLOWDESIGNER_PORT_/.exec(action.type) && action.type !== 'FLOWDESIGNER_PORT_REMOVE') ||
		(/FLOWDESIGNER.FLOW_/.exec(action.type))) {
		if (action.nodeId) {
			nodes.push(state.getIn(['nodes', action.nodeId]));
		} else if (action.portId) {
			nodes.push(state.getIn(['nodes'], state.getIn(['ports', action.portId]).nodeId));
		} else {
			nodes = state.get('nodes');
		}
		return nodes.reduce((cumulativeState, node) => {
			const nodeType = node.getNodeType();
			const ports = state.get('ports').filter(port => port.nodeId === node.id);
			const calculatePortPosition = state.getIn(['nodeTypes', nodeType, 'component'])
				.calculatePortPosition;
			return cumulativeState.mergeIn(
				['ports'],
				calculatePortPosition(
					ports,
					node.getPosition(),
					node.getSize(),
				),
			);
		}, state);
	}
	return state;
}

function flowDesignerReducer(state, action) {
	let newState = reducer(state, action);
	newState = calculatePortsPosition(newState, action, state);
	return newState;
}

export default flowDesignerReducer;
