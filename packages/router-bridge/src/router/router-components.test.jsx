// @vitest-environment jsdom
import React from 'react';
import { act, render, screen } from '@testing-library/react';

describe('router bridge - react-router v7 components', () => {
	let bridge;

	beforeEach(async () => {
		delete process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY;
		vi.resetModules();
		window.history.replaceState({}, '', '/');
		bridge = await import('./index');
	});

	function Params() {
		const { id } = bridge.useParams();
		return <div data-testid="params">{id}</div>;
	}

	it('should use a browser history', () => {
		expect(bridge.isLegacy).toBe(false);
		bridge.history.push('/somewhere');
		expect(window.location.pathname).toBe('/somewhere');
	});

	it('should render the matching Route and follow history changes', () => {
		const { Router, Switch, Route, history } = bridge;
		render(
			<Router>
				<Switch>
					<Route path="/" element={<div data-testid="home" />} />
					<Route path="/item/:id" element={<Params />} />
				</Switch>
			</Router>,
		);
		expect(screen.getByTestId('home')).toBeTruthy();
		act(() => history.push('/item/42'));
		expect(screen.getByTestId('params').textContent).toBe('42');
	});

	it('should provide a Redirect that replaces the location', () => {
		const { Router, Switch, Route, Redirect, history } = bridge;
		render(
			<Router>
				<Switch>
					<Route path="/" element={<Redirect to="/target" />} />
					<Route path="/target" element={<div data-testid="target" />} />
				</Switch>
			</Router>,
		);
		expect(screen.getByTestId('target')).toBeTruthy();
		expect(history.action).toBe('REPLACE');
	});

	it('should provide a useRouteMatch compatible with react-router v5', () => {
		const { Router, useRouteMatch, history } = bridge;
		const seen = {};
		function Match() {
			seen.match = useRouteMatch('/item/:id');
			seen.exact = useRouteMatch({ path: '/item', exact: true });
			seen.none = useRouteMatch('/other');
			return null;
		}
		history.push('/item/7');
		render(
			<Router>
				<Match />
			</Router>,
		);
		expect(seen.match).toEqual({
			path: '/item/:id',
			url: '/item/7',
			isExact: true,
			params: { id: '7' },
		});
		expect(seen.exact).toBeNull();
		expect(seen.none).toBeNull();
	});
});
