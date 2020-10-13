/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form/dist/index.ie11';
import { action } from '@storybook/addon-actions';
import Input from '.';

export default {
	title: 'RHF/Input',

	parameters: {
		component: Input,
	},
};

export const States = () => {
	const rhf = useForm();
	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input id="name" type="text" name="default" label="Default" defaultValue="Jimmy" />
				<Input
					id="disabled"
					type="text"
					name="disabled"
					label="Disabled"
					defaultValue="Jimmy"
					disabled
				/>
				<Input
					id="readonly"
					type="text"
					name="readonly"
					label="Readonly"
					defaultValue="Jimmy"
					readOnly
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

export const Types = () => {
	const rhf = useForm();

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input id="text" type="text" name="text" label="Text" />
				<Input id="number" type="number" name="number" label="Number" />
				<Input id="password" type="password" name="password" label="Password" />
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

export const DefaultValue = () => {
	const rhf = useForm();

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input id="defaultValue" type="text" name="name" label="Name" defaultValue="Jimmy" />
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

export const Description = () => {
	const rhf = useForm();

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input
					id="description"
					type="text"
					name="name"
					label="Name"
					description="This field has a description"
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

export const Validation = () => {
	const rhf = useForm({ mode: 'onBlur' });

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input
					id="required"
					type="text"
					name="required"
					label="Required"
					rules={{ required: 'This is required' }}
					required
				/>
				<Input
					id="notLol"
					type="text"
					name="notLol"
					label="Not lol"
					rules={{
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
		</FormProvider>
	);
};
