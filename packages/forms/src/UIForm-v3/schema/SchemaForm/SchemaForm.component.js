import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import useSchemaForm from './useSchemaForm';
import Widget from '../Widget';
import SchemaFormContext from '../context';

export default function SchemaForm({
	customFormats,
	customValidation,
	data,
	displayMode,
	language,
	onSubmit,
	onTrigger,
	templates,
	widgets,
	...restProps
}) {
	const { properties } = data;
	const { mergedSchema } = useSchemaForm(data);
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur', defaultValues: properties });
	const contextValue = {
		customFormats,
		customValidation,
		displayMode,
		language,
		onTrigger,
		rhf,
		templates,
		widgets,
	};

	return (
		<SchemaFormContext.Provider value={contextValue}>
			<form
				onSubmit={handleSubmit((payload, event) => onSubmit(event, payload))}
				noValidate
				{...restProps}
			>
				{mergedSchema &&
					mergedSchema.map((widgetSchema, index) => (
						<Widget key={index} id={restProps.id} schema={widgetSchema} />
					))}
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</SchemaFormContext.Provider>
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
		onSubmit: PropTypes.func.isRequired,
		onTrigger: PropTypes.func,
		templates: PropTypes.object,
		widgets: PropTypes.object,
	};
}
