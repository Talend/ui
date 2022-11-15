import React from 'react';
import { Story } from '@storybook/react';

import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Password,
};

export const Default = {
	render: (props: Story) => (
		<Form.Password label="Password" {...props} name="password" id="password" />
	),
};

export const Filled = {
	render: (props: Story) => (
		<Form.Password
			label="Password"
			{...props}
			name="password"
			id="password"
			defaultValue="defaultPassword"
		/>
	),
};

export const Password = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Password name="password" label="Password field" />
		<Form.Password name="password" label="Password field disabled" disabled />
		<Form.Password name="password" label="Password field" readOnly />
		<Form.Password
			name="password"
			label="Password field filled"
			defaultValue="TalendPassword2012"
		/>
		<Form.Password
			name="password"
			label="Password field filled disabled"
			disabled
			defaultValue="TalendPassword2012"
		/>
		<Form.Password
			name="password"
			label="Password field filled read-only"
			readOnly
			defaultValue="TalendPassword2012"
		/>
	</StackVertical>
);
