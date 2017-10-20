/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }] */
import React from 'react';
import { shallow } from 'enzyme';
import route from '../src/route';
import registry from '../src/registry';
import mock from '../src/mock';

describe('CMF route', () => {
	it('registerComponent should be an alias to component.get', () => {
		function C1() { }
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
});
