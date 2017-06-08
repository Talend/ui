import React, { PropTypes } from 'react';
import { merge } from 'talend-json-schema-form-core';

import { TRIGGER_AFTER } from './utils/triggers';
import { formPropTypes } from './utils/propTypes';
import { validateValue, validateAll } from './utils/validation';
import Widget from './Widget';

export default class UIForm extends React.Component {
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema } = props;
		this.state = {
			mergedSchema: merge(jsonSchema, uiSchema),
		};

		this.onChange = this.onChange.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
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
	 * Fire callbacks while interacting with form fields
	 * - onChange: for each field change
	 * - onTrigger: when trigger is provided and its value is "after"
	 * @param event The event that triggered the callback
	 * @param schema The field schema
	 * @param value The new value
	 */
	onChange(event, schema, value) {
		const {
			formName,
			onChange,
			properties,
			customValidation,
		} = this.props;
		const error = validateValue(schema, value, properties, customValidation);
		onChange(formName, schema, value, error);

		const { triggers } = schema;
		if (triggers && triggers.includes(TRIGGER_AFTER)) {
			this.onTrigger(event, TRIGGER_AFTER, schema, value, properties);
		}
	}

	/**
	 * Triggers an onTrigger callback that is allowed to modify the form
	 * @param event The event that triggered the callback
	 * @param type The type of trigger
	 * @param schema The field schema
	 * @param value The field value
	 */
	onTrigger(event, type, schema, value) {
		const { formName, updateForm, onTrigger, setError, properties } = this.props;
		if (!onTrigger) {
			return null;
		}

		return onTrigger(
			type,           // type of trigger
			schema,         // field schema
			value,          // field value
			properties,     // current properties values
		)
			.then(newForm => updateForm(
				formName,
				newForm.jsonSchema,
				newForm.uiSchema,
				newForm.properties,
				newForm.errors)
			)
			.catch(({ errors }) => setError(formName, errors));
	}

	/**
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 */
	submit(event) {
		if (this.props.onSubmit) {
			event.preventDefault();
		}

		const { mergedSchema } = this.state;
		const { formName, properties, customValidation } = this.props;
		const errors = validateAll(mergedSchema, properties, customValidation);
		this.props.setErrors(formName, errors);

		const isValid = !Object.keys(errors).length;
		if (this.props.onSubmit && isValid) {
			this.props.onSubmit(event, properties);
		}

		return isValid;
	}

	render() {
		const {
			acceptCharset,
			action,
			autoComplete,
			encType,
			formName,
			id,
			method,
			noHtml5Validate,
			target,

			errors,
			properties,
			widgets,
		} = this.props;
		return (
			<form
				acceptCharset={acceptCharset}
				action={action}
				autoComplete={autoComplete}
				encType={encType}
				id={id}
				method={method}
				name={formName}
				noValidate={noHtml5Validate}
				onSubmit={this.submit}
				target={target}
			>
				{
					this.state.mergedSchema.map((nextSchema, index) => (
						<Widget
							id={id}
							key={index}
							formName={formName}
							onChange={this.onChange}
							onTrigger={this.onTrigger}
							schema={nextSchema}
							properties={properties}
							errors={errors}
							widgets={widgets}
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
		...formPropTypes,

		/** Form definition: Json schema that specify the data model */
		jsonSchema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		/** Form definition: UI schema that specify how to render the fields */
		uiSchema: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
		/**
		 *  Form definition: Form fields values.
		 *  Note that it should contains @definitionName for triggers.
		 */
		properties: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		/** Form definition: The forms errors { [fieldKey]: errorMessage } */
		errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

		/**
		 * User callback: Custom validation function.
		 * Prototype: function customValidation(schema, value, properties)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/**
		 * User callback: Trigger > after callback.
		 * Prototype: function onTrigger(type, schema, value, properties)
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,
		/** Custom widgets */
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types

		/** State management impl: The change callback */
		onChange: PropTypes.func.isRequired,
		/** State management impl: Set Partial fields validation error */
		setError: PropTypes.func,
		/** State management impl: Set All fields validations errors */
		setErrors: PropTypes.func,
		/** State management impl: The form update callback */
		updateForm: PropTypes.func.isRequired,
	};
}

UIForm.defaultProps = {
	noHtml5Validate: true,
};
