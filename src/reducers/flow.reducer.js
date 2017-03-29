/* @flow */
import { Map } from 'immutable';
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

import type { FlowState, FlowAction, NodeRecordType } from '../flow-typed';

export const defaultState: FlowState = new Map({
	nodes: new Map(),
	nodesPosition: new Map(),
	links: new Map(),
	ports: new Map(),
	out: new Map(),
	in: new Map(),
	childrens: new Map(),
	parents: new Map(),
	nodeTypes: new Map(),
	transform: new Map({ k: 1, x: 0, y: 0 }),
	transformToApply: undefined,
});

function combinedReducer(state: FlowState = defaultState, action: FlowAction) {
	return [nodesReducer, linksReducer, portsReducer, nodeTypeReducer]
	.reduce(
		(cumulatedState, subReducer) => subReducer(cumulatedState, action),
		state,
	);
}

export function reducer(state: FlowState, action: FlowAction) {
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
	case FLOWDESIGNER_PAN_TO: {
		const localAction = action;
		return state.update('transformToApply', () => (
			zoomIdentity
				.translate(state.get('transform').x, state.get('transform').y)
				.scale(state.get('transform').k)
				.scale(1 / state.get('transform').k).translate(
					-((state.get('transform').x + localAction.x)),
					-((state.get('transform').y + localAction.y)),
				)
		));
	}
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
export function calculatePortsPosition(state: FlowState, action: FlowAction) {
	let nodes: Array<NodeRecordType> = [];
	// TODO: NOT a big fan of this way to optimize port recalculations, don't feel future proof
	if ((/FLOWDESIGNER_NODE_/.exec(action.type) && action.type !== 'FLOWDESIGNER_NODE_REMOVE') ||
		(/FLOWDESIGNER_PORT_/.exec(action.type) && action.type !== 'FLOWDESIGNER_PORT_REMOVE') ||
		(/FLOWDESIGNER.FLOW_/.exec(action.type))) {
		if (action.nodeId) {
			const node = state.getIn(['nodes', action.nodeId]);
			if (node) {
				nodes.push(node);
			}
		} else if (action.portId) {
			const localAction = action;
			const port = state.getIn(['ports', localAction.portId]);
			if (port) {
				nodes.push(state.getIn(['nodes'], port.gettruc()));
			}
		} else {
			nodes = state.get('nodes');
		}
		return nodes.reduce((cumulativeState, node) => {
			const nodeType = node.getNodeType();
			const ports = state.get('ports').filter(port => port.nodeId === node.id);
			const component = state.getIn(['nodeTypes', nodeType, 'component']);
			if (component) {
				const calculatePortPosition = component.calculatePortPosition;
				if (calculatePortPosition) {
					return cumulativeState.mergeIn(
						['ports'],
						calculatePortPosition(
							ports,
							node.getPosition(),
							node.getSize(),
						),
					);
				}
			}
			return state;
		}, state);
	}
	return state;
}

function flowDesignerReducer(state: FlowState, action: FlowAction) {
	let newState = reducer(state, action);
	newState = calculatePortsPosition(newState, action, state);
	return newState;
}

export default flowDesignerReducer;
