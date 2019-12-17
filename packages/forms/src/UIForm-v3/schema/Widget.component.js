import React from 'react';
import PropTypes from 'prop-types';
import { sfPath } from '@talend/json-schema-form-core';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';
import { useTranslation } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../constants';
import shouldRender from './condition';
import defaultWidgets from './widgets';
import schemaRules from './validation/schemaRules';

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

export const PROPS_TO_REMOVE_FROM_INPUTS = ['customValidation', 'displayMode', 'schema', 'widgets'];

export default function Widget(props) {
	const { customValidation, displayMode, id, rhf, schema, widgets = [] } = props;
	const { condition, key, type, widget, tooltip, tooltipPlacement } = schema;

	const { t } = useTranslation(I18N_DOMAIN_FORMS);

	const values = rhf.getValues({ nest: true });
	if (!shouldRender(condition, values, key)) {
		return null;
	}

	const widgetName = widget || type;
	const WidgetImpl = getWidget(displayMode || schema.displayMode, widgetName, widgets);
	if (!WidgetImpl) {
		return <p className="text-danger">Widget not found {widgetName}</p>;
	}

	const rules = schemaRules({ schema, customValidation, values, t });

	const instance = (
		<WidgetImpl
			{...props}
			id={sfPath.name(key, '_', id)}
			name={key && key.join('.')}
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
		customValidation: PropTypes.func,
		displayMode: PropTypes.string,
		id: PropTypes.string,
		rhf: PropTypes.object,
		schema: PropTypes.object,
		widgets: PropTypes.object,
	};
}
