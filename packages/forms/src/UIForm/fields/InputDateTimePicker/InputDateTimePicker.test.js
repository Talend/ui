import React from 'react';
import { shallow } from 'enzyme';
import cases from 'jest-in-case';
import uniq from 'lodash/uniq';

import InputDateTimePicker from './InputDateTimePicker.component';

const schema = {
	autoFocus: true,
	description: 'This is my date picker',
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	title: 'My date picker',
};

function getSchema(type) {
	return {
		...schema,
		schema: {
			type,
		},
	};
}

beforeAll(() => {
	mockDate();
});
afterAll(() => {
	restoreDate();
});

describe('InputDateTimePicker', () => {
	it('should render', () => {
		const wrapper = shallow(
			<InputDateTimePicker
				id="my-datepicker"
				isValid={false}
				errorMessage="You've done something wrong"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={getSchema('number')}
				value={1533884400000}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('data conversion between widget and form', () => {
		describe('form number type', () => {
			describe('from form to component', () => {
				it('should convert number to date', () => {
					const initialTimestamp = 1533884400000;
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema('number')}
							value={initialTimestamp}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const dateSpread = componentWrapper.prop('selectedDateTime');
					expect(dateSpread.getTime()).toBe(initialTimestamp);
				});

				it('should convert an undefined number to an undefined date', () => {
					const initialTimestamp = undefined;
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema('number')}
							value={initialTimestamp}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const dateSpread = componentWrapper.prop('selectedDateTime');
					expect(dateSpread).toBeUndefined();
				});
			});

			describe('from component to form', () => {
				it('should convert date to number', () => {
					const initialTimestamp = undefined;
					const changedDate = new Date(2015, 10, 25, 19, 11);
					const expectedTimestamp = 1448478660000;
					const onChange = jest.fn();
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={onChange}
							onFinish={jest.fn()}
							schema={getSchema('number')}
							value={initialTimestamp}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const componentOnChange = componentWrapper.prop('onChange');
					componentOnChange(null, undefined, changedDate);

					const onChangePayload = onChange.mock.calls[0][1];
					expect(onChangePayload.value).toBe(expectedTimestamp);
				});

				it('should convert an undefined date to an undefined number', () => {
					const initialTimestamp = 1081866600000;
					const onChange = jest.fn();
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={onChange}
							onFinish={jest.fn()}
							schema={getSchema('number')}
							value={initialTimestamp}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const componentOnChange = componentWrapper.prop('onChange');
					componentOnChange(null, undefined, undefined);

					const onChangePayload = onChange.mock.calls[0][1];
					expect(onChangePayload.value).toBeUndefined();
				});
			});
		});

		describe('form string type', () => {
			describe('from form to component', () => {
				it('should convert string to date', () => {
					const initialDateStr = '2025-02-25T03:35:00.000Z';
					const expectedTimestamp = 1740454500000;
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema('string')}
							value={initialDateStr}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const dateSpread = componentWrapper.prop('selectedDateTime');
					expect(dateSpread.getTime()).toBe(expectedTimestamp);
				});

				it('should convert an undefined string to an undefined date', () => {
					const initialDateStr = undefined;
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema('string')}
							value={initialDateStr}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const dateSpread = componentWrapper.prop('selectedDateTime');
					expect(dateSpread).toBeUndefined();
				});
			});

			describe('from component to form', () => {
				it('should convert date to string', () => {
					const initialDateStr = '2027-01-01T03:35:00.000Z';
					const changedDate = new Date(2015, 10, 25, 19, 11);
					const expectedStr = '2015-11-25T19:11:00.000Z';
					const onChange = jest.fn();
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={onChange}
							onFinish={jest.fn()}
							schema={getSchema('string')}
							value={initialDateStr}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const componentOnChange = componentWrapper.prop('onChange');
					componentOnChange(null, undefined, changedDate);

					const onChangePayload = onChange.mock.calls[0][1];
					expect(onChangePayload.value).toBe(expectedStr);
				});

				it('should convert an undefined date to an undefined string', () => {
					const initialDateStr = '2027-01-01T03:35:00.000Z';
					const onChange = jest.fn();
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={onChange}
							onFinish={jest.fn()}
							schema={getSchema('string')}
							value={initialDateStr}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const componentOnChange = componentWrapper.prop('onChange');
					componentOnChange(null, undefined, undefined);

					const onChangePayload = onChange.mock.calls[0][1];
					expect(onChangePayload.value).toBeUndefined();
				});
			});
		});
	});

	describe('errors handling', () => {
		describe('from component to form', () => {
			it('should spread the date value as is when receiving a message error', () => {
				const initialDateStr = '2027-01-01T03:35:00.000Z';
				const onChange = jest.fn();
				const wrapper = shallow(
					<InputDateTimePicker
						id="my-datepicker"
						isValid
						onChange={onChange}
						onFinish={jest.fn()}
						schema={getSchema('string')}
						value={initialDateStr}
					/>,
				);

				const componentWrapper = wrapper.find('InputDateTimePicker');
				const componentOnChange = componentWrapper.prop('onChange');
				const errorMessage = "An error message from the underlying widget's component";
				const anyDateValue = new Date('An InvalidDate');
				componentOnChange(null, errorMessage, anyDateValue);

				const onChangePayload = onChange.mock.calls[0][1];
				expect(onChangePayload.value).toBe(anyDateValue);
			});

			it('should spread an InvalidDate when there is no errorMessage and type defined in form schema is not handled by the widget', () => {
				const initialValue = undefined;
				const changedDate = new Date(2015, 10, 25, 19, 11);
				const onChange = jest.fn();

				const wrapper = shallow(
					<InputDateTimePicker
						id="my-datepicker"
						isValid
						onChange={onChange}
						onFinish={jest.fn()}
						schema={getSchema('UNHANDLE_TYPE')}
						value={initialValue}
					/>,
				);

				const componentWrapper = wrapper.find('InputDateTimePicker');
				const componentOnChange = componentWrapper.prop('onChange');
				componentOnChange(null, undefined, changedDate);

				const onChangePayload = onChange.mock.calls[0][1];
				expect(onChangePayload.value).toBeInstanceOf(Date);
				expect(isNaN(onChangePayload.value.getTime())).toBe(true);
			});
		});

		describe('from form to component', () => {
			cases(
				"should give an 'InvalidDate' to the component if date cannot be converted",
				({ value, specifiedType }) => {
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							errorMessage="You've done something wrong"
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema(specifiedType)}
							value={value}
						/>,
					);
					const componentWrapper = wrapper.find('InputDateTimePicker');
					const selectedDateTime = componentWrapper.prop('selectedDateTime');
					expect(selectedDateTime).toBeInstanceOf(Date);
					expect(isNaN(selectedDateTime.getTime())).toBe(true);
				},
				[
					{
						name: 'unknown type',
						value: 1081866600000,
						specifiedType: 'whatever',
					},
					{
						name: 'unhandle type object',
						value: {},
						specifiedType: 'object',
					},
					{
						name: 'unhandle type boolean',
						value: true,
						specifiedType: 'boolean',
					},
					{
						name: 'wrong value type against specified type',
						value: 1081866600000,
						specifiedType: 'string',
					},
					{
						name: 'number too high',
						value: 86400000000000000,
						specifiedType: 'number',
					},
					{
						name: 'number too low',
						value: -86400000000000000,
						specifiedType: 'number',
					},
					{
						name: 'string non sens',
						value: 'hkqkjaezlrnezncfkl',
						specifiedType: 'string',
					},
					{
						name: 'string missing "T" format part',
						value: '2018-01-01 00:00:00.000Z',
						specifiedType: 'string',
					},
					{
						name: 'string missing "-" format separators',
						value: '2018 01 01T00:00:00.000Z',
						specifiedType: 'string',
					},
					{
						name: 'string missing ":" format separators',
						value: '2018-01-01T00 00 00.000Z',
						specifiedType: 'string',
					},
					{
						name: 'string non accepting comma for second fraction',
						value: '2018-01-01T00:00:00,000Z',
						specifiedType: 'string',
					},
				],
			);

			it("should spread the value as is if it's already a Date object", () => {
				const formProperty = new Date('Whatever date');
				const wrapper = shallow(
					<InputDateTimePicker
						id="my-datepicker"
						isValid
						errorMessage="You've done something wrong"
						onChange={jest.fn()}
						onFinish={jest.fn()}
						schema={getSchema('number')}
						value={formProperty}
					/>,
				);
				const componentWrapper = wrapper.find('InputDateTimePicker');
				const selectedDateTime = componentWrapper.prop('selectedDateTime');
				expect(selectedDateTime).toBe(formProperty);
			});

			it('should give a different InvalidDate for each error cases', () => {
				function getSelectedDateTime(wrapper) {
					const componentWrapper = wrapper.find('InputDateTimePicker');
					return componentWrapper.prop('selectedDateTime');
				}
				const selectedDateTimes = [];
				const wrapper = shallow(
					<InputDateTimePicker
						id="my-datepicker"
						isValid
						errorMessage="You've done something wrong"
						onChange={jest.fn()}
						onFinish={jest.fn()}
						schema={getSchema('string')}
						value={'whatever wrong data'}
					/>,
				);
				// Bad string format
				selectedDateTimes.push(getSelectedDateTime(wrapper));

				// Bad type (number against string)
				wrapper.setProps({
					value: 545646456464564,
				});
				wrapper.update();
				selectedDateTimes.push(getSelectedDateTime(wrapper));

				// Unhandle type (boolean)
				wrapper.setProps({
					schema: getSchema('boolean'),
				});
				wrapper.update();
				selectedDateTimes.push(getSelectedDateTime(wrapper));

				const uniqSelectedDateTimes = uniq(selectedDateTimes);

				expect(uniqSelectedDateTimes).toHaveLength(selectedDateTimes.length);
			});
		});
	});

	describe('end of edition', () => {
		it('should trigger onFinish when the component blur', () => {
			const initialTimestamp = 1533884400000;
			const initialSchema = getSchema('number');
			const fakeEvent = {
				whatever: 'property',
			};
			const onFinish = jest.fn();
			const wrapper = shallow(
				<InputDateTimePicker
					id="my-datepicker"
					isValid
					onChange={jest.fn()}
					onFinish={onFinish}
					schema={initialSchema}
					value={initialTimestamp}
				/>,
			);

			const componentWrapper = wrapper.find('InputDateTimePicker');
			componentWrapper.prop('onBlur')(fakeEvent);

			const onFinishEvent = onFinish.mock.calls[0][0];
			const onFinishPayload = onFinish.mock.calls[0][1];
			expect(onFinishEvent).toBe(fakeEvent);
			expect(onFinishPayload.schema).toBe(initialSchema);
		});

		it('should trigger onFinish with the latest onChange value particularly in synchronously calling onChange and onBlur', () => {
			const initialValue = undefined;
			const initialSchema = getSchema('number');
			const fakeEvent = {
				whatever: 'property',
			};
			const changedDate = new Date(2015, 10, 25, 19, 11);
			const onFinish = jest.fn();
			const wrapper = shallow(
				<InputDateTimePicker
					id="my-datepicker"
					isValid
					onChange={jest.fn()}
					onFinish={onFinish}
					schema={initialSchema}
					value={initialValue}
				/>,
			);

			const componentWrapper = wrapper.find('InputDateTimePicker');
			componentWrapper.prop('onChange')(fakeEvent, undefined, changedDate);
			componentWrapper.prop('onBlur')(fakeEvent);

			const onFinishPayload = onFinish.mock.calls[0][1];
			expect(onFinishPayload.value).toBe(changedDate.getTime());
		});
	});
});
