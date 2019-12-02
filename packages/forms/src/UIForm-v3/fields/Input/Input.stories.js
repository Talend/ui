/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useForm from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Input from './Input.component';

export default {
	title: 'Fields|Input',

	parameters: {
		component: Input,
	},
};

export const Text = () => {
	const { handleSubmit, ...restUseForm } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Input type="text" name="name" label="Name" useForm={restUseForm} />
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const Number = () => {
	const { handleSubmit, ...restUseForm } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Input type="number" name="age" label="Age" useForm={restUseForm} />
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const Password = () => {
	const { handleSubmit, ...restUseForm } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Input type="password" name="password" label="Password" useForm={restUseForm} />
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
