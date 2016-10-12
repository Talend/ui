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
 * @param {Object} attributes
 */
export const addPort = (nodeId, portId, portType, attributes) => ({
	type: FLOWDESIGNER_PORT_ADD,
	nodeId,
	portId,
	portType,
	attributes,
});

export const addPorts = (nodeId, ports) => ({
	type: FLOWDESIGNER_PORT_ADDS,
	nodeId,
	ports,
});

/**
 * return an action to set port attributes
 * @param {string} portId
 * @param {Object} attributes
 */
export const setPortAttribute = (portId, attributes) => ({
	type: FLOWDESIGNER_PORT_SET_ATTR,
	portId,
	attributes,
});

/**
 * Ask to remove an attribute on target port
 * @param {string} portId
 * @param {string} attributesKey - the key of the attribute to be removed
 */
export const removePortAttribute = (portId, attributesKey) => ({
	type: FLOWDESIGNER_PORT_REMOVE_ATTR,
	portId,
	attributesKey,
});

/**
 * return an action to remove port and all attached links
 * @param {string} portId
 */
export const removePort = portId => ({
	type: FLOWDESIGNER_PORT_REMOVE,
	portId,
});
