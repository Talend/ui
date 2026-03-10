/**
 * This module is private and deal with updating a graph object
 */
import curry from 'lodash/curry';
import isString from 'lodash/isString';

import { throwInDev, throwTypeError } from '../throwInDev';

/**
 * return true if the parameter is a plain object, throw otherwise
 * @private
 * @param {any} map - the value to be checked as plain object
 * @return {bool}
 */
export function isMapElseThrow(map: Record<string, any>) {
	const test = typeof map === 'object' && map !== null && !Array.isArray(map);
	if (!test) {
		throwTypeError('plain object', map, 'map');
	}
	return test;
}

/**
 * return true if the parameter key is a String throw otherwise
 * @private
 * @param {any} key - the value to be checked as String
 * @return {bool}
 */
export function isKeyElseThrow(key: string | number) {
	const test = isString(key);
	if (!test) {
		throwInDev(`key should be a string, was given ${key && key.toString()} of type ${typeof key}`);
	}
	return test;
}

/**
 * given a key and a value, add those to a map
 * @function
 * @param {string} key
 * @param {any} value
 * @param {Record<string, any>} map
 * @returns {Record<string, any>}
 */
export const set = curry((key: any, value: any, map: Record<string, any>) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return { ...map, [key]: value };
	}
	return map;
});

/**
 * given a key and a map return the value associated if exist
 * @function
 * @param {string} key
 * @param {Record<string, any>} map
 * @returns {any | null}
 */
export const get = curry((key: any, map: Record<string, any>) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map[key];
	}
	return null;
});

/**
 * Given a key and a map check if this key exist on the map
 * @function
 * @param {string} key
 * @param {Record<string, any>} map
 * @return {bool}
 */
export const has = curry((key: any, map: Record<string, any>) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return Object.prototype.hasOwnProperty.call(map, key);
	}
	return false;
});

/**
 * remove given key and its value from the map
 * @function
 * @param {string} key
 * @param {Record<string, any>} map
 * @returns {Record<string, any>}
 */
export const deleteKey = curry((key: any, map: Record<string, any>) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		const result = { ...map };
		delete result[key];
		return result;
	}
	return map;
});
