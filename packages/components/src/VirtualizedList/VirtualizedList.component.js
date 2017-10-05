import React from 'react';
import { AutoSizer, Column } from 'react-virtualized';
import RendererSelector from './RendererSelector.component';
import propTypes from './PropTypes';
import { insertSelectionConfiguration } from './utils/tablerow';

import Status from './../Status';
/**
 * Composable List based on react-virtualized
 */
function VirtualizedList(props) {
	const {
		collection,
		children,
		id,
		isActive,
		isSelected,
		inProgress,
		onRowClick,
		rowHeight,
		selectionToggle,
		sort,
		sortBy,
		sortDirection,
		type,
		t,
	} = props;

	const contentsConfiguration = insertSelectionConfiguration({
		children,
		isSelected,
		selectionToggle,
	});

	if (inProgress) {
		return (
			<div className="tc-list-progress">
				<Status
					status="inProgress"
					label={t('LIST_LOADING_LABEL', { defaultValue: 'Loading...' })}
				/>
			</div>
		);
	}
	return (
		<AutoSizer>
			{({ height, width }) => (
				<RendererSelector
					collection={collection}
					height={height}
					id={id}
					isActive={isActive}
					isSelected={isSelected}
					onRowClick={onRowClick}
					rowHeight={rowHeight}
					selectionToggle={selectionToggle}
					sort={sort}
					sortBy={sortBy}
					sortDirection={sortDirection}
					type={type}
					width={width}
				>
					{contentsConfiguration}
				</RendererSelector>
			)}
		</AutoSizer>
	);
}
VirtualizedList.displayName = 'VirtualizedList';
VirtualizedList.propTypes = propTypes;

VirtualizedList.Content = Column;

export default VirtualizedList;
