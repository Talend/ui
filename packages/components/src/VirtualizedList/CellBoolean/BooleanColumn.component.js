import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import CellBoolean from './CellBoolean.component';

export const cellType = 'texticon';
export const booleanColumnConfiguration = {
	cellRenderer: props => <CellBoolean {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function BooleanColumn() {
	return null;
}

BooleanColumn.defaultProps = {
	...defaultColumnConfiguration,
	...booleanColumnConfiguration,
};
