/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { useForm, useFormContext, FormContext } from 'react-hook-form';
import DatalistComponent from '@talend/react-components/lib/Datalist';
import FieldTemplate from './FieldTemplate';

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
	// get control from rhf
	// instantiate <Controller />
	// registration configuration
	// controlled Component configuration
	// props drilling to DataListComponent
}

export const Demo = () => {
	const rhf = useForm();
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('onSubmit'))}>
				{/* USE DATALIST WIDGET */}

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};
