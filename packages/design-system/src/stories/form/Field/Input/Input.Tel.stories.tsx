import { Form, StackVertical } from '../../../../';

export default {
	title: 'Form/Fields/Tel',
	component: Form.Tel,
};

export const Tel = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Tel placeholder="Placeholder" name="tel" label="Tel" />
		<Form.Tel placeholder="Placeholder" name="tel" label="Tel disabled" disabled />
		<Form.Tel placeholder="Placeholder" name="tel" label="Tel read-only" readOnly />
		<Form.Tel name="tel" label="Tel filled" defaultValue="06 12 30 12 30" />
		<Form.Tel name="tel" label="Tel filled disabled" defaultValue="06 12 30 12 30'" disabled />
		<Form.Tel name="tel" label="Tel filled read-only" defaultValue="06 12 30 12 30" readOnly />
	</StackVertical>
);
