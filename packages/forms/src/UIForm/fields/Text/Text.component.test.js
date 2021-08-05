import React from 'react';
import { shallow } from 'enzyme';

import Text from './Text.component';

describe('Text field', () => {
	const defaultSchema = {
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

	const defaultProps = {
		id: 'myForm',
		isValid: true,
		errorMessage: 'My error message',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		value: 'toto',
		schema: defaultSchema,
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(<Text {...defaultProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render password input', () => {
		// given
		const props = {
			...defaultProps,
			schema: { ...defaultSchema, type: 'password' },
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled input', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				disabled: true,
			},
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render readonly input', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				readOnly: true,
			},
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render input with min attribute', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				schema: {
					...defaultSchema.schema,
					type: 'number',
					minimum: 0,
				},
			},
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render input with max attribute', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				schema: {
					...defaultSchema.schema,
					type: 'number',
					maximum: 10,
				},
			},
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render input with step attribute', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				type: 'number',
				schema: {
					type: 'number',
					step: 0.01,
				},
			},
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.find('[type="number"]').at(0).props().step).toEqual(0.01);
	});

	it('should trigger onChange', () => {
		// given
		const onChange = jest.fn();
		const props = { ...defaultProps, onChange };
		const wrapper = shallow(<Text {...props} />);
		const event = { target: { value: 'totoa' } };

		// when
		wrapper.find('input').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema: defaultSchema, value: 'totoa' });
	});

	it('should trigger onChange with number value', () => {
		// given
		const schema = { ...defaultSchema, type: 'number' };
		const onChange = jest.fn();
		const props = { ...defaultProps, onChange, schema };
		const wrapper = shallow(<Text {...props} />);
		const event = { target: { value: '25' } };

		// when
		wrapper.find('input').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema, value: 25 });
	});

	it('should trigger onFinish on input blur', () => {
		// given
		const onFinish = jest.fn();
		const props = { ...defaultProps, onFinish };
		const wrapper = shallow(<Text {...props} />);
		const event = { target: { value: 'totoa' } };

		// when
		wrapper.find('input').simulate('blur', event);

		// then
		expect(onFinish).toBeCalledWith(event, { schema: defaultSchema });
	});

	it('should render hidden input', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				type: 'hidden',
			},
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should pass autoComplete to input', () => {
		// given
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				autoComplete: 'off',
			},
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.find('input').prop('autoComplete')).toBe('off');
	});

	it('should pass labelProps to FieldTemplate', () => {
		// given
		const labelProps = { className: 'hello' };
		const props = {
			...defaultProps,
			schema: {
				...defaultSchema,
				labelProps,
			},
		};

		// when
		const wrapper = shallow(<Text {...props} />);

		// then
		expect(wrapper.find('FieldTemplate').prop('labelProps')).toBe(labelProps);
	});
});
