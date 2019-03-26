import React from 'react';
import { shallow } from 'enzyme';

import App from './App.component';

describe('App container', () => {
	/**
	 * This test is meaningless but shows how your containers using CMF mocks
	 * It shows you :
	 * - how to mock CMF Provider
	 * - how to inject your custom mocks in CMF
	 */
	it('should render', () => {
		// when
		const wrapper = shallow(<App />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
