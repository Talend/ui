import { vi } from 'vitest';
import toJS from '../../src/selectors/toJS';

describe('toJS', () => {
	let selector;
	beforeEach(() => {
		selector = vi.fn(state => state.foo);
	});
	it('should return a function', () => {
		expect(typeof toJS(selector)).toBe('function');
	});
	it('the returned function should return the result of the selector', () => {
		const myselector = toJS(selector);
		const state = {
			foo: { bar: 'bar' },
		};
		const result = myselector(state);
		expect(result).toEqual({ bar: 'bar' });
	});
	it('the returned function should return same reference on multiple calls', () => {
		const myselector = toJS(selector);
		const state = {
			foo: { bar: 'bar' },
		};
		const result1 = myselector(state);
		const result2 = myselector(state);
		expect(result1).toBe(result2);
	});
	it('the returned function should return a different result if store has been modified', () => {
		const myselector = toJS(selector);
		const state = {
			foo: { bar: 'bar' },
		};
		const result1 = myselector(state);
		state.foo = { bar: 'baz' };
		const result2 = myselector(state);
		expect(result1).not.toBe(result2);
		expect(result2.bar).toBe('baz');
	});
	it('the returned function should return undefined if the selector doesn t return data', () => {
		const myselector = toJS(selector);
		const state = {};
		expect(myselector(state)).toBeUndefined();
	});
	it('should throw if selector is not a function', () => {
		const toThrow = () => toJS({});
		expect(toThrow).toThrow();
	});
});
