import React from 'react';
import { mount } from 'enzyme';
import toJsonWithoutI18n from '../../../../../test/props-without-i18n';

import { DateTimeContext } from '../Context';
import Validation from './Validation.component';

jest.mock(
	'./Error.component',
	() =>
		function ErrorMock() {
			return null;
		},
);

describe('DateTime.Validation', () => {
	it('should render', () => {
		// given
		const managerValue = {
			errorManagement: {
				errors: [
					{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' },
					{ code: 'INVALID_HOUR', message: 'INVALID_HOUR_EMPTY' },
					{ code: 'INVALID_MINUTES', message: 'INVALID_MINUTES_EMPTY' },
					{ code: 'INVALID_SECONDS', message: 'INVALID_SECONDS_EMPTY' },
				],
				inputErrorId: 'my-custom-input-error',
				hoursErrorId: 'my-custom-hours-error',
				minutesErrorId: 'my-custom-minutes-error',
				secondsErrorId: 'my-custom-seconds-error',
			},
		};

		// when
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<Validation />
			</DateTimeContext.Provider>,
		);

		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should show focused input error', () => {
		// given
		const managerValue = {
			errorManagement: {
				errors: [
					{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' },
					{ code: 'INVALID_HOUR', message: 'INVALID_HOUR_EMPTY' },
					{ code: 'INVALID_MINUTES', message: 'INVALID_MINUTES_EMPTY' },
					{ code: 'INVALID_SECONDS', message: 'INVALID_SECONDS_EMPTY' },
				],
				inputErrorId: 'my-custom-input-error',
				hoursErrorId: 'my-custom-hours-error',
				minutesErrorId: 'my-custom-minutes-error',
				secondsErrorId: 'my-custom-seconds-error',
				focusedInput: 'my-custom-hours-error',
			},
		};

		// when
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<Validation />
			</DateTimeContext.Provider>,
		);

		// then
		expect(wrapper.find('ErrorMock#my-custom-input-error').prop('hidden')).toBe(true);
		expect(wrapper.find('ErrorMock#my-custom-hours-error').prop('hidden')).toBe(false);
		expect(wrapper.find('ErrorMock#my-custom-minutes-error').prop('hidden')).toBe(true);
		expect(wrapper.find('ErrorMock#my-custom-seconds-error').prop('hidden')).toBe(true);
	});
});
