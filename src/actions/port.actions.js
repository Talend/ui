import { Map } from 'immutable';
import invariant from 'invariant';
import {
  FLOWDESIGNER_PORT_ADD,
  FLOWDESIGNER_PORT_SET_ATTR,
  FLOWDESIGNER_PORT_REMOVE,
  FLOWDESIGNER_PORT_MERGE,
  FLOWDESIGNER_PORT_REMOVE_FROM_NODE,
} from '../constants/flowdesigner.constants';

import { getPortsForNode } from '../selectors/portSelectors';
import { PortRecord } from '../constants/flowdesigner.model';

/**
 * return an action to create a new port
 * @param {string} nodeId - identifier of the node to wich the created connector should be attached
 * @param {string} portId
 * @param {string} portType
 * @param {Object} attr
 */
export const addPort = (nodeId, portId, portType, attr) => (
    (dispatch, getState) => {
        const state = getState();
        const node = state.flowDesigner.nodes.get(nodeId);
        if (!node) {
            invariant(false, `Can't set a new port ${portId} on non existing node ${nodeId}`);
        } else {
            const calculatePortPosition = state.flowDesigner.nodeTypes.getIn([node.nodeType, 'component']).calculatePortPosition;
            let ports = getPortsForNode(state)(node.id);
            ports = ports.set(portId, new PortRecord({
                id: portId,
                nodeId,
                portType,
                attr: new Map(attr),
            }));
            ports = calculatePortPosition(ports, node.position, node.nodeSize);
            dispatch({
                type: FLOWDESIGNER_PORT_MERGE,
                ports,
            });
        }
    }
);

/**
 * return an action to set port attributes
 * @param {string} portId
 * @param {Object} attr
 */
export const setPortAttribute = (portId, attr) => {
    return {
        type: FLOWDESIGNER_PORT_SET_ATTR,
        portId,
        attr,
    };
};

/**
 * return an action to remove port and all attached links
 * @param {string} portId
 */
export const removePort = portId => ({
    type: FLOWDESIGNER_PORT_REMOVE,
    portId,
});


export const removePortsFromNode = nodeId => ({
    type: FLOWDESIGNER_PORT_REMOVE_FROM_NODE,
});
