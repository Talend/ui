import React from 'react';

export const WidgetContext = React.createContext();

export function getWidget(widgets, widgetId, displayMode) {
	if (!widgets) {
		console.error('UIForm.Widgets.NOT_FOUND: You may have forgot to setup the provider');
		return undefined;
	}
	const id = displayMode ? `${widgetId}_${displayMode}` : widgetId;
	let widget = widgets[id];
	if (!widget) {
		widget = widgets[widgetId];
	}
	return widget;
}

export function useWidget(displayMode, widgetId) {
	const widgets = React.useContext(WidgetContext);
	return getWidget(widgets, widgetId, displayMode);
}
