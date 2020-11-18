import PropTypes from 'prop-types';
import React from 'react';
import { sfPath } from '@talend/json-schema-form-core';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';

import { getError } from '../utils/errors';
import { getValue } from '../utils/properties';
import shouldRender from '../utils/condition';

import theme from './Widget.component.scss';
import { useWidget } from '../context';

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

	const WidgetImpl = useWidget(props.displayMode || displayMode, widgetId);

	if (widgetId === 'hidden' || !shouldRender(condition, props.properties, key)) {
		return null;
	}

	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetId}</p>;
	}

	const id = sfPath.name(key, props.idSeparator || '_', props.id);
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
		idSeparator: PropTypes.string,
		properties: PropTypes.object,
		schema: PropTypes.shape({
			condition: PropTypes.arrayOf(
				PropTypes.shape({
					path: PropTypes.string,
					values: PropTypes.array,
					strategy: PropTypes.string,
					shouldBe: PropTypes.bool,
				}),
			),
			displayMode: PropTypes.string,
			key: PropTypes.array,
			options: PropTypes.object,
			tooltip: PropTypes.string,
			tooltipPlacement: PropTypes.string,
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
