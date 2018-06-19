import React from 'react';
import { shallow } from 'enzyme';

import MonthYearView from './MonthYearView.component';

describe('MonthYearView', () => {
	it('should render a MonthYearView', () => {
		// when
		const wrapper = shallow(<MonthYearView
			monthIndexSelected={8}
			yearSelected={2012}
		/>);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
