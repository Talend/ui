/**
 * Defines the type of user interaction event
 */
export const Events = {
	ENTER_ELEM: 'enter-elem',
	LEAVE_ELEM: 'leave-elem',
	FILTERING: 'filtering',
	ADD_MAPPING: 'add-mapping',
	REMOVE_MAPPING: 'remove-mapping',
	CLEAR_MAPPING: 'clear-mapping',
	UNDO: 'undo',
	REDO: 'redo',
	SORT: 'sort',
	CLEAR_SORT: 'clear-sort',
	DND_IN_PROGRESS: 'dnd-in-progress',
};

export const StateStatus = {
	NONE: 0,
	FOCUSED: 1,
	SELECTION: 1 << 1,
	PENDING: 1 << 2,
	DND: 1 << 3,
	FILTERS: 1 << 4,
	MAPPING: 1 << 5,
	PREFERENCES: 1 << 6,
	SORT: 1 << 7,
};

export const MAPPING_STATE_STATUS =
	StateStatus.MAPPING | StateStatus.SELECTION | StateStatus.PENDING | StateStatus.DND;

export const FILTERING_STATE_STATUS =
	StateStatus.FOCUSED | StateStatus.SELECTION | StateStatus.PENDING | StateStatus.DND;

export const UNDO_REDO_STATE_STATUS = StateStatus.MAPPING | StateStatus.PENDING | StateStatus.DND;

export const Commands = {
	ADD_MAPPING: 'add-mapping',
	REMOVE_MAPPING: 'remove-mapping',
	CLEAR_MAPPING: 'clear-mapping',
};

/**
 * Defines the type of draggable element.
 */
export const ItemTypes = {
	ELEMENT: 'element',
};

/**
 * Defines the two sides of a mapping (input and output)
 */
export const MappingSide = {
	INPUT: 'input',
	OUTPUT: 'output',
};

/**
 * Switch between the two sides of mapping.
 * @param {string} side - the side of the mapping
 * @returns {string}
 */
export function switchMappingSide(side) {
	if (side === MappingSide.INPUT) {
		return MappingSide.OUTPUT;
	}
	return MappingSide.INPUT;
}

/**
 * Defines style and part of a connection anchor.
 */
export const Anchor = {
	STYLE: {
		UNMAPPED: 'unmapped',
		MAPPED: 'mapped',
		FOCUSED: 'focused',
		SELECTED: 'selected',
	},
};

/**
 * Defines parameters of a connection.
 */
export const Connection = {
	STYLE: {
		ALL: 'all',
		CURRENT: 'current',
		FOCUSED: 'focused',
		PENDING: 'pending',
	},
	PART: {
		START: 'start',
		CURVE: 'curve',
		END: 'end',
	},
	VISIBILITY: {
		FULL: 'full',
		LEFT: 'left',
		RIGHT: 'right',
		NONE: 'none',
	},
};
