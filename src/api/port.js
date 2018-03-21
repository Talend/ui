import curry from 'lodash/curry';
import flow from 'lodash/flow';
import Immutable from 'immutable';
import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';
import { PORT_SOURCE, PORT_SINK } from '../constants/flowdesigner.constants';

const positionSelector = ['graphicalAttributes', 'position'];
const componentTypeSelector = ['graphicalAttributes', 'portType'];
const portTopologySelector = ['graphicalAttributes', 'properties', 'type'];
const indexSelector = ['graphicalAttributes', 'properties', 'index'];

export function isPositionRecord(position, doThrow = true) {
	if (position && position instanceof PositionRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a PositionRecord was given ${position.toString()}`);
	}
	return false;
}

/**
 * Test if the first parameter is a PortRecord
 * @param {*} port
 * @param {bool} doThrow - throw if not a port
 * @returns {bool}
 * @throws
 */
export function isPortRecord(port, doThrow = false) {
	if (port && port instanceof PortRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a PortRecord was given ${port.toString()}`);
	}
	return false;
}

/**
 * Test if the first parameter is a PortRecord, throw if not
 * @param {*} port
 * @returns {bool}
 * @throws
 */
export function isPortRecordElseThrow(port) {
	return isPortRecord(port, true);
}

/**
 * Check if the typology is one of the two accepted value
 * @param {*} typology
 * @param {bool} doThrow
 */
export function isTypology(typology, doThrow = false) {
	if (typology === PORT_SOURCE || typology === PORT_SINK) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a typology 'SOURCE' or 'SINK' was given ${typology.toString()}`);
	}
	return false;
}

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getId(port) {
	if (isPortRecordElseThrow(port)) {
		return port.get('id');
	}
	return false;
}

/**
 * @param {string}
 * @param {PortRecord}
 * @returns {PortRecord}
 */
const setId = curry((id, port) => {
	if (typeof id === 'string' && isPortRecord(port)) {
		return port.set('id', id);
	}
	throw new Error(`id should be a string was given ${id.toString()}`);
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getNodeId(port) {
	if (isPortRecord(port, true)) {
		return port.get('nodeId');
	}
	return false;
}

/**
 * @param {string} nodeId
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setNodeId = curry((nodeId, port) => {
	if (typeof nodeId === 'string' && isPortRecord(port, true)) {
		return port.set('nodeId', nodeId);
	}
	throw new Error(`nodeId should be a string was given ${nodeId.toString()}`);
});

/**
 * @param {PortRecord} port
 * @returns {PositionRecord}
 */
export function getPosition(port) {
	if (isPortRecord(port, true)) {
		return port.getIn(positionSelector);
	}
	return false;
}

/**
 * @param {PositionRecord} position
 * @param {PortRecord} port
 * @returns {Port}
 */
export const setPosition = curry((position, port) => {
	if (isPortRecord(port, true) && isPositionRecord(position, true)) {
		return port.setIn(positionSelector, position);
	}
	return false;
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getComponentType(port) {
	if (isPortRecord(port, true)) {
		return port.getIn(componentTypeSelector);
	}
	return false;
}

/**
 * @param {string} componentType
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setComponentType = curry((componentType, port) => {
	if (isPortRecord(port, true) && typeof componentType === 'string') {
		return port.setIn(componentTypeSelector, componentType);
	}
	throw new Error(`componentType should be a string was given ${componentType.toString()}`);
});

/**
 * @param {PortRecord} port
 * @returns {String}
 */
export function getTypology(port) {
	if (isPortRecord(port, true)) {
		return port.getIn(portTopologySelector);
	}
	return false;
}

/**
 * @param {string} typology
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setTypology = curry((typology, port) => {
	if (isPortRecord(port, true) && isTypology(typology)) {
		return port.setIn(portTopologySelector, typology);
	}
	return false;
});

/**
 * Index is set per port type and per node,
 * so the renderer can order ports visually
 * @param {PortRecord} port
 * @returns {number}
 */
export function getIndex(port) {
	if (isPortRecord(port, true)) {
		return port.getIn(indexSelector);
	}
	return false;
}

/**
 * @param {number} index
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setIndex = curry((index, port) => {
	if (typeof index === 'number' && isPortRecord(port, true)) {
		return port.setIn(indexSelector, index);
	}
	throw new Error(`index should be a number was given ${index.toString()}`);
});

/**
 * @param {PortRecord} port
 * @returns {Immutable.Map<String, *>}
 */
export function getData(port) {
	if (isPortRecord(port)) {
		return port.get('data');
	}
	return false;
}

/**
 * beware set data overwritte current data
 * @param {Immutable.Map<String, *>}
 * @param {PortRecord} port
 * @param {PortRecord}
 */
export const setData = curry((map, port) => {
	if (isPortRecord(port) && Immutable.Map.isMap(map)) {
		return port.set('data', map);
	}
	throw new Error(`data should be a Immutable.Map go ${map.toString()}`);
});

/**
 * minimal port creation factory, additionnals information can be set trought
 * the above set* functions
 * @param {string} id
 * @param {string} nodeId
 * @param {number} index
 * @param {string} typology
 * @returns {PortRecord}
 */
export const createPortRecord = curry((id, nodeId, index, typology) => {
	const create = flow([setId(id), setNodeId(nodeId), setIndex(index), setTypology(typology)]);
	return create(new PortRecord());
});
