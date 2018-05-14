/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }] */
import React from 'react';
import { shallow } from 'enzyme';
import route from '../src/route';
import registry from '../src/registry';
import mock from '../src/mock';

describe('CMF route', () => {
	it('registerComponent should be an alias to component.get', () => {
		function C1() {}
		const emptyRegistry = {};
		registry.Registry._registry = emptyRegistry;
		route.registerComponent('C1', C1);
		expect(emptyRegistry['_.route.component:C1']).toBe(C1);
	});
});

describe('loadComponent behavior', () => {
	it('should inject dispatch into component properties from context.store', () => {
		const mockItem = {
			component: 'component',
			view: 'something',
		};
		route.loadComponents(mock.context(), mockItem);
		const wrapper = shallow(React.createElement(mockItem.component), { context: mock.context() });
		expect(wrapper.props().dispatch()).toBe('dispatch');
	});

	it('should replace component by regitry one', () => {
		const mockItem = {
			component: 'TestContainer',
			view: 'appmenu',
		};
		const obj = { fn: jest.fn() };
		const component = obj.fn;
		component.CMFContainer = true;
		const mockContext = mock.context();
		mockContext.registry = {
			'_.route.component:TestContainer': component,
		};
		route.loadComponents(mockContext, mockItem);
		component();
		expect(obj.fn).toHaveBeenCalled();
		expect(mockItem.component.displayName).toBe('WithView');
	});

	it('should use the componentId to resolve the props for the component instead of using a view', () => {
		const mockItem = {
			component: 'TestContainer',
			componentId: 'test',
		};
		const Component = () => <div>test</div>;
		Component.CMFContainer = true;
		const mockContext = mock.context();
		mockContext.registry = {
			'_.route.component:TestContainer': Component,
		};
		route.loadComponents(mockContext, mockItem);
		const wrapper = shallow(<mockItem.component />);
		expect(wrapper.getElement().props.componentId).toBe('test');
	});

	it('should replace onEnter/onLeave hooks', () => {
		// given
		const mockItem = {
			component: 'TestContainer',
			view: 'appmenu',
			onEnter: 'onEnterId',
			onLeave: 'onLeaveId',
		};
		const dispatch = jest.fn();
		const component = jest.fn();
		component.CMFContainer = true;
		const onEnter = jest.fn();
		const onLeave = jest.fn();
		const nextState = { params: {} };
		const replace = jest.fn();

		const mockContext = mock.context();
		mockContext.registry = {
			'_.route.hook:onEnterId': onEnter,
			'_.route.hook:onLeaveId': onLeave,
			'_.route.component:TestContainer': component,
		};

		// when
		route.loadComponents(mockContext, mockItem, dispatch);

		// then
		expect(onEnter).not.toBeCalled();
		mockItem.onEnter(nextState, replace);
		expect(onEnter).toBeCalledWith({
			router: { nextState, replace },
			dispatch,
		});

		expect(onLeave).not.toBeCalled();
		mockItem.onLeave(nextState, replace);
		expect(onLeave).toBeCalledWith({
			router: { nextState, replace },
			dispatch,
		});
	});
});
