import React from 'react';
import { shallow, mount } from 'enzyme';

import Toggle from './Toggle.component';

describe('Toggle field', () => {
	const schema = {
		description: 'my text input hint',
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
				schema={schema}
				value
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
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
				schema={autoFocusedSchema}
				value
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
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
				schema={disabledSchema}
				value
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should trigger onChange', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Toggle
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={onChange}
				schema={schema}
				value
			/>
		);

		// when
		wrapper.find('input').simulate('change');

		// then
		expect(onChange).toBeCalledWith(expect.anything(), { schema, value: false });
	});
});
