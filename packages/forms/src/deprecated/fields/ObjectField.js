import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	getUiOptions,
	getWidget,
	orderProperties,
	retrieveSchema,
	getDefaultRegistry,
} from 'react-jsonschema-form/lib/utils';

function DefaultObjectFieldTemplate(props) {
	const { TitleField, DescriptionField } = props;
	return (
		<fieldset>
			{(props.uiSchema['ui:title'] || props.title) && (
				<TitleField
					id={`${props.idSchema.$id}__title`}
					title={props.title || props.uiSchema['ui:title']}
					required={props.required}
					formContext={props.formContext}
				/>
			)}
			{props.description && (
				<DescriptionField
					id={`${props.idSchema.$id}__description`}
					description={props.description}
					formContext={props.formContext}
				/>
			)}
			{props.properties.map(prop => prop.content)}
		</fieldset>
	);
}
if (process.env.NODE_ENV !== 'production') {
	DefaultObjectFieldTemplate.propTypes = {
		TitleField: PropTypes.func.isRequired,
		DescriptionField: PropTypes.func.isRequired,
		description: PropTypes.string,
		formContext: PropTypes.object,
		idSchema: PropTypes.shape({
			$id: PropTypes.string,
		}).isRequired,
		properties: PropTypes.arrayOf(PropTypes.object).isRequired,
		required: PropTypes.bool,
		title: PropTypes.string,
		uiSchema: PropTypes.object.isRequired,
	};
}

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
			onBlur,
			onChange,
			onFocus,
			registry,
		} = this.props;
		const { definitions, fields, formContext, widgets } = registry;
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
		const description = uiSchema['ui:description'] || schema.description;
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

		const Template = registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;

		const templateProps = {
			title: uiSchema['ui:title'] || title,
			description,
			TitleField,
			DescriptionField,
			properties: orderedProperties.map(propName => ({
				content: (
					<SchemaField
						key={propName}
						name={propName}
						required={this.isRequired(propName)}
						schema={schema.properties[propName]}
						uiSchema={uiSchema[propName]}
						errorSchema={errorSchema[propName]}
						idSchema={idSchema[propName]}
						formData={formData[propName]}
						onChange={this.onPropertyChange(schema.id, propName)}
						onBlur={onBlur}
						onFocus={onFocus}
						registry={registry}
						disabled={disabled}
						readonly={readonly}
					/>
				),
				propName,
				readonly,
				disabled,
				required,
			})),
			required,
			idSchema,
			uiSchema,
			schema,
			formData,
			formContext,
		};
		return <Template {...templateProps} />;
	}
}

if (process.env.NODE_ENV !== 'production') {
	ObjectField.propTypes = {
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object,
		errorSchema: PropTypes.object,
		idSchema: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		formData: PropTypes.object,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
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
