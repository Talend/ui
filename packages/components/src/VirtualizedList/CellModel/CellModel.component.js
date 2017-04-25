import React, { PropTypes } from 'react';

/**
 TODO
 * change the style file
 */
import theme from './CellModel.scss';

/**
 TODO
 * cellData : the data from collection (rowData[dataKey])
 * columnData : the data passed from VirtualizedList.Content > columnData, enhanced with the list id
 * dataKey : the property key
 * rowData : the collection item
 * rowIndex : the row (item) index
 */
function CellModel({ cellData, columnData, dataKey, rowData, rowIndex }) {
	return (
		/**
		 TODO
		 * change the classname
		 */
		<div className={`tc-list-model ${theme['tc-list-model']}`} />
	);
}

/**
 TODO
 * change display name
 */
CellModel.displayName = 'VirtualizedList(CellModel)';
CellModel.propTypes = {
	/**
	 TODO
	 * change the propTypes accordingly to your data format
	 */
	cellData: PropTypes.string,
	dataKey: PropTypes.string,
	rowData: PropTypes.object, // eslint-disable-line
	rowIndex: PropTypes.number,
};

export default CellModel;
