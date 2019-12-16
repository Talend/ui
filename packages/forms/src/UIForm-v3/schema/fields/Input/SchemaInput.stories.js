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
export const States = () => <SchemaForm data={statesSchema} onSubmit={action('onSubmit')} />;

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
export const Types = () => <SchemaForm data={typesSchema} onSubmit={action('onSubmit')} />;

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
	<SchemaForm data={defaultValueSchema} onSubmit={action('onSubmit')} />
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
	<SchemaForm data={descriptionSchema} onSubmit={action('onSubmit')} />
);

const validationSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			required: { type: 'string' },
			custom: { type: 'string' },
			pattern: { type: 'string', pattern: '^\\S+@\\S+$' },
			format: { type: 'string', format: 'email' },
			minmax: { type: 'number', minimum: 2, maximum: 6 },
		},
		required: ['required'],
	},
	uiSchema: [
		{ key: 'required', title: 'Required' },
		{ key: 'custom', title: 'Custom (not lol)', customValidation: true },
		{ key: 'pattern', title: 'Pattern (email)' },
		{ key: 'format', title: 'Format (email)' },
		{ key: 'minmax', title: 'Min/Max (2 <= x <= 6)' },
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

const validationSchemaWithCustomMessages = {
	jsonSchema: {
		type: 'object',
		properties: {
			required: { type: 'string' },
			custom: { type: 'string' },
			pattern: { type: 'string', pattern: '^\\S+@\\S+$' },
			format: { type: 'string', format: 'email' },
			minmax: { type: 'number', minimum: 2, maximum: 6 },
		},
		required: ['required'],
	},
	uiSchema: [
		{
			key: 'required',
			title: 'Required',
			validationMessage: 'This field is very important !',
		},
		{
			key: 'custom',
			title: 'Custom (not lol)',
			customValidation: true,
			validationMessage: 'This is not a joke, "lol" is not serious !',
		},
		{
			key: 'pattern',
			title: 'Pattern (email)',
			validationMessage: 'Please enter a valid email address, e.g. user@email.com',
		},
		{
			key: 'format',
			title: 'Format (email)',
			validationMessage: 'Please enter a valid email address, e.g. user@email.com',
		},
		{
			key: 'minmax',
			title: 'Min/Max (2 <= x <= 6)',
			validationMessage: 'This is not in the range',
		},
	],
	properties: {},
};
export const ValidationWithCustomMessages = () => (
	<SchemaForm
		id="schema-form"
		customValidation={customValidation}
		data={validationSchemaWithCustomMessages}
		onSubmit={action('onSubmit')}
	/>
);
