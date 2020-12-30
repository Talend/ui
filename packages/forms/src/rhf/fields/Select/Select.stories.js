/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Select from '.';

export default {
	title: 'RHF/Select',

	parameters: {
		component: Select,
	},
};

export const States = () => {
	const rhf = useForm();
	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Select
					id="name"
					name="default"
					label="Default"
					options={[
						{ value: 'blue', name: 'Blue color' },
						{ value: 'red', name: 'Red color' },
					]}
				/>
				<Select
					id="disabled"
					name="disabled"
					label="Disabled"
					options={[
						{ value: 'blue', name: 'Blue color' },
						{ value: 'red', name: 'Red color' },
					]}
					disabled
				/>
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
				<Select
					id="name"
					type="text"
					name="default"
					label="Default"
					options={[
						{ value: 'blue', name: 'Blue color' },
						{ value: 'red', name: 'Red color' },
					]}
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
				<Select
					id="required"
					name="required"
					label="Required"
					placeholder="Choose an option"
					options={[
						{ value: 'blue', name: 'Blue color' },
						{ value: 'red', name: 'Red color' },
					]}
					rules={{ required: 'This is required' }}
					required
				/>

				<Select
					id="notBlue"
					name="notBlue"
					label="Not blue"
					options={[
						{ value: 'blue', name: 'Blue color' },
						{ value: 'red', name: 'Red color' },
					]}
					rules={{
						validate(value) {
							return value === 'blue' ? 'This should not be blue' : null;
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
