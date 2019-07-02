import flow from 'lodash/flow';
import findLastIndex from 'lodash/findLastIndex';
import findIndex from 'lodash/findIndex';

const MINIMUM_COLUMN_WIDTH = 40;

const getMinimumWidth = column => column.minWidth || MINIMUM_COLUMN_WIDTH;

const getWidth = (width, minWidth = MINIMUM_COLUMN_WIDTH) => (width <= minWidth ? minWidth : width);

const isShrinkable = column => column.resizable && column.width > getMinimumWidth(column);

const isEnlargeable = column => column.resizable;

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

/**
 * Set the collection with the value, and return it.
 * @param {boolean} resized the value to set.
 */
const setColumnResized = resized => column => ({ ...column, resized });

/**
 * Set a new column to the current list.
 * @param {array} columnsWidths
 * @param {integer} index
 */
const setColumn = (columnsWidths, index) => column => {
	// eslint-disable-next-line no-param-reassign
	columnsWidths[index] = column;
	return columnsWidths;
};

/**
 * Set all the array elements to resized false.
 * @param {array} columnsWidths
 */
const prepareColumnsWidthsForResize = columnsWidths => columnsWidths.map(setColumnResized(false));

const addWidth = (deltaX, value) => deltaX + value;

const subtractWidth = (deltaX, value) => value - deltaX;

const calcTotalCurrentWidth = columnsWidths => {
	let currentTotalWidth = 0;
	columnsWidths.forEach(column => {
		if (column.width) {
			currentTotalWidth += column.width;
		}
	});
	return [columnsWidths, currentTotalWidth];
};
/**
 * Calculate the new width the parameter function, and assign the result to the given column.
 * @param {function} calcFn
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

const calcWidthShrink = ({ width, minWidth }, deltaX) => {
	const calculatedWidth = subtractWidth(deltaX, width);
	return getWidth(calculatedWidth, minWidth);
};

const setShrinkingColumnWidth = deltaX => column => {
	const { width, minWidth = MINIMUM_COLUMN_WIDTH } = column;
	if (width >= minWidth) {
		return { ...column, width: calcWidthShrink(column, deltaX) };
	}
	return { ...column, width };
};

const setEnlargingColumnWidth = (deltaX, listWidth, currentTotalWidth) => column => {
	const { width } = column;
	if (currentTotalWidth <= listWidth) {
		return { ...column, width: calcWidthEnlarge(column, deltaX, listWidth, currentTotalWidth) };
	}
	return { ...column, width };
};

/**
 * This is a function factory. 
 * @param {function} setWidthFn
 * @param {function} getIndexFn
 */
const changeWidthColumn = (setWidthFn, getIndexFn) => (deltaX, index, listWidth) => ([
	columnsWidths,
	currentTotalWidth,
]) => {
	let workingIndex = index;
	if (getIndexFn) {
		workingIndex = getIndexFn(index, columnsWidths);
	}
	if (workingIndex >= 0) {
		const widthBeforeChange = columnsWidths[workingIndex].width;
		flow([
			setWidthFn(deltaX, listWidth, currentTotalWidth),
			setColumnResized(true),
			setColumn(columnsWidths, workingIndex),
		])(columnsWidths[workingIndex]);
		return [
			columnsWidths,
			currentTotalWidth - widthBeforeChange + columnsWidths[workingIndex].width,
		];
	}
	return [columnsWidths, currentTotalWidth];
};

/**
 * Get the nearest column index to shrink on the left side of the given index,
 * and update the corresponding column with computed width.
 * @param {number} deltaX
 * @param {integer} index
 */
const shrinkLeftColumn = changeWidthColumn(setShrinkingColumnWidth, getShrinkIndexLeft);

/**
 * Get the nearest column index to enlarge on the right side of the given index,
 * and update the corresponding column with computed width.
 * @param {number} deltaX
 * @param {integer} index
 */
const enlargeRightColumn = changeWidthColumn(setEnlargingColumnWidth, getEnlargeIndexRight);

/**
 * Get the nearest column index to shrink on the right side of the given index,
 * and update the corresponding column with computed width.
 * @param {number} deltaX
 * @param {integer} index
 */
const shrinkRightColumn = changeWidthColumn(setShrinkingColumnWidth, getShrinkIndexRight);

/**
 * Enlarge the column index.
 * @param {number} deltaX
 * @param {integer} index
 */
const enlargeCurrentColumn = changeWidthColumn(setEnlargingColumnWidth);

/**
 * Flow of operations to handle dragging column to the right.
 * @param {number} deltaX
 * @param {integer} index
 */
const resizeRight = (deltaX, index, listWidth) => columnsWidths => {
	if (deltaX >= 0) {
		flow([
			calcTotalCurrentWidth,
			shrinkRightColumn(deltaX, index),
			enlargeCurrentColumn(deltaX, index, listWidth),
		])(columnsWidths);
	}
	return columnsWidths;
};

/**
 * Flow of operations to handle dragging column to the left.
 * @param {number} deltaX
 * @param {integer} index
 */
const resizeLeft = (deltaX, index, listWidth) => columnsWidths => {
	if (deltaX < 0) {
		flow([
			calcTotalCurrentWidth,
			shrinkLeftColumn(Math.abs(deltaX), index),
			enlargeRightColumn(Math.abs(deltaX), index, listWidth),
		])(columnsWidths);
	}
	return columnsWidths;
};

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
		prepareColumnsWidthsForResize,
		resizeRight(deltaX, currentIndex, listWidth),
		resizeLeft(deltaX, currentIndex, listWidth),
	])(columnsWidths);

/*-----------------------------------------------------------------------------------
	Above you can see the code dedicated to the resizable functionality.
	Bottom it's tools used in the virtualized list component.
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

const isFixedColumnWidth = (resizable, resized, width, minWidth) =>
	!resizable || !resized || width <= minWidth;

export const createColumnWidthProps = columnsWidthsParams => {
	if (!columnsWidthsParams) {
		return undefined;
	}
	const { resized, resizable, width, minWidth } = columnsWidthsParams;
	if (isFixedColumnWidth(resized, resizable, width, minWidth)) {
		return {
			width,
			flexShrink: 0,
			flexGrow: 0,
		};
	}
	return { width };
};
