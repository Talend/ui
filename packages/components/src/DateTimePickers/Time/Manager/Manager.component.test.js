import React from 'react';
import { shallow, mount } from 'enzyme';
import cases from 'jest-in-case';

import Manager from './Manager.component';
import { TimeContext } from '../Context';

const DEFAULT_ID = 'DEFAULT_ID';

function TimeConsumerDiv() {
	return <div />;
}
// eslint-disable-next-line react/prop-types
function TimeConsumer() {
	return (
		<TimeContext.Consumer>
			{contextValue => <TimeConsumerDiv {...contextValue} />}
		</TimeContext.Consumer>
	);
}

describe('Time.Manager', () => {
	it('should render its children', () => {
		// when
		const wrapper = shallow(
			<Manager id={DEFAULT_ID} value="12:15">
				<TimeConsumer />
			</Manager>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	describe('time management', () => {
		cases(
			'initial state',
			({ value, expectedTime, expectedTextInput }) => {
				// when
				const wrapper = mount(
					<Manager id={DEFAULT_ID} value={value}>
						<TimeConsumer />
					</Manager>,
				);

				// then
				const contextValue = wrapper.find('TimeConsumerDiv').props();
				expect(contextValue.time.textInput).toBe(expectedTextInput);
				expect(contextValue.time.time).toEqual(expectedTime);
			},
			[
				{
					name: 'init state with passed time value',
					value: '12:15',
					expectedTime: { hours: '12', minutes: '15', seconds: '00' },
					expectedTextInput: '12:15',
				},
				{
					name: 'init state when no time value provided',
					value: undefined,
					expectedTime: null,
					expectedTextInput: '',
				},
			],
		);
		describe('input change', () => {
			cases(
				'should update picker value',
				({ textInput, expectedTime, expectedValue }) => {
					// given
					const event = { target: { value: textInput } };
					const wrapper = mount(
						<Manager id={DEFAULT_ID}>
							<TimeConsumer />
						</Manager>,
					);

					// when
					wrapper
						.find('TimeConsumerDiv')
						.prop('inputManagement')
						.onChange(event);
					wrapper.update();

					// then
					const time = wrapper.find('TimeConsumerDiv').prop('time');
					expect(time.textInput).toBe(expectedValue);
					expect(time.time).toEqual(expectedTime);
				},
				[
					{
						name: 'with valid time',
						textInput: '07:20',
						expectedTime: { hours: '07', minutes: '20', seconds: '00' },
						expectedValue: '07:20',
					},
					{
						name: 'with invalid time',
						textInput: '25:20',
						expectedTime: { hours: '25', minutes: '20', seconds: '00' },
						expectedValue: '25:20',
					},
				],
			);
			it('should trigger props.onChange with valid time', () => {
				// given
				const onChange = jest.fn();
				const event = { target: { value: '15:45' } };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<TimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				wrapper
					.find('TimeConsumerDiv')
					.prop('inputManagement')
					.onChange(event);

				// then
				expect(onChange).toBeCalledWith(event, {
					time: {
						hours: '15',
						minutes: '45',
						seconds: '00',
					},
					origin: 'INPUT',
					textInput: '15:45',
					errors: [],
					errorMessage: null,
				});
			});

			it('should trigger props.onChange with invalid time', () => {
				// given
				const onChange = jest.fn();
				const event = { target: { value: 'ddrer' } };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<TimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				wrapper
					.find('TimeConsumerDiv')
					.prop('inputManagement')
					.onChange(event);

				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(args[0]).toBe(event);
				expect(args[1].errorMessage).toBe('Time is invalid');
				expect(args[1].errors).toEqual([
					{ code: 'TIME_FORMAT_INVALID', message: 'Time is invalid' },
				]);
				expect(args[1].origin).toBe('INPUT');
			});
		});
		describe('picker change', () => {
			cases(
				'should update input',
				({ time, textInput, expectedTextInput, useSeconds }) => {
					// given
					const event = { preventDefault: () => {} };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} useSeconds={useSeconds}>
							<TimeConsumer />
						</Manager>,
					);

					// when
					wrapper
						.find('TimeConsumerDiv')
						.prop('pickerManagement')
						.onChange(event, { time, textInput });
					wrapper.update();

					// then
					const timeState = wrapper.find('TimeConsumerDiv').prop('time');
					expect(timeState.textInput).toBe(expectedTextInput);
					expect(timeState.time).toEqual(time);
				},
				[
					{
						name: 'with valid time',
						time: { hours: '15', minutes: '45', seconds: '00' },
						textInput: '15:45',
						expectedTextInput: '15:45',
						useSeconds: false,
					},
					{
						name: 'with valid time with seconds',
						time: { hours: '15', minutes: '45', seconds: '00' },
						textInput: '15:45:00',
						expectedTextInput: '15:45:00',
						useSeconds: true,
					},
				],
			);

			it('should trigger props.onChange with valid time', () => {
				// given
				const onChange = jest.fn();
				const event = { target: {}, preventDefault: () => {} };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<TimeConsumer />
					</Manager>,
				);

				expect(onChange).not.toBeCalled();

				// when
				wrapper
					.find('TimeConsumerDiv')
					.prop('pickerManagement')
					.onChange(event, {
						time: { hours: '15', minutes: '45', seconds: '00' },
						textInput: '15:45',
					});

				// then
				expect(onChange).toBeCalledWith(event, {
					origin: 'PICKER',
					textInput: '15:45',
					time: { hours: '15', minutes: '45', seconds: '00' },
					errors: [],
					errorMessage: null,
				});
			});
		});
	});
});
