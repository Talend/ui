import React from 'react';
import { shallow } from 'enzyme';
import {
	isErrorHidden,
	Error,
	DateTimeValidation,
} from './DateTimeValidation.component';

describe('Date time  validation', () => {
	describe('isErrorHidden', () => {
		it('should not hide when there is only one error', () => {
			// given

			// when
			const hide = isErrorHidden([{}], '', '');

			// then
			expect(hide).toBeFalsy();
		});
		it('should not hide when inputId match focused one', () => {
			// when
			const hide = isErrorHidden([{}, {}], 'input-id1', 'input-id1');

			// then
			expect(hide).toBeFalsy();
		});
		it('should hide when inputId doesnt match focused one', () => {
			// when
			const hide = isErrorHidden([{}, {}], 'focus-id1', 'input-id1');

			// then
			expect(hide).toBeTruthy();
		});
	});
	describe('Error', () => {
		it('should display without sr-only', () => {
			// given
			const errors = [{ code: '', message: 'INVALID_SECONDS_EMPTY' }];
			// when
			const wrapper = shallow(
				<Error errors={errors} id="seconds-id" />,
			);

			// then
			expect(wrapper.find('#seconds-id').hasClass('sr-only')).toBeFalsy();
		});
		it('should display with sr-only', () => {
			// given
			const errors = [{ code: '', message: 'INVALID_SECONDS_EMPTY' }];
			// when
			const wrapper = shallow(
				<Error errors={errors} id="seconds-id" hidden />,
			);

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
