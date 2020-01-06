import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import useSchemaForm from './useSchemaForm';
import Widget from '../Widget';
import SchemaFormContext from '../context';

export default function SchemaForm({
	customValidation,
	data,
	displayMode,
	onSubmit,
	onTrigger,
	widgets,
	...restProps
}) {
	const { properties } = data;
	const { mergedSchema } = useSchemaForm(data);
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur', defaultValues: properties });
	console.log('values', rhf.getValues());
	console.log('errors', rhf.errors);
	const contextValue = {
		customValidation,
		displayMode,
		onTrigger,
		rhf,
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
		customValidation: PropTypes.func,
		data: PropTypes.shape({
			jsonSchema: PropTypes.object,
			uiSchema: PropTypes.array,
			properties: PropTypes.object,
		}),
		displayMode: PropTypes.string,
		id: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
		onTrigger: PropTypes.func,
		widgets: PropTypes.object,
	};
}
