import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Date,
};

export const Date = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Date placeholder="Placeholder" name="date" label="Date" />
		<Form.Date placeholder="Placeholder" name="date" label="Date disabled" disabled />
		<Form.Date placeholder="Placeholder" name="date" label="Date read-only" readOnly />
		<Form.Date name="date" label="Date filled" defaultValue="2011-09-29" />
		<Form.Date name="date" label="Date filled disabled" defaultValue="2011-09-29" disabled />
		<Form.Date name="date" label="Date filled read-only" defaultValue="2011-09-29" readOnly />
	</StackVertical>
);
