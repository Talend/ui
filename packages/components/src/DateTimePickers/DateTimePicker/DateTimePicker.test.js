import React from 'react';
import { shallow } from 'enzyme';

import DateTimePicker from './DateTimePicker.component';

describe('DateTimePicker', () => {
	it('should render a DateTimePicker', () => {
		// when
		const wrapper = shallow(<DateTimePicker />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
