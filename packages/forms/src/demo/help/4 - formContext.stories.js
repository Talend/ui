/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { useForm, useFormContext, FormContext } from 'react-hook-form';
import FieldTemplate from '../FieldTemplate';

export default {
	title: 'Demo|4 - Form context',
};

function Input(props) {
	const rhf = useFormContext();
	const { description, label, rules, ...rest } = props;
	const descriptionId = `${rest.id}-desc`;
	const errorId = `${rest.id}-error`;
	const error = rhf.errors[rest.name];

	return (
		<FieldTemplate
			label={label}
			description={description}
			descriptionId={descriptionId}
			error={error}
			errorId={errorId}
		>
			<input
				{...rest}
				className="form-control"
				ref={rhf.register(rules)}
				aria-describedby={`${errorId} ${descriptionId}`}
			/>
		</FieldTemplate>
	);
}

export const Help = () => {
	const rhf = useForm();
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('onSubmit'))}>
				<Input
					id="name"
					name="name"
					label="name"
					description="Please enter your full name"
					rules={{ required: 'This is required' }}
				/>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};
