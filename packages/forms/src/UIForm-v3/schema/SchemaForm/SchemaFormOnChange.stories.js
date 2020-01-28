/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaForm from './SchemaForm.component';

export default {
	title: 'Schema Concepts|On Change',
	parameters: { component: SchemaForm },
};

const onChangeSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			civility: { type: 'string', enum: ['M', 'Mme', 'Mrs'] },
			name: { type: 'string' },
		},
	},
	uiSchema: [
		{ key: 'civility', title: 'Civility', widget: 'datalist' },
		{ key: 'name', title: 'Name' },
	],
	properties: {},
};
export const OnChange = () => (
	<SchemaForm
		id="schema-form"
		data={onChangeSchema}
		onChange={action('onChange')}
		onSubmit={action('onSubmit')}
	/>
);
