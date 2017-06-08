import React, { PropTypes } from 'react';
import ObjectField from '../../fields/ObjectField';

import theme from './ColumnsWidget.scss';

function Column({ className, schema, formData, onChange, onBlur, ...props }) {
	return (
		<div className={`${className} ${theme.column}`}>
			<ObjectField
				{...props}
				schema={schema}
				formData={formData}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</div>
	);
}
Column.propTypes = {
	className: PropTypes.string,
	schema: PropTypes.object.isRequired,
	formData: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
};

function onColumnChange(key, onChange, formData) {
	return function handleChange(change) {
		onChange(Object.assign({}, formData, { [key]: change }));
	};
}

export default function ColumnsWidget({ schema, formData, onChange, onBlur }) {
	return (
		<div className={`tf-widget-columns ${theme.columns}`}>
			{schema.properties ? Object.keys(schema.properties).map(
				(key) => (
					<Column
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

ColumnsWidget.propTypes = {
	schema: PropTypes.object.isRequired,
	formData: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
};
