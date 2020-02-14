import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import CellLabel from './CellLabel.component';

export const cellType = 'label';
export const labelColumnConfiguration = {
	cellRenderer: props => <CellLabel {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function LabelColumn() {
	return null;
}
LabelColumn.defaultProps = {
	...defaultColumnConfiguration,
	...labelColumnConfiguration,
};
