import React, { useState, useEffect } from 'react';
import { AutoSizer } from 'react-virtualized';
import { listTypes } from './utils/constants';
import Loader from '../Loader';
import RendererSelector from './RendererSelector.component';
import Content from './Content.component';
import propTypes from './PropTypes';
import { insertSelectionConfiguration, toColumns } from './utils/tablerow';
import { resizeColumns, extractResizableProps } from './utils/resizable';
import theme from './VirtualizedList.scss';
import tableTheme from './ListTable/ListTable.scss';

import { virtualizedListContext } from './virtualizedListContext';

const { LARGE } = listTypes;

/**
 * Composable List based on react-virtualized
 */
function VirtualizedList(props) {
	const {
		children,
		collection,
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
	extractResizableProps(children);
	const columnDefinitionsWithSelection = insertSelectionConfiguration({
		children,
		collection,
		isSelected,
		onToggleAll,
		selectionToggle,
	});
	const [columnsWidths, setWidths] = useState([]);
	const [columnDataKeyResizing, setColumnDataKeyResizing] = useState([]);

	useEffect(() => {
		setWidths(extractResizableProps(React.Children.toArray(children)));
	}, []);

	const resizeRow = (dataKey, deltaX) => {
		const currentIndexColumn = columnsWidths.findIndex(value => dataKey === value.dataKey);
		if (currentIndexColumn >= 0) {
			const result = resizeColumns(deltaX, columnsWidths, currentIndexColumn);
			setWidths(result);
		}
	};

	const columnDefinitions = toColumns({
		id,
		theme: tableTheme,
		children: columnDefinitionsWithSelection,
		columnsWidths,
		columnDataKeyResizing,
	});

	if (type === LARGE && inProgress) {
		return <Loader id={id && `${id}-loader`} className={theme['tc-list-progress']} />;
	}
	return (
		<virtualizedListContext.Provider value={{ resizeRow, setColumnDataKeyResizing }}>
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
