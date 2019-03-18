import React from 'react';

import { ListContext } from '../context';
import VirtualizedList from '../../../VirtualizedList';

function VList(props) {
	return (
		<ListContext.Consumer>
			{({ displayMode, collection }) => (
				<VirtualizedList
					collection={collection}
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
VList.displayName = 'ListContext(List.VList)';

export default VList;
