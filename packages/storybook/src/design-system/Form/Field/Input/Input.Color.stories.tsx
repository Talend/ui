import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Color,
};

export const ColorStates = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Color name="color" label="Color field" />
		<Form.Color name="color" label="Color field disabled" disabled />
		<Form.Color name="color" label="Color field" readOnly />
		<Form.Color name="color" label="Color field filled" defaultValue="#E884C0" />
		<Form.Color name="color" label="Color field filled disabled" disabled defaultValue="#E884C0" />
		<Form.Color name="color" label="Color field filled read-only" readOnly defaultValue="#E884C0" />
	</StackVertical>
);
