import React from 'react';
import { shallow, mount } from 'enzyme';

import Toggle from './Toggle.component';

describe('Toggle field', () => {
	const schema = {
		description: 'my text input hint',
		required: true,
		title: 'My input title',
		type: 'text',
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(
			<Toggle
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

	it('should render autoFocused input', () => {
		// given
		const autoFocusedSchema = {
			...schema,
			autoFocus: true,
		};

		// when
		const wrapper = shallow(
			<Toggle
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={autoFocusedSchema}
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
			<Toggle
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

	it('should trigger onChange and onFinish', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const wrapper = mount(
			<Toggle
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value
			/>,
		);

		// when
		wrapper.find('input').simulate('change');

		// then
		expect(onChange).toBeCalledWith(expect.anything(), { schema, value: false });
		expect(onFinish).toBeCalledWith(expect.anything(), { schema, value: false });
	});
});
