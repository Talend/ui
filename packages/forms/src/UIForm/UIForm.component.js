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
		const { formName, onChange, onTrigger, onValidate, properties, customValidation } = this.props;
		const error = validateValue(schema, value, properties, customValidation);
		onChange(schema, value, error);

		const { triggers } = schema;
		if (onTrigger && triggers && triggers.indexOf(TRIGGER_AFTER) !== -1) {
			onTrigger(
				properties,     // current properties values
				schema,         // field schema
				value           // field value
			)
				.then(() => {})
				.catch(({ errors }) => onValidate(formName, errors));
		}
	}

	/**
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 */
	submit(event) {
		event.preventDefault();
		const { mergedSchema } = this.state;
		const { formName, properties, customValidation } = this.props;
		const errors = validateAll(mergedSchema, properties, customValidation);

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
		/** Form definition: The form name that will be used to create ids */
		formName: PropTypes.string,
		/** Form definition: Json schema that specify the data model */
		jsonSchema: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		/**
		 * Form definition: Form fields values.
		 * Note that it should contains @definitionName for triggers.
		 */
		properties: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		/** Form definition: UI schema that specify how to render the fields */
		uiSchema: PropTypes.array, // eslint-disable-line react/forbid-prop-types
		/** Form definition: The forms errors { [fieldKey]: errorMessage } */
		errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types

		/**
		 * User callback: Custom validation function.
		 * Prototype: function customValidation(properties, fieldName, value)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/** User callback: Form submit callback */
		onSubmit: PropTypes.func.isRequired,
		/**
		 * User callback: Trigger > after callback.
		 * Prototype: function onTrigger(properties, schema, value)
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,

		/** State management impl: The change callback */
		onChange: PropTypes.func.isRequired,
		/** State management impl: Partial fields validation callback */
		onValidate: PropTypes.func,
		/** State management impl: All fields validation callback */
		onValidateAll: PropTypes.func,
	};
}
