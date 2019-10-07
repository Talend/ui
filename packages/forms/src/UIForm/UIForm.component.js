import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import tv4 from 'tv4';
import { withTranslation } from 'react-i18next';

import { DefaultFormTemplate, TextModeFormTemplate } from './FormTemplate';
import merge from './merge';
import { formPropTypes } from './utils/propTypes';
import { validateSingle, validateAll } from './utils/validation';
import Widget from './Widget';
import Buttons from './fields/Button/Buttons.component';
import { getValue, mutateValue } from './utils/properties';
import { removeError, addError } from './utils/errors';
import getLanguage from './lang';
import customFormats from './customFormats';
import { I18N_DOMAIN_FORMS } from '../constants';
import '../translate';
import theme from './UIForm.scss';

export class UIFormComponent extends React.Component {
	static displayName = 'TalendUIForm';
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema } = props;

		const state = {};
		if (Object.keys(jsonSchema).length) {
			Object.assign(state, merge(jsonSchema, uiSchema));
		}
		state.widgets = { ...state.widgets, ...props.widgets };
		this.state = state;

		this.onChange = this.onChange.bind(this);
		this.onFinish = this.onFinish.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
		this.onActionClick = this.onActionClick.bind(this);
		this.focusFirstError = this.focusFirstError.bind(this);
		this.setFormRef = this.setFormRef.bind(this);
		// control the tv4 language here.
		const language = getLanguage(props.t);
		if (props.language != null) {
			Object.assign(language, props.language);
			// Force update of language @talend even if already set
			tv4.addLanguage('@talend', language);
			tv4.language('@talend');
		}
		if (!tv4.language('@talend')) {
			tv4.addLanguage('@talend', language);
			tv4.language('@talend'); // set it
		}
		const allFormats = Object.assign(customFormats(props.t), props.customFormats);
		tv4.addFormat(allFormats);
	}

	/**
	 * Update the state with the new schema.
	 * @param jsonSchema
	 * @param uiSchema
	 */
	componentWillReceiveProps({ jsonSchema, uiSchema }) {
		if (
			!jsonSchema ||
			!uiSchema ||
			(this.props.jsonSchema === jsonSchema && this.props.uiSchema === uiSchema)
		) {
			return;
		}
		if (Object.keys(jsonSchema).length) {
			const merged = merge(jsonSchema, uiSchema);
			this.setState({
				...merged,
				widgets: {
					...merged.widgets,
					...this.props.widgets,
				},
			});
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
		// validate value. This validation can be deep if schema is an object or an array
		const widgetErrors = validateSingle(
			schema,
			newValue,
			this.props.properties,
			this.props.customValidation,
			deepValidation,
		);
		const hasErrors = Object.values(widgetErrors).find(Boolean);

		// update errors map
		let errors = Object.entries(widgetErrors).reduce((accu, [errorKey, errorValue]) => {
			const errorSchema = { key: errorKey };
			return errorValue ? addError(accu, errorSchema, errorValue) : removeError(accu, errorSchema);
		}, this.props.errors);

		// widget error modifier
		if (widgetChangeErrors) {
			errors = widgetChangeErrors(errors);
		}

		// commit errors
		this.props.setErrors(event, errors);

		if (!hasErrors && schema.triggers && schema.triggers.length) {
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
				const trigger = schema.triggers.find(t => t.onEvent === undefined);
				if (trigger) {
					this.onTrigger(event, {
						trigger,
						schema,
						properties: formData,
						errors,
						value,
					});
				}
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
		if (!payload.trigger) {
			throw new Error('onTrigger payload do not have required trigger property');
		}
		return onTrigger(event, {
			properties: this.props.properties,
			errors: this.props.errors,
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
		const newErrors = validateAll(mergedSchema, properties, customValidation);
		Object.entries(this.props.errors)
			.filter(entry => entry[0] in newErrors)
			.reduce((accu, [key, value]) => {
				// eslint-disable-next-line no-param-reassign
				accu[key] = value;
				return accu;
			}, newErrors);

		const errors = Object.entries(newErrors)
			.filter(entry => entry[1])
			.reduce((accu, [key, value]) => {
				// eslint-disable-next-line no-param-reassign
				accu[key] = value;
				return accu;
			}, {});

		const isValid = !Object.keys(errors).length;
		this.props.setErrors(event, errors, !isValid ? this.focusFirstError : undefined);

		if (this.props.onSubmit && isValid) {
			if (this.props.moz) {
				this.props.onSubmit(null, { formData: properties });
			} else {
				this.props.onSubmit(event, properties, mergedSchema);
			}
		}

		return isValid;
	}

	setFormRef(element) {
		this.formRef = element;
	}

	focusFirstError() {
		if (!this.formRef) {
			return;
		}

		const elementWithError = this.formRef.querySelector('[aria-invalid="true"]');

		if (elementWithError) {
			elementWithError.focus();
		}
	}

	render() {
		const { onSubmitEnter, onSubmitLeave, properties } = this.props;
		let actions = this.props.actions || [
			{
				bsStyle: 'primary',
				label: 'Submit',
				type: 'submit',
				widget: 'button',
				position: 'right',
			},
		];
		if (!this.state.mergedSchema) {
			return null;
		}

		if (onSubmitEnter) {
			actions = actions.map(action => {
				if (action.type === 'submit') {
					return {
						...action,
						onMouseEnter: event => onSubmitEnter(event, properties),
						onMouseLeave: onSubmitLeave,
					};
				}
				return action;
			});
		}

		const formTemplate =
			this.props.displayMode === 'text' ? TextModeFormTemplate : DefaultFormTemplate;
		const widgetsRenderer = () =>
			this.state.mergedSchema.map((nextSchema, index) => (
				<Widget
					id={this.props.id}
					key={index}
					onChange={this.onChange}
					onFinish={this.onFinish}
					onTrigger={this.onTrigger}
					schema={nextSchema}
					properties={this.props.properties}
					errors={this.props.errors}
					templates={this.props.templates}
					widgets={this.state.widgets}
					displayMode={this.props.displayMode}
					updating={this.props.updating}
				/>
			));
		const buttonsRenderer = () => {
			if (actions.length === 0) {
				return null;
			}

			return (
				<div className={classNames(theme['form-actions'], 'tf-actions-wrapper')} key="form-buttons">
					<Buttons
						id={`${this.props.id}-actions`}
						onTrigger={this.onTrigger}
						className={this.props.buttonBlockClass}
						schema={{ items: actions }}
						onClick={this.onActionClick}
						getComponent={this.props.getComponent}
					/>
				</div>
			);
		};

		return (
			<form
				acceptCharset={this.props.acceptCharset}
				action={this.props.action}
				autoComplete={this.props.autoComplete}
				className={classNames('tf-uiform', theme.uiform, this.props.className)}
				encType={this.props.encType}
				id={this.props.id}
				method={this.props.method}
				name={this.props.name}
				noValidate={this.props.noHtml5Validate}
				onReset={this.props.onReset}
				onSubmit={this.onSubmit}
				target={this.props.target}
				ref={this.setFormRef}
			>
				{formTemplate({ children: this.props.children, widgetsRenderer, buttonsRenderer })}
			</form>
		);
	}
}
const I18NUIForm = withTranslation(I18N_DOMAIN_FORMS)(UIFormComponent);

if (process.env.NODE_ENV !== 'production') {
	I18NUIForm.propTypes = {
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
		/*
		 * Form definition: Custom formats
		 */
		customFormats: PropTypes.object,
		/**
		 * User callback: Trigger
		 * Prototype: function onTrigger(event, { trigger, schema, properties })
		 */
		onTrigger: PropTypes.func,
		/** Custom templates */
		templates: PropTypes.object,
		/** Custom widgets */
		widgets: PropTypes.object,
		/** Display mode: example 'text' */
		displayMode: PropTypes.string,

		/** State management impl: The change callback */
		onChange: PropTypes.func.isRequired,
		/** State management impl: Set All fields validations errors */
		setErrors: PropTypes.func,
		getComponent: PropTypes.func,
		onSubmitEnter: PropTypes.func,
		onSubmitLeave: PropTypes.func,
	};
	UIFormComponent.propTypes = I18NUIForm.propTypes;
}

I18NUIForm.defaultProps = {
	noHtml5Validate: true,
	buttonBlockClass: 'form-actions',
	properties: {},
};
UIFormComponent.defaultProps = I18NUIForm.defaultProps;

export default I18NUIForm;
