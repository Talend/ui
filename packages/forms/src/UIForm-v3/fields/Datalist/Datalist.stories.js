/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
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
	const rhf = useForm({ mode: 'onBlur' });

	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Datalist
					id="datalist"
					name="datalist"
					label="Simple datalist"
					titleMap={titleMap}
					defaultValue="foo"
				/>
				<Datalist
					id="disabled"
					name="disabled"
					label="Disabled"
					titleMap={titleMap}
					defaultValue="foo"
					disabled
				/>
				<Datalist
					id="readonly"
					name="readonly"
					label="Readonly"
					titleMap={titleMap}
					defaultValue="foo"
					readOnly
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const DefaultValue = () => {
	const rhf = useForm({ mode: 'onBlur' });

	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Datalist
					id="defaultValue"
					name="defaultValue"
					label="Default value"
					titleMap={titleMap}
					defaultValue="lol"
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const Description = () => {
	const rhf = useForm({ mode: 'onBlur' });

	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Datalist
					id="description"
					name="description"
					label="Description"
					titleMap={titleMap}
					description="This field has a description"
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const Restricted = () => {
	const rules = {
		validate: selectedValue => {
			if (!selectedValue || titleMap.find(({ value }) => value === selectedValue)) {
				return null;
			}
			return "This value doesn't seem right in this restricted datalist. Let's select one the defined values";
		},
	};
	const rhf = useForm({ mode: 'onBlur' });

	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Datalist
					id="restricted"
					name="restricted"
					label="Restricted"
					titleMap={titleMap}
					rules={rules}
					restricted
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const Validation = () => {
	const rhf = useForm({ mode: 'onBlur' });

	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<Datalist
					id="required"
					name="required"
					label="Required"
					titleMap={titleMap}
					rules={{ required: 'This is required' }}
					required
				/>
				<Datalist
					id="notLol"
					name="notLol"
					label="Not lol"
					titleMap={titleMap}
					rules={{
						validate(value) {
							return value === 'lol' ? 'This must not be lol' : null;
						},
					}}
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};
