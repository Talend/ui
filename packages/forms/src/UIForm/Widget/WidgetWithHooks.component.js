import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { sfPath } from '@talend/json-schema-form-core';
import { TooltipTrigger } from '@talend/react-components';

import { getError } from '../utils/errors';
import { getValue } from '../utils/properties';
import shouldRender from '../utils/condition';

import { UIFormContext } from '../hooks/useUIForm';

function getWidget(widgets, widgetId, displayMode) {
	if (displayMode) {
		return widgets[`${widgetId}_${displayMode}`];
	}
	return widgets[widgetId];
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
		displayMode: displayModeFromSchema,
		tooltip,
		tooltipPlacement,
	} = props.schema;

	const { displayMode, id, onChange, onFinish, onTrigger, uiForm, updating } = useContext(
		UIFormContext,
	);

	const widgetName = widget || type;
	if (widgetName === 'hidden' || !shouldRender(condition, uiForm.state.properties, key)) {
		return null;
	}
	const WidgetImpl = getWidget(uiForm.widgets, widgetName, displayMode || displayModeFromSchema);
	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetName}</p>;
	}

	const widgetId = sfPath.name(key, '_', id);
	const error = getError(uiForm.state.errors, props.schema);
	const errorMessage = validationMessage || error;
	const all = {
		errorMessage,
		id: widgetId || id,
		key: id,
		isValid: !error,
		onChange,
		onFinish,
		onTrigger,
		options,
		schema: props.schema,
		value: getValue(uiForm.state.properties, props.schema),
		valueIsUpdating: isUpdating(updating, props.schema.key),
	};

	if (tooltip) {
		return (
			<TooltipTrigger label={tooltip} tooltipPlacement={tooltipPlacement || 'left'}>
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
	};
}

Widget.displayName = 'Widget';
