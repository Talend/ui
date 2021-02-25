/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import TextArea from '.';

export default {
	title: 'RHF/TextArea',

	parameters: {
		component: TextArea,
	},
};

export const States = () => {
	const rhf = useForm();
	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<TextArea id="name" name="default" label="Default" defaultValue="Jimmy" />
				<TextArea id="disabled" name="disabled" label="Disabled" defaultValue="Jimmy" disabled />
				<TextArea id="readonly" name="readonly" label="Readonly" defaultValue="Jimmy" readOnly />
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
				<TextArea
					id="description"
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
				<TextArea
					id="required"
					name="required"
					label="Required"
					rules={{ required: 'This is required' }}
					required
				/>
				<TextArea
					id="notLol"
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
