import curry from 'lodash/curry';
import flow from 'lodash/flow';
import isNumber from 'lodash/isNumber';

import { throwInDev, throwTypeError } from '../throwInDev';
import { PositionRecord } from '../../constants/flowdesigner.model';
import { PositionRecord as PositionRecordType } from '../../customTypings/index.d';

/**
 * @desc Represent a position comprised of X and Y coordinates
 * avoid reading directly, use the Size module api
 * Do not mutate it manually, use the Size module api
 * @example <caption>Create a Position</caption>
 * const position = Position.create(100, 200);
 * @example <caption>Read from Position</caption>
 * const x = Size.getXCoordinate(position);
 * @example <caption>transform a Position</caption>
 * const position = Size.setXCoordinate(100, position);
 * @typedef {Immutable.Record} PositionRecord
 */

/**
 * given a parameter check if it is a PositionRecord
 * @param {*} position
 * @return {bool}
 */
export function isPosition(position: PositionRecordType) {
	if (position && position instanceof PositionRecord) {
		return true;
	}
	return false;
}

/**
 * given a parameter check if it is a PositionRecord, if not throw in developpement
 * @param {*} position
 * @return {bool}
 */
export function isPositionElseThrow(position: PositionRecordType) {
	const test = isPosition(position);
	if (!test) {
		throwTypeError('PositionRecord', position, 'Position');
	}
	return test;
}

/**
 * given a PositionRecord return X coordinate
 * @param {PositionRecord} position
 * @return {number}
 */
export function getXCoordinate(position: PositionRecordType) {
	if (isPositionElseThrow(position)) {
		return position.get('x');
	}
	return null;
}

/**
 * given a number and a PositionRecord return updated PositionRecord
 * @function
 * @param {number} x
 * @param {PositionRecord} position
 * @return {PositionRecord}
 */
export const setXCoordinate = curry((x: number, position: PositionRecordType) => {
	if (isPositionElseThrow(position) && isNumber(x)) {
		return position.set('x', x);
	}
	throwInDev(`x should be a number, was given ${x && x.toString()} of type ${typeof x}`);
	return position;
});

/**
 * given a PositionRecord return the Y coordinate
 * @param {PositionRecord} position
 * @return {number}
 */
export function getYCoordinate(position: PositionRecordType) {
	if (isPositionElseThrow(position)) {
		return position.get('y');
	}
	return null;
}

/**
 * given a number and a PositionRecord return updated PositionRecord
 * @param {number} y
 * @param {PositionRecord} position
 * @return {PositionRecord}
 */
export const setYCoordinate = curry((y: number, position: PositionRecordType) => {
	if (isPositionElseThrow(position) && isNumber(y)) {
		return position.set('y', y);
	}
	throwInDev(`y should be a number, was given ${y && y.toString()} of type ${typeof y}`);
	return position;
});

/**
 * given x and y coordinate return a PositionRecord
 * @param {number} x
 * @param {number} y
 * @return {PositionRecord}
 */
export const create = curry((x: number, y: number) =>
	flow([setXCoordinate(x), setYCoordinate(y)])(new PositionRecord()),
);
