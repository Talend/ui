import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WithSelector } from '../../../../../docs';

import Form from '../../..';

export default {
	component: Form.Password,
};

export const Default = () => <Form.Password label="Password" />;
export const Hover = () => <Form.Password label="Password :hover" />;
Hover.decorators = [WithSelector.decorator(':hover')];
export const Focus = () => <Form.Password label="Password :focus" />;
Focus.decorators = [WithSelector.decorator(':focus')];

export const Placeholder = () => (
	<Form.Password label="Password" placeholder="Type your password" />
);
export const Filled = () => <Form.Password label="Password" defaultValue="Passw0rd" />;
export const Revealed = () => <Form.Password label="Password" defaultValue="Passw0rd" />;
Revealed.play = () => {
	const button = screen.getByTestId('form.password.reveal');
	userEvent.click(button);
};
Revealed.parameters = { docs: { disable: true } };
export const Disabled = () => <Form.Password label="Password" defaultValue="Passw0rd" disabled />;
export const ReadOnly = () => <Form.Password label="Password" defaultValue="Passw0rd" readOnly />;
