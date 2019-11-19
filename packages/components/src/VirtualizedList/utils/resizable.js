import flow from 'lodash/flow';
import findLastIndex from 'lodash/findLastIndex';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';

const MINIMUM_COLUMN_WIDTH = 40;

const getMinimumWidth = column => column.minWidth || MINIMUM_COLUMN_WIDTH;

const getWidth = (width, minWidth = MINIMUM_COLUMN_WIDTH) => (width <= minWidth ? minWidth : width);

const throwNoWidthErrorMsg = dataKey => {
	throw new Error(
		`[vList:resizable]: column ${dataKey} has no width. To use resizable, every columns need to have a width`,
	);
};

/*-----------------------------------------------------------------------------------
	Predicate
------------------------------------------------------------------------------------*/

const isShrinkable = column => column.resizable && column.width > getMinimumWidth(column);

const isEnlargeable = column => column.resizable;

const isColumnAtMinimumWidth = column => column.width === getMinimumWidth(column);

const isValueLowerThanColumnMinimumWidth = (value, column) => value <= getMinimumWidth(column);

const isLeftColumnAtMinimumWidth = (columnsWidths, index) =>
	columnsWidths.slice(0, index + 1).every(isColumnAtMinimumWidth);

/*-----------------------------------------------------------------------------------
	Column setters
------------------------------------------------------------------------------------*/

/**
 * Set an item of the array.
 * @param {array} columnsWidths
 * @param {integer} index
 */
const setColumn = (columnsWidths, index) => column => {
	// eslint-disable-next-line no-param-reassign
	columnsWidths[index] = column;
	return columnsWidths;
};

/*-----------------------------------------------------------------------------------
	Index getters
------------------------------------------------------------------------------------*/

/**
 * Search for the nearest index shrinkable on the right.
 * @param {integer} index
 * @param {array} columnsWidths
 */
const getShrinkIndexRight = (index, columnsWidths) =>
	findIndex(columnsWidths, isShrinkable, index + 1);

/**
 * Search for the nearest index enlargeable on the right.
 * @param {integer} index
 * @param {array} columnsWidths
 */
const getEnlargeIndexRight = (index, columnsWidths) =>
	findIndex(columnsWidths, isEnlargeable, index + 1);

/**
 * Search for the nearest index shrinkable on the left including himself.
 * @param {integer} index
 * @param {array} columnsWidths
 */
const getShrinkIndexLeft = (index, columnsWidths) =>
	findLastIndex(columnsWidths, isShrinkable, index);

/*-----------------------------------------------------------------------------------
	Calc functions
------------------------------------------------------------------------------------*/

const addValue = (deltaX, value) => deltaX + value;

const subtractValue = (deltaX, value) => value - deltaX;

const addWidth = (a, b) => {
	if (!b.width) {
		throwNoWidthErrorMsg(b.dataKey);
	}
	return a + b.width;
};
/**
 * Return the total of all width of the array parameter.
 * @param {array} columnsWidths
 * @returns {integer} value of all width
 */
const calcTotalCurrentWidth = columnsWidths => columnsWidths.reduce(addWidth, 0);

const updateTotalCurrentWidth = (currentTotalWidth, oldColumnWidth, newColumnWidth) =>
	currentTotalWidth - oldColumnWidth + newColumnWidth;

/**
 * Add the deltaX to the current width.
 * @param {object} column.width
 * @param {number} deltaX
 * @param {integer} listWidth
 * @param {integer} currentTotalWidth
 */
const calcWidthEnlarge = ({ width }, deltaX, listWidth, currentTotalWidth) => {
	// If the dragging is going too far,
	// we are only returning the max value possible.
	if (currentTotalWidth + deltaX >= listWidth) {
		return width + (listWidth - currentTotalWidth);
	}
	const calculatedWidth = addValue(deltaX, width);
	return calculatedWidth;
};

/**
 * Subtract the deltaX to the current width.
 * @param {object} column.width
 * @param {number} deltaX
 */
const calcWidthShrink = ({ width, minWidth }, deltaX) => {
	const calculatedWidth = subtractValue(deltaX, width);
	return getWidth(calculatedWidth, minWidth);
};

/*-----------------------------------------------------------------------------------
	Width setters
------------------------------------------------------------------------------------*/

/**
 * Decrement the width if possible, and return the new width.
 * @param {integer} deltaX
 */
const setShrinkingColumnWidth = deltaX => column => {
	const { width, minWidth = MINIMUM_COLUMN_WIDTH } = column;
	if (width >= minWidth) {
		// eslint-disable-next-line no-param-reassign
		column.width = calcWidthShrink(column, deltaX);
	}
	return column;
};

/**
 * Increment the width if possible, and return the new width.
 * @param {number} deltaX
 * @param {integer} listWidth
 * @param {integer} currentTotalWidth
 */
const setEnlargingColumnWidth = (deltaX, listWidth, currentTotalWidth) => column => {
	if (currentTotalWidth <= listWidth) {
		// eslint-disable-next-line no-param-reassign
		column.width = calcWidthEnlarge(column, deltaX, listWidth, currentTotalWidth);
	}
	return column;
};

/*-----------------------------------------------------------------------------------
	Function factory and specialized resize functions
------------------------------------------------------------------------------------*/

/**
 * Transform the delta value if needed
 * @param {object} column
 * @param {number} deltaX
 */
const transformDeltaValue = (column, deltaX) => {
	// If the user try to shrink the column above the minimum value,
	// we are returning a new delta to be exactly at the minimum value authorized.
	if (deltaX < 0 && isValueLowerThanColumnMinimumWidth(column.width - Math.abs(deltaX), column)) {
		return column.width - getMinimumWidth(column);
	} else if (deltaX < 0) {
		return Math.abs(deltaX);
	}
	return deltaX;
};

/**
 * This is a function factory.
 * It returns a function which can set a new width to the columns width list.
 * @param {function} setWidthFn
 * @param {function} getIndexFn
 * @returns {tuple} [columnsWidths, currentTotalWidth, absDeltaX]
 */
const changeWidthColumn = (setWidthFn, getIndexFn) => (index, listWidth) => ([
	columnsWidths,
	currentTotalWidth,
	deltaX,
]) => {
	let workingIndex = index;
	let absDeltaX = deltaX;
	if (getIndexFn) {
		workingIndex = getIndexFn(index, columnsWidths);
	}
	if (workingIndex >= 0) {
		const currentColumn = columnsWidths[workingIndex];

		if (!currentColumn.width) {
			throwNoWidthErrorMsg(currentColumn.dataKey);
		}
		absDeltaX = transformDeltaValue(currentColumn, deltaX);

		const widthBeforeChange = currentColumn.width;
		flow([
			setWidthFn(absDeltaX, listWidth, currentTotalWidth),
			setColumn(columnsWidths, workingIndex),
		])(currentColumn);
		return [
			columnsWidths,
			updateTotalCurrentWidth(currentTotalWidth, widthBeforeChange, currentColumn.width),
			absDeltaX,
		];
	}
	return [columnsWidths, currentTotalWidth, absDeltaX];
};

/**
 * Shrink nearest eligible column on the left of the dragged item.
 */
const shrinkLeftColumn = changeWidthColumn(setShrinkingColumnWidth, getShrinkIndexLeft);

/**
 * Enlarge nearest eligible column on the right of the dragged item.
 */
const enlargeRightColumn = changeWidthColumn(setEnlargingColumnWidth, getEnlargeIndexRight);

/**
 * Shrink nearest eligible column on the right of the dragged item.
 */
const shrinkRightColumn = changeWidthColumn(setShrinkingColumnWidth, getShrinkIndexRight);

/**
 * Enlarge the column index.
 */
const enlargeCurrentColumn = changeWidthColumn(setEnlargingColumnWidth);

/**
 * Flow of operations to handle dragging column to the right.
 * @param {number} deltaX
 * @param {integer} index
 * @param {integer} listWidth
 */
const resizeRight = (deltaX, index, listWidth) => columnsWidths => {
	if (deltaX > 0) {
		flow([shrinkRightColumn(index), enlargeCurrentColumn(index, listWidth)])([
			columnsWidths,
			calcTotalCurrentWidth(columnsWidths),
			deltaX,
		]);
	}
	return columnsWidths;
};

/**
 * Flow of operations to handle dragging column to the left.
 * @param {number} deltaX
 * @param {integer} index
 * @param {integer} listWidth
 */
const resizeLeft = (deltaX, index, listWidth) => columnsWidths => {
	if (deltaX < 0 && !isLeftColumnAtMinimumWidth(columnsWidths, index)) {
		flow([shrinkLeftColumn(index), enlargeRightColumn(index, listWidth)])([
			columnsWidths,
			calcTotalCurrentWidth(columnsWidths),
			deltaX,
		]);
	}
	return columnsWidths;
};

/*-----------------------------------------------------------------------------------
	Resizable api utils
------------------------------------------------------------------------------------*/

/**
 * Extract some props from the converted react elements array.
 * @param {array} arrayOfReactElements
 */
export const extractResizableProps = arrayOfReactElements => {
	if (Array.isArray(arrayOfReactElements)) {
		return arrayOfReactElements.map(({ props }) => ({
			dataKey: props.dataKey,
			minWidth: props.minWidth || MINIMUM_COLUMN_WIDTH,
			resizable: props.resizable,
			width: props.width,
		}));
	}
	return [];
};

export const findColumnByDataKey = dataKey => column => column.dataKey === dataKey;
export const getColumnWidth = (dataKey, columnsWidths) => {
	if (Array.isArray(columnsWidths)) {
		return columnsWidths.find(findColumnByDataKey(dataKey));
	}
	return {};
};

const isFixedColumnWidth = (resizable, width, minWidth) => !resizable || width <= minWidth;

export const createColumnWidthProps = columnsWidthsParams => {
	if (!columnsWidthsParams) {
		return undefined;
	}
	const { resizable, width, minWidth } = columnsWidthsParams;
	if (isFixedColumnWidth(resizable, width, minWidth)) {
		return {
			width,
			flexShrink: 0,
			flexGrow: 0,
		};
	}
	return { width };
};

/*-----------------------------------------------------------------------------------
	Resizable functionality entry point
------------------------------------------------------------------------------------*/

/**
 * This is the entry point of the resize functionality.
 * It clones the incoming collection, mutates it, and return new widths value.
 * To improve performance all changes to the columns list are mutable.
 * @param {number} deltaX
 * @param {array} columnsWidths
 * @param {integer} currentIndex
 */
export const resizeColumns = (deltaX, columnsWidths, listWidth, dataKey) => {
	const currentIndexColumn = columnsWidths.findIndex(findColumnByDataKey(dataKey));
	if (currentIndexColumn >= 0) {
		return flow([
			cloneDeep,
			resizeRight(deltaX, currentIndexColumn, listWidth),
			resizeLeft(deltaX, currentIndexColumn, listWidth),
		])(columnsWidths);
	}
	return columnsWidths;
};
