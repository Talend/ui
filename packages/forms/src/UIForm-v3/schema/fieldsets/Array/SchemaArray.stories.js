/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs';
import { useFormContext } from 'react-hook-form';
import SchemaForm from '../../SchemaForm';
import SchemaArray from './SchemaArray.component';
import ArrayFieldset from '../../../../widgets/fieldsets/Array';

export default {
	title: 'Fieldsets|Schema/Array',

	parameters: {
		component: SchemaArray,
	},
	decorators: [withKnobs],
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
	<SchemaForm
		id="schema-form"
		data={object('schema', simpleSchema)}
		onSubmit={action('onSubmit')}
	/>
);

const initialItemNumberSchema = getExample({
	itemTitle: 'Users', // TODO
	options: { initialNbItems: 3 },
});
export const InitialItemsNumber = () => (
	<SchemaForm
		id="schema-form"
		data={object('schema', initialItemNumberSchema)}
		onSubmit={action('onSubmit')}
	/>
);

const addItemSchema = getExample();
export const AddItem = () => (
	<SchemaForm
		id="schema-form"
		data={object('schema', addItemSchema)}
		onSubmit={action('onSubmit')}
	/>
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
	<SchemaForm
		id="schema-form"
		data={object('schema', moveItemSchema)}
		onSubmit={action('onSubmit')}
	/>
);

const deleteItemSchema = getExample(undefined, {
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
export const DeleteItem = () => (
	<SchemaForm
		id="schema-form"
		data={object('schema', deleteItemSchema)}
		onSubmit={action('onSubmit')}
	/>
);

const arrayValidationSchema = getExample({
	minItems: 3,
	maxItems: 5,
});
export const ArrayValidation = () => (
	<SchemaForm
		id="schema-form"
		data={object('schema', arrayValidationSchema)}
		onSubmit={action('onSubmit')}
	/>
);

function ArrayWithAdvice(props) {
	const { watch } = useFormContext();
	const length = watch('users.length');

	return (
		<React.Fragment>
			<p>This custom template shows a message when there is no user yet, bringing some advice</p>
			<div id="advice" style={{ textAlign: 'center' }}>
				{!length ? 'There is no user yet, please add some' : null}
			</div>
			<ArrayFieldset.ItemsTemplate {...props} aria-describedby="advice" />
		</React.Fragment>
	);
}
export const CustomTemplate = () => (
	<SchemaForm
		id="schema-form"
		data={object('schema', simpleSchema)}
		onSubmit={action('onSubmit')}
		templates={{ array: ArrayWithAdvice }}
	/>
);
