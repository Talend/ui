/**
 * This module is private and deal with updating a graph object internal Immutable.Map
 */
import curry from 'lodash/curry';
import isString from 'lodash/isString';
import { Map } from 'immutable';

import { throwInDev, throwTypeError } from '../throwInDev';

/**
 * return true if the parameter is an Immutable.Map throw otherwise
 * @private
 * @param {any} map - the value to be checkd as Immutable.Map
 * @return {bool}
 */
export function isMapElseThrow(map: Map<any, any>) {
	const test = Map.isMap(map);
	if (!test) {
		throwTypeError('Immutable.Map', map, 'map');
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
		throwInDev(
			`key should be a string, was given ${key && key.toString()} of type ${typeof key}`,
		);
	}
	return test;
}

/**
 * given a key and a value, add those to a map
 * @function
 * @param {string} key
 * @param {any} value
 * @param {Immutable.Map} map
 * @returns {Immutable.Map}
 */
export const set = curry((key: any, value: any, map: Map<any, any>) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.set(key, value);
	}
	return map;
});

/**
 * given a key and a map return the value associated if exist
 * @function
 * @param {string} key
 * @param {Immutable.Map} map
 * @returns {any | null}
 */
export const get = curry((key: any, map: Map<any, any>) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.get(key);
	}
	return null;
});

/**
 * Given a key and a map check if this key exist on the map
 * @function
 * @param {string} key
 * @param {Immutable.Map} map
 * @return {bool}
 */
export const has = curry((key: any, map: Map<any, any>) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.has(key);
	}
	return false;
});

/**
 * remove given key and its value from the map
 * @function
 * @param {string} key
 * @param {Immutable.Map} map
 * @returns {Immutable.Map}
 */
export const deleteKey = curry((key: any, map: Map<any, any>) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.delete(key);
	}
	return map;
});
