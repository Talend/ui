/**
 * Defines the type of draggable element.
 */
export const ItemTypes = {
	ELEMENT: 'element',
};

/**
 * Defines the type of a schema.
 */
export const SchemaType = {
	INPUT: 'input',
	OUTPUT: 'output',
};

/**
 * Switch between the two types of schema.
 * @param {string} type - the type of the schema
 * @returns {string}
 */
export function switchSchemaType(type) {
	if (type === SchemaType.INPUT) {
		return SchemaType.OUTPUT;
	}
	return SchemaType.INPUT;
}

/**
 * Defines the two sides of a mapping item.
 */
export const MappingSide = {
	SOURCE: 'source',
	TARGET: 'target',
};

export const Keys = {
	UP: 38,
	DOWN: 40,
	SWITCH_SCHEMA: 9,
	ENTER: 13,
	ESCAPE: 27,
	DELETE: 46,
};

export const Configs = {
	DRAGGABLE: true,
};

const defaultConnectionParams = {
	anchorRadius: 5,
	lineWidth: 4,
	lineDash: null,
	arrowWidth: 12,
	arrowHeight: 12,
};

/**
 * Defines the graphical parameters of a connection.
 * PENDING: a connection is in progress
 * CURRENT: connection of a selected mapped schema element
 * FOCUSED: connection of an overflown mapped schema element
 * ALL:
 */
export const ConnectionParams = {
	PENDING: {
		...defaultConnectionParams,
		lineDash: [4, 4],
		color: '#111111',
	},
	CURRENT: {
		...defaultConnectionParams,
		color: '#000000',
	},
	FOCUSED: {
		...defaultConnectionParams,
		color: '#999999',
	},
	ALL: {
		...defaultConnectionParams,
		anchorRadius: 4,
		lineWidth: 3,
		arrowWidth: 10,
		arrowHeight: 10,
		color: '#CCCCCC',
	},
};
