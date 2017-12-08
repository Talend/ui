import PropTypes from 'prop-types';
import React from 'react';

import merge from './merge';
import { formPropTypes } from './utils/propTypes';
import { validateSingle, validateAll } from './utils/validation';
import Widget from './Widget';
import Buttons from './fields/Button/Buttons.component';
import { getValue, mutateValue, omit } from './utils/properties';

export default class UIForm extends React.Component {
	static displayName = 'TalendUIForm';
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema } = props;
		this.state = merge(jsonSchema, uiSchema);

		this.onChange = this.onChange.bind(this);
		this.onFinish = this.onFinish.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
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
		this.setState(merge(jsonSchema, uiSchema));
	}

	/**
	 * Fire onChange callback while interacting with form fields
	 * @param event The event that triggered the callback
	 * @param schema The payload field schema
	 * @param value The payload new value
	 */
	onChange(event, { schema, value }) {
		const payload = {
			formName: this.props.formName,
			properties: this.props.properties,
			schema,
			value,
		};
		this.props.onChange(event, payload);
	}

	/**
	 * Perform validation and triggers when user has finished to change a value
	 * @param event The event that triggered the callback
	 * @param schema The payload field schema
	 * @param value The new value, provided if not already taken into account
	 * @param deepValidation Validate the subItems
	 * Most of the time, this value is not provided. It will be taken from props.properties
	 * This allows to perform triggers/validation while changing a value
	 * (ex: add an element in array)
	 * @param widgetChangeErrors Change errors hook, allows any widget to manipulate the errors map
	 * (ex: shift the errors in array elements on remove)
	 */
	onFinish(event, { schema, value }, { deepValidation = false, widgetChangeErrors } = {}) {
		// get property value
		let newValue;
		if (value !== undefined) {
			newValue = value;
		} else {
			newValue = getValue(this.props.properties, schema.key);
		}

		// validate value
		const valueError = validateSingle(
			schema,
			newValue,
			this.props.properties,
			this.props.customValidation,
			deepValidation,
		)[schema.key];

		// update errors map
		let errors;
		if (valueError) {
			errors = {
				...this.props.errors,
				[schema.key]: valueError,
			};
		} else {
			errors = omit(this.props.errors, schema.key.toString());
		}
		if (widgetChangeErrors) {
			errors = widgetChangeErrors(errors);
		}
		this.props.setErrors(this.props.formName, errors);

		// trigger if value is correct
		if (!valueError && schema.triggers && schema.triggers.length) {
			const payload = { trigger: schema.triggers[0], schema };
			if (value !== undefined) {
				payload.properties = mutateValue(this.props.properties, schema.key, value);
			}
			// adapt payload to the old one.
			let properties = this.props.properties;
			schema.key.forEach((key, index) => {
				if (index !== schema.key.length - 1) {
					properties = properties[key];
				}
			});
			payload.formData = this.props.properties;
			payload.properties = properties;
			this.onTrigger(event, payload);
		}
	}

	/**
	 * Triggers an onTrigger callback that is allowed to modify the form
	 * @param event The event that triggered the callback
	 * @param payload The trigger payload
	 * trigger The type of trigger
	 * schema The field schema
	 */
	onTrigger(event, payload) {
		const { formName, updateForm, onTrigger, setError, properties } = this.props;
		if (!onTrigger) {
			return null;
		}

		const result = onTrigger(event, {
			formName,
			properties,
			...payload,
		});
		if (result.then) {
			return result.then(newForm =>
				updateForm(
					formName,
					newForm.jsonSchema,
					newForm.uiSchema,
					newForm.properties,
					newForm.errors,
				),
			)
			.catch(({ errors }) => setError(formName, errors));
		}
		return result;
	}

	/**
	 * Set the original data and schema
	 * Triggers reset callback if form is valid
	 * @param event the reset event
	 */
	onReset(event) {
		this.props.updateForm(
			this.props.formName,
			this.props.initialData.jsonSchema,
			this.props.initialData.uiSchema,
			this.props.initialData.properties,
		);
		this.props.setErrors(this.props.formName, {});

		if (this.props.onReset) {
			this.props.onReset(event);
		}
	}

	/**
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 */
	onSubmit(event) {
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
		const actions = this.props.actions || [
			{
				bsStyle: 'primary',
				title: 'Submit',
				type: 'submit',
				widget: 'button',
			},
		];

		return (
			<form
				acceptCharset={this.props.acceptCharset}
				action={this.props.action}
				autoComplete={this.props.autoComplete}
				className={this.props.className}
				encType={this.props.encType}
				id={this.props.id}
				method={this.props.method}
				name={this.props.formName}
				noValidate={this.props.noHtml5Validate}
				onReset={this.onReset}
				onSubmit={this.onSubmit}
				target={this.props.target}
			>
				{this.state.mergedSchema.map((nextSchema, index) => (
					<Widget
						id={this.props.id}
						key={index}
						formName={this.props.formName}
						onChange={this.onChange}
						onFinish={this.onFinish}
						onTrigger={this.onTrigger}
						schema={nextSchema}
						properties={this.props.properties}
						errors={this.props.errors}
						widgets={Object.assign({}, this.props.widgets, this.state.widgets)}
					/>
				))}
				<Buttons
					id={`${this.props.id}-${this.props.formName}-actions`}
					onTrigger={this.onTrigger}
					schema={{ items: actions }}
				/>
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
		/** Form definition: The forms initial data */
		initialData: PropTypes.shape({
			jsonSchema: PropTypes.object,
			uiSchema: PropTypes.array,
			properties: PropTypes.object,
		}),

		/**
		 * Actions buttons to display at the bottom of the form.
		 * If not provided, a single submit button is displayed.
		 */
		actions: PropTypes.arrayOf(Buttons.propTypes.schema),
		/**
		 * User callback: Custom validation function.
		 * Prototype: function customValidation(schema, value, properties)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/**
		 * User callback: Trigger
		 * Prototype: function onTrigger(event, { formName, trigger, schema, properties })
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
