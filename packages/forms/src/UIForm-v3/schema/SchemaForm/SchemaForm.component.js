import React from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form';
import useSchemaForm from './useSchemaForm';
import Widget from '../Widget';
import TemplateForm from './TemplateForm.component';
import TemplateDefinition from './TemplateDefinition.component';

export default function SchemaForm({
	customFormats,
	customValidation,
	data,
	displayMode,
	language,
	onChange,
	onSubmit,
	onTrigger,
	templates,
	widgets,
	...restProps
}) {
	const { properties } = data;
	const { mergedSchema } = useSchemaForm(data);
	const rhf = useForm({ mode: 'onBlur', defaultValues: properties });
	/*
	const allValue = rhf.watch();
	console.log(allValue);
	const onValueChange =
		onChange &&
		((event, payload) => {
			const currentProperties = rhf.getValues({ nest: true });
			return onChange(event, {
				...payload,
				properties: currentProperties,
				// for code compatibility. Should be removed in the future
				formData: currentProperties,
			});
		});
*/
	const contextValue = {
		customFormats,
		customValidation,
		displayMode,
		language,
		//onChange: onValueChange,
		onTrigger,
		templates,
		widgets,
	};

	const SchemaFormTemplate = displayMode ? TemplateDefinition : TemplateForm;
	return (
		<FormContext {...contextValue} {...rhf}>
			<SchemaFormTemplate
				{...restProps}
				onSubmit={rhf.handleSubmit((payload, event) => onSubmit(event, payload))}
			>
				{mergedSchema &&
					mergedSchema.map((widgetSchema, index) => (
						<Widget key={index} id={restProps.id} schema={widgetSchema} />
					))}
			</SchemaFormTemplate>
		</FormContext>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SchemaForm.propTypes = {
		customFormats: PropTypes.object,
		customValidation: PropTypes.func,
		data: PropTypes.shape({
			jsonSchema: PropTypes.object,
			uiSchema: PropTypes.array,
			properties: PropTypes.object,
		}),
		displayMode: PropTypes.string,
		id: PropTypes.string.isRequired,
		language: PropTypes.object,
		onChange: PropTypes.func,
		onSubmit: PropTypes.func,
		onTrigger: PropTypes.func,
		templates: PropTypes.object,
		widgets: PropTypes.object,
	};
}
