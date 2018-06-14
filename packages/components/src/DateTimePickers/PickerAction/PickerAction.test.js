import React from 'react';
import { shallow } from 'enzyme';

import PickerAction from './PickerAction.component';

describe('PickerAction', () => {
	it('should render', () => {
		// When
		const wrapper = shallow(
			<PickerAction label="whatever" />
		);

		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
