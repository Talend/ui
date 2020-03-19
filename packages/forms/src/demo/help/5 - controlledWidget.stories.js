/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { useForm, useFormContext, FormContext, Controller } from 'react-hook-form';
import DatalistComponent from '@talend/react-components/lib/Datalist';
import FieldTemplate from '../FieldTemplate';

export default {
	title: 'Demo|5 - Controlled widget',
};

const titleMap = [
	{ name: 'My foo', value: 'foo', description: 'foo description' },
	{ name: 'My bar', value: 'bar' },
	{ name: 'My foobar', value: 'foobar', description: 'foobar description' },
	{ name: 'My lol', value: 'lol' },
];

function DataList(props) {
	const rhf = useFormContext();
	const error = rhf.errors[props.name];

	const descriptionId = `${props.id}-desc`;
	const errorId = `${props.id}-error`;

	const { description, label, ...rest } = props;

	return (
		<FieldTemplate
			label={label}
			description={description}
			descriptionId={descriptionId}
			error={error}
			errorId={errorId}
		>
			{' '}
			<Controller
				{...rest}
				as={DatalistComponent}
				control={rhf.control}
				// controlled Component configuration
				onChange={([, payload]) => payload.value} // resolve the value to set onChange
				// props drilling to DataListComponent
				error={error}
			/>
		</FieldTemplate>
	);
}

export const Help = () => {
	const rhf = useForm();
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('onSubmit'))}>
				{/* USE DATALIST WIDGET */}
				<DataList
					id="option"
					name="option"
					label="Option"
					description="Please choose an option"
					rules={{ required: 'This is required' }}
					titleMap={titleMap}
				/>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};
