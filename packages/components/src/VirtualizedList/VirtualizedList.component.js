import React from 'react';
import { AutoSizer, Column } from 'react-virtualized';

import { listTypes } from './utils/constants';
import { getDefaultTranslate } from '../translate';
import Loader from '../Loader';
import RendererSelector from './RendererSelector.component';
import propTypes from './PropTypes';
import { insertSelectionConfiguration } from './utils/tablerow';
import theme from './VirtualizedList.scss';

const { LARGE } = listTypes;

/**
 * Composable List based on react-virtualized
 */
function VirtualizedList(props) {
	const {
		collection,
		children,
		defaultHeight,
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
		disableHeader,
		t,
	} = props;

	const contentsConfiguration = insertSelectionConfiguration({
		children,
		isSelected,
		selectionToggle,
	});

	if (type === LARGE && inProgress) {
		return <Loader id={id && `${id}-loader`} className={theme['tc-list-progress']} />;
	}

	return (
		<AutoSizer>
			{({ height, width }) => (
				<RendererSelector
					collection={collection}
					height={height || defaultHeight}
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
					disableHeader={disableHeader}
					inProgress={inProgress}
					t={t}
				>
					{contentsConfiguration}
				</RendererSelector>
			)}
		</AutoSizer>
	);
}

VirtualizedList.displayName = 'VirtualizedList';
VirtualizedList.propTypes = propTypes;
VirtualizedList.defaultProps = {
	defaultHeight: 250,
	t: getDefaultTranslate,
};

VirtualizedList.Content = Column;

export default VirtualizedList;
