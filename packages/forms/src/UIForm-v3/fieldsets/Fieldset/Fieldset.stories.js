/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useForm from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Fieldset from './index';
import Input from '../../fields/Input';

export default {
	title: 'Fieldsets|Fieldset',

	parameters: {
		component: Fieldset,
	},
};

export const Default = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Fieldset legend="My awesome user">
				<Input id="firstname" type="text" name="user.firstname" label="First name" rhf={rhf} />
				<Input id="lastname" type="text" name="user.lastname" label="Last name" rhf={rhf} />
				<Input id="age" type="number" name="user.age" label="Age" rhf={rhf} />
			</Fieldset>

			<Fieldset legend="Contact">
				<Input id="phone" type="text" name="contact.phone" label="Phone" rhf={rhf} />
				<Input id="email" type="text" name="contact.email" label="Email" rhf={rhf} />
			</Fieldset>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const HiddenLegend = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Fieldset legend="My awesome user" hideLegend>
				<div>(Legend is set to "My awesome user" but not displayed)</div>

				<Input id="firstname" type="text" name="user.firstname" label="First name" rhf={rhf} />
				<Input id="lastname" type="text" name="user.lastname" label="Last name" rhf={rhf} />
				<Input id="age" type="number" name="user.age" label="Age" rhf={rhf} />
			</Fieldset>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
