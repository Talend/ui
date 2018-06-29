import React from 'react';
import { shallow } from 'enzyme';

import DayPickerAction from './DayPickerAction.component';

describe('DayPickerAction', () => {
	it('should render a simple day', () => {
		// When
		const wrapper = shallow(
			<DayPickerAction
				label="36"
				className="my-day-picker-class"
			/>
		);

		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a disabled day', () => {
		// When
		const wrapper = shallow(
			<DayPickerAction
				label="36"
				className="my-day-picker-class"
				isDisabled
			/>
		);

		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a today day', () => {
		// When
		const wrapper = shallow(
			<DayPickerAction
				label="36"
				className="my-day-picker-class"
				isToday
			/>
		);

		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a selected day', () => {
		// When
		const wrapper = shallow(
			<DayPickerAction
				label="36"
				className="my-day-picker-class"
				isSelected
			/>
		);

		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
