/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaForm from './SchemaForm.component';

export default {
	title: 'Schema Concepts|Validation Language',
	parameters: { component: SchemaForm },
};

const requiredSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			required: { type: 'string' },
		},
		required: ['required'],
	},
	uiSchema: [{ key: 'required', title: 'Required' }],
	properties: {},
};
export const Required = () => (
	<SchemaForm
		id="schema-form"
		data={requiredSchema}
		language={{ OBJECT_REQUIRED: 'Custom lang: this is required' }}
		onSubmit={action('onSubmit')}
	/>
);

const patternSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			pattern: { type: 'string', pattern: '^\\S+@\\S+$' },
		},
	},
	uiSchema: [{ key: 'pattern', title: 'Pattern (email)' }],
	properties: {},
};
export const Pattern = () => (
	<SchemaForm
		id="schema-form"
		data={patternSchema}
		language={{ STRING_PATTERN: "Custom lang: this doesn't fit the pattern" }}
		onSubmit={action('onSubmit')}
	/>
);

const minMaxSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			minmax: { type: 'number', minimum: 2, maximum: 6 },
		},
	},
	uiSchema: [{ key: 'minmax', title: 'Min Max [2, 6]' }],
	properties: {},
};
export const MinMax = () => (
	<SchemaForm
		id="schema-form"
		data={minMaxSchema}
		language={{
			NUMBER_MINIMUM: 'Custom lang: This is under the min value',
			NUMBER_MAXIMUM: 'Custom lang: This is over the max value',
		}}
		onSubmit={action('onSubmit')}
	/>
);

const arraySchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			users: {
				type: 'array',
				items: { type: 'string' },
			},
		},
	},
	uiSchema: [
		{
			key: 'users',
			title: 'Users (nb items between [3, 5])',
			minItems: 3,
			maxItems: 5,
		},
	],
	properties: {},
};
export const ArrayNbItems = () => (
	<SchemaForm
		id="schema-form"
		data={arraySchema}
		language={{
			ARRAY_LENGTH_SHORT: 'Custom lang: This is under the min nb items',
			ARRAY_LENGTH_LONG: 'Custom lang: This is over the max nb items',
		}}
		onSubmit={action('onSubmit')}
	/>
);

const enumSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			fruit: {
				type: 'string',
				enum: ['apple', 'cherry', 'strawberry'],
			},
		},
	},
	uiSchema: [
		{
			key: 'fruit',
			itemTitle: 'Users',
			restricted: true,
			widget: 'datalist',
		},
	],
	properties: {},
};
export const Enum = () => (
	<SchemaForm
		id="schema-form"
		data={enumSchema}
		language={{ ENUM_MISMATCH: 'Custom lang: This is not in the enum' }}
		onSubmit={action('onSubmit')}
	/>
);
