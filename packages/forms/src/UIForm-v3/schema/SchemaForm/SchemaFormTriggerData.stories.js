/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import SchemaForm from './SchemaForm.component';

export default {
	title: 'Schema Concepts|Trigger Data',
	parameters: { component: SchemaForm },
};

const updateDataSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			firstname: { type: 'string' },
			replicateFirstname: { type: 'string' },

			lastname: { type: 'string' },
			replicateLastname: { type: 'string' },
		},
	},
	uiSchema: [
		{
			key: 'firstname',
			title: 'First name',
			triggers: [
				{
					action: 'replicateFirstname',
					onEvent: 'change',
				},
			],
		},
		{
			key: 'replicateFirstname',
			title: 'Replication via static properties',
		},

		{
			key: 'lastname',
			title: 'Last name',
			triggers: [
				{
					action: 'replicateLastname',
					onEvent: 'change',
				},
			],
		},
		{
			key: 'replicateLastname',
			title: 'Replication via properties modifier',
		},
	],
	properties: {},
};
function updateDataOnTrigger({ trigger, properties }) {
	switch (trigger.action) {
		case 'replicateFirstname':
			return Promise.resolve({
				properties: { ...properties, replicateFirstname: properties.firstname },
			});

		case 'replicateLastname':
			return Promise.resolve({
				properties: oldProperties => ({
					...oldProperties,
					replicateLastname: oldProperties.lastname,
				}),
			});

		default:
			return null;
	}
}
export const UpdateData = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={updateDataOnTrigger}
		data={updateDataSchema}
		onSubmit={action('onSubmit')}
	/>
);

const updateNestedDataSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			home: {
				type: 'object',
				properties: {
					address: { type: 'string' },
					replicateAddress: { type: 'string' },
				},
			},
		},
	},
	uiSchema: [
		{
			key: 'home.address',
			title: 'Address',
			triggers: [
				{
					action: 'replicateAddress',
					onEvent: 'change',
				},
			],
		},
		{
			key: 'home.replicateAddress',
			title: 'Replication in nested structure',
		},
	],
	properties: {},
};
function updateNestedDataOnTrigger({ trigger }) {
	if (trigger.action === 'replicateAddress') {
		return Promise.resolve({
			properties: oldProperties => ({
				...oldProperties,
				home: { ...oldProperties.home, replicateAddress: oldProperties.home.address },
			}),
		});
	}

	return null;
}
export const UpdateNestedData = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={updateNestedDataOnTrigger}
		data={updateNestedDataSchema}
		onSubmit={action('onSubmit')}
	/>
);

const updateArrayDataSchema = {
	jsonSchema: {
		type: 'object',
		properties: {
			family: { type: 'string' },
			members: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						lastname: { type: 'string' },
						firstname: { type: 'string' },
					},
					required: ['firstname', 'lastname'],
				},
			},
		},
	},
	uiSchema: [
		{
			key: 'family',
			title: 'Common family name',
			triggers: [{ action: 'setFamily', onEvent: 'change' }],
		},
		{
			key: 'members',
			itemTitle: 'Members',
			items: [
				{
					key: 'members[].lastname',
					title: 'Last name',
				},
				{
					key: 'members[].firstname',
					title: 'First name',
				},
			],
		},
	],
	properties: {
		members: [
			{ firstname: 'Jimmy', lastname: 'Somsanith' },
			{ firstname: 'Anna', lastname: 'Somsanith' },
		],
	},
};
function updateArrayDataOnTrigger({ trigger }) {
	if (trigger.action === 'setFamily') {
		return Promise.resolve({
			properties: oldProperties => ({
				...oldProperties,
				members: oldProperties.members.map(nextMember => ({
					...nextMember,
					lastname: oldProperties.family,
				})),
			}),
		});
	}

	return null;
}
export const UpdateArrayData = () => (
	<SchemaForm
		id="schema-form"
		onTrigger={updateArrayDataOnTrigger}
		data={updateArrayDataSchema}
		onSubmit={action('onSubmit')}
	/>
);
