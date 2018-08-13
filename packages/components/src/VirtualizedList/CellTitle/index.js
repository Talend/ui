import React from 'react';
import '../../polyfills/focus-within';
import CellTitle from './CellTitle.component';

export const cellType = 'title';
export default {
	cellType,
	cellRenderer: props => <CellTitle {...props} />,
	className: 'tc-list-title-cell',
};
