import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Input from 'react-jsonschema-form/lib/components/widgets/TextWidget';
import Checkbox from 'react-jsonschema-form/lib/components/widgets/CheckboxWidget';
import Select from 'react-jsonschema-form/lib/components/widgets/SelectWidget';

import Form from '../src/Form';

const data = {
	jsonSchema: {
		title: 'TestForm',
		type: 'object',
		properties: {
			name: {
				type: 'string',
				title: 'Name',
				default: 'John Doe',
			},
			admin: {
				type: 'boolean',
				title: 'Admin',
				default: true,
			},
			roles: {
				type: 'string',
				enum: ['dev', 'pm'],
				enumName: ['Developer', 'Project Manager'],
			},
		},
	},
};

describe('<Form/>', () => {
	let wrapper;
	const onSubmit = jest.fn();
	const onChange = jest.fn();

	beforeEach(() => {
		wrapper = mount(<Form data={data}
		                      onChange={onChange}
		                      onSubmit={onSubmit}/>);
	});

	it('Renders the <Input/> component', () => {
		expect(wrapper.containsMatchingElement(<Input/>)).toBeTruthy();
	});

	it('Renders the <Checkbox/> component', () => {
		expect(wrapper.containsMatchingElement(<Checkbox/>)).toBeTruthy();
	});

	it('Renders the <Select/> component', () => {
		expect(wrapper.containsMatchingElement(<Select/>)).toBeTruthy();
	});

	// TODO: Follow what's happening on https://github.com/airbnb/enzyme/issues/364
	// and update accordingly.
	// So far it's not possible to get the onChange method to be bubbled up to the
	// form
	it('Handles changes', () => {
		const input = wrapper.find('input').first();
		input.simulate('change', { target: { value: 'Test' } });
		expect(input.props().value).toEqual('Test');
		// expect(onChange.mock.calls.length).toEqual(1);
	});

	it('Handles submit', () => {
		wrapper.simulate('submit');
		expect(onSubmit.mock.calls.length).toEqual(1);
	});

	describe('<Form actions/>', () => {
		it('Renders default actions when no actions specified', () => {
			const actions = wrapper.find('button');
			expect(actions.length).toEqual(1);
			expect(actions.first().props().type).toEqual('submit');
		});

		it('Renders pass-in form actions', () => {
			const onClickReset = jest.fn();
			const formActions = [
				{
					style: 'primary',
					type: 'submit',
					onClick: onSubmit,
					label: 'Submit',
				},
				{
					style: 'link',
					type: 'reset',
					onClick: onClickReset,
					label: 'Reset',
				},
			];
			wrapper = mount(<Form
				data={data}
				onSubmit={onSubmit}
				onChange={onChange}
				actions={formActions}
			/>);
			const actions = wrapper.find('button');
			expect(actions.length).toEqual(2);

			expect(actions.first().props().type).toEqual('submit');
			const reset = actions.at(1);
			expect(reset.props().type).toEqual('reset');

			reset.simulate('click');
			expect(onClickReset.mock.calls.length).toEqual(1);
		});

		it('Renders form with custom css', () => {
			const customData = {
				jsonSchema: {
					title: 'TestForm',
					type: 'object',
					properties: {
						name: {
							type: 'string',
							title: 'Name',
							default: 'John Doe',
						},
						roles: {
							type: 'string',
							enum: ['dev', 'pm'],
							enumName: ['Developer', 'Project Manager'],
						},
					},
				},
			};

			const onClickReset = jest.fn();
			const formActions = [
				{
					style: 'primary',
					type: 'submit',
					onClick: onSubmit,
					label: 'Submit',
				},
				{
					style: 'link',
					type: 'reset',
					onClick: onClickReset,
					label: 'Reset',
				},
			];
			const form = renderer.create(<Form
				className="form"
				buttonBlockClass="buttons"
				data={customData}
				onSubmit={onSubmit}
				onChange={onChange}
				actions={formActions}
			/>).toJSON();
			expect(form).toMatchSnapshot();
		});
	});
});
