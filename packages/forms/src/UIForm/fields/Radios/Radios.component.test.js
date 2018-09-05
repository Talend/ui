import React from 'react';
import { shallow } from 'enzyme';

import Radios from './Radios.component';

describe('Radios field', () => {
	const schema = {
		autoFocus: true,
		description: 'My radios input hint',
		required: true,
		title: 'My radios title',
		titleMap: [
			{ name: 'My foo custom name', value: 'foo' },
			{ name: 'My bar custom name', value: 'bar' },
			{ name: 'My toto custom name', value: 'toto' },
		],
		type: 'radios',
	};

	it('should render radios', () => {
		// when
		const wrapper = shallow(
			<Radios
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render inline radios', () => {
		// given
		const inlineSchema = {
			...schema,
			inline: true,
		};

		// when
		const wrapper = shallow(
			<Radios
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={inlineSchema}
				value={'toto'}
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
			<Radios
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger onChange', () => {
		// given
		const onChange = jest.fn();
		const wrapper = shallow(
			<Radios
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={onChange}
				onFinish={jest.fn()}
				schema={schema}
				value={'toto'}
			/>,
		);
		const event = { target: { value: 'foo' } };

		// when
		wrapper
			.find('input[type="radio"]')
			.at(0)
			.simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema, value: 'foo' });
	});

	it('should trigger onFinish on blur', () => {
		// given
		const onFinish = jest.fn();
		const wrapper = shallow(
			<Radios
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={onFinish}
				schema={schema}
				value={'toto'}
			/>,
		);
		const event = { target: { value: 'foo' } };

		// when
		wrapper
			.find('input[type="radio"]')
			.at(0)
			.simulate('blur', event);

		// then
		expect(onFinish).toBeCalledWith(event, { schema });
	});
});
