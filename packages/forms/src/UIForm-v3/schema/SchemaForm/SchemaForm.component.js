import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import useSchemaForm from './useSchemaForm';
import Widget from '../Widget.component';

export default function SchemaForm({ customValidation, data, onSubmit, widgets, ...restProps }) {
	const { properties } = data;
	const { mergedSchema } = useSchemaForm(data);
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur', defaultValues: properties });

	return (
		<form
			onSubmit={handleSubmit((payload, event) => onSubmit(event, payload))}
			noValidate
			{...restProps}
		>
			{mergedSchema &&
				mergedSchema.map((widgetSchema, index) => (
					<Widget
						customValidation={customValidation}
						index={index}
						id={restProps.id}
						rhf={rhf}
						schema={widgetSchema}
						widgets={widgets}
					/>
				))}
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
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
		id: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
		rhf: PropTypes.object.isRequired,
		widgets: PropTypes.object,
	};
}
