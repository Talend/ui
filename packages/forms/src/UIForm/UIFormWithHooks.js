/* eslint-disable react/prop-types */

import React, { useMemo, useRef } from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import UIFormPropTypes from './UIForm.propTypes';
import Widget from './Widget';
import Buttons from './fields/Button/Buttons.component';
import useLanguageEffect from './hooks/useLanguageEffect';
import useUIForm, { UIFormContext } from './hooks/useUIForm';
import useUIFormHandlers from './hooks/useUIFormHandlers';

import { I18N_DOMAIN_FORMS } from '../constants';

import theme from './UIForm.scss';

function UIForm(props) {
	const {
		actions,
		buttonBlockClass = 'form-actions',
		children,
		className,
		customFormats,
		customValidation,
		data,
		displayMode,
		getComponent,
		i18n,
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
	useLanguageEffect({ customFormats, language, t });
	const uiForm = useUIForm({ initialData, data, templates, widgets });
	const {
		handleChange,
		handleTrigger,
		handleFinish,
		handleReset,
		handleSubmit,
	} = useUIFormHandlers({
		customValidation,
		formRef,
		id,
		onErrors,
		moz,
		onChange,
		onReset,
		onSubmit,
		onTrigger,
		uiForm,
	});

	const contextValue = useMemo(
		() => ({
			displayMode,
			id,
			onChange: handleChange,
			onFinish: handleFinish,
			onTrigger: handleTrigger,
			uiForm,
			updating,
		}),
		[displayMode, id, handleChange, handleFinish, handleTrigger, uiForm, updating],
	);
	const FormTemplate = uiForm.formTemplates[displayMode] || uiForm.formTemplates.default;
	function renderWidgets() {
		return uiForm.mergedSchema.map((nextSchema, index) => (
			<Widget key={nextSchema.key || index} schema={nextSchema} />
		));
	}
	function renderButtons() {
		const buttonsSchemas = actions || [
			{
				bsStyle: 'primary',
				label: 'Submit',
				type: 'submit',
				widget: 'button',
				position: 'right',
				onMouseEnter: onSubmitEnter && (event => onSubmitEnter(event, uiForm.state.properties)),
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
						formData: uiForm.state.properties,
						properties: uiForm.state.properties,
					});
			}
			return () => {};
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
		<UIFormContext.Provider value={contextValue}>
			<FormTemplate
				formProps={{
					...rest,
					id,
					className: classnames('tf-uiform', theme.uiform, className),
					noValidate: noHtml5Validate,
					onReset: handleReset,
					onSubmi: handleSubmit,
					formRef,
				}}
				renderWidgets={renderWidgets}
				renderButtons={renderButtons}
			>
				{children}
			</FormTemplate>
		</UIFormContext.Provider>
	);
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = UIFormPropTypes;
}

export default translate(I18N_DOMAIN_FORMS)(UIForm);
