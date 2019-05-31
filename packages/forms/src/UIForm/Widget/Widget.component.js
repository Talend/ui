import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { sfPath } from '@talend/json-schema-form-core';
import { TooltipTrigger } from '@talend/react-components';

import { getError } from '../utils/errors';
import { getValue } from '../utils/properties';
import shouldRender from '../utils/condition';

import { UIFormContext } from '../context';

function getWidget(widgets, widgetId, displayMode) {
	if (displayMode) {
		const displayModeWidget = widgets[`${widgetId}_${displayMode}`];
		if (displayModeWidget) {
			return displayModeWidget;
		}
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

function Widget(props) {
	const { displayMode, widgetId, widgets, ...rest } = props;
	const { schema } = rest;

	const { options, tooltip, tooltipPlacement } = schema;

	const WidgetImpl = getWidget(widgets, widgetId, displayMode);
	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetId}</p>;
	}

	const widgetElement = <WidgetImpl options={options} {...rest} />;
	if (!tooltip) {
		return widgetElement;
	}
	return (
		<TooltipTrigger label={tooltip} tooltipPlacement={tooltipPlacement || 'left'}>
			<div>{widgetElement}</div>
		</TooltipTrigger>
	);
}
const MemoWidget = React.memo(Widget);

export default function ContextualWidget(props) {
	const { displayMode, id, onChange, onFinish, onTrigger, state, updating, widgets } = useContext(
		UIFormContext,
	);
	const {
		condition,
		displayMode: displayModeFromSchema,
		key,
		type,
		validationMessage,
		widget,
	} = props.schema;

	const widgetId = widget || type;
	if (widgetId === 'hidden' || !shouldRender(condition, state.properties, key)) {
		return null;
	}

	const inputId = sfPath.name(key, '_', id) || id;
	const error = getError(state.errors, props.schema);

	return (
		<MemoWidget
			displayMode={displayMode || displayModeFromSchema}
			error={error}
			errorMessage={validationMessage || error}
			id={inputId}
			isValid={!error}
			onChange={onChange}
			onFinish={onFinish}
			onTrigger={onTrigger}
			value={getValue(state.properties, props.schema)}
			valueIsUpdating={isUpdating(updating, props.schema.key)}
			widgetId={widgetId}
			widgets={widgets}
			{...props}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Widget.propTypes = {
		displayMode: PropTypes.string,
		error: PropTypes.string,
		errorMessage: PropTypes.string,
		id: PropTypes.string,
		onChange: PropTypes.func,
		onFinish: PropTypes.func,
		onTrigger: PropTypes.func,
		schema: PropTypes.shape({
			options: PropTypes.object,
		}).isRequired,
		value: PropTypes.any,
		valueIsUpdating: PropTypes.bool,
		widgetId: PropTypes.string,
		widgets: PropTypes.object,
	};
	ContextualWidget.propTypes = {
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
			type: PropTypes.string,
			validationMessage: PropTypes.string,
			widget: PropTypes.string,
		}).isRequired,
	};
}

Widget.displayName = 'Widget';
