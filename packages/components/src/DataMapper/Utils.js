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
