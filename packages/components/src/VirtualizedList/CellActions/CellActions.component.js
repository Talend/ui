import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Actions } from '../../Actions';

import theme from './CellActions.scss';

/**
 * Cell that renders actions
 */
function CellActions({ cellData }) {
	return (
		<div
			className={classnames(
				'tc-list-actions',
				theme['tc-list-actions'],
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
