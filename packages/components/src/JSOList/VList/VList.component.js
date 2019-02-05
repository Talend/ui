import React from 'react';

import { ListContext } from '../context';
import VirtualizedList, { SORT_BY } from '../../VirtualizedList';

function VList(props) {
	return (
		<ListContext.Consumer>
			{({ displayMode, collection, isSelected, sortBy, sortDescending, onSortChange }) => (
				<VirtualizedList
					collection={collection}
					isSelected={isSelected}
					sortBy={sortBy}
					sortDirection={sortDescending ? SORT_BY.DESC : SORT_BY.ASC}
					sort={sort =>
						onSortChange(null, {
							sortBy: sort.sortBy,
							isDescending: sort.sortDirection === SORT_BY.DESC,
						})
					}
					type={displayMode && displayMode.toUpperCase()}
					{...props}
				/>
			)}
		</ListContext.Consumer>
	);
}
Object.entries({ ...VirtualizedList }).forEach(([key, value]) => {
	VList[key] = value;
});
VList.displayName = 'List.VList';

export default VList;
