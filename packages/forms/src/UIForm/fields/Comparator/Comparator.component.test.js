import React from 'react';
import { shallow } from 'enzyme';
import Comparator from './Comparator.component';

describe('Comparator field', () => {
	const props = {
		onChange: jest.fn(),
		onFinish: jest.fn(),
		id: 'default',
		schema: {
			key: ['default'],
			widget: 'comparator',
			title: 'Default comparator',
			schema: {
				type: 'object',
				required: ['value'],
				properties: {
					operator: { type: 'string', enum: ['>', '<', '='] },
					value: { type: 'string' },
				},
			},
			type: 'fieldset',
			items: [
				{
					title: 'operator',
					schema: { type: 'string', enum: ['>', '<', '='] },
					key: ['default', 'operator'],
					type: 'select',
					titleMap: [
						{ name: 'Greater than', value: '>' },
						{ name: 'Less than', value: '<' },
						{ name: '=', value: '=' },
					],
				},
				{
					title: 'value',
					required: true,
					schema: { type: 'string' },
					key: ['default', 'value'],
					type: 'text',
				},
			],
		},
		errors: {},
		widgets: {},
		isValid: true,
	};

	it('should render default Comparator', () => {
		// when
		const wrapper = shallow(<Comparator {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled Comparator', () => {
		// given
		const disabledProps = {
			...props,
			schema: {
				...props.schema,
				disabled: true,
			},
		};

		// when
		const wrapper = shallow(<Comparator {...disabledProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
