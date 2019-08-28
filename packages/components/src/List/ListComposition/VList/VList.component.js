import React from 'react';

import { useListContext } from '../context';
import VirtualizedList from '../../../VirtualizedList';
import { DISPLAY_MODE, SORT } from '../constants';

function VList(props) {
	const {
		displayMode = DISPLAY_MODE.TABLE,
		collection,
		setSortParams,
		sortParams,
	} = useListContext();
	return (
		<VirtualizedList
			collection={collection}
			type={displayMode.toUpperCase()}
			sortBy={sortParams.sortBy}
			sortDirection={sortParams.isDescending ? SORT.DESC : SORT.ASC}
			sort={({ sortBy, sortDirection }) =>
				setSortParams({ sortBy, isDescending: sortDirection === SORT.DESC })
			}
			{...props}
		/>
	);
}

// we port the VirtualizedList columns to VList to allow VList.Title/Badge/...
Object.entries(VirtualizedList).forEach(([key, value]) => {
	VList[key] = value;
});
VList.displayName = 'VList';
export default VList;
