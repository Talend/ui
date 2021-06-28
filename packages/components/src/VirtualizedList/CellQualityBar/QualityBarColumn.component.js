import React from 'react';
import { defaultColumnConfiguration } from '../Content.component';
import { CellQualityBar } from './CellQualityBar.component';

export const cellType = 'qualityBar';
export const qualityBarColumnConfiguration = {
	cellRenderer: props => <CellQualityBar {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function QualityBarColumn() {
	return null;
}

QualityBarColumn.defaultProps = {
	...defaultColumnConfiguration,
	...qualityBarColumnConfiguration,
};
