import { screen, render } from '@testing-library/react';
import Redirect from './Redirect.container';

describe('Redirect', () => {
	it('should dispatch a redirect action', () => {
		const dispatch = jest.fn();
		const Wrapped = Redirect.WrappedComponent;
		render(<Wrapped path="/hello-world" dispatch={dispatch} />);
		expect(dispatch.mock.calls.length).toBe(1);
		const action = dispatch.mock.calls[0][0];
		expect(action.type).toBe('REDIRECT');
		expect(action.cmf.routerReplace).toBe('/hello-world');
		expect(screen.getByLabelText('Loading application')).toBeVisible();
	});

	it('should dispatch a redirect action if to props given', () => {
		const dispatch = jest.fn();
		// eslint-disable-next-line new-cap
		const Wrapped = Redirect.WrappedComponent;
		render(<Wrapped path="/to" dispatch={dispatch} />);
		expect(dispatch.mock.calls.length).toBe(1);
		const action = dispatch.mock.calls[0][0];
		expect(action.type).toBe('REDIRECT');
		expect(action.cmf.routerReplace).toBe('/to');
	});
});
