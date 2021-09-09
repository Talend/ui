import React from 'react';

import { defaultColumnConfiguration } from '../Content.component';

import CellMappedData from './CellMappedData.component';

export const cellType = 'mappedData';

export const mappedDataColumnConfiguration = {
	cellRenderer: props => <CellMappedData {...props} />,
};

function MappedDataColumn() {
	return null;
}

MappedDataColumn.defaultProps = {
	...defaultColumnConfiguration,
	...mappedDataColumnConfiguration,
};

export default MappedDataColumn;
