import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, object } from '@kadira/storybook-addon-knobs';

import Form from '../src/Form';

storiesOf('Form', module)
	.addDecorator(withKnobs)
	.addWithInfo('Login form', () => {
		const loginFormSchema = {
			"title": "A login form",
			"description": "A simple form example.",
			"type": "object",
			"required": [
				"username",
				"password"
			],
			"properties": {
				"username": {
					"type": "string",
					"title": "Username"
				},
				"password": {
					"type": "string",
					"title": "Password",
					"minLength": 3
				}
			}
		};

		return (
			<Form
				schema={object('Schema', loginFormSchema)}
				onSubmit={action('Submit login form')}
			/>
		);
	})
	.addWithInfo('Registration form', () => {
		const registrationFormSchema = {
			"title": "A registration form",
			"description": "A simple form example.",
			"type": "object",
			"required": [
				"firstName",
				"lastName"
			],
			"properties": {
				"firstName": {
					"type": "string",
					"title": "First name"
				},
				"lastName": {
					"type": "string",
					"title": "Last name"
				},
				"age": {
					"type": "integer",
					"title": "Age"
				},
				"bio": {
					"type": "string",
					"title": "Bio"
				},
				"password": {
					"type": "string",
					"title": "Password",
					"minLength": 3,
					"ui:widget": "password",
					"ui:help": "Hint: Make it strong!",
				}
			}
		};

		return (
			<Form
				schema={object('Schema', registrationFormSchema)}
				onSubmit={action('Submit registration form')}
			/>
		);
	});
