import React from 'react';

import { useListContext } from '../context';
import VirtualizedList from '../../../VirtualizedList';

function VList(props) {
	const { displayMode = 'table', collection } = useListContext();
	return <VirtualizedList collection={collection} type={displayMode.toUpperCase()} {...props} />;
}

VList.Content = VirtualizedList.Content;
VList.propTypes = VirtualizedList.propTypes;

export default VList;
