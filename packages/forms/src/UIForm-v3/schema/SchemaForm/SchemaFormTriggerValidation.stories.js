/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaForm from './SchemaForm.component';

export default {
	title: 'Schema Concepts|Trigger Validation',
	parameters: { component: SchemaForm },
};

const validateDataSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			firstname: { type: 'string' },
			lastname: { type: 'string' },
		},
	},
	uiSchema: [
		{
			key: 'firstname',
			title: 'First name',
			description: 'Should not be lol, validated via static error',
			triggers: [
				{
					action: 'validateFirstname',
					onEvent: 'blur',
				},
			],
		},
		{
			key: 'lastname',
			title: 'Last name',
			description: 'Should not be lol, validated via error modifier',
			triggers: [
				{
					action: 'validateLastname',
					onEvent: 'blur',
				},
			],
		},
	],
	properties: {},
};
function validateDataOnTrigger({ trigger, properties, errors }) {
	switch (trigger.action) {
		case 'validateFirstname': {
			const newErrors = { ...errors };

			if (properties.firstname === 'lol') {
				newErrors.firstname = 'Must not be lol';
				return Promise.resolve({ errors: newErrors });
			} else if (errors.firstname) {
				delete newErrors.firstname;
				return Promise.resolve({ errors: newErrors });
			}
			return null;
		}

		case 'validateLastname':
			return Promise.resolve({
				errors: oldErrors => {
					if (properties.lastname === 'lol') {
						return { ...oldErrors, lastname: 'Must not be lol' };
					} else if (oldErrors.lastname) {
						const newErrors = { ...errors };
						delete newErrors.lastname;
						return newErrors;
					}
					return oldErrors;
				},
			});

		default:
			return null;
	}
}
export const validateData = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={validateDataOnTrigger}
		data={validateDataSchema}
		onSubmit={action('onSubmit')}
	/>
);

const validateNestedDataSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			home: {
				type: 'object',
				properties: {
					address: { type: 'string' },
					replicateAddress: { type: 'string' },
				},
			},
		},
	},
	uiSchema: [
		{
			key: 'home.address',
			title: 'Address',
			description: 'Should not be lol, nested structure home.address',
			triggers: [
				{
					action: 'validateAddress',
					onEvent: 'blur',
				},
			],
		},
	],
	properties: {},
};
function validateNestedDataOnTrigger({ trigger, properties, errors }) {
	if (trigger.action === 'validateAddress') {
		return Promise.resolve({
			errors: oldErrors => {
				if (properties.home && properties.home.address === 'lol') {
					return { ...oldErrors, 'home.address': 'Must not be lol' };
				} else if (oldErrors['home.address']) {
					const newErrors = { ...errors };
					delete newErrors['home.address'];
					return newErrors;
				}
				return oldErrors;
			},
		});
	}
	return null;
}
export const validateNestedData = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={validateNestedDataOnTrigger}
		data={validateNestedDataSchema}
		onSubmit={action('onSubmit')}
	/>
);

const validateArrayDataSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			users: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						lastname: { type: 'string' },
						firstname: { type: 'string' },
					},
					required: ['firstname', 'lastname'],
				},
			},
		},
	},
	uiSchema: [
		{
			key: 'users',
			itemTitle: 'Users',
			items: [
				{
					key: 'users[].lastname',
					title: 'Last name',
					triggers: [
						{
							onEvent: 'change',
							action: 'validateLastname',
						},

						{
							onEvent: 'input',
							action: 'validateLastname',
						},
					],
				},
				{
					key: 'users[].firstname',
					title: 'First name',
				},
			],
		},
	],
	properties: {},
};
function validateArrayDataOnTrigger({ schema, trigger, properties, errors }) {
	if (trigger.action === 'validateLastname') {
		const index = schema.key[1];
		const userLastnameKey = schema.key.join('.');
		return Promise.resolve({
			errors: oldErrors => {
				if (properties.users[index].lastname === 'lol') {
					return { ...oldErrors, [userLastnameKey]: 'Must not be lol' };
				} else if (oldErrors[userLastnameKey]) {
					const newErrors = { ...errors };
					delete newErrors[userLastnameKey];
					return newErrors;
				}
				return oldErrors;
			},
		});
	}
	return null;
}
export const validateArrayData = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={validateArrayDataOnTrigger}
		data={validateArrayDataSchema}
		onSubmit={action('onSubmit')}
	/>
);
