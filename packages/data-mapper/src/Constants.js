/**
 * Defines the type of user interaction event
 */
const Events = {
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

/* eslint-disable no-bitwise */
const StateStatus = {
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

const MAPPING_STATE_STATUS =
	StateStatus.MAPPING | StateStatus.SELECTION | StateStatus.PENDING | StateStatus.DND;

const FILTERING_STATE_STATUS =
	StateStatus.FOCUSED | StateStatus.SELECTION | StateStatus.PENDING | StateStatus.DND;

const UNDO_REDO_STATE_STATUS = StateStatus.MAPPING | StateStatus.PENDING | StateStatus.DND;
/* eslint-enable no-bitwise */

const Commands = {
	ADD_MAPPING: 'add-mapping',
	REMOVE_MAPPING: 'remove-mapping',
	CLEAR_MAPPING: 'clear-mapping',
};

/**
 * Defines the two sides of a mapping (input and output)
 */
const MappingSide = {
	INPUT: 'input',
	OUTPUT: 'output',
};

/**
 * Switch between the two sides of mapping.
 * @param {string} side - the side of the mapping
 * @returns {string}
 */
function switchMappingSide(side) {
	if (side === MappingSide.INPUT) {
		return MappingSide.OUTPUT;
	}
	return MappingSide.INPUT;
}

/**
 * Defines parameters of a connection.
 */
const Connection = {
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

export default {
	Events,
	StateStatus,
	MAPPING_STATE_STATUS,
	FILTERING_STATE_STATUS,
	UNDO_REDO_STATE_STATUS,
	Commands,
	MappingSide,
	switchMappingSide,
	Connection,
};
