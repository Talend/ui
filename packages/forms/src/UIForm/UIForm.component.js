import React, { createRef } from 'react';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import tv4 from 'tv4';
import memoizeOne from 'memoize-one';
import omit from 'lodash/omit';

import customFormats from './customFormats';
import getLanguage from './lang';
import merge from './merge';
import formTemplates from './utils/formTemplates';
import UIFormPropTypes from './UIForm.propTypes';
import { UIFormContext } from './context';
import { I18N_DOMAIN_FORMS } from '../constants';

import theme from './UIForm.scss';
import Widget from './Widget';
import Buttons from './fields/Button/Buttons.component';
import defaultWidgets from './utils/widgets';
import defaultTemplates from './utils/templates';
import { getValue, mutateValue } from './utils/properties';
import { validateAll, validateSingle } from './utils/validation';
import { reconciliateAllErrors, reconciliateSingleErrors } from './utils/errors';

function addErrorObject(data) {
	if (!data.errors) {
		return { errors: {}, ...data };
	}
	return data;
}

const mergeWidgets = memoizeOne((compatWidgets, userWigets) => ({
	...defaultWidgets,
	...compatWidgets,
	...userWigets,
}));
const mergeTemplates = memoizeOne(userTemplates => ({
	...defaultTemplates,
	...userTemplates,
}));
const mergeSchema = memoizeOne(merge);

class UIForm extends React.Component {
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema } = this.props.data || this.props.initialData;

		let widgets;
		let mergedSchema;
		if (Object.keys(jsonSchema).length) {
			const mergeResult = merge(jsonSchema, uiSchema);
			mergedSchema = mergeResult.mergedSchema;
			widgets = mergeWidgets(mergeResult.widgets, props.widgets);
		}
		this.state = {
			initial: addErrorObject(this.props.initialData || this.props.data),
			live: addErrorObject(this.props.data || this.props.initialData),
			templates: mergeTemplates(props.templates),
			mergedSchema,
			widgets,
		};
		this.formRef = createRef();
		this.initLanguage();

		this.onChange = this.onChange.bind(this);
		this.onFinish = this.onFinish.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onErrors = this.onErrors.bind(this);

		this.renderWidgets = this.renderWidgets.bind(this);
		this.renderButtons = this.renderButtons.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const nextDerivedState = {};

		if (nextProps.data !== this.props.data) {
			nextDerivedState.live = addErrorObject(nextProps.data);
		}
		if (nextProps.initialData !== this.props.initialData) {
			nextDerivedState.initial = addErrorObject(nextProps.initialData);
			nextDerivedState.live = nextDerivedState.initial;
		}

		if (nextDerivedState.live) {
			const { mergedSchema = [], widgets: compatWidgets } = mergeSchema(
				nextDerivedState.live.jsonSchema,
				nextDerivedState.live.uiSchema,
			);
			nextDerivedState.mergedSchema = mergedSchema;
			nextDerivedState.widgets = mergeWidgets(compatWidgets, nextProps.widgets);
		}

		return Object.keys(nextDerivedState).length ? nextDerivedState : null;
	}

	// eslint-disable-next-line react/sort-comp
	initLanguage() {
		const { language, customFormats: userCustomFormats, t } = this.props;

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
		const allFormats = Object.assign(customFormats(t), userCustomFormats);
		tv4.addFormat(allFormats);
	}

	onErrors(event, newErrors, origin) {
		this.setState(
			oldState => ({
				...oldState,
				live: {
					...oldState.live,
					errors: typeof newErrors === 'function' ? newErrors(oldState.live.errors) : newErrors,
				},
			}),
			() => {
				if (origin !== 'submit') {
					return;
				}
				const elementWithError = this.formRef.current.querySelector('[aria-invalid="true"]');
				if (elementWithError) {
					elementWithError.focus();
				}
			},
		);
	}

	handleNewProperties(event, { schema, value, properties }) {
		const oldProperties = this.state.live.properties;
		this.setState(
			oldState => ({
				...oldState,
				live: {
					...oldState.live,
					properties:
						typeof properties === 'function' ? properties(oldState.live.properties) : properties,
				},
			}),
			() => {
				if (!this.props.onChange) {
					return;
				}
				this.props.onChange(event, {
					schema,
					value,
					oldProperties,
					properties: this.state.live.properties,
					formData: this.state.live.properties,
				});
			},
		);
	}
	onChange(event, { schema, value }) {
		this.handleNewProperties(event, {
			schema,
			value,
			properties: oldProperties => mutateValue(oldProperties, schema, value),
		});
	}

	onFinish(event, { schema, value }, { deepValidation = false, widgetChangeErrors } = {}) {
		// get property value
		const newValue = value === undefined ? getValue(this.state.live.properties, schema) : value;

		// validate value. This validation can be deep if schema is an object or an array
		const widgetErrors = validateSingle(
			schema,
			newValue,
			this.state.live.properties,
			this.props.customValidation,
			deepValidation,
		);
		const hasErrors = Object.values(widgetErrors).find(Boolean);
		let errors = reconciliateSingleErrors(this.state.live.errors, widgetErrors);

		// widget error modifier
		if (widgetChangeErrors) {
			errors = widgetChangeErrors(errors);
		}

		// commit errors
		if (errors !== this.state.live.errors) {
			this.onErrors(event, errors, 'finish');
		}

		// legacy compatibility: trigger "after" is determined by onEvent = undefined
		// and is run on widget finish
		if (!hasErrors && schema.triggers && schema.triggers.length) {
			let formData = this.state.live.properties;
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
				const trigger = schema.triggers.find(trig => trig.onEvent === undefined);
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

	onTrigger(event, payload) {
		if (!this.props.onTrigger) {
			return null;
		}

		const updateUIFormData = triggerResult => {
			const { errors, properties } = triggerResult;
			if (errors) {
				this.onErrors(event, errors, 'trigger');
			}
			if (properties) {
				this.handleNewProperties(event, { ...payload, properties });
			}
			return triggerResult;
		};

		if (this.props.moz) {
			this.props
				.onTrigger(payload.formData, payload.formId, payload.propertyName, payload.value)
				.then(updateUIFormData);
		}

		if (!payload.trigger) {
			throw new Error('onTrigger payload do not have required trigger property');
		}
		return this.props
			.onTrigger(event, {
				properties: this.state.live.properties,
				errors: this.state.live.errors,
				...payload,
			})
			.then(updateUIFormData);
	}

	onReset(event) {
		this.setState(oldState => ({
			...oldState,
			live: oldState.initial,
		}));
		if (this.props.onReset) {
			this.props.onReset(event);
		}
	}

	onSubmit(event) {
		if (this.props.onSubmit) {
			event.preventDefault();
		}

		const newErrors = validateAll(
			this.state.mergedSchema,
			this.state.live.properties,
			this.props.customValidation,
		);
		const errors = reconciliateAllErrors(this.state.live.errors, newErrors);
		const isValid = !Object.keys(errors).length;
		if (isValid) {
			this.setState(oldState => ({
				...oldState,
				initial: oldState.live,
			}));
			if (this.props.onSubmit) {
				if (this.props.moz) {
					this.props.onSubmit(null, { formData: this.state.live.properties });
				} else {
					this.props.onSubmit(event, this.state.live.properties, this.state.mergedSchema);
				}
			}
		} else {
			this.onErrors(event, errors, 'submit');
		}

		return isValid;
	}

	renderWidgets() {
		return this.state.mergedSchema.map((nextSchema, index) => (
			<Widget key={nextSchema.key || index} schema={nextSchema} />
		));
	}

	renderButtons() {
		const {
			actions,
			buttonBlockClass = 'form-actions',
			getComponent,
			id,
			onSubmitEnter,
			onSubmitLeave,
		} = this.props;
		const buttonsSchemas = actions || [
			{
				bsStyle: 'primary',
				label: 'Submit',
				type: 'submit',
				widget: 'button',
				position: 'right',
				onMouseEnter: onSubmitEnter && (event => onSubmitEnter(event, this.state.live.properties)),
				onMouseLeave: onSubmitLeave,
			},
		];
		if (buttonsSchemas.length === 0) {
			return null;
		}

		// TODO move handleActionClick to Buttons and use context to get properties
		function handleActionClick(actionOnClick) {
			if (typeof actionOnClick === 'function') {
				return (event, payload) =>
					actionOnClick(event, {
						...payload,
						formData: this.state.live.properties,
						properties: this.state.live.properties,
					});
			}
			return () => {};
		}
		return (
			<div className={classnames(theme['form-actions'], 'tf-actions-wrapper')} key="form-buttons">
				<Buttons
					id={`${id}-actions`}
					onTrigger={this.onTrigger}
					className={buttonBlockClass}
					schema={{ items: buttonsSchemas }}
					onClick={handleActionClick}
					getComponent={getComponent}
				/>
			</div>
		);
	}

	render() {
		if (!this.state.mergedSchema) {
			return null;
		}

		const {
			children,
			className,
			displayMode,
			id,
			noHtml5Validate,
			noValidate,
			updating,
		} = this.props;
		const formProps = {
			...omit(this.props, [
				'actions',
				'buttonBlockClass',
				'children',
				'className',
				'customFormats',
				'customValidation',
				'data',
				'displayMode',
				'getComponent',
				'i18n',
				'initialData',
				'language',
				'moz',
				'onChange',
				'onErrors',
				'onReset',
				'onSubmit',
				'onSubmitEnter',
				'onSubmitLeave',
				'onTrigger',
				't',
				'tReady',
				'templates',
				'widgets',
			]),
			className: classnames('tf-uiform', theme.uiform, className),
			noValidate: noValidate || noHtml5Validate,
			onReset: this.onReset,
			onSubmit: this.onSubmit,
		};

		const contextValue = {
			displayMode,
			id,
			onChange: this.onChange,
			onFinish: this.onFinish,
			onTrigger: this.onTrigger,
			state: {
				errors: this.state.live.errors,
				properties: this.state.live.properties,
			},
			templates: this.state.templates,
			widgets: this.state.widgets,
			updating,
		};
		const FormTemplate = formTemplates[displayMode] || formTemplates.default;

		return (
			<UIFormContext.Provider value={contextValue}>
				<FormTemplate
					formProps={formProps}
					renderWidgets={this.renderWidgets}
					renderButtons={this.renderButtons}
					formRef={this.formRef}
				>
					{children}
				</FormTemplate>
			</UIFormContext.Provider>
		);
	}
}

UIForm.displayName = 'UIForm';

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = UIFormPropTypes;
}

export default translate(I18N_DOMAIN_FORMS)(UIForm);
