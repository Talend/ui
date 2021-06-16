import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import CellTitle from './CellTitle.component';

export const cellType = 'title';
export const titleColumnConfiguration = {
	cellType,
	cellRenderer: props => <CellTitle {...props} />,
	className: 'tc-list-title-cell',
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function TitleColumn() {
	return null;
}
TitleColumn.defaultProps = {
	...defaultColumnConfiguration,
	...titleColumnConfiguration,
};
