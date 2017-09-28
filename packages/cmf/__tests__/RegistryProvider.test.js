import React from 'react';
import { mount } from 'enzyme';
import RegistryProvider from '../src/RegistryProvider';
import Registry from '../src/registry';

const Register = RegistryProvider.Register;

describe('RegistryProvider', () => {
	it('should provide child context', () => {
		const instance = new RegistryProvider({});
		const context = instance.getChildContext();
		expect(context.registry).toBe(Registry.getRegistry());
	});
	it('should render children', () => {
		const Test = () => (<div className="foo" />);
		const wrapper = mount(
			<RegistryProvider><Test /></RegistryProvider>
		);
		expect(wrapper.hasClass('foo')).toBe(true);
	});
});

describe('RegistryProvider.Register', () => {
	it('should register expression', () => {
		const context = {
			registry: {},
		};
		const props = {
			id: 'test',
			expression: jest.fn(),
		};
		Register(props, context);
		expect(context.registry['expression:test']).toBe(props.expression);
	});
	it('should register actionCreator', () => {
		const context = {
			registry: {},
		};
		const props = {
			id: 'test',
			actionCreator: jest.fn(),
		};
		Register(props, context);
		expect(context.registry['actionCreator:test']).toBe(props.actionCreator);
	});
	it('should register component', () => {
		const context = {
			registry: {},
		};
		const Component = () => (<div />);
		Component.actions = {
			callMeBaby: jest.fn(),
		};
		Component.expressions = {
			callMeBis: jest.fn(),
		};
		const props = {
			id: 'test',
			component: Component,
		};
		Register(props, context);
		expect(context.registry['expression:callMeBis']).toBe(Component.expressions.callMeBis);
		expect(context.registry['actionCreator:callMeBaby']).toBe(Component.actions.callMeBaby);
		expect(context.registry['_.route.component:test']).toBe(Component);
	});
});
