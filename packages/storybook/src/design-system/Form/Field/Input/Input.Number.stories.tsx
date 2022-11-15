import React from 'react';
import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Number,
};

export const Number = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Number placeholder="Placeholder" name="number" label="Number" />
		<Form.Number placeholder="Placeholder" name="number" label="Number disabled" disabled />
		<Form.Number placeholder="Placeholder" name="number" label="Number read-only" readOnly />
		<Form.Number name="number" label="Number filled" defaultValue="3.14" />
		<Form.Number name="number" label="Number filled disabled" defaultValue="3.14" disabled />
		<Form.Number name="number" label="Number filled read-only" defaultValue="3.14" readOnly />
	</StackVertical>
);
