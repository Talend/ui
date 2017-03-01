import React, { PropTypes } from 'react';

import {
	getWidget,
	getUiOptions,
	optionsList,
	getDefaultRegistry,
} from 'react-jsonschema-form/lib/utils';


function StringField(props) {
	const {
		schema,
		name,
		uiSchema,
		idSchema,
		formData,
		required,
		disabled,
		readonly,
		autofocus,
		registry,
		onChange,
		onBlur,
	} = props;
	const { title, format } = schema;
	const { widgets, formContext } = registry;
	const enumOptions = Array.isArray(schema.enum) && optionsList(schema);
	const defaultWidget = format || (enumOptions ? 'select' : 'text');
	const { widget = defaultWidget, placeholder = '', ...options } = getUiOptions(uiSchema);
	const Widget = getWidget(schema, widget, widgets);

	const onChangeHandler = (value) => {
		onChange(value, options);
	};

	return (
		<Widget
			options={{ ...options, enumOptions }}
			schema={schema}
			id={idSchema && idSchema.$id}
			label={title === undefined ? name : title}
			value={formData}
			onChange={onChangeHandler}
			onBlur={onBlur}
			required={required}
			disabled={disabled}
			readonly={readonly}
			formContext={formContext}
			autofocus={autofocus}
			registry={registry}
			placeholder={placeholder}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	StringField.propTypes = {
		autofocus: PropTypes.bool,
		disabled: PropTypes.bool,
		formData: PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number,
		]),
		idSchema: PropTypes.object,
		name: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
		readonly: PropTypes.bool,
		registry: PropTypes.shape({
			definitions: PropTypes.object.isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			formContext: PropTypes.object.isRequired,
			widgets: PropTypes.objectOf(PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.object,
			])).isRequired,
		}),
		required: PropTypes.bool,
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object.isRequired,
	};
}

StringField.defaultProps = {
	uiSchema: {},
	registry: getDefaultRegistry(),
	disabled: false,
	readonly: false,
	autofocus: false,
};

export default StringField;
