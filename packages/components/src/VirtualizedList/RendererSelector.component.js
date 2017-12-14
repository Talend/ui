import PropTypes from 'prop-types';
import React from 'react';
import { listTypes } from './utils/constants';
import { rowDictionary } from './utils/dictionary';
import ListTable from './ListTable';
import ListGrid from './ListGrid';
import CircularProgress from './../CircularProgress';
import propTypes from './PropTypes';

import theme from './VirtualizedList.scss';

const { TABLE } = listTypes;

/**
 * Select the ListGrid row renderer to use
 * @param type The row renderer type
 */
function getRowRenderer(type) {
	const rowRenderer = rowDictionary[type];
	if (!rowRenderer) {
		const rowRendererTypes = [TABLE].concat(Object.keys(rowDictionary));
		throw new Error(
			`Unknown row renderer in Virtualized List : ${type}. ` +
				`Possible values are [${rowRendererTypes}].`,
		);
	}
	return rowRenderer;
}

/**
 * Component that maps list types to the corresponding component
 */
function RendererSelector(props) {
	const {
		children,
		collection,
		height,
		id,
		isSelected,
		isActive,
		onRowClick,
		rowHeight,
		selectionToggle,
		sort,
		sortBy,
		sortDirection,
		type,
		width,
		disableHeader,
		inProgress,
		t,
	} = props;

	if (type === TABLE) {
		return (
			<ListTable
				collection={collection}
				disableHeader={disableHeader}
				height={height}
				id={id}
				isActive={isActive}
				isSelected={isSelected}
				onRowClick={onRowClick}
				selectionToggle={selectionToggle}
				sort={sort}
				sortBy={sortBy}
				sortDirection={sortDirection}
				rowHeight={rowHeight}
				width={width}
				inProgress={inProgress}
				t={t}
			>
				{children}
			</ListTable>
		);
	}

	// FIXME [NC]: waiting for Loader component to be merged
	function Loader() {
		return (
			<div aria-atomic="true" aria-busy="true" className={theme['tc-list-progress']}>
				<CircularProgress size={'default'} />
			</div>
		);
	}

	return inProgress ?
		<Loader /> :
		(
			<ListGrid
				collection={collection}
				height={height}
				id={id}
				isActive={isActive}
				isSelected={isSelected}
				onRowClick={onRowClick}
				rowHeight={rowHeight}
				rowRenderer={getRowRenderer(type)}
				selectionToggle={selectionToggle}
				width={width}
				t={t}
			>
				{children}
			</ListGrid>
		);
}
RendererSelector.displayName = 'VirtualizedList(RendererSelector)';
RendererSelector.propTypes = {
	...propTypes,
	height: PropTypes.number,
	width: PropTypes.number,
};
RendererSelector.defaultProps = {
	type: TABLE,
};

export default RendererSelector;
