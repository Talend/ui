import React from 'react';
import { shallow } from 'enzyme';
import { FIELD_MINUTES, FIELD_HOURS } from '../../DateTime/constants';

// ensure you're resetting modules before each test
beforeEach(() => {
	jest.resetModules();
});

// Takes the context data we want to test, or uses defaults
const getTimePickerWithContext = (
	errorContext = {
		hasError: () => false,
		onInputFocus: jest.fn(),
		hoursErrorId: 'error-hours',
		minutesErrorId: 'error-minutes',
		secondsErrorId: 'error-seconds',
	},
) => {
	// Will then mock the LocalizeContext module being used in our LanguageSelector component
	/* eslint-disable */
	jest.doMock('../../DateTime/Context', () => ({
		DateTimeContext: {
			Consumer: props =>
				props.children({
					errorManagement: errorContext,
				}),
		},
	}));

	// you need to re-require after calling jest.doMock.
	// return the updated TimePicker module that now includes the mocked context
	return require('./TimePicker.component').default;
	/* eslint-enable */
};

describe('TimePicker', () => {
	it('should render', () => {
		const TimePicker = getTimePickerWithContext();
		// when
		const wrapper = shallow(
			<TimePicker value={{ hours: '15', minutes: '38' }} onChange={jest.fn()} />,
		);

		// then
		expect(
			wrapper
				.dive()
				.find('.tc-date-picker-time')
				.getElement(),
		).toMatchSnapshot();
	});

	it('should render with error', () => {
		const TimePicker = getTimePickerWithContext({
			hasError: () => true,
			hoursErrorId: 'hoursErrorId',
			minutesErrorId: 'minutesErrorId',
			secondsErrorId: 'secondsErrorId',
		});
		// when
		const wrapper = shallow(
			<TimePicker value={{ hours: '15', minutes: '38' }} onChange={jest.fn()} useSeconds />,
		);

		// then
		expect(
			wrapper
				.dive()
				.find('.tc-date-picker-time')
				.getElement(),
		).toMatchSnapshot();
	});

	it('should render UTC legend', () => {
		// when
		const TimePicker = getTimePickerWithContext();
		const wrapper = shallow(
			<TimePicker value={{ hours: '15', minutes: '38' }} onChange={jest.fn()} useUTC />,
		);

		// then
		expect(
			wrapper
				.dive()
				.find('legend')
				.getElement(),
		).toMatchSnapshot();
	});

	it('should trigger onChange on hours change', () => {
		// given
		const TimePicker = getTimePickerWithContext({
			hasError: () => true,
			hoursErrorId: 'hoursErrorId',
			minutesErrorId: 'minutesErrorId',
			secondsErrorId: 'secondsErrorId',
		});
		const onChange = jest.fn();
		const wrapper = shallow(
			<TimePicker value={{ hours: '15', minutes: '38' }} onChange={onChange} />,
		);

		const event = { target: { value: '17' } };
		expect(onChange).not.toBeCalled();

		// when
		wrapper
			.dive()
			.find('DebounceInput')
			.at(0)
			.simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { hours: '17', minutes: '38' }, FIELD_HOURS);
	});

	it('should trigger onChange on minutes change', () => {
		// given
		const TimePicker = getTimePickerWithContext();
		const onChange = jest.fn();
		const wrapper = shallow(
			<TimePicker value={{ hours: '15', minutes: '38' }} onChange={onChange} />,
		);
		const event = { target: { value: '17' } };
		expect(onChange).not.toBeCalled();

		// when
		wrapper
			.dive()
			.find('DebounceInput')
			.at(1)
			.simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { hours: '15', minutes: '17' }, FIELD_MINUTES);
	});

	it('should manage tabIndex', () => {
		// given
		const TimePicker = getTimePickerWithContext();
		const wrapper = shallow(<TimePicker onChange={jest.fn()} />);
		expect(
			wrapper
				.dive()
				.find('DebounceInput')
				.at(0)
				.prop('tabIndex'),
		).toBe(-1);
		expect(
			wrapper
				.dive()
				.find('DebounceInput')
				.at(1)
				.prop('tabIndex'),
		).toBe(-1);

		// when
		wrapper.setProps({ allowFocus: true });

		// then
		expect(
			wrapper
				.dive()
				.find('DebounceInput')
				.at(0)
				.prop('tabIndex'),
		).toBe(0);
		expect(
			wrapper
				.dive()
				.find('DebounceInput')
				.at(1)
				.prop('tabIndex'),
		).toBe(0);
	});
});
