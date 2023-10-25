import { createContext, useContext } from 'react';

export const WidgetContext = createContext();

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
	const widgets = useContext(WidgetContext);
	return {
		widgets,
		WidgetImpl: getWidget(widgets, widgetId, displayMode),
	};
}
