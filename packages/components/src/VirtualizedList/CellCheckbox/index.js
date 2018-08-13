import React from 'react';
import CellCheckbox from './CellCheckbox.component';

export const cellType = 'checkbox';

export default {
	cellRenderer: props => <CellCheckbox {...props} />,
};
