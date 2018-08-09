import React from 'react';
import CellActions from './CellActions.component';

export const cellType = 'actions';

export default {
	cellRenderer: props => <CellActions {...props} />,
};
