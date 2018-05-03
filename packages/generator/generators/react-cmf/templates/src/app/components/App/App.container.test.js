import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import App from './App.component';

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
		const context = mock.context();

		// when
		// wrap your container with CMF Provider mock, injecting your state mock
		const wrapper = shallow(
			<App />
		, { context });

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
