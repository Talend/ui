import React from 'react';

import Form from '..';
import Link from '../../Link';

export const FormFieldError = () => (
	<Form.Text
		label="Label"
		required
		hasError
		placeholder="Placeholder"
		description="Error message"
	/>
);
FormFieldError.parameters = {};

export const FormFieldWarning = () => (
	<Form.Text
		label="Label"
		required
		hasWarning
		placeholder="Placeholder"
		description="Warning message"
	/>
);
FormFieldWarning.parameters = {};

export const FormFieldRequired = () => (
	<Form>
		<Form.Text label="Name" required value="Job using JDBC connection" />
		<Form.Textarea label="Description" placeholder="Describe the job" />
	</Form>
);
FormFieldRequired.parameters = {};

export const FormFieldInformation = () => (
	<Form.Text
		label="Label"
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
		link={<Link href="#">Forget?</Link>}
	/>
);
FormFieldPassword.parameters = {};
