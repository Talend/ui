import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from './DatePicker.component';

describe('DatePicker', () => {
	it('should render a DatePicker', () => {
		// when
		const wrapper = shallow(<DatePicker />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
