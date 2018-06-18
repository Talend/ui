import React from 'react';
import { shallow } from 'enzyme';

import DateTimeView from './DateTimeView.component';

describe('DateTimeView', () => {
	it('should render a DateTimeView', () => {
		// when
		const wrapper = shallow(<DateTimeView />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
