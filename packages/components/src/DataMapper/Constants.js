export const ItemTypes = {
	ELEMENT: 'element',
};

export const SchemaType = {
	INPUT: 'input',
	OUTPUT: 'output',
};

export function switchSchemaType(type) {
	if (type === SchemaType.INPUT) {
		return SchemaType.OUTPUT;
	}
	return SchemaType.INPUT;
}

export const MappingSide = {
	SOURCE: 'source',
	TARGET: 'target',
};

export const Keys = {
	UP: 'ArrowUp',
	DOWN: 'ArrowDown',
	SWITCH_SCHEMA: 'Tab',
	ENTER: 'Enter',
	ESCAPE: 'Escape',
	DELETE: 'Delete',
};

export const Configs = {
	DRAGGABLE: true,
};

export const ConnectionParams = {
	PENDING: {
		anchorRadius: 5,
		lineWidth: 4,
		lineDash: [4, 4],
		arrowWidth: 12,
		arrowHeight: 12,
		color: '#111111',
	},
	CURRENT: {
		anchorRadius: 5,
		lineWidth: 4,
		lineDash: null,
		arrowWidth: 12,
		arrowHeight: 12,
		color: '#000000',
	},
	FOCUSED: {
		anchorRadius: 5,
		lineWidth: 4,
		lineDash: null,
		arrowWidth: 12,
		arrowHeight: 12,
		color: '#999999',
	},
	ALL: {
		anchorRadius: 4,
		lineWidth: 3,
		lineDash: null,
		arrowWidth: 10,
		arrowHeight: 10,
		color: '#CCCCCC',
	}
};
