import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Actions } from '../../Actions';
import Icon from '../../Icon';
import CellTitleSelector from './CellTitleSelector.component';
import { cellTitleDisplayModes } from '../utils/constants';

import theme from './CellTitle.scss';

const { TITLE_MODE_TEXT } = cellTitleDisplayModes;

/**
 * Cell that renders the item's title.
 * A title is composed by
 * - an optional icon (rowData[columnData.iconKey])
 * - a button with a click action (columnData.onClick)
 * - actions (rowData[columnData.actionsKey])
 */
function CellTitle({ cellData, columnData, rowData, rowIndex }) {
	const {
		id,
		onClick,
		actionsKey,
		displayModeKey,
		iconKey,
		onEditCancel,
		onEditSubmit,
	} = columnData;
	const displayMode = rowData[displayModeKey] || TITLE_MODE_TEXT;

	return (
		<div className={classNames('tc-list-title', theme['tc-list-title'])}>
			{
				iconKey &&
				rowData[iconKey] &&
				(<Icon name={rowData[iconKey]} className={theme.icon} />)
			}

			<CellTitleSelector
				id={id && `${id}-${rowIndex}-title-cell`}
				cellData={cellData}
				className={theme['main-title']}
				displayMode={displayMode}
				onClick={onClick}
				onEditCancel={onEditCancel}
				onEditSubmit={onEditSubmit}
				rowData={rowData}
			/>

			{
				actionsKey &&
				rowData[actionsKey] &&
				displayMode === TITLE_MODE_TEXT &&
				(
					<Actions
						actions={rowData[actionsKey]}
						hideLabel
						link
					/>
				)
			}
		</div>
	);
}

CellTitle.displayName = 'VirtualizedList(CellTitle)';
CellTitle.propTypes = {
	cellData: PropTypes.string,
	columnData: PropTypes.shape({
		id: PropTypes.string,
		onClick: PropTypes.func,
		actionsKey: PropTypes.string,
		displayModeKey: PropTypes.string,
		iconKey: PropTypes.string,
		onEditCancel: PropTypes.func,
		onEditSubmit: PropTypes.func,
	}),
	rowData: PropTypes.object, // eslint-disable-line
	rowIndex: PropTypes.number,
};

export default CellTitle;
