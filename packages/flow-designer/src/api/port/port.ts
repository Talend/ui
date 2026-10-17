import curry from 'lodash/curry';
import flow from 'lodash/flow';
import indexOf from 'lodash/indexOf';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import upperFirst from 'lodash/upperFirst';

import { throwInDev, throwTypeError } from '../throwInDev';
import { PortRecord } from '../../constants/flowdesigner.model';
import { PORT_SOURCE, PORT_SINK } from '../../constants/flowdesigner.constants';
import { isPositionElseThrow } from '../position/position';
import * as Data from '../data/data';
import {
	PortRecord as PortRecordType,
	Id,
	PositionRecord as PositionRecordType,
	PortDirection,
} from '../../customTypings/index.d';

const positionSelector = ['graphicalAttributes', 'position'];
const componentTypeSelector = ['graphicalAttributes', 'portType'];
const portTopologySelector = ['graphicalAttributes', 'properties', 'type'];
const indexSelector = ['graphicalAttributes', 'properties', 'index'];

/** in future properties should be removed from the react-flow-designer lib */
const FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'portType'];

/**
 * @desc represent a Port attached to Node
 * @typedef {Immutable.Record} PortRecord
 */

/**
 * Test if the first parameter is a PortRecord instance
 * @param {Portrecord} port
 * @returns {bool}
 * @throws
 */
export function isPort(port: PortRecordType) {
	if (port && port instanceof PortRecord) {
		return true;
	}
	return false;
}

/**
 * Test if the first parameter is a PortRecord, throw if not
 * @param {*} port
 * @returns {bool}
 * @throws
 */
export function isPortElseThrow(port: PortRecordType) {
	const test = isPort(port);
	if (!test) {
		throwTypeError('PortRecord', port);
	}
	return test;
}

/**
 * Check if the topology is one of the two accepted value
 * @param {*} topology
 * @return {bool}
 */
export function isTopologyElseThrow(topology: string) {
	if (topology === PORT_SOURCE || topology === PORT_SINK) {
		return true;
	}
	throwInDev(
		`Should be a topology 'OUTGOING' or 'INCOMING', was given ${topology && topology.toString()}`,
	);
	return false;
}

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getId(port: PortRecordType): Id {
	if (isPortElseThrow(port)) {
		return port.get('id');
	}
	return null as unknown as Id;
}

/**
 * @function
 * @param {string} id
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setId = curry((id: Id, port: PortRecordType) => {
	if (isString(id) && isPortElseThrow(port)) {
		return port.set('id', id);
	}
	throwInDev(`id should be a string, was given ${id && id.toString()}`);
	return port;
});

/**
 * @param {PortRecord} port
 * @return {string}
 */
export function getNodeId(port: PortRecordType): Id {
	if (isPortElseThrow(port)) {
		return port.get('nodeId');
	}
	return null as unknown as Id;
}

/**
 * @function
 * @param {string} nodeId
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setNodeId = curry((nodeId: Id, port: PortRecordType) => {
	if (isString(nodeId) && isPortElseThrow(port)) {
		return port.set('nodeId', nodeId);
	}
	throwInDev(`nodeId should be a string, was given ${nodeId && nodeId.toString()}`);
	return port;
});

/**
 * @param {PortRecord} port
 * @returns {PositionRecord}
 */
export function getPosition(port: PortRecordType): PositionRecordType {
	if (isPortElseThrow(port)) {
		return port.getIn(positionSelector) as PositionRecordType;
	}
	return null as unknown as PositionRecordType;
}

/**
 * @function
 * @param {PositionRecord} position
 * @param {PortRecord} port
 * @returns {Port}
 */
type CurriedSetPosition = {
	(position: PositionRecordType, port: PortRecordType): PortRecordType;
	(position: PositionRecordType): (port: PortRecordType) => PortRecordType;
};
export const setPosition: CurriedSetPosition = curry(
	(position: PositionRecordType, port: PortRecordType) => {
		if (isPortElseThrow(port) && isPositionElseThrow(position)) {
			return port.setIn(positionSelector, position);
		}
		return port;
	},
);

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getComponentType(port: PortRecordType): string {
	if (isPortElseThrow(port)) {
		return port.getIn(componentTypeSelector) as string;
	}
	return null as unknown as string;
}

/**
 * @function
 * @param {string} componentType
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setComponentType = curry((componentType: string, port: PortRecordType) => {
	if (isPortElseThrow(port) && isString(componentType)) {
		return port.setIn(componentTypeSelector, componentType);
	}
	throwInDev(
		`componentType should be a string, was given ${componentType && componentType.toString()}`,
	);
	return port;
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getTopology(port: PortRecordType): PortDirection {
	if (isPortElseThrow(port)) {
		return port.getIn(portTopologySelector) as PortDirection;
	}
	return null as unknown as PortDirection;
}

/**
 * @function
 * @param {string} topology
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setTopology = curry((topology: string, port: PortRecordType) => {
	if (isPortElseThrow(port) && isTopologyElseThrow(topology)) {
		return port.setIn(portTopologySelector, topology);
	}
	return port;
});

/**
 * Index is set per port type and per port,
 * so the renderer can order ports visually
 * @param {PortRecord} port
 * @returns {number}
 */
export function getIndex(port: PortRecordType): number {
	if (isPortElseThrow(port)) {
		return port.getIn(indexSelector) as number;
	}
	return null as unknown as number;
}

/**
 * @function
 * @param {number} index
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setIndex = curry((index: number, port: PortRecordType) => {
	if (isNumber(index) && isPortElseThrow(port)) {
		return port.setIn(indexSelector, index);
	}
	throwInDev(`index should be a number, was given ${index && index.toString()}`);
	return port;
});

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setData = curry((key: string, value: any, port: PortRecordType) => {
	if (isPortElseThrow(port)) {
		return port.set('data', Data.set(key, value, port.get('data')));
	}
	return port;
});

/**
 * @function
 * @param {string} key
 * @param {PortRecord} port
 * @returns {any | null}
 */
export const getData = curry((key: string, port: PortRecordType) => {
	if (isPortElseThrow(port)) {
		return Data.get(key, port.get('data'));
	}
	return null;
});

/**
 * @function
 * @param {string} key
 * @param {PortRecord} port
 * @returns {bool}
 */
export const hasData = curry((key: string, port: PortRecordType) => {
	if (isPortElseThrow(port)) {
		return Data.has(key, port.get('data'));
	}
	return false;
});

/**
 * @function
 * @param {string} key
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const deleteData = curry((key: string, port: PortRecordType) => {
	if (isPortElseThrow(port)) {
		return port.set('data', Data.deleteKey(key, port.get('data')));
	}
	return port;
});

/**
 * given a key check if that key is white listed
 * @param {string} key
 * @returns {bool}
 */
export function isWhiteListAttribute(key: string) {
	if (indexOf(FORBIDEN_GRAPHICAL_ATTRIBUTES, key) === -1) {
		return true;
	}
	throwInDev(
		`${key} is a protected value of the Port, please use get${upperFirst(key)} set${upperFirst(
			key,
		)} from this module to make change on those values`,
	);
	return false;
}

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setGraphicalAttribute = curry((key: string, value: any, port: PortRecordType) => {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return port.set('graphicalAttributes', Data.set(key, value, port.get('graphicalAttributes')));
	}
	return port;
});

/**
 * @function
 * @param {string} key
 * @param {PortRecord} port
 * @returns {any | null}
 */
export const getGraphicalAttribute = curry((key: string, port: PortRecordType) => {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return Data.get(key, port.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @function
 * @param {string} key
 * @param {PortRecord} port
 * @returns {bool}
 */
export const hasGraphicalAttribute = curry((key: string, port: PortRecordType) => {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return Data.has(key, port.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @function
 * @param {string} key
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const deleteGraphicalAttribute = curry((key: string, port: PortRecordType) => {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return port.set('graphicalAttributes', Data.deleteKey(key, port.get('graphicalAttributes')));
	}
	return port;
});

/**
 * minimal port creation factory, additionnals information can be set trought
 * the above set* functions
 * @function
 * @param {string} id
 * @param {string} nodeId
 * @param {number} index
 * @param {string} topology
 * @param {string} componentType
 * @returns {PortRecord}
 */
export const create = curry(
	(id: Id, nodeId: Id, index: number, topology: string, componentType: string) =>
		flow([
			setId(id),
			setNodeId(nodeId),
			setIndex(index),
			setTopology(topology),
			setComponentType(componentType),
		])(new PortRecord()),
);
