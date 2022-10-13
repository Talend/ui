import React from 'react';

import Form from '..';

export default {
	component: Form.Text,
};

export const FormFieldError = () => (
	<Form.Text
		label="Label"
		name="field"
		required
		hasError
		placeholder="Placeholder"
		description="Error message"
	/>
);
FormFieldError.parameters = {};

export const FormFieldRequired = () => (
	<Form>
		<Form.Text label="Name" name="name" required value="Job using JDBC connection" />
		<Form.Textarea name="textarea" label="Description" placeholder="Describe the job" />
	</Form>
);
FormFieldRequired.parameters = {};

export const FormFieldInformation = () => (
	<Form.Text
		label="Label"
		name="field"
		required
		placeholder="Placeholder"
		description="Log level settings are taken into account in Remote Engine version 2.8.3 or above."
	/>
);
FormFieldInformation.parameters = {};

export const FormFieldPassword = () => (
	<Form.Password
		label="Label"
		required
		placeholder="Placeholder"
		link={{ href: '#', children: 'Have you lost your password?' }}
		id="password"
		name="password"
	/>
);
FormFieldPassword.parameters = {};
