import { Map } from 'immutable';
import { zoomIdentity } from 'd3-zoom';
import {
	FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	FLOWDESIGNER_FLOW_RESET,
	FLOWDESIGNER_FLOW_LOAD,
	FLOWDESIGNER_FLOW_SET_ZOOM,
	FLOWDESIGNER_PAN_TO,
	FLOWDESIGNER_NODETYPE_SET,
} from '../constants/flowdesigner.constants';
import nodesReducer from './node.reducer';
import linksReducer from './link.reducer';
import portsReducer from './port.reducer';
import nodeTypeReducer from './nodeType.reducer';
import { State, NodeRecord, Id, LinkRecord, PortRecord } from '../customTypings/index.d';

export const defaultState: Partial<State> = Map({
	nodes: Map<Id, NodeRecord>(),
	links: Map<Id, LinkRecord>(),
	ports: Map<Id, PortRecord>(),
	out: Map<Id, Map<Id, Id>>(),
	in: Map<Id, Map<Id, Id>>(),
	childrens: Map<Id, Map<Id, Id>>(),
	parents: Map<Id, Map<Id, Id>>(),
	nodeTypes: Map<string, any>(),
	transform: { k: 1, x: 0, y: 0 },
	transformToApply: undefined,
});

function combinedReducer(state = defaultState, action: any) {
	return [nodesReducer, linksReducer, portsReducer, nodeTypeReducer].reduce(
		(cumulatedState, subReducer) => subReducer(cumulatedState, action),
		state,
	);
}

export function reducer(state: State, action: any) {
	switch (action.type) {
		case FLOWDESIGNER_FLOW_ADD_ELEMENTS:
			return action.listOfActionCreation.reduce(
				(cumulativeState: State, actionCreation: any) =>
					combinedReducer(cumulativeState, actionCreation),
				state,
			);
		case FLOWDESIGNER_FLOW_RESET:
			return defaultState.set('nodeTypes', state.get('nodeTypes'));
		case FLOWDESIGNER_FLOW_LOAD:
			return action.listOfActionCreation.reduce(
				(cumulativeState: State, actionCreation: any) =>
					combinedReducer(cumulativeState, actionCreation),
				defaultState.set('nodeTypes', state.get('nodeTypes')),
			);
		case FLOWDESIGNER_FLOW_SET_ZOOM:
			return state.set('transform', action.transform);
		case FLOWDESIGNER_PAN_TO:
			return state.update('transformToApply', () =>
				zoomIdentity
					.translate(state.get('transform').x, state.get('transform').y)
					.scale(state.get('transform').k)
					.scale(1 / state.get('transform').k)
					.translate(
						-(state.get('transform').x + action.x),
						-(state.get('transform').y + action.y),
					),
			);
		default:
			return combinedReducer(state, action);
	}
}

/**
 * Calculate port position with the methods provided by port parent node
 * calcul is done only if node moved or list of attached port have its size changed
 * also update position if registered nodetype change
 * because the node hold the function used to calculate position of their attached port
 * Beware could be slow if the calculus methode provided is slow
 * @params {object} state react-flow-designer state
 * @params {object} action
 *
 * @return {object} new state
 */
export function calculatePortsPosition(state: State, action: any) {
	let nodes = [];
	// TODO: NOT a big fan of this way to optimize port recalculations, don't feel future proof
	if (
		(/FLOWDESIGNER_NODE_/.exec(action.type) && action.type !== 'FLOWDESIGNER_NODE_REMOVE') ||
		(/FLOWDESIGNER_PORT_/.exec(action.type) && action.type !== 'FLOWDESIGNER_PORT_REMOVE') ||
		/FLOWDESIGNER.FLOW_/.exec(action.type) ||
		action.type === FLOWDESIGNER_NODETYPE_SET
	) {
		if (action.nodeId) {
			nodes.push(state.getIn(['nodes', action.nodeId]));
		} else if (action.portId) {
			nodes.push(state.getIn(['nodes'], state.getIn(['ports', action.portId]).nodeId));
		} else {
			nodes = state.get('nodes');
		}
		return nodes.reduce((cumulativeState: State, node: NodeRecord) => {
			const nodeType = node.getNodeType();
			const ports = state.get('ports').filter((port: PortRecord) => port.nodeId === node.id);
			const component = state.getIn(['nodeTypes', nodeType, 'component']);
			if (component) {
				const calculatePortPosition = component.calculatePortPosition;
				if (calculatePortPosition) {
					return cumulativeState.mergeIn(
						['ports'],
						calculatePortPosition(ports, node.getPosition(), node.getSize()),
					);
				}
			}
			return state;
		}, state);
	}
	return state;
}

function flowDesignerReducer(state: State, action: any) {
	let newState = reducer(state, action);
	newState = calculatePortsPosition(newState, action);
	return newState;
}

export default flowDesignerReducer;
