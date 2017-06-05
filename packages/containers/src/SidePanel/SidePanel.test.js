import React from 'react';
import renderer from 'react-test-renderer';
import { store, Provider } from 'react-cmf/lib/mock';
import SidePanel, { getActions } from './SidePanel.container';

jest.mock('react-talend-components');
jest.mock('react-dom');

describe('SidePanel', () => {
	it('should render', () => {
		const sidepanel = renderer.create(
			<Provider>
				<SidePanel />
			</Provider>,
		).toJSON();
		expect(sidepanel).toMatchSnapshot();
	});
	it('should render provided actions as string', () => {
		const actions = ['menu:article', 'menu:demo'];

		const sidepanel = renderer.create(
			<Provider>
				<SidePanel actions={actions} />
			</Provider>,
		).toJSON();
		expect(sidepanel).toMatchSnapshot();
	});
});

describe('SidePanel:getActions', () => {
	it('should add onClick on info', () => {
		const context = store.context();
		const actions = getActions(['menu:article'], context);
		expect(actions.length).toBe(1);
		expect(typeof actions[0].onClick).toBe('function');
	});

	it('should check for each action if one goes to the current route', () => {
		const context = store.context();
		context.router = { location: { pathname: '/test' } };
		const active = getActions(['menu:routerReplace'], context)[0];
		expect(active.active).toBe(true);

		context.router = { location: { pathname: '/different' } };
		const notactive = getActions(['menu:routerReplace'], context)[0];
		expect(notactive.active).toBe(undefined);

		context.router = { location: { pathname: '/push' } };
		const push = getActions(['menu:routerPush'], context)[0];
		expect(push.active).toBe(true);

		context.router = { location: { pathname: '/href' } };
		const href = getActions(['menu:href'], context)[0];
		expect(href.active).toBe(true);
	});

	it('should handle actionCreator with href', () => {
		const context = store.context();
		context.router = { location: { pathname: '/href' } };
		const action = getActions(['menu:href'], context)[0];
		expect(action.href).toBe('/href');
	});
});
