import React from 'react';
import { shallow } from 'enzyme';

import App from './App.component';

describe('App', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(<App />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
