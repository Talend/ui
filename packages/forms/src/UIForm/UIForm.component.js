import React, { PropTypes } from 'react';
import { merge } from 'talend-json-schema-form-core';

import { validateValue, validateAll } from './utils/validation';
import Widget from './Widget';

const TRIGGER_AFTER = 'after';

export default class UIForm extends React.Component {
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema } = props;
		this.state = {
			mergedSchema: merge(jsonSchema, uiSchema),
		};
		console.log(this.state.mergedSchema)

		this.onChange = this.onChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	/**
	 * Update the state with the new schema.
	 * @param jsonSchema
	 * @param uiSchema
	 */
	componentWillReceiveProps({ jsonSchema, uiSchema }) {
		if (!jsonSchema || !uiSchema) {
			return;
		}
		this.setState({
			mergedSchema: merge(jsonSchema, uiSchema),
		});
	}

	/**
	 * Triggers the onTrigger and onChange if needed
	 * - onChange : at each field change
	 * - onTrigger : when schema.trigger : ['after']
	 * @param schema The field schema
	 * @param value The new value
	 */
	onChange(event, schema, value) {
		const { onChange, onTrigger, properties, validation } = this.props;
		const error = validateValue(schema, value, properties, validation);
		onChange(schema, value, error);

		const { key, triggers } = schema;
		if (onTrigger && triggers && triggers.indexOf(TRIGGER_AFTER) !== -1) {
			onTrigger(
				this.props.properties,  // current properties values
				key[key.length - 1],    // field name
				value                   // field value
			);
		}
	}

	/**
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 */
	submit(event) {
		event.preventDefault();
		const { mergedSchema } = this.state;
		const { formName, properties, validation } = this.props;
		const errors = validateAll(mergedSchema, properties, validation);

		const isValid = !Object.keys(errors).length;
		if (isValid) {
			this.props.onSubmit(event, properties);
		} else {
			this.props.onValidateAll(formName, errors);
		}
	}

	render() {
		const { errors, formName, properties } = this.props;
		return (
			<form onSubmit={this.submit}>
				{
					this.state.mergedSchema.map((nextSchema, index) => (
						<Widget
							key={index}
							formName={formName}
							onChange={this.onChange}
							schema={nextSchema}
							properties={properties}
							errors={errors}
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
		/** The forms errors { [fieldKey]: errorMessage } */
		errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		/** The form name that will be used to create ids */
		formName: PropTypes.string,
		/** Json schema that specify the data model */
		jsonSchema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		/** The change callback */
		onChange: PropTypes.func.isRequired,
		/** Form submit callback */
		onSubmit: PropTypes.func.isRequired,
		/**
		 * Tigger > after callback.
		 * Prototype: function onTrigger(properties, fieldName, value)
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,
		/** All fields validation callback */
		onValidateAll: PropTypes.func,
		/** Form fields values. Note that it should contains @definitionName for triggers. */
		properties: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		/** UI schema that specify how to render the fields */
		uiSchema: PropTypes.array, // eslint-disable-line react/forbid-prop-types
		/**
		 * Custom validation function.
		 * Prototype: function validation(properties, fieldName, value)
		 * Return format : { valid: true|false, error: { message: 'my validation message' } }
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		validation: PropTypes.func,
	};
}
