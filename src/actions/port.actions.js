import invariant from 'invariant';

import {
  FLOWDESIGNER_PORT_ADD,
  FLOWDESIGNER_PORT_ADDS,
  FLOWDESIGNER_PORT_SET_ATTR,
  FLOWDESIGNER_PORT_REMOVE_ATTR,
  FLOWDESIGNER_PORT_REMOVE,
} from '../constants/flowdesigner.constants';
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
            dispatch({
                type: FLOWDESIGNER_PORT_ADD,
                nodeId,
                portId,
                portType,
                attr,
            });
        }
    }
);

export const addPorts = (nodeId, ports) => (
    (dispatch, getState) => {
        const state = getState();
        const node = state.flowDesigner.nodes.get(nodeId);
        if (!node) {
            invariant(false, `Can't set a new ports on non existing node ${nodeId}`);
        } else {
            dispatch({
                type: FLOWDESIGNER_PORT_ADDS,
                nodeId,
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
export const setPortAttribute = (portId, attr) => (
    (dispatch, getState) => {
        const state = getState();
        let error = false;
        if (!state.flowDesigner.ports.get(portId)) {
            error = true;
            invariant(false, `Can't set an attribute on non existing port ${portId}`);
        }
        if (!error) {
            dispatch({
                type: FLOWDESIGNER_PORT_SET_ATTR,
                portId,
                attr,
            });
        }
    }
);

/**
 * Ask to remove an attribute on target port
 * @param {string} portId
 * @param {string} attrKey - the key of the attribute to be removed
 */
export const removePortAttribute = (portId, attrKey) => (
    (dispatch, getState) => {
        const state = getState();
        let error = false;
        if (!state.flowDesigner.ports.get(portId)) {
            error = true;
            invariant(
                false,
                `Can't remove an attribute on non existing port ${portId}`);
        }
        if (!error) {
            dispatch({
                type: FLOWDESIGNER_PORT_REMOVE_ATTR,
                portId,
                attrKey,
            });
        }
    }
);

/**
 * return an action to remove port and all attached links
 * @param {string} portId
 */
export const removePort = portId => (
    (dispatch, getState) => {
        const state = getState();
        let error = false;
        if (!state.flowDesigner.ports.get(portId)) {
            error = true;
            invariant(false, `Can not remove port ${portId} since it doesn't exist`);
        }
        if (!error) {
            dispatch({
                type: FLOWDESIGNER_PORT_REMOVE,
                portId,
            });
        }
    }
);
