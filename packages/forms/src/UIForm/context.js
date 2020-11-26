import React from 'react';

export const WidgetContext = React.createContext();

export function getWidget(widgets, widgetId, displayMode) {
	if (!widgets) {
		return undefined;
	}
	const id = displayMode ? `${widgetId}_${displayMode}` : widgetId;
	let widget = widgets[id];
	if (!widget) {
		widget = widgets[widgetId];
	}
	return widget;
}

export function useWidget(widgetId, displayMode) {
	const widgets = React.useContext(WidgetContext);
	return {
		widgets,
		WidgetImpl: getWidget(widgets, widgetId, displayMode),
	};
}
