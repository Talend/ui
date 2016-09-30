import { Map, OrderedMap } from 'immutable';
import invariant from 'invariant';
import {
	FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	FLOWDESIGNER_FLOW_RESET,
	FLOWDESIGNER_FLOW_LOAD,
	FLOWDESIGNER_FLOW_SET_ZOOM,
} from '../constants/flowdesigner.constants';
import nodesReducer from './node.reducer';
import linksReducer from './link.reducer';
import portsReducer from './port.reducer';
import nodeTypeReducer from './nodeType.reducer';
import { getDetachedPorts } from '../selectors/portSelectors';
import { getDetachedLinks } from '../selectors/linkSelectors';

const defaultState = new Map({
	nodes: new Map(),
	links: new Map(),
	ports: new OrderedMap(),
	nodeTypes: new Map(),
	transform: { k: 1, x: 0, y: 0 },
});

const combinedReducer = (state = defaultState, action) => (
	[nodesReducer, linksReducer, portsReducer, nodeTypeReducer].reduce(
		(cumulatedState, reducer) => reducer(cumulatedState, action),
		state
	)
);

export const reducer = (state, action) => {
	switch (action.type) {
	case FLOWDESIGNER_FLOW_ADD_ELEMENTS:
		try {
			return action.listOfActionCreation.reduce(
				(cumulativeState, actionCreation) => combinedReducer(cumulativeState, actionCreation),
				state
			);
		} catch (error) {
			invariant(
				true,
				`Something happenned preventing FLOWDESIGNER_FLOW_ADD_ELEMENTS to be applied :${error}`
			);
			return state;
		}
	case FLOWDESIGNER_FLOW_RESET:
		return defaultState.set('nodeTypes', state.get('nodeTypes'));
	case FLOWDESIGNER_FLOW_LOAD:
		try {
			return action.listOfActionCreation.reduce(
				(cumulativeState, actionCreation) => combinedReducer(cumulativeState, actionCreation),
				defaultState.set('nodeTypes', state.get('nodeTypes'))
			);
		} catch (error) {
			invariant(
				true,
				`Something happenned preventing FLOWDESIGNER_FLOW_LOAD to be applied :${error}`
			);
			return state;
		}
	case FLOWDESIGNER_FLOW_SET_ZOOM:
		return state.set('transform', action.transform);
	default:
		return combinedReducer(state, action);
	}
};

/**
 * Calculate port position with the methods provided by port parent node
 * calcul is done only if node moved or list of attached port have its size changed
 * Beware could be slow if the calculus methode provided is slow
 * @params {object} state react-flow-designer state
 * @params {object} oldState react-flow-designer precedentState
 *
 * @return {object} new state
 */
export const calculatePortsPosition = (state, action) => {
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
			const ports = state.get('ports').filter(port => port.nodeId === node.id);
			const calculatePortPosition = state.getIn(['nodeTypes', node.nodeType, 'component'])
				.calculatePortPosition;
			return cumulativeState.mergeIn(
				['ports'],
				calculatePortPosition(ports, node.position, node.nodeSize)
			);
		}, state);
	}
	return state;
};

/**
 * if any port parent node does not exist, the port will be destroyed
 *
 * @params {object} state react-flow-designer state
 *
 * @return {object} new state
 */
const destroyDetachedPorts = (state) => {
	const detachedPorts = getDetachedPorts(state);
	let newState = state;
	detachedPorts.forEach(port => {
		newState = reducer(newState, {
			type: 'FLOWDESIGNER_PORT_REMOVE',
			portId: port.id,
		});
	});
	return newState;
};

/**
 * if any link is not attached to two ports, it will be destroyed
 *
 * @params {object} state react-flow-designer state
 *
* @return {object} new state
 */
const destroyDetachedLinks = (state) => {
	const detachedLinks = getDetachedLinks(state);
	let newState = state;
	detachedLinks.forEach(link => {
		newState = reducer(newState, {
			type: 'FLOWDESIGNER_LINK_REMOVE',
			linkId: link.id,
		});
	});
	return newState;
};

const flowDesignerReducer = (state, action) => {
	let newState = reducer(state, action);
	if (action.type !== 'FLOWDESIGNER_NODE_MOVE') {
		newState = destroyDetachedPorts(newState, action, state);
		newState = destroyDetachedLinks(newState, action, state);
	}
	newState = calculatePortsPosition(newState, action, state);
	return newState;
};

export default flowDesignerReducer;
