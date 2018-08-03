import React from 'react';
import { shallow } from 'enzyme';
import cmf from '../src';
import expression from '../src/expression';

describe('expression', () => {
	it('should be available with api', () => {
		expect(expression).toBe(cmf.expression);
	});

	it('should register in registry', () => {
		const test = jest.fn();
		const context = {
			registry: {},
		};
		expression.register('test', test, context);
		expect(context.registry['expression:test']).toBe(test);
	});

	it('should get from registry', () => {
		const test = jest.fn();
		const context = {
			registry: {
				'expression:test': test,
			},
		};
		expect(expression.get('test', context)).toBe(test);
	});

	it('should call with simple string (no args)', () => {
		const test = jest.fn();
		const context = {
			registry: {
				'expression:test': test,
			},
		};
		expression.call('test', context);
		expect(test.mock.calls.length).toBe(1);
	});

	it('should call with object (args)', () => {
		const test = jest.fn();
		const context = {
			registry: {
				'expression:test': test,
			},
		};
		expression.call({ id: 'test', args: ['foo'] }, context);
		expect(test.mock.calls.length).toBe(1);
		expect(test).toBeCalledWith({ context }, 'foo');
	});

	it('should throw if no id provided', () => {
		const context = {
			registry: {},
		};
		const toThrowObject = () => {
			expression.call({ args: ['foo'] }, context);
		};
		const toThrowString = () => {
			expression.call('', context);
		};
		const msg = 'you must provide an expression id';
		expect(toThrowString).toThrow(msg);
		expect(toThrowObject).toThrow(msg);
	});

	it('should throw if no expression has been found', () => {
		const context = {
			registry: {},
		};
		const toThrowObject = () => {
			expression.call({ id: 'test', args: ['foo'] }, context);
		};
		const toThrowString = () => {
			expression.call('test', context);
		};
		const msg = 'you must register expression test first';
		expect(toThrowString).toThrow(msg);
		expect(toThrowObject).toThrow(msg);
	});

	it('should withExpression create a wrapper', () => {
		const MyComponent = props => <button {...props} />;
		const WithExpr = expression.withExpression(MyComponent, ['disabled']);
		const isTrue = () => true;
		const context = {
			registry: {
				'expression:test': isTrue,
			},
		};
		const wrapper = shallow(<WithExpr disabledExpression="test" />, { context });
		expect(wrapper.props().disabled).toBe(true);
		expect(wrapper.props().disabled).not.toBe('test');
	});
});

describe('getProps', () => {
	it('should getProps eval requested props', () => {
		const isTrue = () => true;
		const context = {
			registry: {
				'expression:test': isTrue,
			},
		};
		const props = {
			disabledExpression: 'test',
		};
		const newProps = expression.getProps(props, ['disabled'], context);
		expect(newProps.disabled).toBe(true);
		expect(newProps.disabled).not.toBe('test');
	});
	it('should eval all properties ending with `Expression`', () => {
		const isDisabled = () => true;
		const context = {
			registry: {
				'expression:isDisabled': isDisabled,
			},
		};
		const props = {
			disabledExpression: 'isDisabled',
		};
		const newProps = expression.getProps(props, [], context);
		expect(newProps.disabled).toBe(true);
		expect(newProps.disabledExpression).toBe(undefined);
	});
});

describe('mapStateToProps', () => {
	it('should check first level props keys and call expression on it', () => {
		const isCalled = jest.fn(() => true);
		const registry = cmf.registry.getRegistry();
		registry['expression:isCalled'] = isCalled;
		const props = {
			myExpression: 'isCalled',
		};
		const state = { foo: 'bar' };
		const newProps = expression.mapStateToProps(state, props);
		expect(newProps.my).toBe(true);
		expect(newProps.myExpression).toBeUndefined();
		expect(isCalled).toHaveBeenCalled();
		const args = isCalled.mock.calls[0];
		expect(args[0].context.registry).toBe(registry);
		expect(args[0].context.store.getState()).toBe(state);
		expect(args[0].payload).toBe(props);
	});
});

describe('mergeProps', () => {
	it('should remove all xxExpression from props', () => {
		const props = {
			foo: 'bar',
			'what-everExpression': {},
			totoExpression: {},
		};
		const newProps = expression.mergeProps(props);
		expect(newProps.foo).toBe('bar');
		expect(newProps['what-everExpression']).toBeUndefined();
		expect(newProps.totoExpression).toBeUndefined();
	});
});
