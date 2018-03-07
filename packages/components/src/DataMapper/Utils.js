import { SchemaType } from './Constants';

export function getSchema(state, type) {
	if (type === SchemaType.INPUT) {
		return state.inputSchema;
	} else if (type === SchemaType.OUTPUT) {
		return state.outputSchema;
	}
	return null;
}

export function isSelected(selection, element, type) {
	return selection != null && selection.element === element && selection.type === type;
}

export function isSelectionEmpty(selection) {
	return selection == null || selection.element == null || selection.type == null;
}

export function getMappingItems(mapping, element, type) {
	if (type === SchemaType.INPUT) {
		return mapping.filter(item => item.source === element);
	}
	return mapping.filter(item => item.target === element);
}

export function isMapped(mapping, element, type) {
	if (mapping != null) {
		return mapping.find(
			item =>
				(type === SchemaType.INPUT && item.source === element) ||
				(type === SchemaType.OUTPUT && item.target === element),
		);
	}
	return false;
}
