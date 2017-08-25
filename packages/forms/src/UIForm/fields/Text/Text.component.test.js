import React from 'react';
import { shallow } from 'enzyme';

import Text from './Text.component';

describe('Text field', () => {
	const schema = {
		autoFocus: true,
		description: 'my text input hint',
		placeholder: 'Type something here',
		title: 'My input title',
		type: 'text',
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				schema={schema}
				value={'toto'}
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
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				schema={disabledSchema}
				value={'toto'}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render readonly input', () => {
		// given
		const readOnlySchema = {
			...schema,
			readOnly: true,
		};

		// when
		const wrapper = shallow(
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				schema={readOnlySchema}
				value={'toto'}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should trigger onChange', () => {
		// given
		const onChange = jest.fn();
		const wrapper = shallow(
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={onChange}
				schema={schema}
				value={'toto'}
			/>
		);
		const event = { target: { value: 'totoa' } };

		// when
		wrapper.find('input').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema, value: 'totoa' });
	});

	it('should trigger onChange with number value', () => {
		// given
		const numberSchema = {
			...schema,
			type: 'number',
		};
		const onChange = jest.fn();
		const wrapper = shallow(
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={onChange}
				schema={numberSchema}
				value={2}
			/>
		);
		const event = { target: { value: '25' } };

		// when
		wrapper.find('input').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema: numberSchema, value: 25 });
	});
});
