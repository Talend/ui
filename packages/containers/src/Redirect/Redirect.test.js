import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Provider } from 'react-cmf/lib/mock';
import Redirect from './Redirect.component';

jest.mock('react-dom');

describe('Redirect', () => {
	xit('should render a circular progress', () => {
		const wrapper = renderer.create(
			<Provider>
				<Redirect path="/hello-world" />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should dispatch a redirect action', () => {
		const dispatch = jest.fn();
		Redirect(
			{ path: '/hello-world' },
			{ store: { dispatch } }
		);
		expect(dispatch.mock.calls.length).toBe(1);
		const action = dispatch.mock.calls[0][0];
		expect(action.type).toBe('REDIRECT');
		expect(action.cmf.routerReplace).toBe('/hello-world');
	});
});
