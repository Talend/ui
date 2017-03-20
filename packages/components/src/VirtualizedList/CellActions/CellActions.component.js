import React, { PropTypes } from 'react';
import { Actions } from '../../Actions';

import theme from './CellActions.scss';

function ActionsCell({ cellData, columnData, dataKey, rowData, rowIndex }) {
	return (
		<div className={`tc-list-actions ${theme['tc-list-actions']}`}>
			<Actions
				actions={cellData}
				hideLabel
				link
			/>
		</div>
	);
}

ActionsCell.displayName = 'VirtualizedList(ActionsCell)';
ActionsCell.propTypes = {
	cellData: PropTypes.arrayOf(PropTypes.shape(Actions.propTypes)),
	dataKey: PropTypes.string,
	rowData: PropTypes.object, // eslint-disable-line
	rowIndex: PropTypes.number,
};

export default ActionsCell;
