/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';

export default {
	title: 'Demo|1 - RHF',
};

export const Help = () => {
	const rhf = useForm();
	return (
		<form onSubmit={rhf.handleSubmit(action('onSubmit'))} noValidate>
			<label htmlFor="name">Name:</label>
			<input id="name" name="name" ref={rhf.register({ required: 'This is required' })} required />
			<div>{rhf.errors.name?.message}</div>

			<label htmlFor="address">Address:</label>
			<input id="address" name="info.address" ref={rhf.register} />
			<div>{rhf.errors.description?.message}</div>

			<button type="submit">Submit</button>
		</form>
	);
};
