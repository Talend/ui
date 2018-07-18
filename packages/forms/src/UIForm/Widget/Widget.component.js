import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { sfPath } from '@talend/json-schema-form-core';

import defaultWidgets from '../utils/widgets';
import { getError } from '../utils/errors';
import { getValue } from '../utils/properties';

function conditionEvaluationStrategy(value, strategy) {
	if (!strategy) {
		return value;
	}
	switch (strategy) {
		case 'length':
			if (value && Array.isArray(value)) {
				return value.length;
			}
			return 0;
		default:
			return false;
	}
}

function evaluateCondition(properties, condition) {
	const value = get(properties, condition.path);
	const actual = conditionEvaluationStrategy(value, condition.evaluationStrategy);
	return !condition.negate === includes(condition.values, actual);
}

/**
 * Evaluate a list (array) of conditions against a contextual set of values (properties).
 * Condition specification is done through objects with the following attributes:
 * <ul>
 *   <li><em>values</em> (required): list of values compared to the evaluated value</li>
 *   <li><em>path</em> (required): the path used to extract the value from properties
 *   to use to compare to values</li>
 *   <li><em>negate</em> (optional): should the evaluation activate this widget when
 *   true (default) or false (when negate = true).</li>
 *   <li><em>evaluationStrategy</em> (optional): by default the property value extraction
 *   just uses the path, but for some cases like array you can want some more advanced strategy
 *   like extracting the length. For such cases, there are some <code>evaluationStrategy</code>.
 *   Currently you can set this property to <code>length</code> to evaluate the length of an array
 *   when the extracted instance is an array, otherwise it will set the value to zero. Other
 *   strategy values will just return false.</li>
 * </ul>
 *
 * @example {
 *   values:["A", "B"],
 *   path: "someProp.someArray",
 *   negate: true,
 *   evaluationStrategy: "length"
 * }
 *
 * The combination of the conditions is done through an <code>AND</code>
 * whereas, for a single condition, the test against <code>values</code>
 * is an <code>includes</code> (<code>OR</code>).
 *
 * @param properties source of the value provider to evaluate conditions.
 * @param conditions array of conditions to evaluate.
 * @returns true if the conditions are met, false otherwise.
 */
function shouldRender(conditions, properties) {
	return !conditions || conditions.every(cond => evaluateCondition(properties, cond));
}

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
					evaluationStrategy: PropTypes.string,
					negate: PropTypes.bool,
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
