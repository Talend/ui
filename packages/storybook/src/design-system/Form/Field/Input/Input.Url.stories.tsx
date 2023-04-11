import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Url,
};

export const Url = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Url placeholder="Placeholder" name="time" label="Url" pattern="https://.*" />
		<Form.Url
			placeholder="Placeholder"
			name="time"
			label="Url disabled"
			disabled
			pattern="https://.*"
		/>
		<Form.Url
			placeholder="Placeholder"
			name="time"
			label="Url read-only"
			readOnly
			pattern="https://.*"
		/>
		<Form.Url
			name="time"
			label="Url filled"
			defaultValue="https://talend.com"
			pattern="https://.*"
		/>
		<Form.Url
			name="time"
			label="Url filled disabled"
			defaultValue="https://talend.com"
			disabled
			pattern="https://.*"
		/>
		<Form.Url
			name="time"
			label="Url filled read-only"
			defaultValue="https://talend.com"
			readOnly
			pattern="https://.*"
		/>
	</StackVertical>
);
