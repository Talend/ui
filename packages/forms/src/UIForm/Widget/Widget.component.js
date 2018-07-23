import PropTypes from 'prop-types';
import React from 'react';
import { sfPath } from '@talend/json-schema-form-core';

import defaultWidgets from '../utils/widgets';
import { getError } from '../utils/errors';
import { getValue } from '../utils/properties';
import shouldRender from './condition';

export default function Widget(props) {
	const { conditions, key, options, type, validationMessage, widget } = props.schema;
	const widgetId = widget || type;

	if (widgetId === 'hidden' || !shouldRender(conditions, props.properties)) {
		return null;
	}

	const WidgetImpl = props.widgets[widgetId] || defaultWidgets[widgetId];

	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetId}</p>;
	}

	const id = sfPath.name(key, '_', props.id);
	const error = getError(props.errors, props.schema);
	const errorMessage = validationMessage || error;
	return (
		<WidgetImpl
			{...props}
			id={id}
			key={id}
			errorMessage={errorMessage}
			isValid={!error}
			value={getValue(props.properties, props.schema)}
			options={options}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Widget.propTypes = {
		errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		id: PropTypes.string,
		schema: PropTypes.shape({
			conditions: PropTypes.arrayOf(
				PropTypes.shape({
					path: PropTypes.string,
					values: PropTypes.array,
					strategy: PropTypes.string,
					shouldBe: PropTypes.bool,
				}),
			),
			key: PropTypes.array,
			options: PropTypes.object,
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

Widget.displayName = 'Widget';
