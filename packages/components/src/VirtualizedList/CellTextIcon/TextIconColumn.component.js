import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import CellWithIcon from './CellWithIcon.component';

export const cellType = 'texticon';
export const textIconColumnConfiguration = {
	cellRenderer: props => <CellWithIcon {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function TextIconColumn() {
	return null;
}
TextIconColumn.defaultProps = {
	...defaultColumnConfiguration,
	...textIconColumnConfiguration,
};
