import React, { PropTypes } from 'react';

import {
	defaultFieldValue,
	getWidget,
	optionsList,
	getUiOptions,
	getDefaultRegistry,
} from 'react-jsonschema-form/lib/utils';
import CheckboxWidget from 'react-jsonschema-form/lib/components/widgets/CheckboxWidget';


function buildOptions(schema) {
	return {
		enumOptions: optionsList(Object.assign({
			enumNames: ['true', 'false'],
			enum: [true, false],
		}, { enumNames: schema.enumNames })),
	};
}

function BooleanField(props) {
	const {
		schema,
		name,
		uiSchema,
		idSchema,
		formData,
		registry,
		required,
		disabled,
		readonly,
		onChange,
	} = props;
	const { title } = schema;
	const { widgets, formContext } = registry;
	const widget = uiSchema['ui:widget'];
	const uiOptions = getUiOptions(uiSchema);
	const onChangeHandler = (value) => {
		onChange(value, uiOptions);
	};
	const commonProps = {
		schema,
		id: idSchema && idSchema.$id,
		onChange: onChangeHandler,
		label: (title === undefined) ? name : title,
		value: defaultFieldValue(formData, schema),
		required,
		disabled,
		readonly,
		registry,
		formContext,
	};
	if (widget) {
		const Widget = getWidget(schema, widget, widgets);
		return <Widget options={buildOptions(schema)} {... commonProps} />;
	}
	return <CheckboxWidget {...commonProps} />;
}

if (process.env.NODE_ENV !== 'production') {
	BooleanField.propTypes = {
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object,
		idSchema: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		formData: PropTypes.bool,
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		registry: PropTypes.shape({
			widgets: PropTypes.objectOf(PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.object,
			])).isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			definitions: PropTypes.object.isRequired,
			formContext: PropTypes.object.isRequired,
		}),
	};
}

BooleanField.defaultProps = {
	uiSchema: {},
	registry: getDefaultRegistry(),
	disabled: false,
	readonly: false,
};

export default BooleanField;
