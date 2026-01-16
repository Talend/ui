/* eslint-disable import/no-extraneous-dependencies */
import { FormProvider, useForm } from 'react-hook-form';

import { fn as action } from 'storybook/test';

import { Form } from '@talend/design-system';

import TextArea from '.';

export default {
	title: 'Forms/RHF/TextArea',
	component: TextArea,
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
	const rhf = useForm();
	return (
		<FormProvider {...rhf}>
			<Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<TextArea id="name" {...props} />
				<TextArea id="disabled" name="disabled" label="Disabled" defaultValue="Jimmy" disabled />
				<TextArea id="readonly" name="readonly" label="Readonly" defaultValue="Jimmy" readOnly />
				<Form.Buttons>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</Form.Buttons>
			</Form>
		</FormProvider>
	);
};
States.args = {
	name: 'default',
	label: 'Default',
	defaultValue: 'Jimmy',
};

export const Description = props => {
	const rhf = useForm();

	return (
		<FormProvider {...rhf}>
			<Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<TextArea id="description" {...props} />
				<Form.Buttons>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</Form.Buttons>
			</Form>
		</FormProvider>
	);
};
Description.args = {
	name: 'name',
	label: 'Name',
	description: 'This field has a description',
};

export const Validation = props => {
	const rhf = useForm({ mode: 'onBlur' });

	return (
		<FormProvider {...rhf}>
			<Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<TextArea id="required" {...props} rules={{ required: 'This is required' }} />
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
				<Form.Buttons>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</Form.Buttons>
			</Form>
		</FormProvider>
	);
};
Validation.args = {
	name: 'required',
	label: 'Required',
	required: true,
};
