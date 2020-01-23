import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';

import defaultWidgets from '../widgets';
import useIdentifiers from './useIdentifiers';
import useCondition from './useCondition';
import useRules from './useRules';
import { useEventTriggers } from './useTriggers';

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

export default function Widget(props) {
	const { id, schema } = props;
	const { type, widget, tooltip, tooltipPlacement } = schema;

	const { displayMode, templates = {}, widgets = [] } = useFormContext();
	const eventsProps = useEventTriggers(schema);
	const { id: schemaId, name } = useIdentifiers({ schema, id });
	const rules = useRules(schema);
	const shouldRender = useCondition(schema);

	// conditional rendering
	if (!shouldRender) {
		return null;
	}

	// widget extension
	const widgetName = widget || type;
	const WidgetImpl = getWidget(displayMode || schema.displayMode, widgetName, widgets);
	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetName}</p>;
	}

	const instance = (
		<WidgetImpl
			// contains schema
			{...props}
			// trigger callbacks
			{...eventsProps}
			// template extensions
			displayMode={displayMode}
			templates={templates}
			// input props
			id={schemaId}
			name={name}
			// react-hook-forms and validation rules
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
