import React from 'react';
import { shallow } from 'enzyme';

import isSameDay from 'date-fns/is_same_day';
import isSameMinute from 'date-fns/is_same_minute';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';

import InputDateTimePicker from './InputDateTimePicker.component';
import DateTimePicker from '../DateTimePicker';

describe('InputDateTimePicker', () => {
	describe('render', () => {
		it('should render', () => {
			const wrapper = shallow(
				<InputDateTimePicker
					selectedDateTime={new Date(2017, 3, 4, 15, 27)}
					onChange={() => {}}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render with "date", "time", "textInput" values based on state', () => {
			const wrapper = shallow(
				<InputDateTimePicker
					onChange={() => {}}
				/>
			);

			const date = new Date(2016, 6, 25);
			const time = 456;
			const textInput = '25/05/2016, 07:36';

			wrapper.setState({
				date,
				time,
				textInput,
			});

			const inputWrapper = wrapper.find('input');
			const dateTimePickerWrapper = wrapper.find(DateTimePicker);
			expect(dateTimePickerWrapper.prop('selectedDate')).toBe(date);
			expect(dateTimePickerWrapper.prop('selectedTime')).toBe(time);
			expect(inputWrapper.prop('value')).toBe(textInput);
		});
	});

	describe('constructor', () => {
		it('should default set the state based on "selectedDateTime" when given', () => {
			const date = new Date(2015, 3, 4, 12, 36);
			const wrapper = shallow(
				<InputDateTimePicker
					selectedDateTime={date}
					onChange={() => {}}
				/>
			);

			const testedDate = wrapper.state('date');
			const expectedDate = new Date(2015, 3, 4);
			expect(isSameDay(testedDate, expectedDate)).toBe(true);

			const testedTime = wrapper.state('time');
			const expectedTime = 12 * 60 + 36;
			expect(testedTime).toBe(expectedTime);

			const testedTextInput = wrapper.state('textInput');
			const expectedTextInput = '04/04/2015, 12:36';
			expect(testedTextInput).toBe(expectedTextInput);
		});

		it('should default set the state with undefined and empty values when "selectedDateTime" is not given', () => {
			const wrapper = shallow(
				<InputDateTimePicker
					onChange={() => {}}
				/>
			);

			expect(wrapper.state('date')).toBeUndefined();
			expect(wrapper.state('time')).toBeUndefined();
			expect(wrapper.state('textInput')).toBe('');
		});
	});

	describe('input changes update the state', () => {
		describe('undefined values', () => {
			it('should have undefined date and time values when global format is wrong', () => {
				const invalidFormatValues = [
					'05/06/2023 10:00',
					'05/06/2023|10:00',
					'05/06/2023.10:00',
				];

				const wrapper = shallow(
					<InputDateTimePicker
						selectedDate={new Date(2015, 0, 1)}
						onChange={() => {}}
					/>
				);

				const inputWrapper = wrapper.find('input');

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
					const invalidFormatValues = [
						'05/06/023, 10:00',
						'/06/2023, 10:00',
						'05//2023, 10:00',
					];

					const wrapper = shallow(
						<InputDateTimePicker
							selectedDate={new Date(2015, 0, 1)}
							onChange={() => {}}
						/>
					);

					const inputWrapper = wrapper.find('input');
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
					const invalidFormatValues = [
						'05/0/2023, 10:00',
						'05/13/2023, 10:00',
					];

					const wrapper = shallow(
						<InputDateTimePicker
							selectedDate={new Date(2015, 0, 1)}
							onChange={() => {}}
						/>
					);

					const inputWrapper = wrapper.find('input');
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
					const invalidFormatValue = '0/02/2023, 10:00';

					const wrapper = shallow(
						<InputDateTimePicker
							selectedDate={new Date(2015, 0, 1)}
							onChange={() => {}}
						/>
					);

					const inputWrapper = wrapper.find('input');
					inputWrapper.prop('onChange')({
						target: {
							value: invalidFormatValue,
						},
					});
					expect(wrapper.state('date')).toBeUndefined();
				});

				it('should have undefined date if day is after the last day of month', () => {
					const invalidFormatValues = [
						'31/06/2018, 10:00',
						'29/02/2018, 10:00',
					];

					const wrapper = shallow(
						<InputDateTimePicker
							selectedDate={new Date(2015, 0, 1)}
							onChange={() => {}}
						/>
					);

					const inputWrapper = wrapper.find('input');
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
						'01/01/2000, sldfkj',
						'01/01/2000, 10|00',
						'01/01/2000, 10:',
						'01/01/2000, 10:1',
						'01/01/2000, 10:123',
						'01/01/2000, :11',
						'01/01/2000, 123:11',
					];

					const wrapper = shallow(
						<InputDateTimePicker
							selectedDate={new Date(2015, 0, 1, 10, 35)}
							onChange={() => {}}
						/>
					);

					const inputWrapper = wrapper.find('input');
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
					const invalidFormatValue = '01/01/2000, 24:35';

					const wrapper = shallow(
						<InputDateTimePicker
							selectedDate={new Date(2015, 0, 1, 10, 35)}
							onChange={() => {}}
						/>
					);

					const inputWrapper = wrapper.find('input');
					inputWrapper.prop('onChange')({
						target: {
							value: invalidFormatValue,
						},
					});
					expect(wrapper.state('time')).toBeUndefined();
				});

				it('should have undefined time when minutes is after 59', () => {
					const invalidFormatValue = '01/01/2000, 12:65';

					const wrapper = shallow(
						<InputDateTimePicker
							selectedDate={new Date(2015, 0, 1, 10, 35)}
							onChange={() => {}}
						/>
					);

					const inputWrapper = wrapper.find('input');
					inputWrapper.prop('onChange')({
						target: {
							value: invalidFormatValue,
						},
					});
					expect(wrapper.state('time')).toBeUndefined();
				});
			});
		});

		it('should retrieve the correct date and input from input value', () => {
			const validFormatValuesWithExpection = [
				[' 1/2/2017   ,  1:10  ', new Date(2017, 1, 1, 1, 10)],
				['03/07/2016, 12:36', new Date(2016, 6, 3, 12, 36)],
				['19/12/2022, 23:59', new Date(2022, 11, 19, 23, 59)],
			];

			const wrapper = shallow(
				<InputDateTimePicker
					selectedDate={new Date(2015, 0, 1, 10, 35)}
					onChange={() => {}}
				/>
			);

			const inputWrapper = wrapper.find('input');
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
	});


	describe('picker changes update the state', () => {
		it('should update the "date" and "time" state when a new datetime is picked', () => {
			const testedDate = new Date(2015, 11, 30);
			const testedTime = 1250;

			const wrapper = shallow(
				<InputDateTimePicker
					selectedDate={new Date(2015, 0, 1, 10, 35)}
					onChange={() => {}}
				/>
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
				<InputDateTimePicker
					selectedDate={new Date(2015, 0, 1, 10, 35)}
					onChange={() => {}}
				/>
			);
			const dateTimePickerWrapper = wrapper.find(DateTimePicker);

			dateTimePickerWrapper.prop('onSubmit')({
				date: testedDate,
				time: testedTime,
			});

			expect(wrapper.state('textInput')).toBe('30/12/2015, 20:50');
		});
	});


	describe('callback onChange', () => {
		it('should callback with the correct date when the datetime change with the input', () => {
			const testedValue = '25/09/2005, 02:46';
			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker
					selectedDate={new Date(2015, 0, 1, 10, 35)}
					onChange={onChange}
				/>
			);

			const inputWrapper = wrapper.find('input');
			inputWrapper.prop('onChange')({
				target: {
					value: testedValue,
				},
			});
			expect(onChange).toHaveBeenCalled();
			expect(isSameMinute(onChange.mock.calls[0][0], new Date(2005, 8, 25, 2, 46))).toBe(true);
		});

		it('should callback with undefined when the datetime change with an invalid input value', () => {
			const testedValue = '25/09/20005, 02:46';
			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker
					selectedDate={new Date(2015, 0, 1, 10, 35)}
					onChange={onChange}
				/>
			);

			const inputWrapper = wrapper.find('input');
			inputWrapper.prop('onChange')({
				target: {
					value: testedValue,
				},
			});
			expect(onChange).toHaveBeenCalledWith(undefined);
		});

		it('should callback with the correct date when the datetime change with the picker', () => {
			const testedDate = new Date(2015, 11, 30);
			const testedTime = 1250;
			const onChange = jest.fn();

			const wrapper = shallow(
				<InputDateTimePicker
					selectedDate={new Date(2015, 0, 1, 10, 35)}
					onChange={onChange}
				/>
			);
			const dateTimePickerWrapper = wrapper.find(DateTimePicker);

			dateTimePickerWrapper.prop('onSubmit')({
				date: testedDate,
				time: testedTime,
			});

			expect(onChange).toHaveBeenCalled();
			expect(isSameMinute(onChange.mock.calls[0][0], new Date(2015, 11, 30, 20, 50))).toBe(true);
		});
	});
});
