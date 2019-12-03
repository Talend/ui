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

export const States = () => {
	const { handleSubmit, ...rhf } = useForm();
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Input id="name" type="text" name="default" label="Default" rhf={rhf} />
			<Input id="disabled" type="text" name="disabled" label="Disabled" rhf={rhf} disabled />
			<Input id="readonly" type="text" name="readonly" label="Readonly" rhf={rhf} readOnly />
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const Types = () => {
	const { handleSubmit, ...rhf } = useForm();

	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Input id="text" type="text" name="text" label="Text" rhf={rhf} />
			<Input id="number" type="number" name="number" label="Number" rhf={rhf} />
			<Input id="password" type="password" name="password" label="Password" rhf={rhf} />
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const DefaultValue = () => {
	const { handleSubmit, ...rhf } = useForm();

	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Input
				id="defaultValue"
				type="text"
				name="defaultValue"
				label="Default value"
				defaultValue="lol"
				rhf={rhf}
			/>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const Description = () => {
	const { handleSubmit, ...rhf } = useForm();

	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Input
				id="description"
				type="text"
				name="description"
				label="Description"
				description="This field has a description"
				rhf={rhf}
			/>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const Validation = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Input
				id="required"
				type="text"
				name="required"
				label="Required"
				rhf={rhf}
				registerOptions={{ required: 'This is required' }}
				required
			/>
			<Input
				id="notLol"
				type="text"
				name="notLol"
				label="Not lol"
				rhf={rhf}
				registerOptions={{
					validate(value) {
						return value === 'lol' ? 'This should not be lol' : null;
					},
				}}
				required
			/>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
