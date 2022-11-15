import React from 'react';
import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Search,
};

export const Search = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Search placeholder="Placeholder" name="datetimelocal" label="Search" />
		<Form.Search placeholder="Placeholder" name="datetimelocal" label="Search disabled" disabled />
		<Form.Search placeholder="Placeholder" name="datetimelocal" label="Search read-only" readOnly />
		<Form.Search name="datetimelocal" label="Search filled" defaultValue="* where name='DOE'" />
		<Form.Search
			name="datetimelocal"
			label="Search filled disabled"
			defaultValue="* where name='DOE'"
			disabled
		/>
		<Form.Search
			name="datetimelocal"
			label="Search filled read-only"
			defaultValue="* where name='DOE'"
			readOnly
		/>
	</StackVertical>
);
