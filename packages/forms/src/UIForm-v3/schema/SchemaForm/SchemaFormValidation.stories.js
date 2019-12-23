/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaForm from './SchemaForm.component';

export default {
	title: 'Schema Concepts|Validation',
	parameters: { component: SchemaForm },
};

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

const customErrorSchema = {
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
export const CustomErrorMessage = () => (
	<SchemaForm
		id="schema-form"
		customValidation={customValidation}
		data={customErrorSchema}
		onSubmit={action('onSubmit')}
	/>
);

const patternValidationSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			email: { type: 'string', format: 'email' },
			httpUrl: { type: 'string', format: 'url-http-https' },
			gitUrl: { type: 'string', format: 'url-git' },
			noLeadTrailSpace: { type: 'string', format: 'no-leading-trailing-space' },
			noSpace: { type: 'string', format: 'string-without-space' },
			timestamp: { type: 'number', format: 'timestamp' },
			isoDatetime: { type: 'string', format: 'iso-datetime' },
		},
		required: ['required'],
	},
	uiSchema: [
		{ key: 'email', title: 'Email' },
		{ key: 'httpUrl', title: 'URL http(s)', customValidation: true },
		{ key: 'gitUrl', title: 'URL git' },
		{ key: 'noLeadTrailSpace', title: 'No leading/trailing space' },
		{ key: 'noSpace', title: 'No space' },
		{ key: 'timestamp', title: 'Timestamp' },
		{ key: 'isoDatetime', title: 'ISO datetime' },
	],
	properties: {},
};
export const PatternValidation = () => (
	<SchemaForm
		id="schema-form"
		customValidation={customValidation}
		data={patternValidationSchema}
		onSubmit={action('onSubmit')}
	/>
);
