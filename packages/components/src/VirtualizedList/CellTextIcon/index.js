import React from 'react';
import CellWithIcon from './CellWithIcon.component';

export const cellType = 'texticon';

export default {
	cellRenderer: props => <CellWithIcon {...props} />,
};
