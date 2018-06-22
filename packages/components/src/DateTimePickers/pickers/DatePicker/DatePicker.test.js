import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from './DatePicker.component';

describe('DatePicker', () => {
	it('should render a DatePicker', () => {
		const calendar = {
			year: 2018,
			monthIndex: 6,
		};

		// when
		const wrapper = shallow(<DatePicker
			calendar={calendar}
		/>);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
