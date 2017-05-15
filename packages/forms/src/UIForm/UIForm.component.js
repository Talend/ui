import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { merge } from 'talend-json-schema-form-core';

import Widget from './Widget';
import { validate, validateAll } from './utils/validation';
import { mutateValue } from './utils/properties';

const TRIGGER_AFTER = 'after';

class UIForm extends React.Component {
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema, properties } = props.data;
		this.state = {
			mergedSchema: merge(jsonSchema, uiSchema),
			properties: { ...properties },
			validations: {},
		};
		console.log(this.state.mergedSchema)

		this.consolidate = this.consolidate.bind(this);
		this.submit = this.submit.bind(this);
	}

	/**
	 * Update the state with the new schema.
	 * @param jsonSchema
	 * @param uiSchema
	 * @param properties
	 */
	componentWillReceiveProps({ jsonSchema, uiSchema, properties }) {
		if (!jsonSchema || !uiSchema || !properties) {
			return;
		}
		this.setState({
			mergedSchema: merge(jsonSchema, uiSchema),
			properties: { ...properties },
			validations: {},
			// TODO consolidate validation
			// or each state.validations, revalidate it if key is still in form, remove otherwise
		});
	}

	/**
	 * Consolidate form with the new value.
	 * - it updates the validation on the modified field.
	 * - it triggers onChange / onTrigger callbacks
	 * @param event The change event
	 * @param schema The schema of the changed field
	 * @param value The new field value
	 */
	consolidate(event, schema, value) {
		this.setState(
			(prevState) => {
				const properties = mutateValue(prevState.properties, schema.key, value);
				const validations = {
					...prevState.validations,
					[schema.key]: validate(schema, value, properties, this.props.validation),
				};
				return { properties, validations };
			},
			() => this.handleChangesCallbacks(schema, value)
		);
	}

	/**
	 * Triggers the onTrigger and onChange if needed
	 * - onChange : at each field change
	 * - onTrigger : when schema.trigger : ['after']
	 * @param schema The field schema
	 * @param value The new value
	 */
	handleChangesCallbacks(schema, value) {
		const { onChange, onTrigger } = this.props;

		if (onChange) {
			onChange({
				jsonSchema: this.props.data.jsonSchema, // original jsonSchema
				uiSchema: this.props.data.uiSchema,     // original uiSchema
				properties: this.state.properties,      // current properties values
			});
		}

		const { key, triggers } = schema;
		if (onTrigger && triggers && triggers.indexOf(TRIGGER_AFTER) !== -1) {
			onTrigger(
				this.state.properties,  // current properties values
				key[key.length - 1],    // field name
				value                   // field value
			);
		}
	}

	/**
	 * Triggers a validation and update state.
	 * @returns {boolean} true if the form is valid, false otherwise
	 */
	isValid() {
		const validations = validateAll(
			this.state.mergedSchema,
			this.state.properties,
			this.props.validation
		);

		const isValid = Object.keys(validations).every(key => validations[key].valid);
		if (!isValid) {
			this.setState({ validations });
		}
		return isValid;
	}

	/**
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 */
	submit(event) {
		event.preventDefault();
		if (this.isValid()) {
			this.props.onSubmit(event, this.state.properties);
		}
	}

	render() {
		const { formName } = this.props;
		const { properties, validations } = this.state;

		return (
			<form onSubmit={this.submit}>
				{
					this.state.mergedSchema.map((nextSchema, index) => (
						<Widget
							key={index}
							formName={formName}
							onChange={this.consolidate}
							schema={nextSchema}
							properties={properties}
							validations={validations}
						/>
					))
				}
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		/** Form schema configuration */
		data: PropTypes.shape({
			/** Json schema that specify the data model */
			jsonSchema: PropTypes.object,
			/** UI schema that specify how to render the fields */
			uiSchema: PropTypes.array,
			/** Form fields values. Note that it should contains @definitionName for triggers. */
			properties: PropTypes.object,
		}),
		/** The form name that will be used to create ids */
		formName: PropTypes.string,
		/** The change callback. It takes  */
		onChange: PropTypes.func,
		/** Form submit callback */
		onSubmit: PropTypes.func.isRequired,
		/**
		 * Tigger > after callback.
		 * Prototype: function onTrigger(properties, fieldName, value)
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,
		/**
		 * Custom validation function.
		 * Prototype: function validation(properties, fieldName, value)
		 * Return format : { valid: true|false, error: { message: 'my validation message' } }
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		validation: PropTypes.func,
	};
}

export default reduxForm({
	form: 'form', // a unique name for this form
})(UIForm);
