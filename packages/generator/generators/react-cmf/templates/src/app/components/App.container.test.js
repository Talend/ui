import React from 'react';
import renderer from 'react-test-renderer';
import { Provider, store } from '@talend/react-cmf/lib/mock';
import { Map } from 'immutable';

import App from './App.container';

jest.mock('react-dom');

describe('App container', () => {
	/**
	 * This test is meaningless but shows how your containers using CMF mocks
	 * It shows you :
	 * - how to mock CMF Provider
	 * - how to inject your custom mocks in CMF
	 */
	it('should render', () => {
		// given
		// get the CMF state mock and inject your mock in it
		const state = store.state();
		state.cmf.components = new Map();

		// when
		// wrap your container with CMF Provider mock, injecting your state mock
		const wrapper = renderer.create(
			<Provider state={state}>
				<App />
			</Provider>,
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
