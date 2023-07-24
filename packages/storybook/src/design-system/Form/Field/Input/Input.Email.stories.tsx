import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Email,
};

export const Email = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Email placeholder="Placeholder" name="email" label="Email" />
		<Form.Email placeholder="Placeholder" name="email" label="Email disabled" disabled />
		<Form.Email placeholder="Placeholder" name="email" label="Email read-only" readOnly />
		<Form.Email name="email" label="Email filled" defaultValue="user@talend.com" />
		<Form.Email
			name="email"
			label="Email filled disabled"
			defaultValue="user@talend.com"
			disabled
		/>
		<Form.Email
			name="email"
			label="Email filled read-only"
			defaultValue="user@talend.com"
			readOnly
		/>
	</StackVertical>
);
