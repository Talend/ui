import Immutable from 'immutable';

import * as Data from './data';

export const isNotMapException = `Immutable.Map should be a Immutable.Map, was given
"""
object
"""
[object Map]
"""
`;
export const isNotKeyException = 'key should be a string, was given 8 of type number';

describe('isMapElseThrow', () => {
	it('return true if parameter is an Map', () => {
		// given
		const testMap = Immutable.Map<any, any>();
		// when
		const test = Data.isMapElseThrow(testMap);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not an Map', () => {
		// given
		const testMap = new Map();
		// when
		// expect
		expect(() => Data.isMapElseThrow(testMap as any)).toThrow(isNotMapException);
	});
});

describe('isKeyElseThrow', () => {
	it('return true if parameter key is a String', () => {
		// given
		const testString = 'a String';
		// when
		const test = Data.isKeyElseThrow(testString);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not a String', () => {
		// given
		const testString = 8;
		// when
		// expect
		expect(() => Data.isKeyElseThrow(testString)).toThrow(isNotKeyException);
	});
});

describe('Data', () => {
	describe('set', () => {
		it('given a proper key and map update said map', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = Immutable.Map({
				withValue: 'value',
			});
			// when
			const test = Data.set(key, value, map);
			// expect
			expect(test.get(key)).toEqual(value);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const value = 'value';
			const map = Immutable.Map({
				withValue: 'value',
			});
			// when
			// expect
			expect(() => Data.set(key, value, map)).toThrow(isNotKeyException);
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = new Map();
			// when
			// expect
			expect(() => Data.set(key, value, map as any)).toThrow(isNotMapException);
		});
	});

	describe('get', () => {
		it('given a key and map containing said key return value', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = Immutable.Map({
				key: value,
			});
			// when
			const test = Data.get(key, map);
			// expect
			expect(test).toEqual(value);
		});

		it('given a key and map not containing said key return undefined', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = Immutable.Map({
				key: value,
			});
			// when
			const test = Data.get(key, map);
			// expect
			expect(test).toEqual(undefined);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = Immutable.Map({
				withValue: 'value',
			});
			// when
			// expect
			expect(() => Data.get(key, map)).toThrow(isNotKeyException);
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map = new Map();
			// when
			// expect
			expect(() => Data.get(key, map as any)).toThrow(isNotMapException);
		});
	});

	describe('has', () => {
		it('given a key and map containing said key return true', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = Immutable.Map({
				key: value,
			});
			// when
			const test = Data.has(key, map);
			// expect
			expect(test).toEqual(true);
		});

		it('given a key and map not containing said key return false', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = Immutable.Map({
				key: value,
			});
			// when
			const test = Data.has(key, map);
			// expect
			expect(test).toEqual(false);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = Immutable.Map({
				withValue: 'value',
			});
			// when
			// expect
			expect(() => Data.has(key, map)).toThrow(isNotKeyException);
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map = new Map();
			// when
			// expect
			expect(() => Data.has(key, map as any)).toThrow(isNotMapException);
		});
	});

	describe('delete', () => {
		it('given a key and map containing said key return map without this value', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = Immutable.Map({
				key: value,
			});
			// when
			const test = Data.deleteKey(key, map);
			// expect
			expect(test).toEqual(Immutable.Map());
		});

		it('given a key and map not containing said key return same map', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = Immutable.Map({
				key: value,
			});
			// when
			const test = Data.deleteKey(key, map);
			// expect
			expect(test).toEqual(map);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = Immutable.Map({
				withValue: 'value',
			});
			// when
			// expect
			expect(() => Data.deleteKey(key, map)).toThrow(isNotKeyException);
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map = new Map();
			// when
			// expect
			expect(() => Data.deleteKey(key, map as any)).toThrow(isNotMapException);
		});
	});
});
