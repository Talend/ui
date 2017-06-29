import React, { PropTypes } from 'react';

import {
	defaultFieldValue,
	getWidget,
	getUiOptions,
	optionsList,
	getDefaultRegistry,
} from 'react-jsonschema-form/lib/utils';
import Toggle from 'react-talend-components/lib/Toggle';


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
		onBlur,
	} = props;
	const { title } = schema;
	const { widgets, formContext } = registry;
	const widget = uiSchema['ui:widget'];
	const uiOptions = getUiOptions(uiSchema);
	const onChangeHandler = () => {
		onChange(!formData, uiOptions);
	};
	const onBlurHandler = () => {
		if (onBlur) {
			onBlur(idSchema && idSchema.$id, formData);
		}
	};
	const commonProps = {
		schema,
		id: idSchema && idSchema.$id,
		onChange: onChangeHandler,
		onBlur: onBlurHandler,
		label: (title === undefined) ? name : title,
		value: defaultFieldValue(formData, schema),
		checked: defaultFieldValue(formData, schema),
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
	return <Toggle options={buildOptions(schema)} {...commonProps} />;
}

if (process.env.NODE_ENV !== 'production') {
	BooleanField.propTypes = {
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object,
		idSchema: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func,
		name: PropTypes.string,
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
