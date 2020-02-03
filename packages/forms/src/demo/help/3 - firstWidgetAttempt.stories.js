/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';
import FieldTemplate from '../FieldTemplate';

export default {
	title: 'Demo|3 - First widget attempt',
};

const Input = React.forwardRef((props, ref) => {
	const { description, error, label, ...rest } = props;
	const descriptionId = `${rest.id}-desc`;
	const errorId = `${rest.id}-error`;
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
				ref={ref}
				aria-describedby={`${errorId} ${descriptionId}`}
			/>
		</FieldTemplate>
	);
});

export const Help = () => {
	const rhf = useForm();
	return (
		<form onSubmit={rhf.handleSubmit(action('onSubmit'))}>
			<Input
				id="name"
				name="name"
				label="name"
				description="Please enter your full name"
				error={rhf.errors.name}
				ref={rhf.register({ required: 'This is required' })}
			/>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
