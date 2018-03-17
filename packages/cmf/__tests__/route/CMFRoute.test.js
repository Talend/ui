import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import CMFRoute from '../../src/route/CMFRoute';

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

const App = props => (<div>{props.children}</div>);
App.propTypes = { children: PropTypes.element };
const HomeListView = props => (<div>{props.children}</div>);
HomeListView.propTypes = { children: PropTypes.element };
const Redirect = () => (<div />);
function createContext() {
	return {
		registry: {
			'_.route.component:App': App,
			'_.route.component:HomeListView': HomeListView,
			'_.route.component:Redirect': Redirect,
		},
	};
}

describe('CMFRoute', () => {
	it('should instantiate Route component', () => {
		// given
		const context = createContext();

		// when
		const wrapper = shallow(
			(
				<CMFRoute {...routes}>
					<div />
				</CMFRoute>
			),
			{ context },
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should instantiate nested Route component', () => {
		// given
		const context = createContext();
		const match = { params: {}, url: '/', path: '/' };

		// when
		const wrapper = shallow(
			(
				<CMFRoute {...routes}>
					<div />
				</CMFRoute>
			),
			{ context },
		);
		const Component = wrapper.props().component;
		const componentWrapper = shallow(<Component match={match} />);

		// then
		expect(componentWrapper.getElement()).toMatchSnapshot();
	});
});
