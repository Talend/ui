import { SchemaType } from './Constants';

const utils = {
	// getSchema returns the schema corresponding to the given type
	getSchema(state, type) {
		if (type === SchemaType.INPUT) {
			return state.inputSchema;
		} else if (type === SchemaType.OUTPUT) {
			return state.outputSchema;
		}
		return null;
	},
	// isSelected indicates if the given (element, type) is selected
	// (i.e. if it appears in the selection)
	isSelected(selection, element, type) {
		return selection != null && selection.element === element && selection.type === type;
	},
	// isSelectionEmpty returns true if the given selection is empty
	isSelectionEmpty(selection) {
		return selection == null || selection.element == null || selection.type == null;
	},
	//
	getMappingItems(mapping, element, type) {
		if (type === SchemaType.INPUT) {
			return mapping.filter(item => item.source === element);
		}
		return mapping.filter(item => item.target === element);
	},
	// isMapped returns true if the given (element, type) is mapped
	// (i.e. if it appears in the mapping)
	isMapped(mapping, element, type) {
		if (mapping != null) {
			return mapping.find(
				item =>
					(type === SchemaType.INPUT && item.source === element) ||
					(type === SchemaType.OUTPUT && item.target === element),
			);
		}
		return false;
	},
	// fullMapped returns true if all the elements of the given schema are mapped
	fullMapped(mapping, schema, type) {
		// TODO could be optimized
		for (let i = 0; i < schema.elements.length; i += 1) {
			if (!this.isMapped(mapping, schema.elements[i], type)) {
				return false;
			}
		}
		return true;
	}
};

export default utils;
