import PropTypes from 'prop-types';
import React from 'react';
import { sfPath } from '@talend/json-schema-form-core';

import defaultWidgets from '../utils/widgets';
import { getError } from '../utils/errors';
import { getValue } from '../utils/properties';
import shouldRender from '../utils/condition';
import { TooltipTrigger } from '@talend/react-components';

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

	if (tooltip) {
		return (
			<TooltipTrigger label={tooltip} tooltipPlacement={'left'}>
				<div>
					<WidgetImpl
						{...props}
						id={id}
						key={id}
						errorMessage={errorMessage}
						isValid={!error}
						value={getValue(props.properties, props.schema)}
						valueIsUpdating={isUpdating(props.updating, props.schema.key)}
						options={options}
					/>
				</div>
			</TooltipTrigger>
		);
	}

	return (
		<WidgetImpl
			{...props}
			id={id}
			key={id}
			errorMessage={errorMessage}
			isValid={!error}
			value={getValue(props.properties, props.schema)}
			valueIsUpdating={isUpdating(props.updating, props.schema.key)}
			options={options}
		/>
	);
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
