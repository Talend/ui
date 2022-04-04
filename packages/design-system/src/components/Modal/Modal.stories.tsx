import React from 'react';
import { action } from '@storybook/addon-actions';

import { ButtonPrimary, ButtonSecondary, ButtonDestructive } from '../Button';

import Modal from '.';

export default {
	component: Modal,
};

export const Confirm = () => (
	<Modal.Body data-enter>
		<Modal.Heading>
			<h1>Leave page</h1>
		</Modal.Heading>
		<p>Your change will be lost. Do you want to leave the page without saving?</p>
		<Modal.Buttons>
			<ButtonSecondary onClick={action('Clicked continue')}>Continue editing</ButtonSecondary>
			<ButtonDestructive onClick={action('Clicked discard')}>Discard changes</ButtonDestructive>
		</Modal.Buttons>
	</Modal.Body>
);
Confirm.parameters = {};

export const Invite = () => (
	<Modal
		baseId=""
		disclosure={
			<ButtonPrimary onClick={action('Clicked disclosure')}>Send invitation email</ButtonPrimary>
		}
		title="Send invitation email"
	>
		Invitation email will be send to this address: <strong>test@email.com</strong>
		<br />
		Do you want to send this email now?
	</Modal>
);
Invite.parameters = {};
