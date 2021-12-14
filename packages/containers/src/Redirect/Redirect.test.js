import React from 'react';
import { mount } from 'enzyme';
import Redirect from './Redirect.container';

describe('Redirect', () => {
	it('should dispatch a redirect action', () => {
		const dispatch = jest.fn();
		const Wrapped = Redirect.WrappedComponent;
		const wrapper = mount(<Wrapped path="/hello-world" dispatch={dispatch} />);
		expect(dispatch.mock.calls.length).toBe(1);
		const action = dispatch.mock.calls[0][0];
		expect(action.type).toBe('REDIRECT');
		expect(action.cmf.routerReplace).toBe('/hello-world');
		expect(wrapper.childAt(0).getElement()).toMatchSnapshot();
	});

	it('should dispatch a redirect action if to props given', () => {
		const dispatch = jest.fn();
		// eslint-disable-next-line new-cap
		const Wrapped = Redirect.WrappedComponent;
		mount(<Wrapped path="/to" dispatch={dispatch} />);
		expect(dispatch.mock.calls.length).toBe(1);
		const action = dispatch.mock.calls[0][0];
		expect(action.type).toBe('REDIRECT');
		expect(action.cmf.routerReplace).toBe('/to');
	});
});
