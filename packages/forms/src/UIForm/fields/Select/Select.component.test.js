import React from 'react';
import { shallow } from 'enzyme';

import Select from './Select.component';

describe('Select field', () => {
	const schema = {
		autoFocus: true,
		description: 'Select me',
		placeholder: 'Please select a value',
		schema: {
			enum: ['foo', 'bar', 'lol'],
			type: 'string',
		},
		title: 'My Select title',
		titleMap: [
			{ name: 'My foo title', value: 'foo' },
			{ name: 'My bar title', value: 'bar' },
			{ name: 'My lol title', value: 'lol' },
		],
		type: 'select',
	};

	it('should render simple select', () => {
		// when
		const wrapper = shallow(
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				schema={schema}
				value={'lol'}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render select multiple', () => {
		// given
		const multipleSchema = {
			...schema,
			multiple: true,
			schema: {
				type: 'array',
				uniqueItems: true,
				items: schema.schema,
			},
		};

		// when
		const wrapper = shallow(
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				schema={multipleSchema}
				value={['foo', 'lol']}
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
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				schema={disabledSchema}
				value={'lol'}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render readOnly input', () => {
		// given
		const readOnlySchema = {
			...schema,
			readOnly: true,
		};

		// when
		const wrapper = shallow(
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				schema={readOnlySchema}
				value={'lol'}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should trigger onChange', () => {
		// given
		const onChange = jest.fn();
		const wrapper = shallow(
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={onChange}
				schema={schema}
				value={'lol'}
			/>
		);
		const event = { target: { value: 'bar' } };

		// when
		wrapper.find('select').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(
			event,
			{ schema, value: 'bar' }
		);
	});

	it('should trigger array onChange', () => {
		// given
		const onChange = jest.fn();
		const multipleSchema = {
			...schema,
			multiple: true,
			schema: {
				type: 'array',
				uniqueItems: true,
				items: schema.schema,
			},
		};
		const event = { target: {
			options: [
				{ value: 'foo', selected: true },
				{ value: 'bar', selected: false },
				{ value: 'lol', selected: true },
			],
		} };
		const wrapper = shallow(
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={onChange}
				schema={multipleSchema}
				value={['foo', 'lol']}
			/>
		);

		// when
		wrapper.find('select').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(
			event,
			{ schema: multipleSchema, value: ['foo', 'lol'] }
		);
	});
});
