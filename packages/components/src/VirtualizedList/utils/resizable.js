import flow from 'lodash/flow';
import findLastIndex from 'lodash/findLastIndex';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';

const MINIMUM_COLUMN_WIDTH = 40;

const getMinimumWidth = column => column.minWidth || MINIMUM_COLUMN_WIDTH;

const getWidth = (width, minWidth = MINIMUM_COLUMN_WIDTH) => (width <= minWidth ? minWidth : width);

/*-----------------------------------------------------------------------------------
	Predicate
------------------------------------------------------------------------------------*/

const isShrinkable = column => column.resizable && column.width > getMinimumWidth(column);

const isEnlargeable = column => column.resizable;

const isColumnAtMinimumWidth = column => column.width === getMinimumWidth(column);

const isValueLowerThanColumnMinimumWidth = (value, column) => value <= getMinimumWidth(column);

const isLeftColumnAtMinimumWidth = (columnsWidths, index) =>
	!columnsWidths.slice(0, index + 1).every(isColumnAtMinimumWidth);

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

const addWidth = (deltaX, value) => deltaX + value;

const subtractWidth = (deltaX, value) => value - deltaX;

/**
 * Return the total of all width of the array parameter.
 * @param {array} columnsWidths
 */
const calcTotalCurrentWidth = columnsWidths => {
	let currentTotalWidth = 0;
	columnsWidths.forEach(column => {
		if (column.width) {
			currentTotalWidth += column.width;
		}
	});
	return currentTotalWidth;
};

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
	const calculatedWidth = addWidth(deltaX, width);
	return calculatedWidth;
};

/**
 * Subtract the deltaX to the current width.
 * @param {object} column.width
 * @param {number} deltaX
 */
const calcWidthShrink = ({ width, minWidth }, deltaX) => {
	const calculatedWidth = subtractWidth(deltaX, width);
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
		return { ...column, width: calcWidthShrink(column, deltaX) };
	}
	return { ...column, width };
};

/**
 * Increment the width if possible, and return the new width.
 * @param {number} deltaX
 * @param {integer} listWidth
 * @param {integer} currentTotalWidth
 */
const setEnlargingColumnWidth = (deltaX, listWidth, currentTotalWidth) => column => {
	const { width } = column;
	if (currentTotalWidth <= listWidth) {
		return { ...column, width: calcWidthEnlarge(column, deltaX, listWidth, currentTotalWidth) };
	}
	return { ...column, width };
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
	if (getIndexFn) {
		workingIndex = getIndexFn(index, columnsWidths);
	}
	const absDeltaX = transformDeltaValue(columnsWidths[workingIndex], deltaX);
	if (workingIndex >= 0) {
		const widthBeforeChange = columnsWidths[workingIndex].width;
		flow([
			setWidthFn(absDeltaX, listWidth, currentTotalWidth),
			setColumn(columnsWidths, workingIndex),
		])(columnsWidths[workingIndex]);
		return [
			columnsWidths,
			updateTotalCurrentWidth(
				currentTotalWidth,
				widthBeforeChange,
				columnsWidths[workingIndex].width,
			),
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
	if (deltaX < 0 && isLeftColumnAtMinimumWidth(columnsWidths, index)) {
		flow([shrinkLeftColumn(index), enlargeRightColumn(index, listWidth)])([
			columnsWidths,
			calcTotalCurrentWidth(columnsWidths),
			deltaX,
		]);
	}
	return columnsWidths;
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
export const resizeColumns = (deltaX, columnsWidths, listWidth, currentIndex) =>
	flow([
		cloneDeep,
		resizeRight(deltaX, currentIndex, listWidth),
		resizeLeft(deltaX, currentIndex, listWidth),
	])(columnsWidths);

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

const isFixedColumnWidth = (resizable, width, minWidth) =>
	!resizable || width <= minWidth;

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
