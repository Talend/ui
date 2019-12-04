/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useForm from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Array from './Array.component';
import Fieldset from '../Fieldset';
import Input from '../../fields/Input';

export default {
	title: 'Fieldsets|Array',

	parameters: {
		component: Array,
	},
};

export const Default = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Array legend="My awesome users" name="users" rhf={rhf}>
				{index => (
					<div style={{ padding: '2rem 3rem' }}>
						<Input
							id={`user-${index}-firstname`}
							type="text"
							name={`users[${index}].firstname`}
							label="First name"
							rhf={rhf}
						/>
						<Input
							id={`user-${index}-lastname`}
							type="text"
							name={`users[${index}].lastname`}
							label="Last name"
							rhf={rhf}
						/>
						<Input
							id={`user-${index}-age`}
							type="number"
							name={`users[${index}].age`}
							label="Age"
							rhf={rhf}
						/>
					</div>
				)}
			</Array>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const InitialItems = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Array legend="My awesome users" name="users" initialNbItems={3} rhf={rhf}>
				{index => (
					<div style={{ padding: '2rem 3rem' }}>
						<Input
							id={`user-${index}-firstname`}
							type="text"
							name={`users[${index}].firstname`}
							label="First name"
							rhf={rhf}
						/>
						<Input
							id={`user-${index}-lastname`}
							type="text"
							name={`users[${index}].lastname`}
							label="Last name"
							rhf={rhf}
						/>
						<Input
							id={`user-${index}-age`}
							type="number"
							name={`users[${index}].age`}
							label="Age"
							rhf={rhf}
						/>
					</div>
				)}
			</Array>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
