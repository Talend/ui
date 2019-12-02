/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useForm from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Datalist from './Datalist.component';

export default {
	title: 'Fields|Datalist',

	parameters: {
		component: Datalist,
	},
};

export const Default = () => {
	const { handleSubmit, ...restUseForm } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Datalist name="datalist" label="Simple datalist" useForm={restUseForm} />

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
