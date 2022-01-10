import React from 'react';
import { Story } from '@storybook/react';
import { within , userEvent } from '@storybook/testing-library';

import { WithSelector } from '../../../../../docs';

import Form from '../../..';

export default {
	component: Form.Password,
};

export const Default = { render: (props: Story) => <Form.Password label="Password" {...props} /> };
export const Hover = {
	decorators: [WithSelector.decorator(':hover')],
	render: (props: Story) => <Form.Password label="Password :hover" {...props} />,
};
export const Focus = {
	decorators: [WithSelector.decorator(':focus')],
	render: (props: Story) => <Form.Password label="Password :focus" {...props} />,
};

export const Placeholder = {
	render: (props: Story) => (
		<Form.Password label="Password" placeholder="Type your password" {...props} />
	),
};
export const Filled = {
	render: (props: Story) => <Form.Password label="Password" defaultValue="Passw0rd" {...props} />,
};
export const Revealed = {
	parameters: { docs: { disable: true } },
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		await userEvent.click(within(canvasElement).getByTestId('form.password.reveal'));
	},
	render: (props: Story) => <Form.Password label="Password" defaultValue="Passw0rd" {...props} />,
};
export const Disabled = {
	render: (props: Story) => (
		<Form.Password label="Password" defaultValue="Passw0rd" disabled {...props} />
	),
};
export const ReadOnly = {
	render: (props: Story) => (
		<Form.Password label="Password" defaultValue="Passw0rd" readOnly {...props} />
	),
};
