import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import cases from 'jest-in-case';
import simulant from 'simulant';

import isSameDay from 'date-fns/is_same_day';
import isSameMinute from 'date-fns/is_same_minute';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';

import InputDateTimePicker from './InputDateTimePicker.component';
import DateTimePicker from '../DateTimePicker';

function getRootElement() {
	const rootElement = document.createElement('div');
	document.body.appendChild(rootElement);
	return rootElement;
}

describe('InputDateTimePicker', () => {
	describe('render', () => {
		it('should render', () => {
			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2017, 3, 4, 15, 27)} />,
				{ disableLifecycleMethods: true },
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render with "date", "time", "textInput" values based on state', () => {
			const wrapper = shallow(<InputDateTimePicker />, { disableLifecycleMethods: true });

			const date = new Date(2016, 6, 25);
			const time = 456;
			const textInput = '2016-05-25 07:36';

			wrapper.setState({
				date,
				time,
				textInput,
			});

			wrapper.update();

			const inputWrapper = wrapper.find('DebounceInput');
			const dateTimePickerWrapper = wrapper.find(DateTimePicker);
			expect(dateTimePickerWrapper.prop('selection').date).toBe(date);
			expect(dateTimePickerWrapper.prop('selection').time).toBe(time);
			expect(inputWrapper.prop('value')).toBe(textInput);
		});
	});

	describe('constructor', () => {
		it('should default set the state based on "selectedDateTime" when given', () => {
			const date = new Date(2015, 3, 4, 12, 36);
			const wrapper = shallow(<InputDateTimePicker selectedDateTime={date} />, {
				disableLifecycleMethods: true,
			});

			const testedDate = wrapper.state('date');
			const expectedDate = new Date(2015, 3, 4);
			expect(isSameDay(testedDate, expectedDate)).toBe(true);

			const testedTime = wrapper.state('time');
			const expectedTime = 12 * 60 + 36;
			expect(testedTime).toBe(expectedTime);

			const testedTextInput = wrapper.state('textInput');
			const expectedTextInput = '2015-04-04 12:36';
			expect(testedTextInput).toBe(expectedTextInput);
		});

		it('should default set the state with undefined and empty values when "selectedDateTime" is not given', () => {
			const wrapper = shallow(<InputDateTimePicker />, { disableLifecycleMethods: true });

			expect(wrapper.state('date')).toBeUndefined();
			expect(wrapper.state('time')).toBeUndefined();
			expect(wrapper.state('textInput')).toBe('');
		});
	});

	describe('input changes update the state', () => {
		describe('undefined values', () => {
			it('should have undefined date and time values when global format is wrong', () => {
				const invalidFormatValues = [
					'2023-06-05,10:00',
					'2023-06-05|10:00',
					'2023-06-05.10:00',
					'whatever',
				];

				const wrapper = shallow(<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1)} />, {
					disableLifecycleMethods: true,
				});

				const inputWrapper = wrapper.find('DebounceInput');

				invalidFormatValues.forEach(invalidValue => {
					inputWrapper.prop('onChange')({
						target: {
							value: invalidValue,
						},
					});
					expect(wrapper.state('date')).toBeUndefined();
					expect(wrapper.state('time')).toBeUndefined();
				});
			});

			describe('date', () => {
				it('should have undefined date when date part format is wrong', () => {
					const invalidFormatValues = ['023-06-05 10:00', '2023-06- 10:00', '2023--05 10:00'];

					const wrapper = shallow(<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1)} />, {
						disableLifecycleMethods: true,
					});

					const inputWrapper = wrapper.find('DebounceInput');
					invalidFormatValues.forEach(invalidValue => {
						inputWrapper.prop('onChange')({
							target: {
								value: invalidValue,
							},
						});
						expect(wrapper.state('date')).toBeUndefined();
					});
				});

				it('should have undefined date if month is before 1 or after 12', () => {
					const invalidFormatValues = ['2023-0-05 10:00', '2023-13-05 10:00'];

					const wrapper = shallow(<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1)} />, {
						disableLifecycleMethods: true,
					});

					const inputWrapper = wrapper.find('DebounceInput');
					invalidFormatValues.forEach(invalidValue => {
						inputWrapper.prop('onChange')({
							target: {
								value: invalidValue,
							},
						});
						expect(wrapper.state('date')).toBeUndefined();
					});
				});

				it('should have undefined date if day is before 1', () => {
					const invalidFormatValue = '2023-02-0 10:00';

					const wrapper = shallow(<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1)} />, {
						disableLifecycleMethods: true,
					});

					const inputWrapper = wrapper.find('DebounceInput');
					inputWrapper.prop('onChange')({
						target: {
							value: invalidFormatValue,
						},
					});
					expect(wrapper.state('date')).toBeUndefined();
				});

				it('should have undefined date if day is after the last day of month', () => {
					const invalidFormatValues = ['2018-06-31 10:00', '2018-02-29 10:00'];

					const wrapper = shallow(<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1)} />, {
						disableLifecycleMethods: true,
					});

					const inputWrapper = wrapper.find('DebounceInput');
					invalidFormatValues.forEach(invalidValue => {
						inputWrapper.prop('onChange')({
							target: {
								value: invalidValue,
							},
						});
						expect(wrapper.state('date')).toBeUndefined();
					});
				});
			});

			describe('time', () => {
				it('should have undefined time when time part format is wrong', () => {
					const invalidFormatValues = [
						'2000-01-01 sldfkj',
						'2000-01-01 10|00',
						'2000-01-01 10:',
						'2000-01-01 10:1',
						'2000-01-01 10:123',
						'2000-01-01 :11',
						'2000-01-01 123:11',
					];

					const wrapper = shallow(
						<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
						{ disableLifecycleMethods: true },
					);

					const inputWrapper = wrapper.find('DebounceInput');
					invalidFormatValues.forEach(invalidValue => {
						inputWrapper.prop('onChange')({
							target: {
								value: invalidValue,
							},
						});
						expect(wrapper.state('time')).toBeUndefined();
					});
				});

				it('should have undefined time when hour is after 23', () => {
					const invalidFormatValue = '2000-01-01 24:35';

					const wrapper = shallow(
						<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
						{ disableLifecycleMethods: true },
					);

					const inputWrapper = wrapper.find('DebounceInput');
					inputWrapper.prop('onChange')({
						target: {
							value: invalidFormatValue,
						},
					});
					expect(wrapper.state('time')).toBeUndefined();
				});

				it('should have undefined time when minutes is after 59', () => {
					const invalidFormatValue = '2000-01-01 12:65';

					const wrapper = shallow(
						<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
						{ disableLifecycleMethods: true },
					);

					const inputWrapper = wrapper.find('DebounceInput');
					inputWrapper.prop('onChange')({
						target: {
							value: invalidFormatValue,
						},
					});
					expect(wrapper.state('time')).toBeUndefined();
				});
			});
		});

		it('should retrieve the correct date and time from input value when both are valid', () => {
			const validFormatValuesWithExpection = [
				[' 2017-2-1     1:10  ', new Date(2017, 1, 1, 1, 10)],
				['2016-07-03 12:36', new Date(2016, 6, 3, 12, 36)],
				['2022-12-19 23:59', new Date(2022, 11, 19, 23, 59)],
			];

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			validFormatValuesWithExpection.forEach(([validFormat, expected]) => {
				inputWrapper.prop('onChange')({
					target: {
						value: validFormat,
					},
				});

				expect(isSameDay(wrapper.state('date'), expected)).toBe(true);
				const expectedHours = getHours(expected);
				const expectedMinutes = getMinutes(expected);
				const expectedTime = expectedHours * 60 + expectedMinutes;
				expect(wrapper.state('time')).toBe(expectedTime);
			});
		});

		it('should retrieve a correct date even when the global format is invalid', () => {
			const stringValuesWithExpection = [
				[' 2017-2-1    ', new Date(2017, 1, 1)],
				['2016-07-03', new Date(2016, 6, 3)],
				['  2022-12-19 654654', new Date(2022, 11, 19)],
			];

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			stringValuesWithExpection.forEach(([string, expected]) => {
				inputWrapper.prop('onChange')({
					target: {
						value: string,
					},
				});

				expect(isSameDay(wrapper.state('date'), expected)).toBe(true);
				expect(wrapper.state('time')).toBeUndefined();
			});
		});

		it('should retrieve a correct time even when the global format is invalid', () => {
			const stringValuesWithExpection = [
				[' 10:32    ', 10 * 60 + 32],
				['11:43', 11 * 60 + 43],
				[' dfgsdfg   14:12 ', 14 * 60 + 12],
			];

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			stringValuesWithExpection.forEach(([string, expected]) => {
				inputWrapper.prop('onChange')({
					target: {
						value: string,
					},
				});

				expect(wrapper.state('date')).toBeUndefined();
				expect(wrapper.state('time')).toBe(expected);
			});
		});
	});

	describe('picker changes update the state', () => {
		it('should update the "date" and "time" state when a new datetime is picked', () => {
			const testedDate = new Date(2015, 11, 30);
			const testedTime = 1250;

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
				{ disableLifecycleMethods: true },
			);
			const dateTimePickerWrapper = wrapper.find(DateTimePicker);

			dateTimePickerWrapper.prop('onSubmit')({
				date: testedDate,
				time: testedTime,
			});

			expect(wrapper.state('date')).toBe(testedDate);
			expect(wrapper.state('time')).toBe(testedTime);
		});

		it('should update the "textInput" state when a new datetime is picked', () => {
			const testedDate = new Date(2015, 11, 30);
			const testedTime = 1250;

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
				{ disableLifecycleMethods: true },
			);

			const dateTimePickerWrapper = wrapper.find(DateTimePicker);

			dateTimePickerWrapper.prop('onSubmit')({
				date: testedDate,
				time: testedTime,
			});

			expect(wrapper.state('textInput')).toBe('2015-12-30 20:50');
		});
	});

	describe('callback onChange', () => {
		it('should callback with the correct date when the datetime change with the input', () => {
			const testedValue = '2005-09-25 02:46';
			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')({
				target: {
					value: testedValue,
				},
			});
			expect(onChange).toHaveBeenCalled();
			expect(isSameMinute(onChange.mock.calls[0][1], new Date(2005, 8, 25, 2, 46))).toBe(true);
		});

		it('should callback with undefined when the datetime change with an invalid input value', () => {
			const validString = '2005-01-01 10:00';
			const testedValues = [
				'20005-09-25 02:46',
				'2005-09-25',
				'   2005-09-25  ',
				'   2005-09-25  qsdfdsf',
				'10:32',
				'  10:32  ',
				' qsdfdqsf 10:32  ',
			];
			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');

			testedValues.forEach(string => {
				inputWrapper.prop('onChange')({
					target: {
						value: validString,
					},
				});
				onChange.mockReset();

				inputWrapper.prop('onChange')({
					target: {
						value: string,
					},
				});

				expect(onChange.mock.calls[0][1]).toBeUndefined();
			});
		});

		it('should callback with the correct date when the datetime change with the picker', () => {
			const testedDate = new Date(2015, 11, 30);
			const testedTime = 1250;
			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);
			const dateTimePickerWrapper = wrapper.find(DateTimePicker);

			dateTimePickerWrapper.prop('onSubmit')({
				date: testedDate,
				time: testedTime,
			});

			expect(onChange).toHaveBeenCalled();
			expect(isSameMinute(onChange.mock.calls[0][1], new Date(2015, 11, 30, 20, 50))).toBe(true);
		});

		it('should not callback if datetime has not changed from undefined value', () => {
			const firstInvalidInput = 'whatever';
			const secondInvalidInput = 'somethingelse';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={new Date(2015, 0, 1, 10, 35)} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')({
				target: {
					value: firstInvalidInput,
				},
			});

			onChange.mockReset();

			inputWrapper.prop('onChange')({
				target: {
					value: secondInvalidInput,
				},
			});

			expect(onChange).not.toHaveBeenCalled();
		});

		it('should not callback if datetime has not changed from a defined value', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const validIdenticalInput = '2015-01-01  10:35';
			const pickerIndenticalDatas = {
				date: new Date(2015, 0, 1),
				time: 10 * 60 + 35,
			};

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')({
				target: {
					value: validIdenticalInput,
				},
			});

			expect(onChange).not.toHaveBeenCalled();
			onChange.mockReset();

			const dateTimePickerWrapper = wrapper.find(DateTimePicker);
			dateTimePickerWrapper.prop('onSubmit')(pickerIndenticalDatas);

			expect(onChange).not.toHaveBeenCalled();
		});
	});

	describe('callback onChange with error', () => {
		it('should callback with error message when format is invalid while it was valid before', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const invalidInput = 'blablabla';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')({
				target: {
					value: invalidInput,
				},
			});

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(typeof onChange.mock.calls[0][0]).toBe('string');
		});

		it('should callback with error message when month number is invalid while it was valid before', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const invalidInput = '2018-15-01 00:00';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')({
				target: {
					value: invalidInput,
				},
			});

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(typeof onChange.mock.calls[0][0]).toBe('string');
		});

		it('should callback with error message when day number is invalid while it was valid before', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const invalidInput = '2018-10-36 00:00';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')({
				target: {
					value: invalidInput,
				},
			});

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(typeof onChange.mock.calls[0][0]).toBe('string');
		});

		it('should callback with error message when hours number is invalid while it was valid before', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const invalidInput = '2018-10-01 36:00';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')({
				target: {
					value: invalidInput,
				},
			});

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(typeof onChange.mock.calls[0][0]).toBe('string');
		});

		it('should callback with error message when minutes number is invalid while it was valid before', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const invalidInput = '2018-10-01 00:70';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')({
				target: {
					value: invalidInput,
				},
			});

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(typeof onChange.mock.calls[0][0]).toBe('string');
		});

		it('should callback with no error message (undefined) when input has been correctly parsed while it was invalid before', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const invalidInput = 'kjqhsdfkhsd';
			const validInput = '2018-10-01 00:55';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');

			inputWrapper.prop('onChange')({
				target: {
					value: invalidInput,
				},
			});

			onChange.mockReset();

			inputWrapper.prop('onChange')({
				target: {
					value: validInput,
				},
			});

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange.mock.calls[0][0]).toBeUndefined();
		});

		it('should callback if error message has changed', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const firstInvalidInput = '2018-72-01 00:00';
			const secondValidInput = '2018-05-01 42:00';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');

			inputWrapper.prop('onChange')({
				target: {
					value: firstInvalidInput,
				},
			});

			onChange.mockReset();

			inputWrapper.prop('onChange')({
				target: {
					value: secondValidInput,
				},
			});

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(typeof onChange.mock.calls[0][0]).toBe('string');
		});

		it('should not callback if error message has not changed', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const firstInvalidInput = '2018-72-01 00:00';
			const secondValidInput = '2018-42-01 00:00';

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');

			inputWrapper.prop('onChange')({
				target: {
					value: firstInvalidInput,
				},
			});

			onChange.mockReset();

			inputWrapper.prop('onChange')({
				target: {
					value: secondValidInput,
				},
			});

			expect(onChange).not.toHaveBeenCalled();
		});

		it('should not callback if still no error when changed with input or picker', () => {
			const defaultDateTime = new Date(2015, 0, 1, 10, 35);
			const validInput = '2018-09-01 12:26';
			const pickerDatas = {
				date: new Date(2018, 8, 1),
				time: 12 * 60 + 26,
			};

			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker selectedDateTime={defaultDateTime} onChange={onChange} />,
				{ disableLifecycleMethods: true },
			);

			const inputWrapper = wrapper.find('DebounceInput');

			inputWrapper.prop('onChange')({
				target: {
					value: validInput,
				},
			});

			onChange.mockReset();

			const dateTimePickerWrapper = wrapper.find(DateTimePicker);

			dateTimePickerWrapper.prop('onSubmit')(pickerDatas);

			expect(onChange).not.toHaveBeenCalled();
		});
	});

	describe('dropdown management', () => {
		it('should have the dropdown closed by default', () => {
			const wrapper = mount(<InputDateTimePicker />, { attachTo: getRootElement() });

			const overlayWrapper = wrapper.find('Overlay').first();
			expect(overlayWrapper.prop('show')).toBe(false);
		});

		it('should open the dropdown on input focus', () => {
			const wrapper = mount(<InputDateTimePicker />, { attachTo: getRootElement() });

			const inputWrapper = wrapper.find('DebounceInput');

			inputWrapper.simulate('focus');

			wrapper.update();

			const overlayWrapper = wrapper.find('Overlay').first();
			expect(overlayWrapper.prop('show')).toBe(true);
		});

		cases(
			'should close the dropdown when interacting outside the component',
			({ eventToCheck }) => {
				const wrapper = mount(
					<div>
						<InputDateTimePicker />
						<input className="some-random-input" />
					</div>,
					{ attachTo: getRootElement() },
				);

				const inputWrapper = wrapper.find('DebounceInput');
				inputWrapper.simulate('focus');

				wrapper.update();

				const overlayWrapperBefore = wrapper.find('Overlay').first();
				expect(overlayWrapperBefore.prop('show')).toBe(true);

				simulant.fire(document.body.querySelector('input.some-random-input'), eventToCheck);

				wrapper.update();

				const overlayWrapperAfter = wrapper.find('Overlay').first();
				expect(overlayWrapperAfter.prop('show')).toBe(false);
			},
			[
				{ name: 'focusin event', eventToCheck: 'focusin' },
				{ name: 'click event', eventToCheck: 'click' },
			],
		);

		cases(
			'should not close the dropdown when interacting inside the component',
			({ eventToCheck }) => {
				const wrapper = mount(
					<div>
						<InputDateTimePicker />
						<input className="some-random-input" />
					</div>,
					{ attachTo: getRootElement() },
				);

				const inputWrapper = wrapper.find('DebounceInput');
				inputWrapper.simulate('focus');

				wrapper.update();

				const overlayWrapperBefore = wrapper.find('Overlay').first();
				expect(overlayWrapperBefore.prop('show')).toBe(true);

				simulant.fire(wrapper.getDOMNode().querySelector('button'), eventToCheck);

				wrapper.update();

				const overlayWrapperAfter = wrapper.find('Overlay').first();
				expect(overlayWrapperAfter.prop('show')).toBe(true);
			},
			[
				{ name: 'focusin event', eventToCheck: 'focusin' },
				{ name: 'click event', eventToCheck: 'click' },
			],
		);

		it('should close the dropdown when picker is submitted', () => {
			const wrapper = mount(<InputDateTimePicker />, { attachTo: getRootElement() });

			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.simulate('focus');

			wrapper.update();

			const overlayWrapperBefore = wrapper.find('Overlay').first();
			expect(overlayWrapperBefore.prop('show')).toBe(true);

			const portalInstance = wrapper.find('Portal').instance();
			const dropdownContent = new ReactWrapper(portalInstance.props.children);

			const pickerWrapper = dropdownContent.find(DateTimePicker);
			pickerWrapper.prop('onSubmit')({
				date: new Date(2018, 0, 1),
				time: 50,
			});

			wrapper.update();

			const overlayWrapperAfter = wrapper.find('Overlay').first();
			expect(overlayWrapperAfter.prop('show')).toBe(false);
		});
	});
});
