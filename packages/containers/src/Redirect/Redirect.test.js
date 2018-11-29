import React from 'react';
import { Redirect } from './Redirect.container';

jest.mock('@talend/react-components', () => ({
	CircularProgress: props => <div className="tc-circular-project" {...props} />,
}));

describe('Redirect', () => {
	it('should dispatch a redirect action', () => {
		const dispatch = jest.fn();
		const result = new Redirect({ path: '/hello-world', dispatch });
		expect(dispatch.mock.calls.length).toBe(1);
		const action = dispatch.mock.calls[0][0];
		expect(action.type).toBe('REDIRECT');
		expect(action.cmf.routerReplace).toBe('/hello-world');
		expect(result).toMatchSnapshot();
	});

	it('should dispatch a redirect action if to props given', () => {
		const dispatch = jest.fn();
		// eslint-disable-next-line new-cap
		Redirect({ path: '/to', dispatch });
		expect(dispatch.mock.calls.length).toBe(1);
		const action = dispatch.mock.calls[0][0];
		expect(action.type).toBe('REDIRECT');
		expect(action.cmf.routerReplace).toBe('/to');
	});
});
