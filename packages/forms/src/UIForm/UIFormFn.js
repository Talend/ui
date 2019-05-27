import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tv4 from 'tv4';
import { translate } from 'react-i18next';

import merge from './merge';
import theme from './UIForm.scss';
import Widget from './Widget';
import Buttons from './fields/Button/Buttons.component';
import { DefaultFormTemplate, TextModeFormTemplate } from './FormTemplate';
import { getValue, mutateValue } from './utils/properties';
import { validateSingle, validateAll } from './utils/validation';
import { removeError, addError } from './utils/errors';
import getLanguage from './lang';
import customFormats from './customFormats';

import { I18N_DOMAIN_FORMS } from '../constants';

/**
 * Add error object if it doesn't exist
 */
function addErrorObject(data) {
	if (!data.errors) {
		return { errors: {}, ...data };
	}
	return data;
}

function UIForm(props) {
	const {
		actions,
		buttonBlockClass = 'form-actions',
		children,
		className,
		customFormats: userCustomFormat,
		customValidation,
		data,
		displayMode,
		getComponent,
		id,
		initialData,
		language,
		moz,
		noHtml5Validate,
		onChange,
		onErrors,
		onReset,
		onSubmit,
		onSubmitEnter,
		onSubmitLeave,
		onTrigger,
		t,
		tReady,
		templates,
		updating,
		widgets,
		...rest
	} = props;

	const formRef = useRef();
	const [initial, setInitial] = useState({});
	const [live, setLive] = useState({});
	const [lastAction, setLastAction] = useState();
	const { widgets: migratedWidgets, mergedSchema = [] } = useMemo(
		() => merge(live.jsonSchema, live.uiSchema),
		[live.jsonSchema, live.uiSchema],
	);
	const mergedWidgets = useMemo(
		() => ({
			...migratedWidgets,
			...widgets,
		}),
		[migratedWidgets, widgets],
	);

	useEffect(
		() => {
			// control the tv4 language here.
			const mergedLanguage = getLanguage(t);
			if (language != null) {
				Object.assign(mergedLanguage, language);
				// Force update of language @talend even if already set
				tv4.addLanguage('@talend', mergedLanguage);
				tv4.language('@talend');
			}
			if (!tv4.language('@talend')) {
				tv4.addLanguage('@talend', mergedLanguage);
				tv4.language('@talend'); // set it
			}
			const allFormats = Object.assign(customFormats(t), userCustomFormat);
			tv4.addFormat(allFormats);
		},
		[t],
	);

	useEffect(
		() => {
			if (!initialData) {
				return;
			}
			const withDefaultError = addErrorObject(initialData);
			setInitial(withDefaultError);
			setLive(withDefaultError);
		},
		[initialData],
	);

	useEffect(
		() => {
			if (!data) {
				return;
			}
			const withDefaultError = addErrorObject(data);
			setLive(withDefaultError);
			if (!initialData) {
				setInitial(withDefaultError);
			}
		},
		[data],
	);

	useEffect(
		() => {
			if (live.errors && lastAction === 'submit') {
				const elementWithError = formRef.current.querySelector('[aria-invalid="true"]');
				if (elementWithError) {
					elementWithError.focus();
				}
			}
		},
		[lastAction, live.errors],
	);

	function handleErrors(event, newErrors, origin) {
		setLive(oldLive => ({ ...oldLive, errors: newErrors }));
		setLastAction(origin);
		if (onErrors) {
			onErrors(event, newErrors);
		}
	}

	function handleChange(event, { schema, value }) {
		const newProperties = mutateValue(live.properties, schema, value);

		if (newProperties !== live.properties) {
			setLive(oldLive => ({ ...oldLive, properties: newProperties }));

			if (onChange) {
				onChange(event, {
					schema,
					value,
					oldProperties: live.properties,
					properties: newProperties,
					formData: newProperties,
				});
			}
		}
	}

	const handleTrigger = (event, payload) => {
		if (!onTrigger) {
			return null;
		}

		let triggerPromise;
		if (moz) {
			triggerPromise = onTrigger(
				payload.formData,
				payload.formId,
				payload.propertyName,
				payload.value,
			);
		} else {
			if (!payload.trigger) {
				throw new Error('onTrigger payload do not have required trigger property');
			}
			triggerPromise = onTrigger(event, {
				properties: live.properties,
				errors: live.errors,
				...payload,
			});
		}

		return triggerPromise.then(triggerResult => {
			const { errors, properties } = triggerResult;
			if (errors) {
				setLive(oldLive => ({
					...oldLive,
					errors: typeof errors === 'function' ? errors(live.errors) : errors,
				}));
			}
			if (properties) {
				const adaptedProperties =
					typeof properties === 'function' ? properties(live.properties) : properties;
				handleChange(event, {
					...payload,
					properties: adaptedProperties,
					formData: adaptedProperties,
				});
			}
			return triggerResult;
		});
	};

	function handleFinish(
		event,
		{ schema, value },
		{ deepValidation = false, widgetChangeErrors } = {},
	) {
		// get property value
		let newValue;
		if (value !== undefined) {
			newValue = value;
		} else {
			newValue = getValue(live.properties, schema);
		}
		// validate value. This validation can be deep if schema is an object or an array
		const widgetErrors = validateSingle(
			schema,
			newValue,
			live.properties,
			customValidation,
			deepValidation,
		);
		const hasErrors = Object.values(widgetErrors).find(Boolean);

		// update errors map
		let errors = Object.entries(widgetErrors).reduce((accu, [errorKey, errorValue]) => {
			const errorSchema = { key: errorKey };
			return errorValue ? addError(accu, errorSchema, errorValue) : removeError(accu, errorSchema);
		}, live.errors);

		// widget error modifier
		if (widgetChangeErrors) {
			errors = widgetChangeErrors(errors);
		}

		// commit errors
		if (errors !== live.errors) {
			handleErrors(event, errors, 'finish');
		}

		if (!hasErrors && schema.triggers && schema.triggers.length) {
			let formData = live.properties;
			if (value !== undefined) {
				formData = mutateValue(formData, schema, value);
			}
			let propertyName = schema.key.join('.');
			if (moz) {
				schema.key.forEach((key, index) => {
					if (index !== schema.key.length - 1) {
						formData = formData[key];
					}
				});
				propertyName = schema.key[schema.key.length - 1];
				handleTrigger(event, { formData, formId: id, propertyName, value });
			} else {
				const trigger = schema.triggers.find(t => t.onEvent === undefined);
				if (trigger) {
					handleTrigger(event, {
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

	function handleReset(event) {
		setLive(initial);
		if (onReset) {
			onReset(event);
		}
	}

	function handleSubmit(event) {
		if (onSubmit) {
			event.preventDefault();
		}

		const newErrors = validateAll(mergedSchema, live.properties, customValidation);
		Object.entries(live.errors)
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
		if (isValid) {
			setInitial(live);
			if (onSubmit) {
				if (moz) {
					onSubmit(null, { formData: live.properties });
				} else {
					onSubmit(event, live.properties, mergedSchema);
				}
			}
		} else {
			handleErrors(event, errors, 'submit');
		}

		return isValid;
	}

	// TODO move handleActionClick to Buttons and use context to get properties
	function handleActionClick(actionOnClick) {
		if (typeof actionOnClick === 'function') {
			return (event, payload) =>
				actionOnClick(event, {
					...payload,
					formData: live.properties,
					properties: live.properties,
				});
		}
		return () => {};
	}

	const formTemplate = displayMode === 'text' ? TextModeFormTemplate : DefaultFormTemplate;

	function widgetsRenderer() {
		return mergedSchema.map((nextSchema, index) => (
			<Widget
				id={id}
				key={nextSchema.key || index}
				onChange={handleChange}
				onFinish={handleFinish}
				onTrigger={handleTrigger}
				schema={nextSchema}
				properties={live.properties}
				errors={live.errors}
				templates={templates}
				widgets={mergedWidgets}
				displayMode={displayMode}
				updating={updating}
			/>
		));
	}

	function buttonsRenderer() {
		const buttonsSchemas = actions || [
			{
				bsStyle: 'primary',
				label: 'Submit',
				type: 'submit',
				widget: 'button',
				position: 'right',
				onMouseEnter: onSubmitEnter && (event => onSubmitEnter(event, live.properties)),
				onMouseLeave: onSubmitLeave,
			},
		];
		if (buttonsSchemas.length === 0) {
			return null;
		}
		return (
			<div className={classnames(theme['form-actions'], 'tf-actions-wrapper')} key="form-buttons">
				<Buttons
					id={`${id}-actions`}
					onTrigger={handleTrigger}
					className={buttonBlockClass}
					schema={{ items: buttonsSchemas }}
					onClick={handleActionClick}
					getComponent={getComponent}
				/>
			</div>
		);
	}

	return (
		<form
			{...rest}
			id={id}
			className={classnames('tf-uiform', theme.uiform, className)}
			noValidate={noHtml5Validate}
			onReset={handleReset}
			onSubmit={handleSubmit}
			ref={formRef}
		>
			{formTemplate({ children, widgetsRenderer, buttonsRenderer })}
		</form>
	);
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		/**
		 * Buttons block schemas
		 */
		actions: PropTypes.array,
		/**
		 * Buttons block classname
		 */
		buttonBlockClass: PropTypes.string,
		/**
		 * Elements to insert before the buttons block
		 */
		children: PropTypes.element,
		/**
		 * Form custom classname
		 */
		className: PropTypes.string,
		/**
		 * User custom formats for validationn
		 */
		customFormats: PropTypes.object,
		/**
		 * User callback: Custom validation function.
		 * Prototype: function customValidation(schema, value, properties)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/**
		 * Injection point used in buttons
		 */
		getComponent: PropTypes.func,
		/**
		 * Unique identifier
		 */
		id: PropTypes.string.isRequired,
		/**
		 * if initial data is present set initial state with it
		 * if not use juste data
		 * if initial data update
		 * update initialData and liveData with it
		 */
		initialData: PropTypes.shape({
			/** Json schema that specify the data model */
			jsonSchema: PropTypes.object,
			/** UI schema that specify how to render the fields */
			uiSchema: PropTypes.array,
			/**
			 * Form fields values.
			 * Note that it should contains @definitionName for triggers.
			 */
			properties: PropTypes.object,
			/**
			 * Form fields errors.
			 */
			errors: PropTypes.object,
		}),
		/** Form schema configuration */
		data: PropTypes.shape({
			/** Json schema that specify the data model */
			jsonSchema: PropTypes.object,
			/** UI schema that specify how to render the fields */
			uiSchema: PropTypes.array,
			/**
			 * Form fields values.
			 * Note that it should contains @definitionName for triggers.
			 */
			properties: PropTypes.object,
			/**
			 * Form fields errors.
			 */
			errors: PropTypes.object,
		}),
		/** Display mode: example 'text' */
		displayMode: PropTypes.string,
		/** Translations */
		language: PropTypes.object,
		/** Form definition: prevent html 5 validations */
		noHtml5Validate: PropTypes.bool,
		/**
		 * The change callback.
		 * Prototype: function onChange(event, { schema, value, properties })
		 */
		onChange: PropTypes.func,
		/**
		 * The errors callback.
		 * Prototype: function onErrors(event, errors)
		 */
		onErrors: PropTypes.func,
		/** Form definition: reset callback */
		onReset: PropTypes.func,
		/** Form definition: submit callback. This will prevent default submit behavior */
		onSubmit: PropTypes.func,
		/** Form definition: submit button hover callback */
		onSubmitEnter: PropTypes.func,
		/** Form definition: submit button hover end callback */
		onSubmitLeave: PropTypes.func,
		/**
		 * Trigger callback.
		 * Prototype: function onTrigger(event, { trigger, schema, properties })
		 */
		onTrigger: PropTypes.func,
		/** i18next translate function */
		t: PropTypes.func,
		/** Custom templates */
		templates: PropTypes.object,
		/** Keys that are in updating state */
		updating: PropTypes.array,
		/** Custom widgets */
		widgets: PropTypes.object,
	};
}

export default translate(I18N_DOMAIN_FORMS)(UIForm);
