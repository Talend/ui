/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
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
function onTrigger({ trigger, schema, properties, errors }) {
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
			return Promise.resolve({});
	}
}
export const UpdateData = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={onTrigger}
		data={updateDataSchema}
		onSubmit={action('onSubmit')}
	/>
);
