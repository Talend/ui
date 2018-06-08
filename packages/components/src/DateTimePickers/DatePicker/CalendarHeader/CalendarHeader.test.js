import React from 'react';
import { shallow } from 'enzyme';

import CalendarHeader from './CalendarHeader.component';

describe('CalendarHeader', () => {
	it('should render a CalendarHeader', () => {
		// when
		const wrapper = shallow(<CalendarHeader />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
