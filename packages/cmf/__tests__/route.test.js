/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }] */
import React from 'react';
import { shallow } from 'enzyme';
import route, {
	mapStateToViewProps,
} from '../src/route';
import registry from '../src/registry';
import mock from '../src/mock';

describe('CMF route', () => {
	it('registerComponent', () => {
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
		// console.error('mock', mock.context());
		route.loadComponents(mock.context(), mockItem);
		const wrapper = shallow(React.createElement(mockItem.component), { context: mock.context() });
		expect(wrapper.props().dispatch()).toBe('dispatch');
	});
});

describe('mapStateToViewProps', () => {
	it('should add props.dispatch if context.store', () => {
		const state = mock.state();
		const dispatch = jest.fn();
		const props = mapStateToViewProps(state, { store: { dispatch } });
		expect(props.dispatch).toBe(dispatch);
	});
	it('should update props with _ref', () => {
		const state = mock.state();
		state.cmf.settings.views.homepage = {
			sidemenu: { _ref: 'SidePanel#default', baz: false },
		};
		const sidemenu = { foo: 'bar', baz: true };
		state.cmf.settings.ref = {
			'SidePanel#default': sidemenu,
		};
		const props = mapStateToViewProps(state, null, 'homepage');
		expect(props.sidemenu).not.toEqual(sidemenu);
		expect(props.sidemenu.foo).toEqual(sidemenu.foo);
		expect(props.sidemenu.baz).toBe(false);
	});
	it('should throw exception if _ref not found', () => {
		const state = mock.state();
		state.cmf.settings.views.homepage = {
			sidemenu: { _ref: 'myref' },
		};
		state.cmf.settings.ref = {};
		const shouldThrow = () => {
			mapStateToViewProps(state, null, 'homepage');
		};
		expect(shouldThrow).toThrow(new Error('CMF/Settings: Reference \'myref\' not found'));
	});
});
