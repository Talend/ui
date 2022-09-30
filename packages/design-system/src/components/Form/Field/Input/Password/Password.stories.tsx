import React from 'react';
import { Story } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Form from '../../..';

export default {
	component: Form.Password,
};

export const Default = {
	render: (props: Story) => (
		<Form.Password label="Password" {...props} name="password" id="password" />
	),
};

export const Placeholder = {
	render: (props: Story) => (
		<Form.Password
			{...props}
			label="Password"
			placeholder="Type your password"
			name="password"
			id="password"
		/>
	),
};
export const Filled = {
	render: (props: Story) => (
		<Form.Password
			{...props}
			label="Password"
			defaultValue="Passw0rd"
			name="password"
			id="password"
		/>
	),
};
export const Revealed = {
	parameters: { docs: { disable: true } },
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await userEvent.click(within(canvasElement).getByTestId('form.password.reveal'));
	},
	render: (props: Story) => (
		<Form.Password
			{...props}
			label="Password"
			defaultValue="Passw0rd"
			name="password"
			id="password"
		/>
	),
};
export const Disabled = {
	render: (props: Story) => (
		<Form.Password
			{...props}
			label="Password"
			defaultValue="Passw0rd"
			disabled
			name="password"
			id="password"
		/>
	),
};
export const ReadOnly = {
	render: (props: Story) => (
		<Form.Password
			{...props}
			label="Password"
			defaultValue="Passw0rd"
			readOnly
			name="password"
			id="password"
		/>
	),
};
