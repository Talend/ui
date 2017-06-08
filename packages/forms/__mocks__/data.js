import React from 'react';
import configureMockStore from 'redux-mock-store';

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
		type: 'button',
	},
];

export function initProps() {
	return {
		autoComplete: 'off',
		customValidation: jest.fn(),
		formName: 'myFormName',
		id: 'myFormId',
		onChange: jest.fn(),
		onSubmit: jest.fn(),
		onTrigger: jest.fn(),
		widgets: {
			custom: () => (<div>Custom</div>),
		},
	};
}

export function initStore(formName, form) {
	const mockStore = configureMockStore();
	const state = { forms: {} };

	if (formName && form) {
		state.forms[formName] = { ...form };
	}

	return mockStore(state);
}
