/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaFieldset from './SchemaFieldset.component';
import SchemaForm from '../../SchemaForm';

export default {
	title: 'Schema Fields|Fieldset',

	parameters: {
		component: SchemaFieldset,
	},
};

const defaultSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			firstname: { type: 'string' },
			lastname: { type: 'string' },
			age: { type: 'number' },
			phone: { type: 'string' },
			email: { type: 'string' },
		},
	},
	uiSchema: [
		{
			widget: 'fieldset',
			title: 'My awesome user',
			items: [{ key: 'firstname' }, { key: 'lastname' }, { key: 'age' }],
		},
		{
			widget: 'fieldset',
			title: 'Contact',
			items: [{ key: 'phone' }, { key: 'email' }],
		},
	],
	properties: {},
};
export const Default = () => <SchemaForm data={defaultSchema} onSubmit={action('onSubmit')} />;

const hideTitleSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			firstname: { type: 'string' },
			lastname: { type: 'string' },
			age: { type: 'number' },
		},
	},
	uiSchema: [
		{
			widget: 'fieldset',
			title: 'My awesome user',
			items: [{ key: 'firstname' }, { key: 'lastname' }, { key: 'age' }],
			options: { hideTitle: true },
		},
	],
	properties: {},
};
export const HideTitle = () => (
	<React.Fragment>
		<div>(Legend is set to "My awesome user" but not displayed)</div>
		<SchemaForm data={hideTitleSchema} onSubmit={action('onSubmit')} />
	</React.Fragment>
);
