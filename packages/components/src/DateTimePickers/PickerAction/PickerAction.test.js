import React from 'react';
import { shallow } from 'enzyme';

import PickerAction from './PickerAction.component';

describe('PickerAction', () => {
	it('should render a simple button', () => {
		// When
		const wrapper = shallow(
			<PickerAction label="whatever" />
		);

		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a disabled button', () => {
		// When
		const wrapper = shallow(
			<PickerAction label="whatever" disabled />
		);

		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
