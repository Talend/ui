import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import tv4 from 'tv4';

import merge from './merge';
import { formPropTypes } from './utils/propTypes';
import { validateSingle, validateAll } from './utils/validation';
import Widget from './Widget';
import Buttons from './fields/Button/Buttons.component';import { getValue, mutateValue } from './utils/properties';
import { removeError, addError } from './utils/errors';
import getLanguage from './lang';

export default class UIForm extends React.Component {
	static displayName = 'TalendUIForm';
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema } = props;
		if (Object.keys(jsonSchema).length) {
			this.state = merge(jsonSchema, uiSchema);
		} else {
			this.state = {};
		}
		this.onChange = this.onChange.bind(this);
		this.onFinish = this.onFinish.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
		this.onActionClick = this.onActionClick.bind(this);
		// control the tv4 language here.
		if (!tv4.language('@talend')) {
			tv4.addLanguage('@talend', props.language);
			tv4.language('@talend'); // set it
		}
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
		if (Object.keys(jsonSchema).length) {
			this.setState(merge(jsonSchema, uiSchema));
		}
	}

	/**
	 * Fire onChange callback while interacting with form fields
	 * @param event The event that triggered the callback
	 * @param schema The payload field schema
	 * @param value The payload new value
	 */
	onChange(event, { schema, value }) {
		const newProperties = mutateValue(this.props.properties, schema, value);
		this.props.onChange(event, {
			schema,
			value,
			oldProperties: this.props.properties,
			properties: newProperties,
			formData: newProperties,
		});
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
			newValue = getValue(this.props.properties, schema);
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
			errors = addError(this.props.errors, schema, valueError);
		} else {
			errors = removeError(this.props.errors, schema);
		}
		if (widgetChangeErrors) {
			errors = widgetChangeErrors(errors);
		}
		this.props.setErrors(event, errors);

		if (!valueError && schema.triggers && schema.triggers.length) {
			let formData = this.props.properties;
			if (value !== undefined) {
				formData = mutateValue(formData, schema, value);
			}
			let propertyName = schema.key.join('.');
			if (this.props.moz) {
				schema.key.forEach((key, index) => {
					if (index !== schema.key.length - 1) {
						formData = formData[key];
					}
				});
				propertyName = schema.key[schema.key.length - 1];
				this.onTrigger(event, { formData, formId: this.props.id, propertyName, value });
			} else {
				this.onTrigger(event, { trigger: schema.triggers[0], schema, properties: formData });
			}
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
		const { onTrigger } = this.props;
		if (!onTrigger) {
			return null;
		}

		if (this.props.moz) {
			return onTrigger(payload.formData, payload.formId, payload.propertyName, payload.value);
		}
		return onTrigger(event, {
			properties: this.props.properties,
			...payload,
		});
	}

	onActionClick(actionOnClick) {
		if (typeof actionOnClick === 'function') {
			return (event, data) =>
				actionOnClick(event, {
					...data,
					formData: this.props.properties,
					properties: this.props.properties,
				});
		}
		return () => {};
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
		const { properties, customValidation } = this.props;
		const errors = validateAll(mergedSchema, properties, customValidation);
		this.props.setErrors(event, errors);

		const isValid = !Object.keys(errors).length;
		if (this.props.onSubmit && isValid) {
			if (this.props.moz) {
				this.props.onSubmit({ formData: properties });
			} else {
				this.props.onSubmit(event, properties);
			}
		}
		return isValid;
	}

	render() {
		const actions = this.props.actions || [
			{
				bsStyle: 'primary',
				label: 'Submit',
				type: 'submit',
				widget: 'button',
			},
		];
		if (!this.state.mergedSchema) {
			return null;
		}
		return (
			<form
				acceptCharset={this.props.acceptCharset}
				action={this.props.action}
				autoComplete={this.props.autoComplete}
				className={classNames('tf-uiform', this.props.className)}
				encType={this.props.encType}
				id={this.props.id}
				method={this.props.method}
				name={this.props.name}
				noValidate={this.props.noHtml5Validate}
				onReset={this.props.onReset}
				onSubmit={this.onSubmit}
				target={this.props.target}
			>
				{this.state.mergedSchema.map((nextSchema, index) => (
					<Widget
						id={this.props.id}
						key={index}
						onChange={this.onChange}
						onFinish={this.onFinish}
						onTrigger={this.onTrigger}
						schema={nextSchema}
						properties={this.props.properties}
						errors={this.props.errors}
						widgets={Object.assign({}, this.props.widgets, this.state.widgets)}
					/>
				))}
				{this.props.children}
				<Buttons
					id={`${this.props.id}-${this.props.id}-actions`}
					onTrigger={this.onTrigger}
					className={this.props.buttonBlockClass}
					schema={{ items: actions }}
					onClick={this.onActionClick}
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
		 * Prototype: function onTrigger(event, { trigger, schema, properties })
		 */
		onTrigger: PropTypes.func,
		/** Custom widgets */
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types

		/** State management impl: The change callback */
		onChange: PropTypes.func.isRequired,
		/** State management impl: Set All fields validations errors */
		setErrors: PropTypes.func,
	};
}

UIForm.defaultProps = {
	noHtml5Validate: true,
	buttonBlockClass: 'form-actions',
	properties: {},
	language: getLanguage(),
};
