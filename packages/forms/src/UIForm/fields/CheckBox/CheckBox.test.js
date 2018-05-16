import React from 'react';
import { shallow, mount } from 'enzyme';

import CheckBox from './CheckBox.component';

describe('CheckBox field', () => {
	const schema = {
		autoFocus: true,
		description: 'my checkbox input hint',
		title: 'My checkbox title',
		type: 'checkbox',
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(
			<CheckBox
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled input', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		const wrapper = shallow(
			<CheckBox
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
				value
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger onChange on input change', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<CheckBox
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={onChange}
				onFinish={jest.fn()}
				schema={schema}
				value
			/>,
		);
		const event = { target: { checked: false } };

		// when
		wrapper.find('input').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(expect.anything(), { schema, value: false });
	});

	it('should trigger onFinish on input change', () => {
		// given
		const onFinish = jest.fn();
		const wrapper = mount(
			<CheckBox
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={onFinish}
				schema={schema}
				value
			/>,
		);
		const event = { target: { checked: false } };

		// when
		wrapper.find('input').simulate('change', event);

		// then
		expect(onFinish).toBeCalledWith(expect.anything(), { schema, value: false });
	});
});
