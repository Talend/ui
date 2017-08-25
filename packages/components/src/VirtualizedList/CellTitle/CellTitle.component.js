import PropTypes from 'prop-types';
import React from 'react';
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
	const titleId = id && `${id}-${rowIndex}-title-cell`;

	return (
		<div
			id={titleId}
			className={classNames('tc-list-title', theme['tc-list-title'])}
		>
			{
				iconKey &&
				rowData[iconKey] &&
				(<Icon name={rowData[iconKey]} className={theme.icon} />)
			}

			<CellTitleSelector
				id={titleId}
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
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// The custom props passed to <VirtualizedList.Content columnData={}>.
	columnData: PropTypes.shape({
		// The List id. This is used as the title parts ids prefix.
		id: PropTypes.string,
		// The onClick callback triggered on title main button click.
		onClick: PropTypes.func,
		// The actions property key. Actions = props.rowData[props.actionsKey]
		actionsKey: PropTypes.string,
		// The display mode property key. DisplayMode = props.rowData[props.displayModeKey]
		displayModeKey: PropTypes.string,
		// The icon property key. Icon = props.rowData[props.iconKey]
		iconKey: PropTypes.string,
		// Input mode : the cancel callback on ESC keydown.
		onEditCancel: PropTypes.func,
		// Input mode : the submit callback on ENTER keydown or blur.
		onEditSubmit: PropTypes.func,
	}),
	// The collection item.
	rowData: PropTypes.object, // eslint-disable-line
	// The collection item index.
	rowIndex: PropTypes.number,
};

export default CellTitle;
