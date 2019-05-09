import React from 'react';

export const data = {
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
		required: ['firstname'],
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
			widget: 'button',
			title: 'Check the thing',
			triggers: ['after'],
		},
	],
	properties: {},
	errors: {},
};

export const actions = [
	{
		title: 'Reset',
		type: 'reset',
		widget: 'button',
	},
	{
		disabled: true,
		title: 'Disabled',
		type: 'button',
		widget: 'button',
	},
	{
		inProgress: true,
		title: 'In progress',
		type: 'button',
		widget: 'button',
	},
	{
		title: 'Trigger',
		triggers: ['test'],
		type: 'button',
		widget: 'button',
	},
	{
		bsStyle: 'primary',
		title: 'Submit',
		type: 'submit',
		widget: 'button',
	},
];

export const mergedSchema = [
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
		widget: 'button',
	},
];

export function initProps() {
	return {
		autoComplete: 'off',
		customValidation: jest.fn(),
		className: 'my-form-class',
		formName: 'myFormName',
		id: 'myFormId',
		onChange: jest.fn(),
		onSubmit: jest.fn(),
		onReset: jest.fn(),
		onTrigger: jest.fn(() => Promise.resolve()),
		widgets: {
			custom: () => <div>Custom</div>,
		},
	};
}
