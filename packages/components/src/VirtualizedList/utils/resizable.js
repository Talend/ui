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
 * Set the collection with the value, and return it.
 * @param {integer} listWidth
 */
const setColumnListWidth = listWidth => column => ({ ...column, listWidth });

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
 * Set all the array elements to resized false and with the widthList.
 * @param {array} columnsWidths
 */
const prepareColumnsWidthsForResize = listWidth => columnsWidths =>
	columnsWidths.map(
		flow(
			setColumnResized(false),
			setColumnListWidth(listWidth),
		),
	);

const addWidth = (deltaX, value) => deltaX + value;

const subtractWidth = (deltaX, value) => value - deltaX;

const calcTotalCurrentWidth = columnsWidths => {
	let currentTotalWidth = 0;
	columnsWidths.forEach(column => {
		if (column.width) {
			currentTotalWidth += column.width;
		}
	});
	columnsWidths.forEach(column => {
		// eslint-disable-next-line no-param-reassign
		column.currentTotalWidth = currentTotalWidth;
	});
	return columnsWidths;
};
/**
 * Calculate the new width the parameter function, and assign the result to the given column.
 * @param {function} calcFn
 */

const calcWidthEnlarge = ({ currentTotalWidth, listWidth, width }, deltaX) => {
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

const setEnlargingColumnWidth = deltaX => column => {
	const { currentTotalWidth, listWidth, width } = column;
	if (currentTotalWidth <= listWidth) {
		return { ...column, width: calcWidthEnlarge(column, deltaX) };
	}
	return { ...column, width };
};

/**
 * Get the nearest column index to shrink on the left side of the given index,
 * and update the corresponding column with computed width.
 * @param {number} deltaX
 * @param {integer} index
 */
const shrinkLeftColumn = (deltaX, index) => columnsWidths => {
	const shrinkIndexLeft = getShrinkIndexLeft(index, columnsWidths);
	if (shrinkIndexLeft >= 0) {
		flow([
			setShrinkingColumnWidth(Math.abs(deltaX)),
			setColumnResized(true),
			setColumn(columnsWidths, shrinkIndexLeft),
		])(columnsWidths[shrinkIndexLeft]);
	}
	return columnsWidths;
};

/**
 * Get the nearest column index to enlarge on the right side of the given index,
 * and update the corresponding column with computed width.
 * @param {number} deltaX
 * @param {integer} index
 */
const enlargeRightColumn = (deltaX, index) => columnsWidths => {
	const enlargeIndexRight = getEnlargeIndexRight(index, columnsWidths);
	if (enlargeIndexRight >= 0) {
		flow([
			setEnlargingColumnWidth(Math.abs(deltaX)),
			setColumnResized(true),
			setColumn(columnsWidths, enlargeIndexRight),
		])(columnsWidths[enlargeIndexRight]);
	}
	return columnsWidths;
};

/**
 * Get the nearest column index to shrink on the right side of the given index,
 * and update the corresponding column with computed width.
 * @param {number} deltaX
 * @param {integer} index
 */
const shrinkRightColumn = (deltaX, index) => columnsWidths => {
	const shrinkIndexRight = getShrinkIndexRight(index, columnsWidths);
	if (shrinkIndexRight >= 0) {
		flow([
			setShrinkingColumnWidth(deltaX),
			setColumnResized(true),
			setColumn(columnsWidths, shrinkIndexRight),
		])(columnsWidths[shrinkIndexRight]);
	}
	return columnsWidths;
};

/**
 * Enlarge the column index.
 * @param {number} deltaX
 * @param {integer} index
 */
const enlargeCurrentColumn = (deltaX, index) => columnsWidths => {
	if (index >= 0) {
		flow([
			setEnlargingColumnWidth(deltaX),
			setColumnResized(true),
			setColumn(columnsWidths, index),
		])(columnsWidths[index]);
	}
	return columnsWidths;
};

/**
 * Flow of operations to handle dragging column to the right.
 * @param {number} deltaX
 * @param {integer} index
 */
const resizeRight = (deltaX, index) => columnsWidths => {
	if (deltaX >= 0) {
		flow([
			shrinkRightColumn(deltaX, index),
			calcTotalCurrentWidth,
			enlargeCurrentColumn(deltaX, index),
		])(columnsWidths);
	}
	return columnsWidths;
};

/**
 * Flow of operations to handle dragging column to the right.
 * @param {number} deltaX
 * @param {integer} index
 */
const resizeLeft = (deltaX, index) => columnsWidths => {
	if (deltaX < 0) {
		flow([
			shrinkLeftColumn(deltaX, index),
			calcTotalCurrentWidth,
			enlargeRightColumn(deltaX, index),
		])(columnsWidths);
	}
	return columnsWidths;
};

/**
 * This is the entry point of the resize functionality.
 * Clone the incoming collection, mutate it, and return new widths value.
 * @param {number} deltaX
 * @param {array} columnsWidths
 * @param {integer} currentIndex
 */
export const resizeColumns = (deltaX, columnsWidths, listWidth, currentIndex) =>
	flow([
		prepareColumnsWidthsForResize(listWidth),
		resizeRight(deltaX, currentIndex),
		resizeLeft(deltaX, currentIndex),
		calcTotalCurrentWidth,
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
