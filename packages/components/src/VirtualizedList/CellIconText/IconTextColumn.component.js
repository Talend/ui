import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import CellIconText from './CellIconText.component';

export const cellType = 'icontext';
export const iconTextColumnConfiguration = {
	cellRenderer: props => <CellIconText {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function IconTextColumn() {
	return null;
}
IconTextColumn.defaultProps = {
	...defaultColumnConfiguration,
	...iconTextColumnConfiguration,
};
