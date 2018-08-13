import React from 'react';
import CellBadge from './CellBadge.component';

export const cellType = 'badge';

export default {
	cellRenderer: props => <CellBadge {...props} />,
};
