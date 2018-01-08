import PropTypes from 'prop-types';
import React from 'react';
import { sfPath } from 'talend-json-schema-form-core';

import defaultWidgets from '../utils/widgets';
import { getValue } from '../utils/properties';

export default function Widget(props) {
	const { key, type, validationMessage, widget, options } = props.schema;
	const widgetId = widget || type;

	if (widgetId === 'hidden') {
		return null;
	}

	const WidgetImpl = props.widgets[widgetId] || defaultWidgets[widgetId];

	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetId}</p>;
	}

	const id = sfPath.name(key, '_', props.formName);
	const error = props.errors[key];
	const errorMessage = validationMessage || error;
	return (
		<WidgetImpl
			{...props}
			id={id}
			key={id}
			errorMessage={errorMessage}
			isValid={!error}
			value={getValue(props.properties, key)}
			options={options}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Widget.propTypes = {
		errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		formName: PropTypes.string,
		schema: PropTypes.shape({
			key: PropTypes.array,
			type: PropTypes.string,
			validationMessage: PropTypes.string,
			widget: PropTypes.string,
		}).isRequired,
		properties: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};
}

Widget.defaultProps = {
	widgets: {},
};
