/* eslint-disable no-empty-function */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

import mergeModules from '../src/cmfModule.merge';

describe('mergeModule', () => {
	beforeEach(() => {
		global.console = {
			log: jest.fn(),
			warn: jest.fn(),
		};
	});
	it('should merge components config', () => {
		const a = {
			components: {
				foo: function foo() {},
				bar: function bar() {},
			},
		};
		const b = {
			components: {
				foo: function foo() {},
			},
		};
		const config = mergeModules(a, b);
		expect(config.components.foo).toBe(b.components.foo);
		expect(config.components.bar).toBe(a.components.bar);
	});

	it('should not merge module id', () => {
		const config = mergeModules({ id: 'foo' }, { id: 'bar' });
		expect(config.id).toBeUndefined();
	});

	it('should merge sagas config', () => {
		const a = {
			sagas: {
				foo: function* foo() {},
				bar: function* bar() {},
			},
		};
		const b = {
			sagas: {
				foo: function* foo() {},
			},
		};
		const config = mergeModules(a, b);
		expect(config.sagas.foo).toBe(b.sagas.foo);
		expect(config.sagas.bar).toBe(a.sagas.bar);
	});

	it('should support undefined as value', () => {
		const a = {
			appId: 'app',
			expressions: {
				ttt: function* foo() {},
			},
			preReducer: [],
			enhancer: jest.fn(),
			saga: jest.fn(),
		};
		const b = {
			appId: undefined,
			expressions: undefined,
			preReducer: undefined,
			enhancer: undefined,
			saga: undefined,
		};
		const config = mergeModules(a, b);
		expect(config.expressions.ttt).toBe(a.expressions.ttt);
	});

	it('should merge expressions config', () => {
		const a = {
			expressions: {
				foo: function* foo() {},
				bar: function* bar() {},
			},
		};
		const b = {
			expressions: {
				foo: function* foo() {},
			},
		};
		const config = mergeModules(a, b);
		expect(config.expressions.foo).toBe(b.expressions.foo);
		expect(config.expressions.bar).toBe(a.expressions.bar);
	});

	it('should merge actionCreators config', () => {
		const a = {
			actionCreators: {
				foo: function* foo() {},
				bar: function* bar() {},
			},
		};
		const b = {
			actionCreators: {
				foo: function* foo() {},
			},
		};
		const config = mergeModules(a, b);
		expect(config.actionCreators.foo).toBe(b.actionCreators.foo);
		expect(config.actionCreators.bar).toBe(a.actionCreators.bar);
	});

	it('should throw an exception on unknown keys', () => {
		const toThrow = () => mergeModules({ foo: {} });
		expect(toThrow).toThrow();
	});

	it('should throw a TypeError on undefined keys', () => {
		const toThrow = () =>
			mergeModules({ expressions: {} }, { expressions: { toThrow: undefined } });
		expect(toThrow).toThrow('toThrow value is undefined. You may have a bad import here');
	});

	it('should throw an exception if two config has appId', () => {
		const toThrow = () => mergeModules({ appId: 'foo' }, { appId: 'bar' });
		expect(toThrow).toThrow();
	});

	it('should get appId in config', () => {
		const left = mergeModules({ appId: 'foo' }, {}, {});
		expect(left.appId).toBe('foo');
	});

	it('should merge enhancer functions', () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const config = mergeModules({ enhancer: fn1 }, { enhancer: fn2 });
		expect(typeof config.enhancer).toBe('function');
		config.enhancer('foo');
		expect(fn1).toHaveBeenCalledWith('foo');
		expect(fn2).toHaveBeenCalledWith('foo');
	});

	it('should merge saga', () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const config = mergeModules({ saga: fn1 }, { saga: fn2 });
		expect(typeof config.saga).toBe('function');
		expect(config.saga).not.toBe(fn1);
		expect(config.saga).not.toBe(fn2);
	});

	it('should merge middlewares', () => {
		const mid1 = [jest.fn()];
		const mid2 = [jest.fn()];
		const config = mergeModules({ middlewares: mid1 }, { middlewares: mid2 });
		expect(config.middlewares.length).toBe(2);
		expect(config.middlewares[0]).toBe(mid1[0]);
		expect(config.middlewares[1]).toBe(mid2[0]);
	});

	it('should merge storeCallback fns', () => {
		const storeCallback1 = jest.fn();
		const storeCallback2 = jest.fn();
		const config = mergeModules(
			{ storeCallback: storeCallback1 },
			{ storeCallback: storeCallback2 },
		);
		expect(typeof config.storeCallback).toBe('function');
		config.storeCallback('foo');
		expect(storeCallback1).toHaveBeenCalledWith('foo');
		expect(storeCallback2).toHaveBeenCalledWith('foo');
	});

	it('should merge reducer', () => {
		const ob1 = { foo: jest.fn(), composed: { composed1: jest.fn() } };
		const ob2 = { bar: jest.fn(), composed: { composed2: jest.fn() } };

		const config = mergeModules({ reducer: ob1 }, { reducer: ob2 });
		expect(typeof config.reducer).toBe('object');
		expect(config.reducer.foo).toBe(ob1.foo);
		expect(config.reducer.bar).toBe(ob2.bar);
		expect(config.reducer.composed).toEqual({
			composed1: ob1.composed.composed1,
			composed2: ob2.composed.composed2,
		});
	});

	it('should merge preReducer', () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const array1 = [jest.fn()];
		const array2 = [jest.fn()];

		let config = mergeModules({ preReducer: fn1 }, { preReducer: fn2 });
		expect(Array.isArray(config.preReducer)).toBe(true);
		expect(config.preReducer.length).toBe(2);
		expect(config.preReducer[0]).toBe(fn1);
		expect(config.preReducer[1]).toBe(fn2);

		config = mergeModules({ preReducer: fn1 }, { preReducer: array2 });
		expect(Array.isArray(config.preReducer)).toBe(true);
		expect(config.preReducer.length).toBe(2);
		expect(config.preReducer[0]).toBe(fn1);
		expect(config.preReducer[1]).toBe(array2[0]);

		config = mergeModules({ preReducer: array1 }, { preReducer: fn2 });
		expect(Array.isArray(config.preReducer)).toBe(true);
		expect(config.preReducer.length).toBe(2);
		expect(config.preReducer[0]).toBe(array1[0]);
		expect(config.preReducer[1]).toBe(fn2);

		config = mergeModules({ preReducer: array1 }, { preReducer: array2 });
		expect(Array.isArray(config.preReducer)).toBe(true);
		expect(config.preReducer.length).toBe(2);
		expect(config.preReducer[0]).toBe(array1[0]);
		expect(config.preReducer[1]).toBe(array2[0]);
	});

	it('should merge httpInterceptors', () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const config = mergeModules({ httpInterceptors: [fn1] }, { httpInterceptors: [fn2] });
		expect(Array.isArray(config.httpInterceptors)).toBeTruthy();
		expect(config.httpInterceptors.length).toBe(2);
		expect(config.httpInterceptors[0]).toBe(fn1);
		expect(config.httpInterceptors[1]).toBe(fn2);
	});

	it('should compose RootComponent', () => {
		// given
		const module1 = { RootComponent: ({ children }) => <div id="mod1">{children}</div> };
		const module2 = { RootComponent: ({ children }) => <div id="mod2">{children}</div> };
		const module3 = { RootComponent: ({ children }) => <div id="mod3">{children}</div> };

		// when
		const { RootComponent } = mergeModules(module1, module2, module3);
		const wrapper = mount(<RootComponent />);

		// then
		const mod1 = wrapper.find('#mod1');
		expect(mod1.length).toBe(1);
		const mod2 = mod1.find('#mod2');
		expect(mod2.length).toBe(1);
		const mod3 = mod1.find('#mod3');
		expect(mod3.length).toBe(1);
	});
});
