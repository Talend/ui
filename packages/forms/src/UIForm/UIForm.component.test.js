import React from 'react';
import { shallow, mount } from 'enzyme';

import UIForm from './UIForm.component';

const props = {
	autocomplete: 'off',
	customValidation: jest.fn(),
	formName: 'myForm',
	onChange: jest.fn(),
	onTrigger: jest.fn(),
	onSubmit: jest.fn(),
	setError: jest.fn(),
	setErrors: jest.fn(),
	updateForm: jest.fn(),
};

const data = {
	jsonSchema: {
		type: 'object',
		title: 'Comment',
		properties: {
			lastname: {
				type: 'string',
				minLength: 10,
			},
			firstname: {
				type: 'string',
			},
			check: {},
		},
		required: [
			'firstname',
		],
	},
	uiSchema: [
		{
			key: 'lastname',
			title: 'Last Name (with description)',
			description: 'Hint: this is the last name',
			autoFocus: true,
		},
		{
			key: 'firstname',
			title: 'First Name (with placeholder)',
			placeholder: 'Enter your firstname here',
			triggers: ['after'],
		},
		{
			key: 'check',
			type: 'button',
			title: 'Check the thing',
			triggers: ['after'],
		},
	],
	properties: {},
	errors: {},
};

const mergedSchema = [
	{
		autoFocus: true,
		description: 'Hint: this is the last name',
		key: ['lastname'],
		minlength: 10,
		ngModelOptions: {},
		schema: { minLength: 10, type: 'string' },
		title: 'Last Name (with description)',
		type: 'text',
	},
	{
		key: ['firstname'],
		ngModelOptions: {},
		placeholder: 'Enter your firstname here',
		required: true,
		schema: { type: 'string' },
		title: 'First Name (with placeholder)',
		triggers: ['after'],
		type: 'text',
	},
	{
		key: ['check'],
		title: 'Check the thing',
		triggers: ['after'],
		type: 'button',
	},
];

describe('UIForm component', () => {
	it('should render form', () => {
		// when
		const wrapper = shallow(<UIForm {...data} {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	describe('#onChange', () => {
		it('should call onChange callback', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} />);
			const newValue = 'toto';
			const event = { target: { value: newValue } };
			const inputValidationError = 'String is too short (4 chars), minimum 10';
			expect(props.onChange).not.toBeCalled();

			// when
			wrapper.find('input').at(0).simulate('change', event);

			// then
			expect(props.onChange).toBeCalledWith(
				props.formName,
				mergedSchema[0],
				newValue,
				inputValidationError,
			);
			expect(props.onTrigger).not.toBeCalled();
		});

		it('should trigger "after" trigger', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} />);
			const newValue = 'toto';
			const event = { target: { value: newValue } };
			expect(props.onTrigger).not.toHaveBeenCalled();
			props.onTrigger.mockReturnValueOnce(Promise.resolve({}));

			// when
			wrapper.find('input').at(1).simulate('change', event);

			// then
			expect(props.onTrigger).toHaveBeenCalledWith(
				'after',
				mergedSchema[1],
				newValue,
				data.properties,
			);
		});
	});

	describe('#onTrigger', () => {
		it('should call trigger callback', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} />);
			props.onTrigger.mockReturnValueOnce(Promise.resolve({}));

			// when
			wrapper.find('button').at(0).simulate('click');

			// then
			expect(props.onTrigger).toHaveBeenCalledWith(
				'after',
				mergedSchema[2],
				undefined,
				data.properties,
			);
		});

		it('should updateForm on trigger success', () => {
			// given
			// const wrapper = mount(<UIForm {...data} {...props} />);
			// const nextData = {
			// 	jsonSchema: {
			// 		type: 'object',
			// 		title: 'User',
			// 		properties: {
			// 			name: { type: 'string' },
			// 		},
			// 	},
			// 	uiSchema: ['name'],
			// 	properties: { name: 'toto' },
			// 	errors: { name: 'This field is required' },
			// };
			// props.onTrigger.mockReturnValueOnce(Promise.resolve(nextData).then(done));
			//
			// // when
			// wrapper.find('button').at(0).simulate('click');
			//
			// // then
			// expect(props.updateForm).toHaveBeenCalledWith(
			// 	'after',
			// 	mergedSchema[2],
			// 	undefined,
			// 	data.properties,
			// );
		});

		it('should setError after trigger failure', () => {

		});
	});

	describe('#submit', () => {
		it('should prevent default submit', () => {

		});

		it('should validate all fields', () => {

		});

		it('should not call submit callback when form is invalid', () => {

		});

		it('should call submit callback when form is valid', () => {

		});
	});
});
