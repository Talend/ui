import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';

import { useListContext } from '../context';
import VirtualizedList from '../../../VirtualizedList';
import { DISPLAY_MODE, SORT } from '../constants';

import theme from '../List.scss';

function VList({ children, ...rest }) {
	const {
		displayMode = DISPLAY_MODE.TABLE,
		collection,
		visibleColumns,
		setSortParams,
		sortParams,
		setColumns,
		columns,
	} = useListContext();

	React.useEffect(() => {
		if (Array.isArray(children)) {
			const next = children.filter(column => column.props?.dataKey).map(column => column.props);
			if (!isEqual(map(next, 'dataKey'), map(columns, 'dataKey'))) {
				setColumns(next);
			}
		}
	}, [children, setColumns]);

	return (
		<div className={theme.vlist}>
			<VirtualizedList
				collection={collection}
				type={displayMode.toUpperCase()}
				sortBy={get(sortParams, 'sortBy')}
				sortDirection={get(sortParams, 'isDescending') ? SORT.DESC : SORT.ASC}
				sort={({ sortBy, sortDirection }) =>
					setSortParams({ sortBy, isDescending: sortDirection === SORT.DESC })
				}
				{...rest}
			>
				{visibleColumns
					? children.filter(column => visibleColumns?.includes(column.props?.dataKey))
					: children}
			</VirtualizedList>
		</div>
	);
}

VList.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
};

// we port the VirtualizedList columns to VList to allow VList.Title/Badge/...
Object.entries(VirtualizedList).forEach(([key, value]) => {
	VList[key] = value;
});
VList.displayName = 'VList';
export default VList;
