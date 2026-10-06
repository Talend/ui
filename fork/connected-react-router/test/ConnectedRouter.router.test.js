import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { UNSAFE_createMemoryHistory, useLocation, useNavigationType } from 'react-router';
import { connectRouter, ConnectedRouter } from '../src';

function Probe() {
	const location = useLocation();
	const type = useNavigationType();
	return (
		<div data-testid="probe">
			{location.pathname}|{type}
		</div>
	);
}

function setup(props = {}) {
	const history = UNSAFE_createMemoryHistory({ initialEntries: ['/start'], v5Compat: true });
	const store = createStore(combineReducers({ router: connectRouter(history) }));
	const utils = render(
		<Provider store={store}>
			<ConnectedRouter history={history} {...props}>
				<Probe />
			</ConnectedRouter>
		</Provider>,
	);
	return { history, store, ...utils };
}

describe('ConnectedRouter with react-router v7 Router', () => {
	it('should render children inside a Router with the history location', () => {
		setup();
		expect(screen.getByTestId('probe').textContent).toBe('/start|POP');
	});

	it('should follow history changes with location and navigation type', () => {
		const { history } = setup();
		act(() => history.push('/next'));
		expect(screen.getByTestId('probe').textContent).toBe('/next|PUSH');
		act(() => history.replace('/replaced'));
		expect(screen.getByTestId('probe').textContent).toBe('/replaced|REPLACE');
	});

	it('should sync history changes in the store with the v5/v7 listener signature', () => {
		const { history, store } = setup();
		act(() => history.push('/next?a=1'));
		expect(store.getState().router.location).toMatchObject({ pathname: '/next', search: '?a=1' });
		expect(store.getState().router.action).toBe('PUSH');
	});

	it('should not render a Router with omitRouter', () => {
		// React logs the error thrown by the child, expected here
		vi.spyOn(console, 'error').mockImplementation(() => {});
		expect(() => setup({ omitRouter: true })).toThrow(
			/useLocation\(\) may be used only in the context of a <Router>/,
		);
	});

	it('should stop following history once unmounted', () => {
		const { history, store, unmount } = setup();
		unmount();
		history.push('/after');
		expect(store.getState().router.location.pathname).toBe('/start');
	});
});
