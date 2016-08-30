import { combineReducers } from 'redux';
import { Map } from 'immutable';
import invariant from 'invariant';

import nodesReducer from './node.reducer';
import linksReducer from './link.reducer';
import portsReducer from './port.reducer';
import nodeTypeReducer from './nodeType.reducer';
import { getDetachedPorts } from '../selectors/portSelectors';
import { getDetachedLinks } from '../selectors/linkSelectors';

const combinedReducer = combineReducers({
    nodes: nodesReducer,
    links: linksReducer,
    ports: portsReducer,
    nodeTypes: nodeTypeReducer,
});


/**
 * Calculate port position with the methods provided by port parent node
 * calcul is done only if node moved or list of attached port have its size changed
 * Beware could be slow if the calculus methode provided is slow
 * @params {object} state react-flow-designer state
 * @params {object} oldState react-flow-designer precedentState
 *
 * @return {object} new state
 */
const calculatePortsPosition = (state, action, oldState) => {
    let node;
    // TODO: NOT a big fan of this way to optimize port recalculations, don't feel future proof
    if ((/FLOWDESIGNER_NODE_/.exec(action.type) && action.type !== 'FLOWDESIGNER_NODE_REMOVE') ||
    (/FLOWDESIGNER_PORT_/.exec(action.type) && action.type !== 'FLOWDESIGNER_PORT_REMOVE')) {
        if (action.nodeId) {
            node = state.nodes.get(action.nodeId);
        } else if (action.portId) {
            node = state.nodes.get(state.ports.get(action.portId).nodeId);
        } else {
            invariant(false, `can't process calculatePortsPosition on ${action.type}`);
        }
    }
    let newPortsPosition = new Map();
    if (node) {
        const ports = state.ports.filter(port => port.nodeId === node.id);
        const calculatePortPosition = state.nodeTypes
            .getIn([node.nodeType, 'component'])
            .calculatePortPosition;
        newPortsPosition = newPortsPosition
            .merge(calculatePortPosition(ports, node.position, node.nodeSize));
    }
    const newState = { ...state, ports: state.ports.merge(newPortsPosition) };
    return newState;
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
        newState = combinedReducer(newState, {
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
        newState = combinedReducer(newState, {
            type: 'FLOWDESIGNER_LINK_REMOVE',
            linkId: link.id,
        });
    });
    return newState;
};

const enhancedReducer = (state, action) => {
    let newState = combinedReducer(state, action);
    if (action.type !== 'FLOWDESIGNER_NODE_MOVE') {
        newState = destroyDetachedPorts(newState, action, state);
        newState = destroyDetachedLinks(newState, action, state);
    }
    newState = calculatePortsPosition(newState, action, state);
    return newState;
};

export default enhancedReducer;
