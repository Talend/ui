import React from 'react';
import PropTypes from 'prop-types';
import { sfPath } from '@talend/json-schema-form-core';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';

import shouldRender from './condition';
import defaultWidgets from './widgets';
import useSchemaWidget from './useSchemaWidget';

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

export const PROPS_TO_REMOVE_FROM_INPUTS = ['schema'];

export default function Widget(props) {
	const { id, schema } = props;
	const { condition, key, type, widget, tooltip, tooltipPlacement } = schema;
	const { eventsProps, displayMode, rhf, rules, widgets = [] } = useSchemaWidget(schema);

	const values = rhf.getValues({ nest: true });
	if (!shouldRender(condition, values, key)) {
		return null;
	}

	const widgetName = widget || type;
	const WidgetImpl = getWidget(displayMode || schema.displayMode, widgetName, widgets);
	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetName}</p>;
	}

	const instance = (
		<WidgetImpl
			{...props}
			{...eventsProps}
			id={sfPath.name(key, '_', id)}
			name={key && key.join('.')}
			rhf={rhf}
			rules={rules}
		/>
	);

	if (tooltip) {
		return (
			<TooltipTrigger
				style={{ display: 'block' }}
				label={tooltip}
				tooltipPlacement={tooltipPlacement || 'left'}
			>
				<div>{instance}</div>
			</TooltipTrigger>
		);
	}

	return instance;
}

if (process.env.NODE_ENV !== 'production') {
	Widget.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.object,
	};
}
