import React, { Component, PropTypes } from 'react';

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

	onPropertyChange = (name) => (value, options, changeName) => {
		const newFormData = { ...this.props.formData, [name]: value };
		if (this.props.registry.formContext.handleSchemaChange && changeName) {
			this.props.registry.formContext.handleSchemaChange(newFormData, changeName, options);
		}
		this.props.onChange(newFormData, options, name);
	};

	isRequired(name) {
		const schema = this.props.schema;
		return Array.isArray(schema.required) &&
			schema.required.indexOf(name) !== -1;
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
		} = this.props;

		const { definitions, fields, formContext, widgets } = this.props.registry;
		const { SchemaField, TitleField, DescriptionField } = fields;
		const schema = retrieveSchema(this.props.schema, definitions);
		const { widget, ...options } = getUiOptions(uiSchema);
		// widget
		if (typeof widget === 'string') {
			const Widget = getWidget(schema, widget, widgets);
			const onChangeHandler = (value) => {
				onChange(value, options);
			};
			return (<Widget
				id={idSchema && idSchema.$id}
				onChange={onChangeHandler}
				onBlur={onBlur}
				schema={schema}
				formData={formData}
				uiSchema={uiSchema}
				registry={this.props.registry}
				definitions={definitions}
			/>);
		}

		const title = (schema.title === undefined) ? name : schema.title;
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
				{title ? <TitleField
					id={`${idSchema.$id}__title`}
					title={title}
					required={required}
					formContext={formContext}
				/> : null}
				{schema.description ?
					<DescriptionField
						id={`${idSchema.$id}__description`}
						description={schema.description}
						formContext={formContext}
					/> : null}
				{
					orderedProperties.map((propertyName, index) => (
						<SchemaField
							key={index}
							name={propertyName}
							required={this.isRequired(propertyName)}
							schema={schema.properties[propertyName]}
							uiSchema={uiSchema[propertyName]}
							errorSchema={errorSchema[propertyName]}
							idSchema={idSchema[propertyName]}
							formData={formData[propertyName]}
							onChange={this.onPropertyChange(propertyName)}
							registry={this.props.registry}
							disabled={disabled}
							readonly={readonly}
						/>
					))
				}</fieldset>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	ObjectField.propTypes = {
		disabled: PropTypes.bool,
		errorSchema: PropTypes.object,
		formData: PropTypes.object,
		idSchema: PropTypes.object,
		name: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
		readonly: PropTypes.bool,
		registry: PropTypes.shape({
			widgets: PropTypes.objectOf(PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.object,
			])).isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			definitions: PropTypes.object.isRequired,
			formContext: PropTypes.object.isRequired,
		}),
		required: PropTypes.bool,
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object,
	};
}

export default ObjectField;
