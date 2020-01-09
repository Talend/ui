/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaForm from './SchemaForm.component';

export default {
	title: 'Schema Concepts|Condition',
	parameters: { component: SchemaForm },
};

const conditionSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			address: { type: 'string' },
		},
	},
	uiSchema: [
		{ key: 'name', title: 'Name', description: 'You need to enter "lol" to display the address' },
		{
			key: 'address',
			title: 'Address (only for "lol" users)',
			condition: { '==': [{ var: 'name' }, 'lol'] },
		},
	],
	properties: {},
};
export const Condition = () => (
	<SchemaForm id="schema-form" data={conditionSchema} onSubmit={action('onSubmit')} />
);
