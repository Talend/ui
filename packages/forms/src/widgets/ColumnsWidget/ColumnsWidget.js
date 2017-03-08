import React, { PropTypes } from 'react';
import ObjectField from '../../fields/ObjectField';

import theme from './ColumnsWidget.scss';

function renderColumn(key, schema, formData, onChange, onBlur) {
	return (
		<ObjectField
			key={key}
			schema={schema}
			formData={formData}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
}

function onColumnChange(key, onChange, formData) {
	return function handleChange(change) {
		onChange(Object.assign(formData, { [key]: change }));
	};
}

function renderColumns(schema, formData, onChange, onBlur) {
	if (schema.properties) {
		return Object.keys(schema.properties).map((key) =>
			renderColumn(
				key,
				schema.properties[key],
				formData[key],
				onColumnChange(key, onChange, formData),
				onBlur,
			));
	}
	return null;
}

export default function ColumnsWidget(props) {
	return (
		<div className={theme.columns}>
			{renderColumns(props.schema, props.formData, props.onChange, props.onBlur)}
		</div>
	);
}

ColumnsWidget.propTypes = {
	schema: PropTypes.object.isRequired,
	formData: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
};
