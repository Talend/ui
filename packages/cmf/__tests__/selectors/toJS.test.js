import Immutable from 'immutable';
import toJS from '../../src/selectors/toJS';

describe('toJS', () => {
	let selector;
	beforeEach(() => {
		selector = jest.fn(state => state.foo);
	});
	it('should return a function', () => {
		expect(typeof toJS(selector)).toBe('function');
	});
	it('the returned function should call toJS on the results', () => {
		const myselector = toJS(selector);
		const state = {
			foo: new Immutable.Map({ bar: 'bar' }),
		};
		const result = myselector(state);
		expect(result).toEqual({ bar: 'bar' });
	});
	it('the returned function should return same reference on multiple calls', () => {
		const myselector = toJS(selector);
		const state = {
			foo: new Immutable.Map({ bar: 'bar' }),
		};
		const result1 = myselector(state);
		const result2 = myselector(state);
		expect(result1).toBe(result2);
	});
	it('the returned function should throw an error if the selector return a not immutable data', () => {
		const myselector = toJS(selector);
		const state = {
			foo: { bar: 'bar' },
		};
		const toThrow = () => myselector(state);
		expect(toThrow).toThrow();
	});
	it('the returned function should return undefined if the selector doesn t return data', () => {
		const myselector = toJS(selector);
		const state = {};
		expect(myselector(state)).toBeUndefined();
	});
});
