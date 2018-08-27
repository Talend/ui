import React from 'react';
import { shallow } from 'enzyme';
import cases from 'jest-in-case';
import {
	mockDate,
	restoreDate,
} from '@talend/react-components/lib/DateTimePickers/shared/utils/test/dateMocking';

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

			it('should not spread an Error object but the last value to the component when receiving an Error object from the form which was coming first from widget', () => {
				const initialDateStr = '2027-01-01T03:35:00.000Z';
				const expectedDateSpread = new Date(2027, 0, 1, 3, 35);
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
			cases(
				'should override the form error message only if the data result in an invalid date',
				({ formErrorMessage, formValue, genericMessageExpected }) => {
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

					wrapper.setProps({
						errorMessage: formErrorMessage,
						value: formValue,
					});

					const fieldWrapper = wrapper.find('FieldTemplate');

					const expectedMessage = genericMessageExpected ? GENERIC_FORMAT_ERROR : formErrorMessage;
					expect(fieldWrapper.prop('errorMessage')).toBe(expectedMessage);
				},
				[
					{
						name: 'Widget Error => Display the form error (which is the widget error)',
						formErrorMessage: "An error message from the underlying widget's component",
						formValue: new Error("An error message from the underlying widget's component"),
						genericMessageExpected: false,
					},
					{
						name: 'Form Error with InvalidDate => Display the generic error',
						formErrorMessage: 'The timestamp format is invalid',
						formValue: 99999999999999999999,
						genericMessageExpected: true,
					},
					{
						name: 'Form Error wrong type => Display the generic error',
						formErrorMessage: 'number expected but got string',
						formValue: '2018-01-01T00:00:00.000Z',
						genericMessageExpected: true,
					},
					{
						name: 'Form Error with Date valid => Display the form error',
						formErrorMessage: 'The date should be in year 2018',
						formValue: 1483228800000,
						genericMessageExpected: false,
					},
					{
						name: 'Form Error required value => Display the form error',
						formErrorMessage: 'The value is required',
						formValue: undefined,
						genericMessageExpected: false,
					},
				],
			);

			it('should spread an Error object to the form when type defined is not handled by the widget and a value try to be converted to date', () => {
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
				expect(onChangePayload.value).toBeInstanceOf(Error);
			});
		});

		describe('coming from one then the other', () => {
			it('should spread the component error when coming from the component lastly', () => {
				const wrapper = shallow(
					<InputDateTimePicker
						id="my-datepicker"
						isValid
						onChange={jest.fn()}
						onFinish={jest.fn()}
						schema={getSchema('number')}
						value={undefined}
					/>,
				);

				// Update to a form data error
				const formError = 'Wrong timestamp format';
				const badTimestamp = 8640000000000002;
				wrapper.setProps({
					errorMessage: formError,
					value: badTimestamp,
				});
				wrapper.update();

				const fieldWrapperBefore = wrapper.find('FieldTemplate');
				expect(fieldWrapperBefore.prop('errorMessage')).toBe(GENERIC_FORMAT_ERROR);

				const componentWrapperBefore = wrapper.find('InputDateTimePicker');
				const datetimeBefore = componentWrapperBefore.prop('selectedDateTime');
				expect(isNaN(datetimeBefore.getTime())).toBe(true);

				// Update to a component input error
				const componentErrorMessage = 'A component format error';
				const componentError = new Error(componentErrorMessage);
				wrapper.setProps({
					errorMessage: componentErrorMessage,
					value: componentError,
				});
				wrapper.update();

				const fieldWrapperAfter = wrapper.find('FieldTemplate');
				expect(fieldWrapperAfter.prop('errorMessage')).toBe(componentErrorMessage);

				const componentWrapperAfter = wrapper.find('InputDateTimePicker');
				const datetimeAfter = componentWrapperAfter.prop('selectedDateTime');
				expect(datetimeAfter).toBe(datetimeBefore);
			});

			it('should spread the generic error message when coming from the form lastly', () => {
				const wrapper = shallow(
					<InputDateTimePicker
						id="my-datepicker"
						isValid
						onChange={jest.fn()}
						onFinish={jest.fn()}
						schema={getSchema('number')}
						value={784561354}
					/>,
				);
				const componentWrapperInitial = wrapper.find('InputDateTimePicker');
				const datetimeInitial = componentWrapperInitial.prop('selectedDateTime');

				// Update to a component input error
				const componentErrorMessage = 'A component format error';
				const componentError = new Error(componentErrorMessage);
				wrapper.setProps({
					errorMessage: componentErrorMessage,
					value: componentError,
				});
				wrapper.update();

				const fieldWrapperBefore = wrapper.find('FieldTemplate');
				expect(fieldWrapperBefore.prop('errorMessage')).toBe(componentErrorMessage);

				const componentWrapperBefore = wrapper.find('InputDateTimePicker');
				const datetimeBefore = componentWrapperBefore.prop('selectedDateTime');
				expect(datetimeBefore).toBe(datetimeInitial);

				// Update to a form data error
				const formError = 'Wrong timestamp format';
				const badTimestamp = 8640000000000002;
				wrapper.setProps({
					errorMessage: formError,
					value: badTimestamp,
				});
				wrapper.update();

				const fieldWrapperAfter = wrapper.find('FieldTemplate');
				expect(fieldWrapperAfter.prop('errorMessage')).toBe(GENERIC_FORMAT_ERROR);

				const componentWrapperAfter = wrapper.find('InputDateTimePicker');
				const datetimeAfter = componentWrapperAfter.prop('selectedDateTime');
				expect(isNaN(datetimeAfter.getTime())).toBe(true);
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
});
