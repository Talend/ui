import React from 'react';
import CellActions from './CellActions.component';
import { defaultColumnConfiguration } from '../Content.component';

export const cellType = 'actions';
export const actionColumnConfiguration = {
	cellRenderer: props => <CellActions {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
function ActionsColumn() {
	return null;
}
ActionsColumn.defaultProps = {
	...defaultColumnConfiguration,
	...actionColumnConfiguration,
};

export default ActionsColumn;
