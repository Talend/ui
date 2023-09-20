import { Form } from '../../../../';

export default {
	component: Form.Text,
	title: 'Form/Fields',
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

export const Usage = ({ field, ...rest }) => {
	const Component = Form[field];
	return <Component {...rest} />;
};
Usage.args = {
	label: 'Label',
	field: 'Date',
	required: false,
	disabled: false,
	readOnly: false,
	hasError: false,
	hasWarning: false,
	hasSuccess: false,
	hasInformation: false,
	description: '',
};
Usage.argTypes = {
	field: {
		description: 'Field',
		control: {
			type: 'select',
			options: Object.keys(Form.Input)
				.filter(key => /^[A-Z]/.test(key))
				.concat(['Select', 'Datalist', 'Textarea']),
		},
	},
	required: {
		description: 'Field is required or not',
		control: {
			type: 'boolean',
		},
	},
	disabled: {
		description: 'Field is disabled or not',
		control: {
			type: 'boolean',
		},
	},
	hasError: {
		description: 'Field has inline message as error',
		control: {
			type: 'boolean',
		},
	},
	hasWarning: {
		description: 'Field has inline message as warning',
		control: {
			type: 'boolean',
		},
	},
	hasSuccess: {
		description: 'Field has inline message as success',
		control: {
			type: 'boolean',
		},
	},
	hasInformation: {
		description: 'Field has inline message as information',
		control: {
			type: 'boolean',
		},
	},
	description: {
		description: 'Field inline message',
		control: {
			type: 'text',
		},
	},
};
