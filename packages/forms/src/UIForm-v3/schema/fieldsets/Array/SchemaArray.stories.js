/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import SchemaForm from '../../SchemaForm';
import SchemaArray from './SchemaArray.component';
import ArrayFieldset from '../../../fieldsets/Array';

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
	<SchemaForm id="schema-form" data={deleteItemSchema} onSubmit={action('onSubmit')} />
);

const arrayValidationSchema = getExample({
	minItems: 3,
	maxItems: 5,
});
export const ArrayValidation = () => (
	<SchemaForm id="schema-form" data={arrayValidationSchema} onSubmit={action('onSubmit')} />
);

function ArrayWithAdvice(props) {
	const { rhf } = props;
	const length = rhf.watch('users.length'); //rhf.getValues({ nest: true }).users;

	return (
		<React.Fragment>
			<div id="advice" style={{ textAlign: 'center' }}>
				{!length ? 'There is no user yet, please add some' : null}
			</div>
			<ArrayFieldset.ItemsTemplate {...props} aria-describedby="advice" />
		</React.Fragment>
	);
}
ArrayWithAdvice.propTypes = { rhf: PropTypes.object };
export const CustomTemplate = () => (
	<SchemaForm
		id="schema-form"
		data={simpleSchema}
		onSubmit={action('onSubmit')}
		templates={{ array: ArrayWithAdvice }}
	/>
);
