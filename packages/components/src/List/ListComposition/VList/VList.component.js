import React from 'react';

import { useListContext } from '../context';
import VirtualizedList from '../../../VirtualizedList';

function VList(props) {
	const { displayMode = 'table', collection, setSortParams, sortParams } = useListContext();
	return (
		<VirtualizedList
			collection={collection}
			type={displayMode.toUpperCase()}
			sortBy={sortParams.sortBy}
			sortDirection={sortParams.isDescending ? 'DESC' : 'ASC'}
			sort={({ sortBy, sortDirection }) =>
				setSortParams({ sortBy, isDescending: sortDirection === 'DESC' })
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
