import React from 'react';
import { shallow } from 'enzyme';

import YearPicker from './YearPicker.component';

describe('YearPicker', () => {
	it('should render a YearPicker', () => {
		// when
		const wrapper = shallow(<YearPicker />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
