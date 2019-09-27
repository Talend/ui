import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import CellCheckbox from './CellCheckbox.component';

export const cellType = 'checkbox';
export const checkboxColumnConfiguration = {
	cellRenderer: props => <CellCheckbox {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function CheckboxColumn() {
	return null;
}
CheckboxColumn.defaultProps = {
	...defaultColumnConfiguration,
	...checkboxColumnConfiguration,
};
