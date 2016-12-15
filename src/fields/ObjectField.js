import React, { Component, PropTypes } from 'react';

import {
	deepEquals,
	getDefaultFormState,
	orderProperties,
	retrieveSchema,
	shouldRender,
	getDefaultRegistry,
	setState,
} from 'react-jsonschema-form/lib/utils';


function objectKeysHaveChanged(formData, state) {
	// for performance, first check for lengths
	const newKeys = Object.keys(formData);
	const oldKeys = Object.keys(state);
	if (newKeys.length < oldKeys.length) {
		return true;
	}
	// deep check on sorted keys
	if (!deepEquals(newKeys.sort(), oldKeys.sort())) {
		return true;
	}
	return false;
}

class ObjectField extends Component {
	static defaultProps = {
		uiSchema: {},
		errorSchema: {},
		idSchema: {},
		registry: getDefaultRegistry(),
		required: false,
		disabled: false,
		readonly: false,
	};

	constructor(props) {
		super(props);
		this.state = this.getStateFromProps(props);
	}

	componentWillReceiveProps(nextProps) {
		const state = this.getStateFromProps(nextProps);
		const { formData } = nextProps;
		if (formData && objectKeysHaveChanged(formData, this.state)) {
			// We *need* to replace state entirely here has we have received formData
			// holding different keys (so with some removed).
			this.state = state;
			this.forceUpdate();
		} else {
			this.setState(state);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shouldRender(this, nextProps, nextState);
	}

	onPropertyChange = (id, name) => (value, options) => {
		this.asyncSetState({ [name]: value }, options, id, name, value);
	};

	getStateFromProps(props) {
		const { schema, formData, registry } = props;
		return getDefaultFormState(schema, formData, registry.definitions) || {};
	}

	isRequired(name) {
		const schema = this.props.schema;
		return Array.isArray(schema.required) &&
			schema.required.indexOf(name) !== -1;
	}

	asyncSetState(state, options = { validate: false }, id, name, value) {
		setState(this, state, () => {
			if (this.props.registry.formContext.handleSchemaChange) {
				this.props.registry.formContext.handleSchemaChange(this.state, id, name, value, options);
			}
			this.props.onChange(this.state, options);
		});
	}

	render() {
		const {
			uiSchema,
			errorSchema,
			idSchema,
			name,
			required,
			disabled,
			readonly,
		} = this.props;

		const { definitions, fields, formContext } = this.props.registry;
		const { SchemaField, TitleField, DescriptionField } = fields;
		const schema = retrieveSchema(this.props.schema, definitions);

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
							formData={this.state[propertyName]}
							onChange={this.onPropertyChange(schema.id, propertyName)}
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
