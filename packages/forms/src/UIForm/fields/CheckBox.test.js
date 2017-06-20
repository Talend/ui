import React from 'react';
import { shallow } from 'enzyme';

import CheckBox from './CheckBox';

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
				schema={schema}
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
			<CheckBox
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
		const wrapper = shallow(
			<CheckBox
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={onChange}
				schema={schema}
				value
			/>
		);
		const event = { target: { checked: false } };

		// when
		wrapper.find('input').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, schema, false);
	});
});
