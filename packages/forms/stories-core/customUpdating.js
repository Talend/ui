import React from 'react';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { action } from '@storybook/addon-actions';
import { UIForm } from '../src/UIForm';

const schema = {
	jsonSchema: {
		type: 'object',
		title: 'Comment',
		properties: {
			string: {
				type: 'string',
			},
			number: {
				type: 'number',
			},
			textarea: {
				type: 'string',
			},
			checkbox: {
				type: 'boolean',
			},
			multicheckbox: {
				type: 'array',
				items: {
					type: 'string',
					enum: ['foo', 'bar', 'fuzz', 'qux'],
				},
			},
			code: {
				type: 'string',
			},
			datalist: {
				type: 'string',
				enum: ['Apple', 'Pine[apple]', 'Banana', 'Cher[ry', 'Lemo}n', 'Grapefruit'],
			},
		},
		required: ['name', 'firstname', 'email', 'comment'],
	},
	uiSchema: [
		{
			key: 'string',
			title: 'String',
		},
		{
			key: 'number',
			title: 'Number',
		},
		{
			key: 'textarea',
			widget: 'textarea',
			title: 'Textarea',
			rows: 5,
			validationMessage: "Don't be greedy!",
		},
		{
			key: 'checkbox',
			title: 'Check if you are happy',
		},
		{
			key: 'multicheckbox',
			title: 'Select multiple values',
			errorMessage: 'Please select at least an option',
		},
		{
			key: 'code',
			widget: 'code',
			description: "This widget with custom prop 'height: 100px'",
			title: 'Code small',
			options: {
				language: 'python',
				height: '100px',
			},
		},
		{
			key: 'datalist',
			restricted: true,
			title: 'Datalist',
			widget: 'datalist',
		},
	],
	properties: {},
};

const updating = schema.uiSchema.map(w => w.key);

function story() {
	return (
		<div>
			<IconsProvider />
			<UIForm
				data={schema}
				onChange={action('Change')}
				onSubmit={action('onSubmit')}
				updating={updating}
			/>
		</div>
	);
}

export default {
	name: 'Core Concept updating',
	story,
};
