import curry from 'lodash/curry';
import flow from 'lodash/flow';

import { throwInDev, throwTypeError } from '../throwInDev';
import { SizeRecord } from '../../constants/flowdesigner.model';
import { SizeRecord as SizeRecordType } from '../../customTypings/index.d';

/**
 * @desc Represent a size comprised of width and height
 * avoid reading directly, use the Size module api
 * Do not mutate it manually, use the Size module api
 * @example <caption>Create a Size</caption>
 * const size = Size.create(100, 200);
 * @example <caption>Read from Size</caption>
 * const width = Size.getWidth(size);
 * @example <caption>transform a Size</caption>
 * const size = Size.setWidth(100, size);
 * @typedef {Immutable.Record} SizeRecord
 */

/**
 * check if parameter is SizeRecord
 * @param {*} size
 * @return {bool}
 */
export function isSize(size: SizeRecordType) {
	if (size && size instanceof SizeRecord) {
		return true;
	}
	return false;
}

/**
 * check if parameter is SizeRecord else throw in dev mode
 * @param {*} size
 * @return {bool}
 */
export function isSizeElseThrow(size: SizeRecordType) {
	const test = isSize(size);
	if (!test) {
		throwTypeError('SizeRecord', size, 'Size');
	}
	return test;
}

/**
 * return width of SizeRecord
 * @param {SizeRecord} size
 * @return {number}
 */
export function getWidth(size: SizeRecordType) {
	if (isSizeElseThrow(size)) {
		return size.get('width');
	}
	return null;
}

/**
 * set width of given SizeRecord
 * @function
 * @param {number} width
 * @param {SizeRecord} size
 * @return {SizeRecord}
 */
export const setWidth = curry((width: number, size: SizeRecordType) => {
	if (isSizeElseThrow(size) && typeof width === 'number') {
		return size.set('width', width);
	}
	throwInDev(`width should be a number, was given ${width.toString()}  of type ${typeof width}`);
	return size;
});

/**
 * return height of the SizeRecord
 * @param {SizeRecord} size
 * @return {number}
 */
export function getHeight(size: SizeRecordType) {
	if (isSizeElseThrow(size)) {
		return size.get('height');
	}
	return null;
}

/**
 * set height of given SizeRecord
 * @function
 * @param {number} height
 * @param {SizeRecord} size
 * @returns {SizeRecord}
 */
export const setHeight = curry((height: number, size: SizeRecordType) => {
	if (isSizeElseThrow(size) && typeof height === 'number') {
		return size.set('height', height);
	}
	throwInDev(
		`height should be a number, was given ${height.toString()}  of type ${typeof height}`,
	);
	return size;
});

/**
 * given width and height create a SizeRecord
 * @function
 * @param {number} width
 * @param {number} height
 * @return {SizeRecord}
 */
export const create = curry((width: number, height: number) =>
	flow([setWidth(width), setHeight(height)])(new SizeRecord()),
);
