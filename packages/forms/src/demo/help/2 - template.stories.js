/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';

export default {
	title: 'Demo|2 - Template',
};

export const Help = () => {
	const rhf = useForm();
	return (
		<form onSubmit={rhf.handleSubmit(action('onSubmit'))} noValidate>
			<div className={`form-group ${rhf.errors.name ? 'has-error' : ''}`}>
				<label htmlFor="name" className="control-label">
					Name
				</label>
				<input
					id="name"
					name="name"
					className="form-control"
					ref={rhf.register({ required: 'This is required' })}
					required
					aria-describedby="name-desc name-error"
				/>

				<div>
					<p className="help-block" id="name-desc">
						Please enter your full name
					</p>
					<p className="help-block" role="status" aria-live="assertive" id="name-error">
						{rhf.errors.name?.message}
					</p>
				</div>
			</div>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
