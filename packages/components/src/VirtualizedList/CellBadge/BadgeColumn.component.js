import React from 'react';
import CellBadge from './CellBadge.component';
import { defaultColumnConfiguration } from '../Content.component';

export const cellType = 'badge';
export const badgeColumnConfiguration = {
	cellRenderer: props => <CellBadge {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function BadgeColumn() {
	return null;
}
BadgeColumn.defaultProps = {
	...defaultColumnConfiguration,
	...badgeColumnConfiguration,
};
