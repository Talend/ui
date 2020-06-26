import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import CellDatetime, { computeValue } from './CellDatetime.component';

export const cellType = 'datetime';
export const datetimeColumnConfiguration = {
	cellRenderer: props => <CellDatetime {...props} />,
	computeValue,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function DatetimeColumn() {
	return null;
}
DatetimeColumn.defaultProps = {
	...defaultColumnConfiguration,
	...datetimeColumnConfiguration,
};
