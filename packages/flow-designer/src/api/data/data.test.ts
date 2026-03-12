import * as Data from './data';

export const isNotMapException = 'plain object should be a plain object';
export const isNotKeyException = 'key should be a string, was given 8 of type number';

describe('isMapElseThrow', () => {
	it('return true if parameter is a plain object', () => {
		// given
		const testMap = { key: 'value' };
		// when
		const test = Data.isMapElseThrow(testMap);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not a plain object', () => {
		// given
		const testMap: any = [];
		// when
		// expect
		expect(() => Data.isMapElseThrow(testMap)).toThrow(isNotMapException);
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
			const map = { withValue: 'value' };
			// when
			const test = Data.set(key, value, map);
			// expect
			expect(test[key]).toEqual(value);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const value = 'value';
			const map = { withValue: 'value' };
			// when
			// expect
			expect(() => Data.set(key, value, map)).toThrow(isNotKeyException);
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map: any = [];
			// when
			// expect
			expect(() => Data.set(key, value, map)).toThrow(isNotMapException);
		});
	});

	describe('get', () => {
		it('given a key and map containing said key return value', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = { key: value };
			// when
			const test = Data.get(key, map);
			// expect
			expect(test).toEqual(value);
		});

		it('given a key and map not containing said key return undefined', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = { key: value };
			// when
			const test = Data.get(key, map);
			// expect
			expect(test).toEqual(undefined);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = { withValue: 'value' };
			// when
			// expect
			expect(() => Data.get(key, map)).toThrow(isNotKeyException);
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map: any = [];
			// when
			// expect
			expect(() => Data.get(key, map)).toThrow(isNotMapException);
		});
	});

	describe('has', () => {
		it('given a key and map containing said key return true', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = { key: value };
			// when
			const test = Data.has(key, map);
			// expect
			expect(test).toEqual(true);
		});

		it('given a key and map not containing said key return false', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = { key: value };
			// when
			const test = Data.has(key, map);
			// expect
			expect(test).toEqual(false);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = { withValue: 'value' };
			// when
			// expect
			expect(() => Data.has(key, map)).toThrow(isNotKeyException);
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map: any = [];
			// when
			// expect
			expect(() => Data.has(key, map)).toThrow(isNotMapException);
		});
	});

	describe('delete', () => {
		it('given a key and map containing said key return map without this value', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = { key: value };
			// when
			const test = Data.deleteKey(key, map);
			// expect
			expect(test).toEqual({});
		});

		it('given a key and map not containing said key return same map', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = { key: value };
			// when
			const test = Data.deleteKey(key, map);
			// expect
			expect(test).toEqual(map);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = { withValue: 'value' };
			// when
			// expect
			expect(() => Data.deleteKey(key, map)).toThrow(isNotKeyException);
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map: any = [];
			// when
			// expect
			expect(() => Data.deleteKey(key, map)).toThrow(isNotMapException);
		});
	});
});
