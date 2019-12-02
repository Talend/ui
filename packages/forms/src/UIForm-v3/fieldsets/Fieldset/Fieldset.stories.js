/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useForm from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Fieldset from './Fieldset.component';
import Input from '../../fields/Input';

export default {
	title: 'Fieldsets|Fieldset',

	parameters: {
		component: Fieldset,
	},
};

export const Default = () => {
	const { handleSubmit, register } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Fieldset legend="My awesome user">
				<Input type="text" name="user.firstname" label="First name" ref={register} />
				<Input type="text" name="user.lastname" label="Last name" ref={register} />
				<Input type="number" name="user.age" label="Age" ref={register} />
			</Fieldset>

			<Fieldset legend="Contact">
				<Input type="text" name="contact.phone" label="Phone" ref={register} />
				<Input type="text" name="contact.email" label="Email" ref={register} />
			</Fieldset>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const HiddenLegend = () => {
	const { handleSubmit, register } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Fieldset legend="My awesome user" hideLegend>
				<div>(Legend is set to "My awesome user" but not displayed)</div>

				<Input type="text" name="user.firstname" label="First name" ref={register} />
				<Input type="text" name="user.lastname" label="Last name" ref={register} />
				<Input type="number" name="user.age" label="Age" ref={register} />
			</Fieldset>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
