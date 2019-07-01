import flow from 'lodash/flow';

const MINIMUM_COLUMN_WIDTH = 40;

const getMinimumWidth = column => column.minWidth || MINIMUM_COLUMN_WIDTH;

const getWidth = (width, minWidth = MINIMUM_COLUMN_WIDTH) => (width <= minWidth ? minWidth : width);

/**
 * Search for the nearest index shrinkable on the right.
 * @param {integer} index
 * @param {array} columnsWidths
 */
const getShrinkIndexRight = (index, columnsWidths) => {
	for (let i = index + 1; i < columnsWidths.length; i += 1) {
		const next = i + 1;
		// Shrink columns on the right of the current, if resizable and width above minimal.
		if (columnsWidths[i].resizable && columnsWidths[i].width > getMinimumWidth(columnsWidths[i])) {
			return i;
			// Shrink the after first columns on the right, if the next one is already at minimal width.
		} else if (
			columnsWidths[i] === getMinimumWidth(columnsWidths[i]) &&
			next < columnsWidths.length - 1 &&
			columnsWidths[next].resizable &&
			columnsWidths[next].width > getMinimumWidth(columnsWidths[next])
		) {
			return next;
		}
	}
	return -1;
};

/**
 * Search for the nearest index enlargeable on the right.
 * @param {integer} index
 * @param {array} columnsWidths
 */
const getEnlargeIndexRight = (index, columnsWidths) => {
	const nextItemIndex = index + 1;
	const foundIndex = columnsWidths.slice(nextItemIndex).findIndex(colWidth => colWidth.resizable);
	return foundIndex === -1 ? -1 : nextItemIndex + foundIndex;
};

/**
 * Search for the nearest index shrinkable on the left.
 * @param {integer} index
 * @param {array} columnsWidths
 */
const getShrinkIndexLeft = (index, columnsWidths) => {
	const sliceAtCurrentItem = index + 1;
	return columnsWidths
		.slice(0, sliceAtCurrentItem)
		.findIndex(colWidth => colWidth.resizable && colWidth.width > getMinimumWidth(colWidth));
};

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

// const setColumnWidth = width => column => ({ ...column, width });

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
const resetListResized = columnsWidths => columnsWidths.map(setColumnResized(false));
// TODO: both return a new structure, could be improved ?
const setListWidth = listWidth => columnsWidths => columnsWidths.map(setColumnListWidth(listWidth));

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
	const calculatedWidth = addWidth(deltaX, width);
	const newTotal = currentTotalWidth + deltaX;
	if (newTotal >= listWidth) {
		const newX = listWidth - currentTotalWidth;
		const toto = width + newX;
		return toto;
	}
	return calculatedWidth;
};

const calcWidthShrink = ({ width, minWidth }, deltaX) => {
	const calculatedWidth = subtractWidth(deltaX, width);
	return getWidth(calculatedWidth, minWidth);
};

const calcWidth = shrink => deltaX => column => {
	const { currentTotalWidth, listWidth, width, minWidth = MINIMUM_COLUMN_WIDTH } = column;
	let newWidth = width;
	if (shrink && width >= minWidth) {
		newWidth = calcWidthShrink(column, deltaX);
	}
	if (!shrink && currentTotalWidth <= listWidth) {
		newWidth = calcWidthEnlarge(column, deltaX);
	}
	return { ...column, width: newWidth };
};

// const calcShrink = calcWidth(true);
// const calcEnlarge = calcWidth(false);

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
			calcWidth(true)(Math.abs(deltaX)),
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
			calcWidth(false)(Math.abs(deltaX)),
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
			calcWidth(true)(deltaX),
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
		flow([calcWidth(false)(deltaX), setColumnResized(true), setColumn(columnsWidths, index)])(
			columnsWidths[index],
		);
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
 * Clone the incoming collection, mutate it, and return new widths value.
 * @param {number} deltaX
 * @param {array} columnsWidths
 * @param {integer} currentIndex
 */
export const resizeColumns = (deltaX, columnsWidths, listWidth, currentIndex) =>
	flow([
		resetListResized,
		setListWidth(listWidth),
		calcTotalCurrentWidth,
		resizeRight(deltaX, currentIndex),
		resizeLeft(deltaX, currentIndex),
		calcTotalCurrentWidth,
	])(columnsWidths);

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
