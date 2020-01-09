/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import SchemaForm from './SchemaForm.component';
import InputTextMode from '../fields/Input/TextMode.component';

export default {
	title: 'Schema Concepts|Display Mode',
	parameters: { component: SchemaForm },
};

const schema = {
	jsonSchema: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			age: { type: 'number' },
			password: { type: 'string' },
		},
	},
	uiSchema: [
		{ key: 'name', title: 'Name' },
		{ key: 'age', title: 'Age' },
		{ key: 'password', title: 'Password', type: 'password' },
	],
	properties: {
		name: 'Jimmy',
		age: 34,
		password: 'secret',
	},
};
export const TextMode = () => <SchemaForm id="schema-form" data={schema} displayMode="text" />;

function CustomInputLolMode(props) {
	return (
		<div style={{ position: 'relative', border: '1px solid grey', padding: '0 1.5rem' }}>
			<div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem' }}>
				🔒 (Custom widget for input in lol mode)
			</div>
			<InputTextMode {...props} />
		</div>
	);
}
const widgets = {
	text_lol: CustomInputLolMode,
	number_lol: CustomInputLolMode,
	password_lol: CustomInputLolMode,
};
export const CustomDisplayModeWidget = () => (
	<React.Fragment>
		<h1>Lol mode</h1>
		<SchemaForm id="schema-form" data={schema} displayMode="lol" widgets={widgets} />

		<h1>Default mode</h1>
		<SchemaForm id="schema-form" data={schema} />
	</React.Fragment>
);
