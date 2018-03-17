import React from 'react';
import { shallow } from 'enzyme';
import { CMFRouterComponent } from '../../src/route/CMFRouter';

const routes = {
	path: '/',
	component: 'App',
	indexRoute: {
		component: 'Redirect',
		view: 'indexRouteRedirect',
	},
	childRoutes: [
		{
			path: 'preparations/:folderId?',
			component: 'HomeListView',
			view: 'preparations',
			onEnter: 'preparation:fetch',
		},
		{
			path: 'datasets',
			component: 'HomeListView',
			view: 'datasets',
		},
		{
			path: 'datastores',
			component: 'HomeListView',
			view: 'datastores',
		},
	],
};

describe('CMFRouter', () => {
	it('should render loading when the routes configuration is not complete', () => {
		// when
		const wrapper = shallow(
			<CMFRouterComponent routes={{}} />
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render Route components', () => {
		// when
		const wrapper = shallow(
			<CMFRouterComponent routes={routes} />
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
