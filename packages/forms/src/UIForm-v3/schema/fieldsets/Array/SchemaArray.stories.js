/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaArray from './SchemaArray.component';
import SchemaForm from '../../SchemaForm';

export default {
	title: 'Schema Fieldsets|Array',

	parameters: {
		component: SchemaArray,
	},
};

function getExample(uiSchemaOptions = {}, properties = {}) {
	return {
		jsonSchema: {
			type: 'object',
			properties: {
				users: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							firstname: {
								type: 'string',
							},
							lastname: {
								type: 'string',
							},
							age: {
								type: 'number',
							},
						},
						required: ['firstname', 'lastname'],
					},
				},
			},
		},
		uiSchema: [
			{
				key: 'users',
				itemTitle: 'Users',
				items: [
					{
						key: 'users[].firstname',
						title: 'First name',
					},
					{
						key: 'users[].lastname',
						title: 'Last name',
					},
					{
						key: 'users[].age',
						title: 'Age',
					},
				],
				...uiSchemaOptions,
			},
		],
		properties,
	};
}

const simpleSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			users: {
				type: 'array',
				items: {
					type: 'string',
				},
			},
		},
	},
	uiSchema: [
		{
			key: 'users',
			items: [
				{
					key: 'users[]',
					title: 'Name',
				},
			],
		},
	],
	properties: {},
};
export const Simple = () => (
	<SchemaForm id="schema-form" data={simpleSchema} onSubmit={action('onSubmit')} />
);

const initialItemNumberSchema = getExample({
	itemTitle: 'Users', // TODO
	options: { initialNbItems: 3 },
});
export const InitialItemsNumber = () => (
	<SchemaForm id="schema-form" data={initialItemNumberSchema} onSubmit={action('onSubmit')} />
);

const addItemSchema = getExample();
export const AddItem = () => (
	<SchemaForm id="schema-form" data={addItemSchema} onSubmit={action('onSubmit')} />
);

const moveItemSchema = getExample(undefined, {
	users: [
		{
			firstname: 'Jimmy',
			lastname: 'Somsanith',
		},
		{
			firstname: 'Fabien',
			lastname: 'Rassinier',
		},
	],
});
export const MoveItem = () => (
	<SchemaForm id="schema-form" data={moveItemSchema} onSubmit={action('onSubmit')} />
);

const arrayValidationSchema = getExample({
	minItems: 3,
	maxItems: 5,
});
export const ArrayValidation = () => (
	<SchemaForm id="schema-form" data={arrayValidationSchema} onSubmit={action('onSubmit')} />
);
