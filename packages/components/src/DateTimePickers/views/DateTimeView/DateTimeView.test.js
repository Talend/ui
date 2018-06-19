import React from 'react';
import { shallow } from 'enzyme';

import DateTimeView from './DateTimeView.component';

describe('DateTimeView', () => {
	it('should render a DateTimeView', () => {
		// when
		const wrapper = shallow(<DateTimeView
			monthSelected={5}
			yearSelected={2006}
		/>);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
