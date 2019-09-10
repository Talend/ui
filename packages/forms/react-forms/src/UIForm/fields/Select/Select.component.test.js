import React from 'react';
import { shallow } from 'enzyme';
import omit from 'lodash/omit';

import Select from './Select.component';

describe('Select field', () => {
	const schema = {
		autoFocus: true,
		description: 'Select me',
		placeholder: 'Please select a value',
		required: true,
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
				onFinish={jest.fn()}
				schema={schema}
				value={'lol'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render simple select without placeholder', () => {
		// given
		const localSchema = omit(schema, 'placeholder');

		// when
		const wrapper = shallow(
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={localSchema}
				value={'lol'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
				onFinish={jest.fn()}
				schema={multipleSchema}
				value={['foo', 'lol']}
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
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
				value={'lol'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
				onFinish={jest.fn()}
				schema={readOnlySchema}
				value={'lol'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
				onFinish={jest.fn()}
				schema={schema}
				value={'lol'}
			/>,
		);
		const event = { target: { value: 'bar' } };

		// when
		wrapper.find('select').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema, value: 'bar' });
	});

	it('should trigger array onChange', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const multipleSchema = {
			...schema,
			multiple: true,
			schema: {
				type: 'array',
				uniqueItems: true,
				items: schema.schema,
			},
		};
		const event = {
			target: {
				options: [
					{ value: 'foo', selected: true },
					{ value: 'bar', selected: false },
					{ value: 'lol', selected: true },
				],
			},
		};
		const wrapper = shallow(
			<Select
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={onChange}
				onFinish={onFinish}
				schema={multipleSchema}
				value={['foo', 'lol']}
			/>,
		);

		// when
		wrapper.find('select').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema: multipleSchema, value: ['foo', 'lol'] });
		expect(onFinish).toBeCalledWith(event, { schema: multipleSchema, value: ['foo', 'lol'] });
	});
});
