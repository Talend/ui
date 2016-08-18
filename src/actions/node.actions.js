import invariant from 'invariant';

import {
    FLOWDESIGNER_NODE_MOVE,
    FLOWDESIGNER_NODE_ADD,
    FLOWDESIGNER_NODE_SET_ATTR,
    FLOWDESIGNER_NODE_REMOVE_ATTR,
    FLOWDESIGNER_NODE_SET_SIZE,
    FLOWDESIGNER_NODE_REMOVE,
} from '../constants/flowdesigner.constants';


/**
 * Ask for node creation and injection into current dataflow
 * @param {string} nodeId
 * @param {{x: number, y: number}} nodePosition
 * @param {{height: number, width: number}} nodeSize
 * @param {string} nodeType
 * @param {Object} attr
 * @return {Object}
 */
export const addNode = (nodeId, nodePosition, nodeSize, nodeType, attr) => (
    (dispatch, getState) => {
        const state = getState();
        if (state.flowDesigner.nodes.get(nodeId)) {
            invariant(false, `Can't not create node ${nodeId} since it does already exist`);
        }
        dispatch({
            type: FLOWDESIGNER_NODE_ADD,
            nodeId,
            nodePosition,
            nodeSize: nodeSize || state.flowDesigner.nodeTypes.getIn([nodeType, 'component']).size,
            nodeType,
            attr,
        });
    }
);

/**
 * Ask for moving node
 * @param {string} nodeId - identifier of the targeted node
 * @param {{x: number, y: number}} nodePosition - the new absolute position of the node
 * @return {Object}
 */
export const moveNodeTo = (nodeId, nodePosition) => (
    (dispatch, getState) => {
        const state = getState();
        if (!state.flowDesigner.nodes.get(nodeId)) {
            invariant(false, `Can't move node ${nodeId} since it doesn't exist`);
        }
        dispatch({
            type: FLOWDESIGNER_NODE_MOVE,
            nodeId,
            nodePosition,
        });
    }
);

/**
 * set node size
 * @param {string} nodeId
 * @param {{height: number, width: number}} nodeSize
 * @return {Object}
 */
export const setNodeSize = (nodeId, nodeSize) => (
    (dispatch, getState) => {
        const state = getState();
        if (!state.flowDesigner.nodes.get(nodeId)) {
            invariant(false, `Can't set size on node ${nodeId} since it doesn't exist`);
        }
        dispatch({
            type: FLOWDESIGNER_NODE_SET_SIZE,
            nodeId,
            nodeSize,
        });
    }
);

/**
 * Give the ability to set any data onto the node
 * @param {string} nodeId
 * @param {Object} attr
 */
export const setNodeAttribute = (nodeId, attr) => (
    (dispatch, getState) => {
        const state = getState();
        const node = state.flowDesigner.nodes.get(nodeId);
        if (!node) {
            invariant(false, `Can't set an attribute on non existing node ${nodeId}`);
        }
        dispatch({
            type: FLOWDESIGNER_NODE_SET_ATTR,
            nodeId,
            attr,
        });
    }
);

/**
 * Ask to remove an attribute on target node
 * @param {string} nodeId
 * @param {string} attrKey - the key of the attribute to be removed
 */
// TODO specific for TFD should be moved
export const removeNodeAttribute = (nodeId, attrKey) => (
    (dispatch, getState) => {
        const state = getState();
        const node = state.flowDesigner.nodes.get(nodeId);
        if (!node) {
            invariant(false, `Can't remove an attribute on non existing node ${nodeId}`);
        }
        dispatch({
            type: FLOWDESIGNER_NODE_REMOVE_ATTR,
            nodeId,
            attrKey,
        });
    }
);

/**
 * Ask for removal of target node and each ports/links attached to it
 * @param {string} nodeId
 */
export const removeNode = nodeId => (
    (dispatch, getState) => {
        const state = getState();
        if (!state.flowDesigner.nodes.get(nodeId)) {
            invariant(false, `Can not remove node ${nodeId} since it doesn't exist`);
        }
        dispatch({
            type: FLOWDESIGNER_NODE_REMOVE,
            nodeId,
        });
    }
);
