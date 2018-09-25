import PropTypes from 'prop-types';
import React from 'react';
import { sfPath } from '@talend/json-schema-form-core';

import defaultWidgets from '../utils/widgets';
import { getError } from '../utils/errors';
import { getValue } from '../utils/properties';
import shouldRender from '../utils/condition';

function getWidget(displayMode, widgetId, customWidgets) {
	// resolve the widget id depending on the display mode
	const id = displayMode ? `${widgetId}_${displayMode}` : widgetId;

	// Get the widget and fallback to default mode widget if not found
	let widget = customWidgets[id] || defaultWidgets[id];
	if (!widget) {
		widget = customWidgets[widgetId] || defaultWidgets[widgetId];
	}

	return widget;
}

/**
 * if in the path [] appears it will be populated
 * with current key indices value.
 */
function valorizeArrayIndices(path, key) {
	if (!path || !key || !Array.isArray(key)) {
		return path;
	}
	let keyIndex = 0;
	return path.split('.').reduce((acc, current) => {
		if (acc) {
			acc += '.';
		}
		if (current.endsWith('[]')) {
			acc += `${current.substring(0, current.length - 2)}.${key[keyIndex + 1]}`;
			keyIndex += 2;
		} else {
			acc += current;
			keyIndex += 1;
		}
		return acc;
	}, '');
}

/**
 * For all "var" condition, populate generic indices ([]) from key indices.
 */
function mapConditionItem(item, key) {
	if (item.var) {
		return {
			...item,
			var: valorizeArrayIndices(item.var, key),
		};
	}
	if (Array.isArray(item)) {
		return item.map(it => mapConditionVars(it, key));
	}
	return mapConditionVars(item, key);
}

/**
 * Ensure generic indices ([]) are populated from the key.
 * It is a recursive implementation to support any kind of condition.
 * WARN: this is an internal here, don't export it anyhow.
 */
function mapConditionVars(condition, key) {
	if (!condition) {
		return condition;
	}

	const conditionType = typeof condition;
	switch (conditionType) {
		// primitive are passthrough, we just want to update "var" values
		case 'boolean':
		case 'number':
		case 'string':
			return condition;

		// an object so browse it recursively to replace var values
		default:
			return Object.keys(condition).reduce((acc, attribute) => {
				const value = condition[attribute];
				if (Array.isArray(value)) {
					acc[attribute] = value.map(it => mapConditionItem(it, key));
				} else {
					acc[attribute] = mapConditionItem(value, key);
				}
				return acc;
			}, {});
	}
}

export default function Widget(props) {
	const { condition, key, options, type, validationMessage, widget, displayMode } = props.schema;
	const widgetId = widget || type;
	const runtimeCondition = mapConditionVars(condition, key);

	if (widgetId === 'hidden' || !shouldRender(runtimeCondition, props.properties)) {
		return null;
	}

	const WidgetImpl = getWidget(props.displayMode || displayMode, widgetId, props.widgets);

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
		errors: PropTypes.object,
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
		properties: PropTypes.object,
		displayMode: PropTypes.string,
		widgets: PropTypes.object,
	};
}

Widget.defaultProps = {
	widgets: {},
};

Widget.displayName = 'Widget';
