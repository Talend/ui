/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaDatalist from './SchemaDatalist.component';
import SchemaForm from '../../SchemaForm';

export default {
	title: 'Schema Fields|Datalist',

	parameters: {
		component: SchemaDatalist,
	},
};

const enumValues = ['foo', 'bar', 'foobar', 'lol'];
const titleMap = [
	{ name: 'My foo', value: 'foo', description: 'foo description' },
	{ name: 'My bar', value: 'bar' },
	{ name: 'My foobar', value: 'foobar', description: 'foobar description' },
	{ name: 'My lol', value: 'lol' },
];

const statesSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			default: { type: 'string', enum: enumValues },
			disabled: { type: 'string', enum: enumValues },
			readonly: { type: 'string', enum: enumValues },
		},
	},
	uiSchema: [
		{
			key: 'default',
			title: 'Default',
			widget: 'datalist',
			titleMap,
		},
		{
			key: 'disabled',
			title: 'Disabled',
			disabled: true,
			widget: 'datalist',
			titleMap,
		},
		{
			key: 'readonly',
			title: 'Readonly',
			readOnly: true,
			widget: 'datalist',
			titleMap,
		},
	],
	properties: {
		default: 'Apple',
		disabled: 'Apple',
		readonly: 'Apple',
	},
};
export const States = () => (
	<SchemaForm
		id="schema-form"
		data={statesSchema}
		// onChange={action('onChange')}
		onSubmit={action('onSubmit')}
	/>
);

const defaultValueSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			defaultValue: { type: 'string', enum: enumValues },
		},
	},
	uiSchema: [
		{
			key: 'defaultValue',
			title: 'Default value',
			widget: 'datalist',
			titleMap,
		},
	],
	properties: {
		defaultValue: 'lol',
	},
};
export const DefaultValue = () => (
	<SchemaForm id="schema-form" data={defaultValueSchema} onSubmit={action('onSubmit')} />
);

const descriptionSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			description: { type: 'string', enum: enumValues },
		},
	},
	uiSchema: [
		{
			key: 'description',
			title: 'Description',
			description: 'This field has a description',
			widget: 'datalist',
			titleMap,
		},
	],
	properties: {},
};
export const Description = () => (
	<SchemaForm id="schema-form" data={descriptionSchema} onSubmit={action('onSubmit')} />
);

const restrictedSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			restricted: { type: 'string', enum: enumValues },
		},
	},
	uiSchema: [
		{
			key: 'restricted',
			title: 'Restricted',
			restricted: true,
			widget: 'datalist',
		},
	],
	properties: {},
};
export const Restricted = () => (
	<SchemaForm id="schema-form" data={restrictedSchema} onSubmit={action('onSubmit')} />
);

const validationSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			required: { type: 'string', enum: enumValues },
			custom: { type: 'string', enum: enumValues },
		},
		required: ['required'],
	},
	uiSchema: [
		{ key: 'required', title: 'Required', widget: 'datalist', titleMap },
		{ key: 'custom', title: 'Not lol', customValidation: true, widget: 'datalist', titleMap },
	],
	properties: {},
};
const customValidation = (schema, value) => {
	const keyAsString = schema.key.join('.');
	if (keyAsString === 'custom' && value === 'lol') {
		return 'This should not be lol';
	}
	return null;
};
export const Validation = () => (
	<SchemaForm
		id="schema-form"
		customValidation={customValidation}
		data={validationSchema}
		onSubmit={action('onSubmit')}
	/>
);
