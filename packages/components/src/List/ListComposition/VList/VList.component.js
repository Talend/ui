import React from 'react';
import get from 'lodash/get';

import { useListContext } from '../context';
import VirtualizedList from '../../../VirtualizedList';
import { DISPLAY_MODE, SORT } from '../constants';

import theme from '../List.scss';

function VList(props) {
	const {
		displayMode = DISPLAY_MODE.TABLE,
		collection,
		setSortParams,
		sortParams,
	} = useListContext();
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
				{...props}
			/>
		</div>
	);
}

// we port the VirtualizedList columns to VList to allow VList.Title/Badge/...
Object.entries(VirtualizedList).forEach(([key, value]) => {
	VList[key] = value;
});
VList.displayName = 'VList';
export default VList;
