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

export const Navigation = {
	UP: 'ArrowUp',
	DOWN: 'ArrowDown',
	SWITCH_SCHEMA: 'Tab',
};

export const Configs = {
	DRAGGABLE: true,
};
