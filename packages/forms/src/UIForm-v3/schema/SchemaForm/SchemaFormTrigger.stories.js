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
