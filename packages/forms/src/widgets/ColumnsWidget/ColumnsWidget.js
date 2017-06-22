import React, { PropTypes } from 'react';
import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import TitleField from 'react-jsonschema-form/lib/components/fields/TitleField';

import ObjectField from '../../fields/ObjectField';

import theme from './ColumnsWidget.scss';

function getColumnRenderer(type) {
	if (type !== 'object') {
		return SchemaField;
	}
	return ObjectField;
}

function Column({ className, schema, formData, onChange, onBlur, registry }) {
	const Renderer = getColumnRenderer(schema.type);
	return (
		<div className={`${className} ${theme.column}`}>
			<Renderer
				schema={schema}
				formData={formData}
				onChange={onChange}
				onBlur={onBlur}
				registry={registry}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Column.propTypes = {
		className: PropTypes.string,
		schema: PropTypes.object.isRequired,
		formData: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
		registry: SchemaField.propTypes.registry,
	};
}

function onColumnChange(key, onChange, formData) {
	return function handleChange(change) {
		onChange(Object.assign({}, formData, { [key]: change }));
	};
}

export default function ColumnsWidget({ name, schema, formData, onChange, onBlur, ...props }) {
	return (
		<div className={`tf-widget-columns ${theme.columns}`}>
			<TitleField id={`${name}__title`} title={schema.title || name} />
			{schema.properties ? Object.keys(schema.properties).map(
				key => (
					<Column
						{...props}
						key={key}
						schema={schema.properties[key]}
						formData={formData[key]}
						onChange={onColumnChange(key, onChange, formData)}
						onBlur={onBlur}
						className={`tf-column-${key}`}
					/>
				)
			) : null}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ColumnsWidget.propTypes = {
		name: PropTypes.string,
		schema: PropTypes.object.isRequired,
		formData: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
	};
}
