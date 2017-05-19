import React, { PropTypes } from 'react';
import { sfPath } from 'talend-json-schema-form-core';

import defaultWidgets from '../utils/widgets';
import { getValue } from '../utils/properties';

export default function Widget(props) {
	const { errors, formName, onChange, onTrigger, properties, schema, widgets } = props;
	const { key, type, validationMessage } = schema;
	const id = sfPath.name(key, '-', formName);
	const error = errors[key];
	const errorMessage = validationMessage || error;
	const WidgetImpl = widgets[type] || defaultWidgets[type];
	return WidgetImpl ?
		(
			<WidgetImpl
				id={id}
				key={id}
				errorMessage={errorMessage}
				formName={formName}
				isValid={!error}
				onChange={onChange}
				onTrigger={onTrigger}
				properties={properties}
				schema={schema}
				errors={errors}
				value={getValue(properties, key)}
			/>
		) : null;
}

if (process.env.NODE_ENV !== 'production') {
	Widget.propTypes = {
		errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		formName: PropTypes.string,
		onChange: PropTypes.func,
		onTrigger: PropTypes.func,
		schema: PropTypes.shape({
			key: PropTypes.array,
			type: PropTypes.string.isRequired,
			validationMessage: PropTypes.string,
		}).isRequired,
		properties: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};
}

Widget.defaultProps = {
	widgets: [],
};
