/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useForm from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import Datalist from './Datalist.component';

export default {
	title: 'Fields|Datalist',

	parameters: {
		component: Datalist,
	},
};

const titleMap = [
	{ name: 'My foo', value: 'foo', description: 'foo description' },
	{ name: 'My bar', value: 'bar' },
	{ name: 'My foobar', value: 'foobar', description: 'foobar description' },
	{ name: 'My lol', value: 'lol' },
];

export const States = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Datalist name="datalist" label="Simple datalist" rhf={rhf} titleMap={titleMap} />
			<Datalist name="disabled" label="Disabled" rhf={rhf} titleMap={titleMap} disabled />
			<Datalist name="readonly" label="Readonly" rhf={rhf} titleMap={titleMap} readOnly />
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const DefaultValue = () => {
	const { handleSubmit, ...rhf } = useForm();

	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Datalist
				name="defaultValue"
				label="Default value"
				rhf={rhf}
				titleMap={titleMap}
				defaultValue="lol"
			/>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const Description = () => {
	const { handleSubmit, ...rhf } = useForm();

	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Datalist
				name="description"
				label="Description"
				rhf={rhf}
				titleMap={titleMap}
				description="This field has a description"
			/>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const Validation = () => {
	const { handleSubmit, ...rhf } = useForm();

	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Datalist
				name="required"
				label="Required"
				rhf={rhf}
				titleMap={titleMap}
				registerOptions={{ required: 'This is required' }}
				required
			/>
			<Datalist
				name="notLol"
				label="Not lol"
				rhf={rhf}
				titleMap={titleMap}
				registerOptions={{
					validate(value) {
						return value === 'lol' ? 'This must not be lol' : null;
					},
				}}
			/>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
