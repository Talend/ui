/* eslint-disable import/no-extraneous-dependencies */
/*
Make the markup theme compliant
*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';

export default {
	title: 'Demo|2 - Template',
};

export const Demo = () => {
	const rhf = useForm();
	return (
		<form onSubmit={rhf.handleSubmit(action('onSubmit'))} noValidate>
			<label htmlFor="name">Name:</label>
			<input id="name" name="name" ref={rhf.register({ required: 'This is required' })} required />
			<div>{rhf.errors.name?.message}</div>

			<label htmlFor="address">Address:</label>
			<input id="address" name="info.address" ref={rhf.register} />
			<div>{rhf.errors.description?.message}</div>

			<button type="submit">Submit</button>
		</form>
	);
};

/*
// TEMPLATE
<div className="form-group has-error">
	<label htmlFor="" className="control-label"></label>
	{INSERT INPUT HERE}

	<div>
		<p className="help-block" id="">
			{DESCRIPTION MESSAGE HERE}
		</p>
		<p className="help-block" role="status" aria-live="assertive" id="">
			{ERROR MESSAGE HERE}
		</p>
	</div>
</div>
*/
