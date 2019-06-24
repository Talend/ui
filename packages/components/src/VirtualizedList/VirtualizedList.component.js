import React, { useState } from 'react';
import { AutoSizer } from 'react-virtualized';
import flow from 'lodash/flow';
import { listTypes } from './utils/constants';
import Loader from '../Loader';
import RendererSelector from './RendererSelector.component';
import Content from './Content.component';
import propTypes from './PropTypes';
import { insertSelectionConfiguration, toColumns } from './utils/tablerow';
import theme from './VirtualizedList.scss';
import tableTheme from './ListTable/ListTable.scss';

import { virtualizedListContext } from './virtualizedListContext';

const { LARGE } = listTypes;

const MIN_COL_SIZE = 40;

const addWidth = percentDelta => value => percentDelta + value;
const soustractWidth = percentDelta => value => value - percentDelta;

const getWidth = (width, minWidth = MIN_COL_SIZE) => (width <= minWidth ? minWidth : width);

const calculateWidth = (index, calculFn) => columnsWidths => {
	const newWidths = [...columnsWidths];
	// if (index >= 0) {
	const { width } = columnsWidths[index];
	if (width >= 40) {
		const calculatedWidth = calculFn(width);
		newWidths[index] = {
			...columnsWidths[index],
			width: getWidth(calculatedWidth),
		};
	}
	// }
	return newWidths;
};

const setResized = index => collection => {
	const collectionCopy = [...collection];
	collectionCopy[index] = { ...collectionCopy[index], resized: true };
	return collectionCopy;
};

/**
 * Composable List based on react-virtualized
 */
function VirtualizedList(props) {
	const {
		children,
		collection,
		columnsWidth,
		defaultHeight,
		disableHeader,
		noRowsRenderer,
		id,
		isActive,
		isSelected,
		inProgress,
		onRowClick,
		onRowDoubleClick,
		onRowsRendered,
		onScroll,
		onToggleAll,
		registerChild,
		rowHeight,
		rowRenderers,
		scrollToIndex,
		selectionToggle,
		sort,
		sortBy,
		sortDirection,
		rowCount,
		type,
	} = props;
	const columnDefinitionsWithSelection = insertSelectionConfiguration({
		collection,
		isSelected,
		selectionToggle,
		onToggleAll,
		children,
	});
	const [widths, setWidths] = useState(columnsWidth);

	const getShrinkIndexRight = index => {
		for (let i = index + 1; i < widths.length; i += 1) {
			const next = i + 1;
			// Shrink columns on the right of the current, if resizable and width above minimal.
			if (widths[i].resizable && widths[i].width > 40) {
				return i;
			// Shrink the after first columns on the right, if the next one is already at minimal width.
			} else if (
				widths[i] === 40 &&
				next < widths.length - 1 &&
				widths[next].resizable &&
				widths[next].width > 40
			) {
				return next;
			}
		}
		return -1;
	};

	const getEnlargeIndexRight = index => {
		for (let i = index + 1; i < widths.length; i += 1) {
			// Enlarge right columns when the current one is at minimal width.
			if (widths[i].resizable && widths[index] === 40) {
				return i;
			}
			// Enlarge the last column only if trigger by the before last column.
			if (
				index === widths.length - 2 &&
				i === widths.length - 1 &&
				widths[i].resizable
			) {
				return i;
			}
		}
		return -1;
	};

	const getSkrinkIndexLeft = index => {
		for (let i = index; i >= 0; i -= 1) {
			const previous = i - 1;
			// Shrink column at left, if above minimal width.
			if (widths[i].resizable && widths[i].width > 40) {
				return i;
			// Shrink the after first colum on the left, if the previous one is already at minimal width.
			} else if (widths[i] === 40 && previous < 0 && widths[previous].resizable) {
				return previous;
			}
		}
		return -1;
	};

	const resizeRow = (dataKey, deltaX) => {
		const resetWidths = widths.map(item => ({ ...item, resized: false }));
		const currentIndexColumn = widths.findIndex(value => dataKey === value.dataKey);
		console.log({ deltaX });
		let toto = resetWidths;
		if (deltaX >= 0) {
			const shrinkIndexRight = getShrinkIndexRight(currentIndexColumn);
			if (currentIndexColumn >= 0) {
				toto = flow([
					calculateWidth(currentIndexColumn, addWidth(deltaX), setResized(currentIndexColumn)),
				])(toto);
			}
			if (shrinkIndexRight >= 0) {
				toto = flow([
					calculateWidth(shrinkIndexRight, soustractWidth(deltaX)),
					setResized(shrinkIndexRight),
				])(toto);
			}
		} else {
			const shrinkIndexLeft = getSkrinkIndexLeft(currentIndexColumn);
			const enlargeIndexRight = getEnlargeIndexRight(currentIndexColumn);
			if (shrinkIndexLeft >= 0) {
				toto = flow([
					calculateWidth(shrinkIndexLeft, soustractWidth(Math.abs(deltaX))),
					setResized(shrinkIndexLeft),
				])(toto);
			}
			if (enlargeIndexRight >= 0) {
				toto = flow([
					calculateWidth(enlargeIndexRight, addWidth(Math.abs(deltaX))),
					setResized(enlargeIndexRight),
				])(toto);
			}
		}
		console.log({ toto });
		setWidths(toto);
	};

	const columnDefinitions = toColumns({
		id,
		theme: tableTheme,
		children: columnDefinitionsWithSelection,
		widths,
	});

	if (type === LARGE && inProgress) {
		return <Loader id={id && `${id}-loader`} className={theme['tc-list-progress']} />;
	}
	return (
		<virtualizedListContext.Provider value={{ resizeRow }}>
			<AutoSizer>
				{({ height, width }) => (
					<RendererSelector
						collection={collection}
						noRowsRenderer={noRowsRenderer}
						height={height || defaultHeight}
						id={id}
						isActive={isActive}
						isSelected={isSelected}
						onRowClick={onRowClick}
						onRowDoubleClick={onRowDoubleClick}
						onScroll={onScroll}
						rowHeight={rowHeight}
						sort={sort}
						sortBy={sortBy}
						sortDirection={sortDirection}
						type={type}
						width={width}
						disableHeader={disableHeader}
						inProgress={inProgress}
						rowRenderers={rowRenderers}
						rowCount={rowCount}
						onRowsRendered={onRowsRendered}
						registerChild={registerChild}
						scrollToIndex={scrollToIndex}
					>
						{columnDefinitions}
					</RendererSelector>
				)}
			</AutoSizer>
		</virtualizedListContext.Provider>
	);
}

VirtualizedList.displayName = 'VirtualizedList';
VirtualizedList.propTypes = propTypes;
VirtualizedList.defaultProps = {
	defaultHeight: 250,
};

VirtualizedList.Content = Content;

export default VirtualizedList;
