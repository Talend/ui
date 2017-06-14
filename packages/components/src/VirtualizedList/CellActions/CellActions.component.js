import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Actions } from '../../Actions';

import largeTheme from './RowLargeCellActions.scss';
import tableTheme from './RowTableCellActions.scss';

/**
 * Cell that renders actions
 */
function CellActions({ cellData }) {
	return (
		<div
			className={classNames(
				'tc-list-actions',
				tableTheme['tc-list-actions'],
				largeTheme['tc-list-actions'],
			)}
		>
			<Actions
				actions={cellData}
				hideLabel
				link
			/>
		</div>
	);
}

CellActions.displayName = 'VirtualizedList(CellActions)';
CellActions.propTypes = {
	cellData: PropTypes.arrayOf(PropTypes.shape(Actions.propTypes)),
};

export default CellActions;
