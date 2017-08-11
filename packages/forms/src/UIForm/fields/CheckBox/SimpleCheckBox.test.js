import React from 'react';
import { shallow } from 'enzyme';

import SimpleCheckBox from './SimpleCheckBox.component';

describe('SimpleCheckBox field', () => {
	const schema = {
		autoFocus: true,
		disabled: false,
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(
			<SimpleCheckBox
				id={'myForm'}
				label={'My checkbox custom label'}
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
			<SimpleCheckBox
				id={'myForm'}
				label={'My checkbox custom label'}
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
			<SimpleCheckBox
				id={'myForm'}
				label={'My checkbox custom label'}
				onChange={onChange}
				schema={schema}
				value
			/>
		);
		const event = { target: { checked: false } };

		// when
		wrapper.find('input').at(0).simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema, value: false });
	});
});
