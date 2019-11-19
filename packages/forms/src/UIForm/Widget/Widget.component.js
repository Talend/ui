import PropTypes from 'prop-types';
import React from 'react';
import { sfPath } from '@talend/json-schema-form-core';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';

import defaultWidgets from '../utils/widgets';
import { getError } from '../utils/errors';
import { getValue } from '../utils/properties';
import shouldRender from '../utils/condition';

import theme from './Widget.component.scss';

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

function isUpdating(updatingKeys = [], key) {
	if (updatingKeys.length === 0 || !key) {
		return false;
	}
	// we need to support current and parent path
	const serializedKey = key.join('.');
	return updatingKeys.some(path => serializedKey.startsWith(path));
}

export default function Widget(props) {
	const {
		condition,
		key,
		options,
		type,
		validationMessage,
		widget,
		displayMode,
		tooltip,
		tooltipPlacement,
	} = props.schema;
	const widgetId = widget || type;

	if (widgetId === 'hidden' || !shouldRender(condition, props.properties, key)) {
		return null;
	}

	const WidgetImpl = getWidget(props.displayMode || displayMode, widgetId, props.widgets);

	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetId}</p>;
	}

	const id = sfPath.name(key, '_', props.id);
	const error = getError(props.errors, props.schema);
	const errorMessage = validationMessage || error;
	const all = {
		...props,
		id,
		key: id,
		options,
		errorMessage,
		isValid: !error,
		value: getValue(props.properties, props.schema),
		valueIsUpdating: isUpdating(props.updating, props.schema.key),
	};

	if (tooltip) {
		return (
			<TooltipTrigger
				className={theme.tooltip}
				label={tooltip}
				tooltipPlacement={tooltipPlacement || 'left'}
			>
				<div>
					<WidgetImpl {...all} />
				</div>
			</TooltipTrigger>
		);
	}

	return <WidgetImpl {...all} />;
}

if (process.env.NODE_ENV !== 'production') {
	Widget.propTypes = {
		displayMode: PropTypes.string,
		errors: PropTypes.object,
		id: PropTypes.string,
		properties: PropTypes.object,
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
		updating: PropTypes.arrayOf(PropTypes.shape({ path: PropTypes.string })),
		widgets: PropTypes.object,
	};
}

Widget.defaultProps = {
	widgets: {},
};

Widget.displayName = 'Widget';
