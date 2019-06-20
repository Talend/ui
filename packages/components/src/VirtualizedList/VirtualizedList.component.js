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

const addWidth = percentDelta => value => percentDelta + value;
const soustractWidth = percentDelta => value => percentDelta - value;
const calculateWidth = (index, calculFn) => columnsWidths => {
	const newWidths = [...columnsWidths];
	const { width } = columnsWidths[index];
	newWidths[index] = { ...columnsWidths[index], width: calculFn(width) };
	return newWidths;
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
	const TOTAL_WIDTH = 2000;
	const [widths, setWidths] = useState(columnsWidth);

	const resizeRow = (dataKey, deltaX) => {
		const percentDelta = deltaX;
		const currentIndexColumn = widths.findIndex(value => dataKey === value.dataKey);
		const nextIndexColumn = widths.length - 1 >= currentIndexColumn ? 0 : currentIndexColumn + 1;
		flow([
			calculateWidth(currentIndexColumn, addWidth(percentDelta)),
			calculateWidth(nextIndexColumn, soustractWidth(percentDelta)),
			setWidths,
		])(widths);
	};

	const columnDefinitions = toColumns({
		id,
		theme: tableTheme,
		children: columnDefinitionsWithSelection,
		widths,
		TOTAL_WIDTH,
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
						width={TOTAL_WIDTH}
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
