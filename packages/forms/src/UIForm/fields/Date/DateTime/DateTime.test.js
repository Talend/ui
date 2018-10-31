import React from 'react';
import { shallow } from 'enzyme';

import DateTime from './DateTime.component';

const defaultSchema = {
	autoFocus: true,
	description: 'This is my date picker',
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	title: 'My date picker',
};

function getSchema(type) {
	return {
		...defaultSchema,
		schema: {
			type,
		},
	};
}

describe('InputDateTimePicker', () => {
	describe('render', () => {
		it('should render', () => {
			// when
			const wrapper = shallow(
				<DateTime
					id="my-datepicker"
					isValid={false}
					errorMessage="You've done something wrong"
					onChange={jest.fn()}
					onFinish={jest.fn()}
					schema={getSchema('number')}
					value={1533884400000}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render from timestamp', () => {
			// when
			const wrapper = shallow(
				<DateTime
					id="my-datepicker"
					onChange={jest.fn()}
					onFinish={jest.fn()}
					schema={getSchema('number')}
					value={1533884400000}
				/>,
			);

			// then
			expect(wrapper.find('InputDateTimePicker').prop('selectedDateTime')).toEqual(
				new Date('2018-08-10T07:00:00.000Z'),
			);
		});

		it('should render from string', () => {
			// when
			const wrapper = shallow(
				<DateTime
					id="my-datepicker"
					onChange={jest.fn()}
					onFinish={jest.fn()}
					schema={getSchema('string')}
					value={'2015-02-15T22:54:00.000Z'}
				/>,
			);

			// then
			expect(wrapper.find('InputDateTimePicker').prop('selectedDateTime')).toEqual(
				new Date('2015-02-15T22:54:00.000Z'),
			);
		});
	});

	it('should call onFinish on input blur', () => {
		// given
		const onFinish = jest.fn();
		const wrapper = shallow(
			<DateTime
				id="my-datepicker"
				onChange={jest.fn()}
				onFinish={onFinish}
				schema={getSchema('number')}
			/>,
		);
		expect(onFinish).not.toBeCalled();

		// when
		wrapper.find('InputDateTimePicker').simulate('blur');

		// then
		expect(onFinish).toBeCalled();
	});

	describe('on input change', () => {
		it('should call onChange callback with date as string', () => {
			// given
			const onChange = jest.fn();
			const event = { target: {} };
			const schema = getSchema('string');
			const value = '2015-02-15T22:54:00.000Z';
			const wrapper = shallow(
				<DateTime id="my-datepicker" onChange={onChange} onFinish={jest.fn()} schema={schema} />,
			);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find('InputDateTimePicker').simulate('change', event, {
				datetime: new Date(value),
				errorMessage: undefined,
				origin: 'PICKER',
			});

			// then
			expect(onChange).toBeCalledWith(event, { schema, value });
		});

		it('should call onChange callback with date as number', () => {
			// given
			const onChange = jest.fn();
			const event = { target: {} };
			const schema = getSchema('number');
			const value = 1533884400000;
			const wrapper = shallow(
				<DateTime id="my-datepicker" onChange={onChange} onFinish={jest.fn()} schema={schema} />,
			);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find('InputDateTimePicker').simulate('change', event, {
				datetime: new Date(value),
				errorMessage: undefined,
				origin: 'PICKER',
			});

			// then
			expect(onChange).toBeCalledWith(event, { schema, value });
		});

		it('should trigger onFinish when change comes from picker', () => {
			// given
			const onFinish = jest.fn();
			const event = { target: {} };
			const schema = getSchema('string');
			const value = '2015-02-15T22:54:00.000Z';
			const wrapper = shallow(
				<DateTime id="my-datepicker" onChange={jest.fn()} onFinish={onFinish} schema={schema} />,
			);
			expect(onFinish).not.toBeCalled();

			// when
			wrapper.find('InputDateTimePicker').simulate('change', event, {
				datetime: new Date(value),
				errorMessage: undefined,
				origin: 'PICKER',
			});

			// then
			expect(onFinish).toBeCalledWith(event, { schema, value });
		});
	});
});
