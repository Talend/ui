import React from 'react';
import PropTypes from 'prop-types';

import { defaultColumnConfiguration } from '../Content.component';

const { cellRenderer: DefaultCellRenderer } = defaultColumnConfiguration;

function CellMappedData(props) {
	const { cellData, columnData } = props;
	const { valuesMap, ...restColumnData } = columnData;

	let cellContent;

	const getMappedValue = value => {
		const mappedValue = valuesMap[value] || value;
		return mappedValue !== undefined ? mappedValue : null;
	};

	if (Array.isArray(cellData)) {
		cellContent = cellData
			.map(getMappedValue)
			.filter(value => value !== undefined && value !== null && value !== '')
			.sort((a, b) => a.toString().localeCompare(b.toString()))
			.join(', ');
	} else {
		cellContent = getMappedValue(cellData);
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
