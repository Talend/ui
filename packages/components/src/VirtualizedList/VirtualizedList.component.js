import React, { useEffect, useRef, useState } from 'react';
import { AutoSizer } from 'react-virtualized';
import get from 'lodash/get';
import { listTypes } from './utils/constants';
import Loader from '../Loader';
import RendererSelector from './RendererSelector.component';
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
		columnsWidthsControlled,
		setColumnsControlled,
	} = props;
	const columnDefinitionsWithSelection = insertSelectionConfiguration({
		children,
		collection,
		isSelected,
		onToggleAll,
		selectionToggle,
	});
	const [columnsWidthsState, setWidthsState] = useState();
	const rendererSelectorRef = useRef();

	const setWidths = setColumnsControlled || setWidthsState;
	const columnsWidths = columnsWidthsControlled || columnsWidthsState;

	// Settings the data for resizable columns only at mount.
	useEffect(() => {
		setWidths(extractResizableProps(React.Children.toArray(children)));
	}, []);

	const resizeColumn = (dataKey, deltaX) => {
		const listWidth = get(rendererSelectorRef, 'current.props.width', 0);
		setWidths(resizeColumns(deltaX, columnsWidths, listWidth, dataKey));
	};

	const getListWidth = () => get(rendererSelectorRef, 'current.props.width', 0);

	const getColumnWidth = dataKey => {
		if (columnsWidths) {
			return columnsWidths.find(item => item.dataKey === dataKey);
		}
		return { width: 0 };
	};

	const columnDefinitions = toColumns({
		id,
		theme: tableTheme,
		children: columnDefinitionsWithSelection,
		columnsWidths,
	});

	if (type === LARGE && inProgress) {
		return <Loader id={id && `${id}-loader`} className={theme['tc-list-progress']} />;
	}

	return (
		<virtualizedListContext.Provider value={{ resizeColumn, getListWidth, getColumnWidth }}>
			<AutoSizer>
				{({ height, width }) => (
					<RendererSelector
						ref={rendererSelectorRef}
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

export default VirtualizedList;
