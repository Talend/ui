import React from 'react';
import CellDatetime from './CellDatetime.component';

export const cellType = 'datetime';

export default {
	cellRenderer: props => <CellDatetime {...props} />,
};
