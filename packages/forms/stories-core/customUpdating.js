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
			date: {
				type: 'string',
			},
			file: {
				type: 'string',
			},
			multiSelectTag: {
				type: 'array',
				items: {
					type: 'string',
					enum: ['Apple'],
				},
			},
			radios: {
				type: 'string',
				enum: ['foo', 'bar', 'fuzz', 'qux'],
			},
			toggle: {
				type: 'boolean',
			},
		},
	},
	uiSchema: [
		{
			key: 'string',
			title: 'string',
		},
		{
			key: 'number',
			title: 'number',
		},
		{
			key: 'textarea',
			widget: 'textarea',
			title: 'textarea',
			rows: 5,
		},
		{
			key: 'checkbox',
			title: 'checkbox',
		},
		{
			key: 'multicheckbox',
			title: 'multicheckbox',
		},
		{
			key: 'code',
			widget: 'code',
			title: 'code',
			options: {
				language: 'javascript',
				height: '100px',
			},
		},
		{
			key: 'datalist',
			restricted: true,
			title: 'datalist',
			widget: 'datalist',
		},
		{
			key: 'date',
			title: 'date',
			widget: 'date',
			options: {
				dateFormat: 'DD/MM/YYYY',
			},
		},
		{
			key: 'file',
			title: 'file',
			widget: 'file',
		},
		{
			key: 'multiSelectTag',
			title: 'multiSelectTag',
			widget: 'multiSelectTag',
			titleMap: [
				{
					name: 'Apple12',
					value: 'Apple',
				},
			],
		},
		{
			key: 'toggle',
			title: 'toggle',
			widget: 'toggle',
		},
		{
			key: 'radios',
			title: 'radios',
			widget: 'radios',
		},
	],
	properties: {},
};

const updating = schema.uiSchema.map(w => w.key);

function story() {
	return (
		<div>
			<IconsProvider />
			<p>
				You can pass a property to UIForm "updating" as an array of keys to make them flick and
				being disabled
			</p>
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
