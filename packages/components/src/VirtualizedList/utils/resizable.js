import flow from 'lodash/flow';

const getShrinkIndexRight = (index, columnsWidths) => {
	for (let i = index + 1; i < columnsWidths.length; i += 1) {
		const next = i + 1;
		// Shrink columns on the right of the current, if resizable and width above minimal.
		if (columnsWidths[i].resizable && columnsWidths[i].width > 40) {
			return i;
			// Shrink the after first columns on the right, if the next one is already at minimal width.
		} else if (
			columnsWidths[i] === 40 &&
			next < columnsWidths.length - 1 &&
			columnsWidths[next].resizable &&
			columnsWidths[next].width > 40
		) {
			return next;
		}
	}
	return -1;
};

const getEnlargeIndexRight = (index, columnsWidths) => {
	for (let i = index + 1; i < columnsWidths.length; i += 1) {
		// Enlarge right columns when the current one is at minimal width.
		if (columnsWidths[i].resizable && columnsWidths[index] === 40) {
			return i;
		}
		// Enlarge the last column only if trigger by the before last column.
		if (
			index === columnsWidths.length - 2 &&
			i === columnsWidths.length - 1 &&
			columnsWidths[i].resizable
		) {
			return i;
		}
	}
	return -1;
};

const getSkrinkIndexLeft = (index, columnsWidths) => {
	for (let i = index; i >= 0; i -= 1) {
		const previous = i - 1;
		// Shrink column at left, if above minimal width.
		if (columnsWidths[i].resizable && columnsWidths[i].width > 40) {
			return i;
			// Shrink the after first colum on the left,
			// if the previous one is already at minimal width.
		} else if (columnsWidths[i] === 40 && previous < 0 && columnsWidths[previous].resizable) {
			return previous;
		}
	}
	return -1;
};
/**
 * Set the collection with the value, and return it.
 * @param {boolean} resized the value to set.
 */
const setResized = resized => column => ({ ...column, resized });

export const resetResized = columnsWidths => columnsWidths.map(setResized(false));

const addWidth = percentDelta => value => percentDelta + value;

const soustractWidth = percentDelta => value => value - percentDelta;

const getWidth = (width, minWidth = 40) => (width <= minWidth ? minWidth : width);

const calculateWidth = calculFn => column => {
	const { width } = column;
	if (width >= 40) {
		const calculatedWidth = calculFn(width);
		return {
			...column,
			width: getWidth(calculatedWidth),
		};
	}
	return column;
};

const setColumn = (columnsWidths, index) => column => {
	// eslint-disable-next-line no-param-reassign
	columnsWidths[index] = column;
	return columnsWidths;
};

export const shrinkLeftColumn = (deltaX, index) => columnsWidths => {
	const shrinkIndexLeft = getSkrinkIndexLeft(index, columnsWidths);
	if (shrinkIndexLeft >= 0) {
		flow([
			calculateWidth(soustractWidth(Math.abs(deltaX))),
			setResized(true),
			setColumn(columnsWidths, shrinkIndexLeft),
		])(columnsWidths[shrinkIndexLeft]);
	}
	return columnsWidths;
};

export const enlargeRightColumn = (deltaX, index) => columnsWidths => {
	const enlargeIndexRight = getEnlargeIndexRight(index, columnsWidths);
	if (enlargeIndexRight >= 0) {
		flow([
			calculateWidth(addWidth(Math.abs(deltaX))),
			setResized(true),
			setColumn(columnsWidths, enlargeIndexRight),
		])(columnsWidths[enlargeIndexRight]);
	}
	return columnsWidths;
};

export const shrinkRightColumn = (deltaX, index) => columnsWidths => {
	const shrinkIndexRight = getShrinkIndexRight(index, columnsWidths);
	if (shrinkIndexRight >= 0) {
		flow([
			calculateWidth(soustractWidth(deltaX)),
			setResized(true),
			setColumn(columnsWidths, shrinkIndexRight),
		])(columnsWidths[shrinkIndexRight]);
	}
	return columnsWidths;
};

export const enlargeCurrentColumn = (deltaX, index) => columnsWidths => {
	if (index >= 0) {
		flow([calculateWidth(addWidth(deltaX)), setResized(true), setColumn(columnsWidths, index)])(
			columnsWidths[index],
		);
	}
	return columnsWidths;
};

export const resizeRight = (deltaX, index) => columnsWidths => {
	if (deltaX >= 0) {
		flow([enlargeCurrentColumn(deltaX, index), shrinkRightColumn(deltaX, index)])(columnsWidths);
	}
	return columnsWidths;
};

export const resizeLeft = (deltaX, index) => columnsWidths => {
	if (deltaX < 0) {
		flow([shrinkLeftColumn(deltaX, index), enlargeRightColumn(deltaX, index)])(columnsWidths);
	}
	return columnsWidths;
};

/**
 * Clone the incoming collection, mutate it, and return new widths value.
 * @param {number} deltaX
 * @param {array} columnsWidths
 * @param {integer} currentIndex
 */
export const resizeColumns = (deltaX, columnsWidths, currentIndex) => {
	// const cloneColumnsWidths = [...columnsWidths];
	return flow([resetResized, resizeRight(deltaX, currentIndex), resizeLeft(deltaX, currentIndex)])(
		columnsWidths,
	);
	// return cloneColumnsWidths;
};
