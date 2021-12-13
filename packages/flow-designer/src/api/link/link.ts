/**
 * This module is public and deal with Graph's object Links
 */

import curry from 'lodash/curry';
import flow from 'lodash/flow';
import indexOf from 'lodash/indexOf';
import isString from 'lodash/isString';
import upperFirst from 'lodash/upperFirst';

import { throwInDev, throwTypeError } from '../throwInDev';
import { LinkRecord } from '../../constants/flowdesigner.model';
import * as Data from '../data/data';
import { LinkRecord as LinkRecordType, Id } from '../../customTypings/index.d';

const linkTypeSelector = ['graphicalAttributes', 'linkType'];

/** in future properties should be removed from the react-flow-designer lib */
const FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'linkType'];

/**
 * @desc represent a link between Port of the flow diagram
 * @typedef {Immutable.Record} LinkRecord
 */

/**
 * Test if the first parameter is a LinkRecord instance
 * @param {LinkRecord} link
 * @return {bool}
 * @throws
 */
export function isLink(link: LinkRecordType) {
	if (link && link instanceof LinkRecord) {
		return true;
	}
	return false;
}

/**
 * Test if the first parameter is a LinkRecord, throw if not
 * @param {*} link
 * @return {bool}
 * @throws
 */
export function isLinkElseThrow(link: LinkRecordType) {
	const test = isLink(link);
	if (!test) {
		throwTypeError('Linkrecord', link, 'Link');
	}
	return test;
}

/**

 * @param {LinkRecord} link
 * @return {string}
 */
export function getId(link: LinkRecordType) {
	if (isLinkElseThrow(link)) {
		return link.get('id');
	}
	return null;
}

/**
 * @function
 * @param {string} id
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setId = curry((id: Id, link: LinkRecordType) => {
	if (isString(id) && isLinkElseThrow(link)) {
		return link.set('id', id);
	}
	throwInDev(`id should be a string, was given ${id && id.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
export function getSourceId(link: LinkRecordType) {
	if (isLinkElseThrow(link)) {
		return link.get('sourceId');
	}
	return null;
}

/**
 * @function
 * @param {string} sourceId
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setSourceId = curry((sourceId: Id, link: LinkRecordType) => {
	if (isString(sourceId) && isLinkElseThrow(link)) {
		return link.set('sourceId', sourceId);
	}
	throwInDev(`id should be a string, was given ${sourceId && sourceId.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
export function getTargetId(link: LinkRecordType) {
	if (isLinkElseThrow(link)) {
		return link.get('targetId');
	}
	return null;
}

/**
 * @function
 * @param {string} targetId
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setTargetId = curry((targetId: Id, link: LinkRecordType) => {
	if (isString(targetId) && isLinkElseThrow(link)) {
		return link.set('targetId', targetId);
	}
	throwInDev(`id should be a string, was given ${targetId && targetId.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
export function getComponentType(link: LinkRecordType) {
	if (isLinkElseThrow(link)) {
		return link.getIn(linkTypeSelector);
	}
	return null;
}

/**
 * @function
 * @param {string} linkType
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setComponentType = curry((linkType: string, link: LinkRecordType) => {
	if (isString(linkType) && isLinkElseThrow(link)) {
		return link.setIn(linkTypeSelector, linkType);
	}
	throwInDev(`linkType should be a string, was given ${linkType && linkType.toString()}`);
	return link;
});

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setData = curry((key: string, value: any, link: LinkRecordType) => {
	if (isLinkElseThrow(link)) {
		return link.set('data', Data.set(key, value, link.get('data')));
	}
	return link;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {any | null}
 */
export const getData = curry((key: string, link: LinkRecordType) => {
	if (isLinkElseThrow(link)) {
		return Data.get(key, link.get('data'));
	}
	return null;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {bool}
 */
export const hasData = curry((key: string, link: LinkRecordType) => {
	if (isLinkElseThrow(link)) {
		return Data.has(key, link.get('data'));
	}
	return false;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {NodeRecord}
 */
export const deleteData = curry((key: string, link: LinkRecordType) => {
	if (isLinkElseThrow(link)) {
		return link.set('data', Data.deleteKey(key, link.get('data')));
	}
	return link;
});

/**
 * given a key check if that key is white listed
 * @param {string} key
 * @return {bool}
 */
function isWhiteListAttribute(key: string) {
	if (indexOf(FORBIDEN_GRAPHICAL_ATTRIBUTES, key) === -1) {
		return true;
	}
	throwInDev(
		`${key} is a protected value of the Link, please use get${upperFirst(key)} set${upperFirst(
			key,
		)} from this module to make change on those values`,
	);
	return false;
}

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setGraphicalAttribute = curry((key: string, value: any, link: LinkRecordType) => {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return link.set(
			'graphicalAttributes',
			Data.set(key, value, link.get('graphicalAttributes')),
		);
	}
	return link;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {any | null}
 */
export const getGraphicalAttribute = curry((key: string, link: LinkRecordType) => {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return Data.get(key, link.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {bool}
 */
export const hasGraphicalAttribute = curry((key: string, link: LinkRecordType) => {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return Data.has(key, link.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} node
 * @return {LinkRecord}
 */
export const deleteGraphicalAttribute = curry((key: string, link: LinkRecordType) => {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return link.set(
			'graphicalAttributes',
			Data.deleteKey(key, link.get('graphicalAttributes')),
		);
	}
	return link;
});

/**
 * minimal link creation factory, additionnals information can be set trought
 * the above set* functions
 * @function
 * @param {string} id
 * @param {string} sourceId
 * @param {string} targetId
 * @param {string} componenttype
 * @return {LinkRecord}
 */
export const create = curry((id: Id, sourceId: Id, targetId: Id, componentType: string) =>
	flow([
		setId(id),
		setSourceId(sourceId),
		setTargetId(targetId),
		setComponentType(componentType),
	])(new LinkRecord()),
);
