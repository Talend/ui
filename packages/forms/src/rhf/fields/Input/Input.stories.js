/* eslint-disable import/no-extraneous-dependencies */
import { useForm, FormProvider } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Input from '.';

export default {
	title: 'Forms/RHF/Input',
	component: Input,
	argTypes: {
		rules: {
			table: {
				disable: true,
			},
		},
		name: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
		defaultValue: {
			control: 'text',
			description: 'You must reload the story if you change this value',
		},
		placeholder: {
			control: 'text',
		},
		description: {
			control: 'text',
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
	const { control, ...rhf } = useForm();
	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input id="name" type="text" {...props} />
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
States.args = {
	name: 'default',
	label: 'Default',
	defaultValue: 'Jimmy',
};

export const Types = props => {
	const { control, ...rhf } = useForm();

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input id="text" type="text" {...props} />
				<Input id="number" type="number" name="number" label="Number" />
				<Input id="password" type="password" name="password" label="Password" />
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

Types.args = {
	label: 'Text',
	name: 'text',
	defaultValue: 'Text value',
};

export const DefaultValue = props => {
	const { control, ...rhf } = useForm();

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input id="defaultValue" type="text" {...props} />
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};
DefaultValue.args = {
	label: 'Text',
	name: 'text',
	description: 'You must reload the story if you change the defaultValue',
	defaultValue: 'Text value',
};

export const Description = props => {
	const rhf = useForm();

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input id="description" {...props} />
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormProvider>
	);
};
Description.args = {
	label: 'Text',
	name: 'text',
	description: 'This field has a description',
};

export const Validation = props => {
	const { control, ...rhf } = useForm({ mode: 'onBlur' });

	return (
		<FormProvider {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Input id="required" type="text" {...props} rules={{ required: 'This is required' }} />
				<Input
					id="notLol"
					type="text"
					name="notLol"
					description="This field should not have the value lol"
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

Validation.args = {
	label: 'Required',
	name: 'required',
	required: true,
};
