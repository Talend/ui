import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from '../../..';

export default {
	component: Form.Password,
};

export const defaultProps = {
	label: 'Password',
	defaultValue: 'Passw0rd',
};

export const Default = {
	args: {
		...defaultProps,
		defaultValue: undefined,
	},
};

export const Placeholder = {
	args: {
		...defaultProps,
		defaultValue: undefined,
		placeholder: 'Type your password',
	},
};

export const Filled = {
	args: {
		...defaultProps,
	},
};

export const Revealed = {
	args: {
		...defaultProps,
	},
	play() {
		const button = screen.getByTestId('form.password.reveal');
		userEvent.click(button);
	},
	parameters: { docs: { disable: true } },
};

export const Disabled = {
	args: {
		...defaultProps,
		disabled: true,
	},
};

export const ReadOnly = {
	args: {
		...defaultProps,
		readOnly: true,
	},
};
