import React from 'react';
import { shallow } from 'enzyme';

import DayPickerAction from './DayPickerAction.component';

describe('DayPickerAction', () => {
	it('should render', () => {
		// When
		const wrapper = shallow(
			<DayPickerAction />
		);

		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
