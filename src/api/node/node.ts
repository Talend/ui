/**
 * This module is public and deal with Graph's object Nodes
 */
import curry from 'lodash/curry';
import flow from 'lodash/flow';
import indexOf from 'lodash/indexOf';
import isString from 'lodash/isString';
import upperFirst from 'lodash/upperFirst';
import { List } from 'immutable';

import { throwInDev, throwTypeError } from '../throwInDev';
import { NodeRecord, NestedNodeRecord } from '../../constants/flowdesigner.model';
import { isPositionElseThrow } from '../position/position';
import { isSizeElseThrow } from '../size/size';
import * as Data from '../data/data';
import {
	NodeRecord as NodeRecordType,
	NestedNodeRecord as NestedNodeRecordType,
	PositionRecord,
	SizeRecord,
} from '../../customTypings/index.d';

const positionSelector = ['graphicalAttributes', 'position'];
const sizeSelector = ['graphicalAttributes', 'nodeSize'];
const componentTypeSelector = ['graphicalAttributes', 'nodeType'];
const componentsSelector = ['components'];

/** in future properties should be removed from the react-flow-designer lib */
const FORBIDEN_GRAPHICAL_ATTRIBUTES = ['position', 'nodeSize', 'nodeType'];

/**
 * @desc represent a Node on the flow diagram
 * @typedef {Immutable.Record} NodeRecord
 */

/**
 * Test if the first parameter is a NodeRecord instance
 * @param {NodeRecord} node
 * @returns {bool}
 * @throws
 */
export function isNode(node: NodeRecordType | NestedNodeRecordType) {
	if (node && (node instanceof NodeRecord || node instanceof NestedNodeRecord)) {
		return true;
	}
	return false;
}

/**
 * Test if the first parameter is a NodeRecord, throw if not
 * @param {*} node
 * @returns {bool}
 * @throws
 */
export function isNodeElseThrow(node: NodeRecordType | NestedNodeRecordType) {
	const test = isNode(node);
	if (!test) {
		throwTypeError('NodeRecord', node, 'Node');
	}
	return test;
}

/**
 * @param {NodeRecord} node
 * @returns {string}
 */
export function getId(node: NodeRecordType | NestedNodeRecordType) {
	if (isNodeElseThrow(node)) {
		return node.get('id');
	}
	return null;
}

/**
 * @function
 * @param {string} id
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setId = curry((id: string, node: NodeRecordType | NestedNodeRecordType) => {
	if (isString(id) && isNodeElseThrow(node)) {
		return node.set('id', id);
	}
	throwInDev(`nodeId should be a string, was given ${id && id.toString()}`);
	return node;
});

/**
 * @param {NodeRecord} node
 * @returns {PositionRecord}
 */
export function getPosition(node: NodeRecordType | NestedNodeRecordType) {
	if (isNodeElseThrow(node)) {
		return node.getIn(positionSelector);
	}
	return null;
}

/**
 * @function
 * @param {PositionRecord} position
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setPosition = curry((position: PositionRecord, node: NodeRecordType | NestedNodeRecordType) => {
	if (isPositionElseThrow(position) && isNodeElseThrow(node)) {
		return node.setIn(positionSelector, position);
	}
	return node;
});

/**
 * @param {NodeRecord} node
 * @returns {SizeRecord}
 */
export function getSize(node: NodeRecordType | NestedNodeRecordType) {
	if (isNodeElseThrow(node)) {
		return node.getIn(sizeSelector);
	}
	return null;
}

/**
 * @function
 * @param {SizeRecord} size
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setSize = curry((size: SizeRecord, node: NodeRecordType | NestedNodeRecordType) => {
	if (isSizeElseThrow(size) && isNodeElseThrow(node)) {
		return node.setIn(sizeSelector, size);
	}
	return node;
});

/**
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export function getComponentType(node: NodeRecordType | NestedNodeRecordType) {
	if (isNodeElseThrow(node)) {
		return node.getIn(componentTypeSelector);
	}
	return null;
}

/**
 * @function
 * @param {string} nodeType
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setComponentType = curry((nodeType: string, node: NodeRecordType | NestedNodeRecordType) => {
	if (isString(nodeType) && isNodeElseThrow(node)) {
		return node.setIn(componentTypeSelector, nodeType);
	}
	throwInDev(`nodeType should be a string, was given ${nodeType && nodeType.toString()}`);
	return node;
});

/**
 * @function
 * @param {List<NodeRecord>} components
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setComponents = curry((components: List<NodeRecordType>, node: NestedNodeRecordType) => {
	if (List.isList(components) && isNodeElseThrow(node)) {
		return node.setIn(componentsSelector, components);
	}
	throwInDev(
		`components should be a Immutable.List, was given ${components && components.toString()}`,
	);
	return node;
});

/**
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export function getComponents(node: NestedNodeRecordType) {
	if (isNodeElseThrow(node)) {
		return node.getIn(componentsSelector);
	}
	return null;
}

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setData = curry((key: string, value: any, node: NodeRecordType | NestedNodeRecordType) => {
	if (isNodeElseThrow(node)) {
		return node.set('data', Data.set(key, value, node.get('data')));
	}
	return node;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
export const getData = curry((key: string, node: NodeRecordType | NestedNodeRecordType) => {
	if (isNodeElseThrow(node)) {
		return Data.get(key, node.get('data'));
	}
	return null;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {bool}
 */
export const hasData = curry((key: string, node: NodeRecordType | NestedNodeRecordType) => {
	if (isNodeElseThrow(node)) {
		return Data.has(key, node.get('data'));
	}
	return false;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const deleteData = curry((key: string, node: NodeRecordType | NestedNodeRecordType) => {
	if (isNodeElseThrow(node)) {
		return node.set('data', Data.deleteKey(key, node.get('data')));
	}
	return node;
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
		`${key} is a protected value of the Node, please use get${upperFirst(key)} set${upperFirst(
			key,
		)} from this module to make change on those values`,
	);
	return false;
}

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setGraphicalAttribute = curry((key: string, value: any, node: NodeRecordType | NestedNodeRecordType) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return node.set(
			'graphicalAttributes',
			Data.set(key, value, node.get('graphicalAttributes')),
		);
	}
	return node;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
export const getGraphicalAttribute = curry((key: string, node: NodeRecordType | NestedNodeRecordType) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return Data.get(key, node.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {bool}
 */
export const hasGraphicalAttribute = curry((key: string, node: NodeRecordType | NestedNodeRecordType) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return Data.has(key, node.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const deleteGraphicalAttribute = curry((key: string, node: NodeRecordType | NestedNodeRecordType) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return node.set(
			'graphicalAttributes',
			Data.deleteKey(key, node.get('graphicalAttributes')),
		);
	}
	return node;
});

/**
 * Create a new Node
 * @function
 * @param {string} id
 * @param {PositionRecord} position
 * @param {SizeRecord} size
 * @param {string} componentType
 * @param {boolean} nested
 * @returns {NodeRecord}
 */
export const create = curry(
	(
		id: string,
		position: PositionRecord,
		size: SizeRecord,
		componentType: string,
		nested: boolean = false,
	) => {
		if (nested) {
			return flow([
				setId(id),
				setPosition(position),
				setSize(size),
				setComponentType(componentType),
				setComponents(List()),
			])(new NestedNodeRecord());
		}

		return flow([
			setId(id),
			setPosition(position),
			setSize(size),
			setComponentType(componentType),
		])(new NodeRecord());
	},
);
