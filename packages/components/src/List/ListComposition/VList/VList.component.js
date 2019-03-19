import React from 'react';

import { useListContext } from '../context';
import VirtualizedList from '../../../VirtualizedList';

function VList(props) {
	const { displayMode = 'table', collection } = useListContext();
	return <VirtualizedList collection={collection} type={displayMode.toUpperCase()} {...props} />;
}
Object.entries({ ...VirtualizedList }).forEach(([key, value]) => {
	VList[key] = value;
});
VList.displayName = 'List.VList';

export default VList;
