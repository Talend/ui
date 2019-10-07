import React from 'react';
import PropTypes from 'prop-types';

import {
	getDefaultFormState,
	getWidget,
	getUiOptions,
	isSelect,
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
		onFocus,
	} = props;
	const { title, format } = schema;
	const { widgets, formContext } = registry;
	const enumOptions = isSelect(schema) ? optionsList(schema) : undefined;
	const defaultWidget = format || (enumOptions ? 'select' : 'text');
	const { widget = defaultWidget, placeholder = '', ...options } = getUiOptions(uiSchema);
	const Widget = getWidget(schema, widget, widgets);

	const onChangeHandler = value => {
		onChange(value, options);
	};

	return (
		<Widget
			options={{ ...options, enumOptions }}
			schema={schema}
			id={idSchema && idSchema.$id}
			label={title === undefined ? name : title}
			value={getDefaultFormState(schema, formData)}
			onChange={onChangeHandler}
			onBlur={onBlur}
			onFocus={onFocus}
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
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object.isRequired,
		idSchema: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		formData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		registry: PropTypes.shape({
			widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object]))
				.isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			definitions: PropTypes.object.isRequired,
			formContext: PropTypes.object.isRequired,
		}),
		name: PropTypes.string,
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		autofocus: PropTypes.bool,
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
