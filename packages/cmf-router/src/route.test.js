/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }] */
import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';
import route from './route';

describe('loadComponent behavior', () => {
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
});
