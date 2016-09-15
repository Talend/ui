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
export const addPort = (nodeId, portId, portType, attr) => ({
	type: FLOWDESIGNER_PORT_ADD,
	nodeId,
	portId,
	portType,
	attr,
});

export const addPorts = (nodeId, ports) => ({
	type: FLOWDESIGNER_PORT_ADDS,
	nodeId,
	ports,
});

/**
 * return an action to set port attributes
 * @param {string} portId
 * @param {Object} attr
 */
export const setPortAttribute = (portId, attr) => ({
	type: FLOWDESIGNER_PORT_SET_ATTR,
	portId,
	attr,
});

/**
 * Ask to remove an attribute on target port
 * @param {string} portId
 * @param {string} attrKey - the key of the attribute to be removed
 */
export const removePortAttribute = (portId, attrKey) => ({
	type: FLOWDESIGNER_PORT_REMOVE_ATTR,
	portId,
	attrKey,
});

/**
 * return an action to remove port and all attached links
 * @param {string} portId
 */
export const removePort = portId => ({
	type: FLOWDESIGNER_PORT_REMOVE,
	portId,
});
