import React from 'react';
import { shallow } from 'enzyme';

import Text from './Text.component';

describe('Text field', () => {
	const schema = {
		autoFocus: true,
		description: 'my text input hint',
		placeholder: 'Type something here',
		required: true,
		title: 'My input title',
		type: 'text',
		schema: {
			type: 'string',
		},
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(
			<Text
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

	it('should render password input', () => {
		// when
		const wrapper = shallow(
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={{ ...schema, type: 'password' }}
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
			<Text
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
				onFinish={jest.fn()}
				schema={readOnlySchema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render input with min attribute', () => {
		// given
		const minSchema = {
			...schema,
			schema: {
				...schema.schema,
				type: 'number',
				minimum: 0,
			},
		};

		// when
		const wrapper = shallow(
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={minSchema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render input with max attribute', () => {
		// given
		const maxSchema = {
			...schema,
			schema: {
				...schema.schema,
				type: 'number',
				maximum: 10,
			},
		};

		// when
		const wrapper = shallow(
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={maxSchema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render input with step attribute', () => {
		// given
		const stepSchema = {
			...schema,
			type: 'number',
			schema: {
				type: 'number',
				step: 0.01,
			},
		};

		// when
		const wrapper = shallow(
			<Text id={'myForm'} isValid onChange={jest.fn()} onFinish={jest.fn()} schema={stepSchema} />,
		);

		// then
		expect(
			wrapper
				.find('[type="number"]')
				.at(0)
				.props().step,
		).toEqual(0.01);
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
				onFinish={jest.fn()}
				schema={schema}
				value={'toto'}
			/>,
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
				onFinish={jest.fn()}
				schema={numberSchema}
				value={2}
			/>,
		);
		const event = { target: { value: '25' } };

		// when
		wrapper.find('input').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema: numberSchema, value: 25 });
	});

	it('should trigger onFinish on input blur', () => {
		// given
		const onFinish = jest.fn();
		const wrapper = shallow(
			<Text
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={onFinish}
				schema={schema}
				value={'toto'}
			/>,
		);
		const event = { target: { value: 'totoa' } };

		// when
		wrapper.find('input').simulate('blur', event);

		// then
		expect(onFinish).toBeCalledWith(event, { schema });
	});

	it('should render hidden input', () => {
		// given
		const hiddenSchema = {
			...schema,
			type: 'hidden',
		};

		// when
		const wrapper = shallow(
			<Text
				id={'myForm'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={hiddenSchema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
