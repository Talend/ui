/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaForm from './SchemaForm.component';

export default {
	title: 'Schema Concepts|Validation Format',
	parameters: { component: SchemaForm },
};

const formatsSchema = {
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
export const DefaultFormats = () => (
	<SchemaForm id="schema-form" data={formatsSchema} onSubmit={action('onSubmit')} />
);

const customFormatsValidationSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			name: { type: 'string', format: 'trailingSpace' },
			email: { type: 'string', format: 'email' },
		},
	},
	uiSchema: [
		{ key: 'name', title: 'Name', description: 'Custom format: need a trailing space' },
		{ key: 'email', title: 'Email', description: 'Custom format override: must be an @gmail.com' },
	],
	properties: {},
};
const customFormats = {
	trailingSpace: fieldData => {
		if (fieldData && !fieldData.endsWith(' ')) {
			return 'Please add a trailing space';
		}
		return null;
	},
	email: fieldData => {
		const emailRegExp = /^[a-zA-Z][a-zA-Z0-9-.]+@gmail\.com$/;
		if (fieldData && typeof fieldData === 'string' && !emailRegExp.test(fieldData)) {
			return 'This is not a gmail address';
		}
		return null;
	},
};
export const CustomFormats = () => (
	<SchemaForm
		id="schema-form"
		customFormats={customFormats}
		data={customFormatsValidationSchema}
		onSubmit={action('onSubmit')}
	/>
);
