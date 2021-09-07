/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }] */
import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';
import route from './route';

describe('loadComponent behavior', () => {
	it('should replace component by regitry one', () => {
		const mockItem = {
			component: 'TestContainer',
			componentId: 'appmenu',
		};
		const obj = { fn: jest.fn() };
		const component = obj.fn;
		component.CMFContainer = true;
		const mockContext = mock.store.context();
		mockContext.registry = {
			'_.route.component:TestContainer': component,
		};
		route.loadComponents(mockContext, mockItem);
		component();
		expect(obj.fn).toHaveBeenCalled();
		expect(mockItem.component.displayName).toBe('WithProps');
	});

	it('should wrap the component using cmfConnect', () => {
		const mockItem = {
			component: 'TestContainer',
			componentId: 'test',
		};
		const Component = () => <div>test</div>;
		Component.displayName = 'TestContainer';
		const mockContext = mock.store.context();
		mockContext.registry = {
			'_.route.component:TestContainer': Component,
		};
		route.loadComponents(mockContext, mockItem);
		expect(mockItem.component.WrappedComponent).not.toBe(Component);
		expect(mockItem.component.WrappedComponent.displayName).toBe('Connect(CMF(TestContainer))');
		expect(mockItem.component.WrappedComponent.WrappedComponent).toBe(Component);
	});

	it('should use the componentId to resolve the props for the component instead of using a view', () => {
		const mockItem = {
			component: 'TestContainer',
			componentId: 'test',
		};
		const Component = () => <div>test</div>;
		Component.displayName = 'TestContainer';
		const mockContext = mock.store.context();
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
			componentId: 'appmenu',
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

		const mockContext = mock.store.context();
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
