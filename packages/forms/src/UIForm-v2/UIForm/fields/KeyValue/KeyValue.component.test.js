import React from 'react';
import { shallow } from 'enzyme';
import KeyValue from './KeyValue.component';

describe('KeyValue field', () => {
	const props = {
		id: 'my-key-value-field',
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		schema: {
			autoFocus: false,
			description: 'This is the key/value field',
			disabled: false,
			key: ['infos', 'variable'],
			readOnly: false,
			title: 'Variable',
		},
		value: { key: 'lol', value: 'mdr' },
	};

	it('should render default KeyValue', () => {
		// when
		const wrapper = shallow(<KeyValue {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled KeyValue', () => {
		// given
		const disabledProps = {
			...props,
			schema: {
				...props.schema,
				disabled: true,
			},
		};

		// when
		const wrapper = shallow(<KeyValue {...disabledProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render readOnly KeyValue', () => {
		// given
		const readOnlyProps = {
			...props,
			schema: {
				...props.schema,
				readOnly: true,
			},
		};

		// when
		const wrapper = shallow(<KeyValue {...readOnlyProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render autoFocused KeyValue', () => {
		// given
		const autoFocusProps = {
			...props,
			schema: {
				...props.schema,
				autoFocus: true,
			},
		};

		// when
		const wrapper = shallow(<KeyValue {...autoFocusProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render customized KeyValue', () => {
		// given
		const autoFocusProps = {
			...props,
			schema: {
				...props.schema,
				items: [
					{
						key: props.schema.key.concat('key'),
						autoFocus: true,
						readOnly: true,
						required: true,
						schema: { type: 'number' },
						type: 'number',
					},
				],
			},
		};

		// when
		const wrapper = shallow(<KeyValue {...autoFocusProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
