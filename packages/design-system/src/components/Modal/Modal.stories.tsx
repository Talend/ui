import React from 'react';

import Button from '../Button';

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
			<Button.Secondary>Continue editing</Button.Secondary>
			<Button.Destructive>Discard changes</Button.Destructive>
		</Modal.Buttons>
	</Modal.Body>
);
Confirm.parameters = {};

export const Invite = () => (
	<Modal
		baseId=""
		disclosure={<Button.Primary>Send invitation email</Button.Primary>}
		title="Send invitation email"
	>
		Invitation email will be send to this address: <strong>test@email.com</strong>
		<br />
		Do you want to send this email now?
	</Modal>
);
Invite.parameters = {};
