import React from 'react';
import { shallow } from 'enzyme';

import CalendarBody from './CalendarBody.component';

describe('CalendarBody', () => {
	it('should render a CalendarBody', () => {
		// when
		const wrapper = shallow(<CalendarBody />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
