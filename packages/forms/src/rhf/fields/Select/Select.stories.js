/* eslint-disable import/no-extraneous-dependencies */
import { useForm, FormProvider } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Select from '.';

export default {
	title: 'Forms/RHF/Select',
	component: Select,
	argTypes: {
		rules: {
			table: {
				disable: true,
			},
		},
		name: {
			control: {
				type: 'text',
			},
		},
		label: {
			control: {
				type: 'text',
			},
		},
		placeholder: {
			control: {
				type: 'text',
			},
		},
		options: {
			control: {
				type: 'object',
			},
		},
		description: {
			control: {
				type: 'text',
			},
		},
		disabled: {
			control: 'boolean',
		},
		readOnly: {
			control: 'boolean',
		},
		required: {
			control: 'boolean',
		},
	},
};

export const States = props => {
	const rhf = useForm();
	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Select id="name" {...props} />
				<Select id="disabled" name="disabled" label="Disabled" options={props.options} disabled />
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

States.args = {
	name: 'default',
	label: 'Default',
	options: [
		{ value: 'blue', name: 'Blue color' },
		{ value: 'red', name: 'Red color' },
	],
};

export const Description = props => {
	const rhf = useForm();

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Select id="name" {...props} />
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

Description.args = {
	...States.args,
	description: 'This is a description',
};

export const Validation = props => {
	const rhf = useForm({ mode: 'onBlur' });

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Select id="required" {...props} rules={{ required: 'This is required' }} />

				<Select
					id="notBlue"
					{...props}
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

Validation.args = {
	name: 'required',
	label: 'Required',
	required: true,
	options: States.args.options,
};
