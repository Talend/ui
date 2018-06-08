import React from 'react';
import { shallow } from 'enzyme';

import MonthPicker from './MonthPicker.component';

describe('MonthPicker', () => {
	it('should render a MonthPicker', () => {
		// when
		const wrapper = shallow(<MonthPicker />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
