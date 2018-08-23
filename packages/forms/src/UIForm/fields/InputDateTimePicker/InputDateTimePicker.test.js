import React from 'react';
import { shallow } from 'enzyme';
import cases from 'jest-in-case';

import InputDateTimePicker, { GENERIC_FORMAT_ERROR } from './InputDateTimePicker.component';

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
					const changedDate = new Date(Date.UTC(2015, 10, 25, 19, 11));
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
					const changedDate = new Date(Date.UTC(2015, 10, 25, 19, 11));
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
		describe('coming from component', () => {
			it('should spread an Error object to the form when receiving a message error from the component', () => {
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
				componentOnChange(null, errorMessage, undefined);

				const onChangePayload = onChange.mock.calls[0][1];
				expect(onChangePayload.value).toBeInstanceOf(Error);
				expect(onChangePayload.value.message).toBe(errorMessage);
			});

			it('should not spread an Error object but the last value to the component when receiving an Error object from the form', () => {
				const initialDateStr = '2027-01-01T03:35:00.000Z';
				const expectedDateSpread = new Date(Date.UTC(2027, 0, 1, 3, 35));
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

				const errorMessage = "An error message from the underlying widget's component";
				wrapper.setProps({
					value: new Error(errorMessage),
				});

				wrapper.update();

				const componentWrapper = wrapper.find('InputDateTimePicker');

				const datetime = componentWrapper.prop('selectedDateTime');
				expect(datetime.getTime()).toBe(expectedDateSpread.getTime());
			});
		});

		describe('coming from form', () => {
			it('should override the form error message if is not coming from the widget', () => {
				const initialTimestamp = 999999999999999999999;
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
				const widgetErrorMessage = "An error message from the underlying widget's component";
				componentOnChange(null, widgetErrorMessage, undefined);

				const formErrorMessage = 'A specific error message from the form';
				wrapper.setProps({
					errorMessage: formErrorMessage,
				});

				const fieldWrapper = wrapper.find('FieldTemplate');

				expect(fieldWrapper.prop('errorMessage')).toBe(GENERIC_FORMAT_ERROR);
			});

			it('should spread an Error object to the form when type defined is not handled by the widget and a value try to be converted to date', () => {
				const initialValue = undefined;
				const changedDate = new Date(Date.UTC(2015, 10, 25, 19, 11));
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
				expect(onChangePayload.value).toBeInstanceOf(Error);
			});
		});

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
	});
});
