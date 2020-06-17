import PropTypes from 'prop-types';
import React from 'react';
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

function Column(props) {
	const Renderer = getColumnRenderer(props.schema.type);
	return (
		<div className={`${props.className} ${theme.column}`}>
			<Renderer
				schema={props.schema}
				formData={props.formData}
				uiSchema={props.uiSchema[props.columnKey]}
				onChange={props.onChange}
				onBlur={props.onBlur}
				registry={props.registry}
				readonly={props.uiSchema['ui:readonly']}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Column.propTypes = {
		className: PropTypes.string,
		columnKey: PropTypes.string.isRequired,
		schema: PropTypes.object.isRequired,
		formData: PropTypes.object.isRequired,
		uiSchema: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
		registry: SchemaField.propTypes.registry,
	};
}

export default class ColumnsWidget extends React.Component {
	constructor(props) {
		super(props);
		this.onColumnChange = this.onColumnChange.bind(this);
	}

	onColumnChange(key) {
		return value => {
			this.props.onChange({ ...this.props.formData, [key]: value });
		};
	}

	render() {
		const { name, schema, formData, onBlur, ...props } = this.props;

		return (
			<div className={`tf-widget-columns ${theme.columns}`}>
				{(schema.title || name) && (
					<TitleField id={`${name}__title`} title={schema.title || name} />
				)}
				{/* eslint-disable react/jsx-indent, no-mixed-spaces-and-tabs */}
				{schema.properties
					? Object.keys(schema.properties).map(key => (
							<Column
								{...props}
								key={key}
								columnKey={key}
								schema={schema.properties[key]}
								formData={formData[key]}
								onChange={this.onColumnChange(key)}
								onBlur={onBlur}
								className={`tf-column-${key}`}
							/>
					  ))
					: null}
				{/* eslint-enable react/jsx-indent, no-mixed-spaces-and-tabs  */}
			</div>
		);
	}
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
