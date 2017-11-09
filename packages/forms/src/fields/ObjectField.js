import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
	orderProperties,
	retrieveSchema,
	shouldRender,
	getUiOptions,
	getWidget,
	getDefaultRegistry,
} from 'react-jsonschema-form/lib/utils';

class ObjectField extends Component {
	static defaultProps = {
		uiSchema: {},
		formData: {},
		errorSchema: {},
		idSchema: {},
		registry: getDefaultRegistry(),
		required: false,
		disabled: false,
		readonly: false,
	};

	shouldComponentUpdate(nextProps, nextState) {
		return shouldRender(this, nextProps, nextState);
	}

	onPropertyChange = (id, name) => (value, options) => {
		const newFormData = { ...this.props.formData, [name]: value };
		if (this.props.registry.formContext.handleSchemaChange) {
			this.props.registry.formContext.handleSchemaChange(newFormData, id, name, value, options);
		}
		this.props.onChange(newFormData, options);
	};

	isRequired(name) {
		const schema = this.props.schema;
		return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
	}

	render() {
		const {
			uiSchema,
			formData,
			errorSchema,
			idSchema,
			name,
			required,
			disabled,
			readonly,
			onChange,
			onBlur,
		} = this.props;
		const { definitions, fields, formContext, widgets } = this.props.registry;
		const { SchemaField, TitleField, DescriptionField } = fields;
		const schema = retrieveSchema(this.props.schema, definitions);
		const { widget, ...options } = getUiOptions(uiSchema);

		if (typeof widget === 'string') {
			if (widget === 'hidden') {
				return null;
			}
			const Widget = getWidget(schema, widget, widgets);
			const onChangeHandler = value => {
				onChange(value, options);
			};
			return (
				<Widget
					id={idSchema && idSchema.$id}
					onChange={onChangeHandler}
					schema={schema}
					formData={formData}
					uiSchema={uiSchema}
					registry={this.props.registry}
					definitions={definitions}
				/>
			);
		}

		const title = schema.title === undefined ? name : schema.title;
		let orderedProperties;
		try {
			const properties = Object.keys(schema.properties);
			orderedProperties = orderProperties(properties, uiSchema['ui:order']);
		} catch (err) {
			return (
				<div>
					<p className="config-error" style={{ color: 'red' }}>
						Invalid {name || 'root'} object field configuration:
						<em>{err.message}</em>.
					</p>
					<pre>{JSON.stringify(schema)}</pre>
				</div>
			);
		}
		return (
			<fieldset>
				{title ? (
					<TitleField
						id={`${idSchema.$id}__title`}
						title={title}
						required={required}
						formContext={formContext}
					/>
				) : null}
				{schema.description ? (
					<DescriptionField
						id={`${idSchema.$id}__description`}
						description={schema.description}
						formContext={formContext}
					/>
				) : null}
				{orderedProperties.map((propName, index) => (
					<SchemaField
						key={index}
						name={propName}
						required={this.isRequired(propName)}
						schema={schema.properties[propName]}
						uiSchema={uiSchema[propName]}
						errorSchema={errorSchema[propName]}
						idSchema={idSchema[propName]}
						formData={formData[propName]}
						onChange={this.onPropertyChange(schema.id, propName)}
						onBlur={onBlur}
						registry={this.props.registry}
						disabled={disabled}
						readonly={readonly}
					/>
				))}
			</fieldset>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	ObjectField.propTypes = {
		schema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		uiSchema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		errorSchema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		idSchema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		formData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func,
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		name: PropTypes.string,
		readonly: PropTypes.bool,
		registry: PropTypes.shape({
			widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object]))
				.isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			definitions: PropTypes.object.isRequired,
			formContext: PropTypes.object.isRequired,
		}),
	};
}

export default ObjectField;
