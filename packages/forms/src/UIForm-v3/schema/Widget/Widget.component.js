import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';
import set from 'lodash/set';

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

	const { displayMode, getValues, onChange, templates = {}, widgets = [] } = useFormContext();
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

	// user form onChange
	if (onChange) {
		const triggerChange = eventsProps.onChange;

		eventsProps.onChange = function onValueChange(...args) {
			const [event, payload] = args;
			const { value } = payload || event.target;

			// the properties are the new or the old ones depending on the widget ...
			// DO NOT rely on that to do anything based on the old properties
			// * on native elements
			// 		RHF add an event listener on the ref
			//		on change, the event listener is triggered and RHF rerenders
			// 		React set a listener at the root of the react app, when the onChange is triggered (AFTER the rerender), it has the new values
			// 		so oldProperties contains the new ones
			// * on controlled elements, using rhf.setValue
			//		RHF doesn't set an event listener
			//		rhf.setValue, will schedule a rendering, this onChange is triggered BEFORE the reRender
			//      so the oldProperties contains the old ones
			const oldProperties = getValues({ nest: true });
			const properties = set(oldProperties, schema.key, value);

			// user onChange
			const userOnChangeResult = onChange(event, {
				schema,
				properties,
				value,
				// for code compatibility. Should be removed in the future
				formData: properties,
			});

			// trigger change
			// we must return this one in case the component waits
			// for the trigger to update an internal state
			return triggerChange ? triggerChange(...args) : userOnChangeResult;
		};
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
