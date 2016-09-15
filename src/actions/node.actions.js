import {
	FLOWDESIGNER_NODE_MOVE,
	FLOWDESIGNER_NODE_MOVE_END,
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
export const addNode = (nodeId, nodePosition, nodeSize, nodeType, attr) => ({
	type: FLOWDESIGNER_NODE_ADD,
	nodeId,
	nodePosition,
	nodeSize,
	nodeType,
	attr,
});

/**
 * Ask for moving node
 * @param {string} nodeId - identifier of the targeted node
 * @param {{x: number, y: number}} nodePosition - the new absolute position of the node
 * @return {Object}
 */
export const moveNodeTo = (nodeId, nodePosition) => ({
	type: FLOWDESIGNER_NODE_MOVE,
	nodeId,
	nodePosition,
});

/**
 * When node movement is done
 * @param {string} nodeId - identifier of the targeted node
 * @param {{x: number, y: number}} nodePosition - the new absolute position of the node
 * @return {Object}
 */
export const moveNodeToEnd = (nodeId, nodePosition) => ({
	type: FLOWDESIGNER_NODE_MOVE_END,
	nodeId,
	nodePosition,
});

/**
 * set node size
 * @param {string} nodeId
 * @param {{height: number, width: number}} nodeSize
 * @return {Object}
 */
export const setNodeSize = (nodeId, nodeSize) => ({
	type: FLOWDESIGNER_NODE_SET_SIZE,
	nodeId,
	nodeSize,
});

/**
 * Give the ability to set any data onto the node
 * @param {string} nodeId
 * @param {Object} attr
 */
export const setNodeAttribute = (nodeId, attr) => ({
	type: FLOWDESIGNER_NODE_SET_ATTR,
	nodeId,
	attr,
});

/**
 * Ask to remove an attribute on target node
 * @param {string} nodeId
 * @param {string} attrKey - the key of the attribute to be removed
 */
export const removeNodeAttribute = (nodeId, attrKey) => ({
	type: FLOWDESIGNER_NODE_REMOVE_ATTR,
	nodeId,
	attrKey,
});

/**
 * Ask for removal of target node and each ports/links attached to it
 * @param {string} nodeId
 */
export const removeNode = nodeId => ({
	type: FLOWDESIGNER_NODE_REMOVE,
	nodeId,
});
