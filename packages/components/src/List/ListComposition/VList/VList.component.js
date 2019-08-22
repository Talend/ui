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

VList.Content = VirtualizedList.Content;
VList.propTypes = VirtualizedList.propTypes;

export default VList;
