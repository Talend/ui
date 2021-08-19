import React from 'react';
import PropTypes from 'prop-types';

import { defaultColumnConfiguration } from '../Content.component';

const { cellRenderer: DefaultCellRenderer } = defaultColumnConfiguration;

function CellMappedData(props) {
	const { cellData, columnData } = props;
	const { valuesMap, ...restColumnData } = columnData;

	let cellContent;

	if (Array.isArray(cellData)) {
		cellContent = cellData
			.map(value => valuesMap[value] || value || null)
			.filter(value => !!value)
			.sort((a, b) => a.toString().localeCompare(b.toString()))
			.join(', ');
	} else {
		cellContent = valuesMap[cellData] || cellData || null;
	}

	return <DefaultCellRenderer {...props} cellData={cellContent} columnData={restColumnData} />;
}

CellMappedData.propTypes = {
	cellData: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	columnData: PropTypes.shape({
		valuesMap: PropTypes.object,
	}),
};

export default CellMappedData;
