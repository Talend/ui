import React from 'react';
import Form from '../../index';
import { StackVertical } from '../../../Stack';

export default {
	component: Form.Text,
};

export const Text = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Text placeholder="Placeholder" name="text" label="Text" />
		<Form.Text placeholder="Placeholder" name="text" label="Text disabled" disabled />
		<Form.Text placeholder="Placeholder" name="text" label="Text read-only" readOnly />
		<Form.Text name="text" label="Text filled" defaultValue="Text contents" />
		<Form.Text name="text" label="Text filled disabled" defaultValue="Text contents" disabled />
		<Form.Text name="text" label="Text filled read-only" defaultValue="Text contents" readOnly />
	</StackVertical>
);
