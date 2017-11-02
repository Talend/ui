import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';
import SidePanel from './SidePanel.container';
import { mapStateToProps, mergeProps } from './SidePanel.connect';
import Action from '../Action';

describe('SidePanel', () => {
	it('should render', () => {
		const context = mock.context();
		const sidepanel = shallow(
			<SidePanel />,
			{ context }
		);
		expect(sidepanel.getNode()).toMatchSnapshot();
	});
	it('should render provided actions as string', () => {
		const actions = ['menu:article', 'menu:demo'];
		const context = mock.context();
		const sidepanel = shallow(
			<SidePanel actions={actions} />,
			{ context }
		);
		expect(sidepanel.getNode()).toMatchSnapshot();
	});
	it('should add renderers', () => {
		const context = mock.context();
		const sidepanel = shallow(
			<SidePanel />,
			{ context }
		);
		expect(sidepanel.props().renderers.Action).toBe(Action);
	});
});

describe('SidePanel.mapStateToProps', () => {
	it('should check for each action if one goes to the current route', () => {
		const state = mock.state();
		const props = mapStateToProps(state, {
			location: { pathname: '/test' },
			actionIds: ['menu:routerReplace'],
		});
		expect(props.actions[0].active).toBe(true);

		const notactive = mapStateToProps(state, {
			location: { pathname: '/different' },
			actionIds: ['menu:routerReplace'],
		});
		expect(notactive.actions[0].active).toBeUndefined();

		const push = mapStateToProps(state, {
			location: { pathname: '/push' },
			actionIds: ['menu:routerPush'],
		});
		expect(push.actions[0].active).toBe(true);

		const href = mapStateToProps(state, {
			location: { pathname: '/href' },
			actionIds: ['menu:href'],
		});
		expect(href.actions[0].active).toBe(true);
	});

	it('should handle actionCreator with href', () => {
		const state = mock.state();
		const href = mapStateToProps(state, {
			location: { pathname: '/href' },
			actionIds: ['menu:href'],
		});
		expect(href.actions[0].href).toBe('/href');
	});
});

describe('SidePanel.mergeProps', () => {
	it('should delete actionIds', () => {
		const props = mergeProps({}, {}, { actionIds: [] });
		expect(props.actionIds).toBeUndefined();
	});
	it('should merge', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz' });
		expect(props.bar).toBe('bar');
		expect(props.baz).toBe('baz');
		expect(props.foo).toBe('foo');
	});
});
