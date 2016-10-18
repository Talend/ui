import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, object } from '@kadira/storybook-addon-knobs';

import Form from '../src/Form';

storiesOf('Form', module)
	.addDecorator(withKnobs)
	.addWithInfo('login form', () => {
		const loginFormSchema = {
			"title": "Login form",
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
				onSubmit={action('submit')}
			/>
		);
	});
