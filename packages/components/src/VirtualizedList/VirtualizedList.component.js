import React, { useEffect, useRef, useState } from 'react';
import { AutoSizer } from 'react-virtualized';
import get from 'lodash/get';
import { listTypes, SELECTION_MODE } from './utils/constants';
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
		getRowState,
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
		selectionMode,
		sort,
		sortBy,
		sortDirection,
		rowCount,
		type,
		widthsOfColumns,
		setWidthsOfColumns,
	} = props;
	const columnDefinitionsWithSelection = insertSelectionConfiguration({
		children,
		collection,
		isSelected,
		onToggleAll,
		selectionToggle,
		getRowState,
		selectionMode,
	});
	const [widthsOfColumnsState, setWidthsOfColumnsState] = useState();
	const rendererSelectorRef = useRef();

	const setWidths = setWidthsOfColumns || setWidthsOfColumnsState;
	const columnsWidths = widthsOfColumns || widthsOfColumnsState;

	// Settings the data for resizable columns only at mount.
	useEffect(() => {
		setWidths(extractResizableProps(React.Children.toArray(children)));
	}, []);

	const resizeColumn = (dataKey, deltaX) => {
		const listWidth = get(rendererSelectorRef, 'current.props.width', 0);
		setWidths(resizeColumns(deltaX, columnsWidths, listWidth, dataKey));
	};

	const columnDefinitions = toColumns({
		id,
		theme: tableTheme,
		children: columnDefinitionsWithSelection,
		columnsWidths,
		getRowState,
	});

	if (type === LARGE && inProgress) {
		return <Loader id={id && `${id}-loader`} className={theme['tc-list-progress']} />;
	}

	return (
		<virtualizedListContext.Provider value={{ resizeColumn }}>
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
						getRowState={getRowState}
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
	selectionMode: SELECTION_MODE.MULTI,
};

export default VirtualizedList;
