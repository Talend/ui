import React from 'react';
import { shallow } from 'enzyme';
import { Error, DateTimeValidation } from './DateTimeValidation.component';

describe('Date time  validation', () => {
	describe('Error', () => {
		it('should display without sr-only', () => {
			// given
			const errors = [{ code: '', message: 'INVALID_SECONDS_EMPTY' }];
			// when
			const wrapper = shallow(<Error errors={errors} id="seconds-id" />);

			// then
			expect(wrapper.find('#seconds-id').hasClass('sr-only')).toBeFalsy();
		});
		it('should display with sr-only', () => {
			// given
			const errors = [{ code: '', message: 'INVALID_SECONDS_EMPTY' }];
			// when
			const wrapper = shallow(<Error errors={errors} id="seconds-id" hidden />);

			// then
			expect(wrapper.find('#seconds-id').hasClass('sr-only')).toBeTruthy();
		});
	});
	describe('DateTimeValidation', () => {
		it('should render the component with error in seconds', () => {
			// given
			const errors = [{ code: 'INVALID_SECONDS', message: 'INVALID_SECONDS_EMPTY' }];
			// when
			const wrapper = shallow(
				<DateTimeValidation
					errors={errors}
					inputErrorId="input-id"
					hoursErrorId="hour-id"
					minutesErrorId="minutes-id"
					secondsErrorId="seconds-id"
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});
		it('should render the component and hide all errors except focused one', () => {
			// given
			const errors = [
				{ code: 'INVALID_SECONDS', message: 'INVALID_SECONDS_EMPTY' },
				{ code: 'INVALID_MONTH', message: 'INVALID_MONTH_NUMBER' },
			];
			// when
			const wrapper = shallow(
				<DateTimeValidation
					focusedInput="seconds-id"
					errors={errors}
					inputErrorId="input-id"
					hoursErrorId="hour-id"
					minutesErrorId="minutes-id"
					secondsErrorId="seconds-id"
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
