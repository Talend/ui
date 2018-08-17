import React from 'react';
import { shallow } from 'enzyme';

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
			describe('when spreading value to the component', () => {
				it('should convert number to date', () => {
					const timestamp = 1533884400000;
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema('number')}
							value={timestamp}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const dateSpread = componentWrapper.prop('selectedDateTime');
					expect(dateSpread.getTime()).toBe(timestamp);
				});

				it('should convert an undefined number to an undefined date', () => {
					const timestamp = undefined;
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema('number')}
							value={timestamp}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const dateSpread = componentWrapper.prop('selectedDateTime');
					expect(dateSpread).toBeUndefined();
				});
			});

			describe('when component onChange occurs', () => {
				it('should convert date to number', () => {
					const timestamp = undefined;
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
							value={timestamp}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const componentOnChange = componentWrapper.prop('onChange');
					componentOnChange(changedDate);

					expect(onChange.mock.calls[0][1].value).toBe(expectedTimestamp);
				});

				it('should convert an undefined date to an undefined number', () => {
					const timestamp = 1081866600000;
					const onChange = jest.fn();
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={onChange}
							onFinish={jest.fn()}
							schema={getSchema('number')}
							value={timestamp}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const componentOnChange = componentWrapper.prop('onChange');
					componentOnChange(undefined);

					expect(onChange.mock.calls[0][1].value).toBeUndefined();
				});
			});
		});

		describe('form string type', () => {
			describe('when spreading value to the component', () => {
				it('should convert string to date', () => {
					const dateStr = '2025-02-25T03:35:00Z';
					const expectedTimestamp = 1740454500000;
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema('string')}
							value={dateStr}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const dateSpread = componentWrapper.prop('selectedDateTime');
					expect(dateSpread.getTime()).toBe(expectedTimestamp);
				});

				it('should convert an undefined string to an undefined date', () => {
					const dateStr = undefined;
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={jest.fn()}
							onFinish={jest.fn()}
							schema={getSchema('string')}
							value={dateStr}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const dateSpread = componentWrapper.prop('selectedDateTime');
					expect(dateSpread).toBeUndefined();
				});
			});

			describe('when component onChange occurs', () => {
				it('should convert date to string', () => {
					const dateStr = '2027-01-01T03:35:00Z';
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
							value={dateStr}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const componentOnChange = componentWrapper.prop('onChange');
					componentOnChange(changedDate);

					expect(onChange.mock.calls[0][1].value).toBe(expectedStr);
				});

				it('should convert an undefined date to an undefined string', () => {
					const dateStr = '2027-01-01T03:35:00Z';
					const onChange = jest.fn();
					const wrapper = shallow(
						<InputDateTimePicker
							id="my-datepicker"
							isValid
							onChange={onChange}
							onFinish={jest.fn()}
							schema={getSchema('string')}
							value={dateStr}
						/>,
					);

					const componentWrapper = wrapper.find('InputDateTimePicker');
					const componentOnChange = componentWrapper.prop('onChange');
					componentOnChange(undefined);

					expect(onChange.mock.calls[0][1].value).toBeUndefined();
				});
			});
		});
	});
});
