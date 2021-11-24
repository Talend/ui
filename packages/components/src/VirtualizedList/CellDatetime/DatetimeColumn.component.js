import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import CellDatetime, { computeValue } from './CellDatetime.component';

export const cellType = 'datetime';
export const datetimeColumnConfiguration = {
	cellRenderer: props => <CellDatetime {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
function DatetimeColumn() {
	return null;
}
DatetimeColumn.computeValue = computeValue;
DatetimeColumn.defaultProps = {
	...defaultColumnConfiguration,
	...datetimeColumnConfiguration,
};

export default DatetimeColumn;
