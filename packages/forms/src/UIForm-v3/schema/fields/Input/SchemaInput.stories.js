/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaInput from './SchemaInput.component';
import SchemaForm from '../../SchemaForm';

export default {
	title: 'Schema Fields|Input',

	parameters: {
		component: SchemaInput,
	},
};

const statesSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			default: { type: 'string' },
			disabled: { type: 'string' },
			readonly: { type: 'string' },
		},
	},
	uiSchema: [
		{
			key: 'default',
			title: 'Default',
		},
		{
			key: 'disabled',
			title: 'Disabled',
			disabled: true,
		},
		{
			key: 'readonly',
			title: 'Readonly',
			readOnly: true,
		},
	],
	properties: {
		default: 'Jimmy',
		disabled: 'Jimmy',
		readonly: 'Jimmy',
	},
};
export const States = () => (
	<SchemaForm id="schema-form" data={statesSchema} onSubmit={action('onSubmit')} />
);

const typesSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			text: { type: 'string' },
			number: { type: 'number' },
			password: { type: 'string' },
		},
	},
	uiSchema: [
		{
			key: 'text',
			title: 'Text',
		},
		{
			key: 'number',
			title: 'Number',
		},
		{
			key: 'password',
			title: 'Password',
			type: 'password',
		},
	],
	properties: {
		default: 'Jimmy',
		disabled: 'Jimmy',
		readonly: 'Jimmy',
	},
};
export const Types = () => (
	<SchemaForm id="schema-form" data={typesSchema} onSubmit={action('onSubmit')} />
);

const defaultValueSchema = {
	jsonSchema: {
		type: 'object',
		properties: { name: { type: 'string' } },
	},
	uiSchema: [
		{
			key: 'name',
			title: 'Name',
		},
	],
	properties: { name: 'Jimmy' },
};
export const DefaultValue = () => (
	<SchemaForm id="schema-form" data={defaultValueSchema} onSubmit={action('onSubmit')} />
);

const descriptionSchema = {
	jsonSchema: {
		type: 'object',
		properties: { name: { type: 'string' } },
	},
	uiSchema: [
		{
			key: 'name',
			title: 'Name',
			description: 'This field has a description',
		},
	],
	properties: {},
};
export const Description = () => (
	<SchemaForm id="schema-form" data={descriptionSchema} onSubmit={action('onSubmit')} />
);

const validationSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			required: { type: 'string' },
			custom: { type: 'string' },
		},
		required: ['required'],
	},
	uiSchema: [
		{ key: 'required', title: 'Required' },
		{ key: 'custom', title: 'Not lol', customValidation: true },
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
