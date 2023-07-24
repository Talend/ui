import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Month,
};

export const Month = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Month placeholder="Placeholder" name="month" label="Month" />
		<Form.Month placeholder="Placeholder" name="month" label="Month disabled" disabled />
		<Form.Month placeholder="Placeholder" name="month" label="Month read-only" readOnly />
		<Form.Month name="month" label="Month filled" defaultValue="2022-10" />
		<Form.Month name="month" label="Month filled disabled" defaultValue="2022-10" disabled />
		<Form.Month name="month" label="Month filled read-only" defaultValue="2022-10" readOnly />
	</StackVertical>
);
