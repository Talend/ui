/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import debounce from 'lodash/debounce';
import SchemaForm from './SchemaForm.component';

export default {
	title: 'Schema Concepts|Trigger',
	parameters: { component: SchemaForm },
};

const triggerSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			focus: { type: 'string' },
			blur: { type: 'string' },
			change: { type: 'string' },
			input: { type: 'string' },
		},
	},
	uiSchema: [
		{
			key: 'focus',
			title: 'Focus',
			triggers: [
				{
					action: 'SuggestionForDemo',
					family: 'remote',
					type: 'suggestions',
					onEvent: 'focus',
				},
			],
		},
		{
			key: 'blur',
			title: 'Blur',
			triggers: [
				{
					action: 'SuggestionForDemo',
					family: 'remote',
					type: 'suggestions',
					onEvent: 'blur',
				},
			],
		},
		{
			key: 'change',
			title: 'Change',
			triggers: [
				{
					action: 'SuggestionForDemo',
					family: 'remote',
					type: 'suggestions',
					onEvent: 'change',
				},
			],
		},
		{
			key: 'input',
			title: 'Input',
			triggers: [
				{
					action: 'SuggestionForDemo',
					family: 'remote',
					type: 'suggestions',
					onEvent: 'input',
				},
			],
		},
	],
	properties: {},
};
export const TriggerCall = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={action('onTrigger')}
		data={triggerSchema}
		onSubmit={action('onSubmit')}
	/>
);

const updateDataSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			firstname: { type: 'string' },
			replicateFirstname: { type: 'string' },

			lastname: { type: 'string' },
			replicateLastname: { type: 'string' },

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
			key: 'firstname',
			title: 'First name',
			triggers: [
				{
					action: 'replicateFirstname',
					onEvent: 'change',
				},
			],
		},
		{
			key: 'replicateFirstname',
			title: 'Replication via static properties',
		},

		{
			key: 'lastname',
			title: 'Last name',
			triggers: [
				{
					action: 'replicateLastname',
					onEvent: 'change',
				},
			],
		},
		{
			key: 'replicateLastname',
			title: 'Replication via properties modifier',
		},

		{
			key: 'home.address',
			title: 'Address',
			triggers: [
				{
					action: 'replicateAddress',
					onEvent: 'change',
				},
			],
		},
		{
			key: 'home.replicateAddress',
			title: 'Replication in nested structure',
		},
	],
	properties: {},
};
function updateDataOnTrigger({ trigger, schema, properties, errors }) {
	switch (trigger.action) {
		case 'replicateFirstname':
			return Promise.resolve({
				properties: { ...properties, replicateFirstname: properties.firstname },
			});

		case 'replicateLastname':
			return Promise.resolve({
				properties: oldProperties => ({
					...oldProperties,
					replicateLastname: oldProperties.lastname,
				}),
			});

		case 'replicateAddress':
			return Promise.resolve({
				properties: oldProperties => ({
					...oldProperties,
					home: { ...oldProperties.home, replicateAddress: oldProperties.home.address },
				}),
			});

		default:
			return null;
	}
}
export const UpdateData = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={updateDataOnTrigger}
		data={updateDataSchema}
		onSubmit={action('onSubmit')}
	/>
);

const validateDataSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			firstname: { type: 'string' },
			lastname: { type: 'string' },

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
function validateDataOnTrigger({ trigger, schema, properties, errors }) {
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

		case 'validateAddress':
			return Promise.resolve({
				errors: oldErrors => {
					console.log(properties.home && properties.home.address);
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
