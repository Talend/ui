import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';
import CellTitleSelector from './CellTitleSelector.component';
import CellTitleActions from './CellTitleActions.component';
import { cellTitleDisplayModes, listTypes } from '../utils/constants';

import theme from './CellTitle.scss';

const { LARGE } = listTypes;
const { TITLE_MODE_TEXT } = cellTitleDisplayModes;

/**
 * Cell that renders the item's title.
 * A title is composed by
 * - an optional icon (rowData[columnData.iconKey])
 * - a button with a click action (columnData.onClick)
 * - actions (rowData[columnData.actionsKey])
 */
class CellTitle extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.cellData !== nextProps.cellData ||
			this.props.columnData !== nextProps.columnData ||
			this.props.getComponent !== nextProps.getComponent ||
			this.props.rowData !== nextProps.rowData ||
			this.props.rowIndex !== nextProps.rowIndex ||
			this.props.type !== nextProps.type
		);
	}
	render() {
		const { cellData, columnData, getComponent, rowData, rowIndex, type } = this.props;

		let cellColumnData = columnData;
		if (typeof columnData === 'function') {
			cellColumnData = columnData(rowData);
		}

		const {
			id,
			onClick,
			actionsKey,
			persistentActionsKey,
			displayModeKey,

			getRowState,

			iconKey,
			iconLabelKey,
			onEditCancel,
			onEditSubmit,
			...columnDataRest
		} = cellColumnData;

		const displayMode = rowData[displayModeKey] || TITLE_MODE_TEXT;
		const { disabled = false, tooltip } = (getRowState && getRowState(rowData)) || {};
		const titleId = id && `${id}-${rowIndex}-title-cell`;
		const actionsId = id && `${id}-${rowIndex}-title-actions`;

		let icon = null;
		if (iconKey && rowData[iconKey]) {
			icon = <Icon name={rowData[iconKey]} className={theme.icon} />;
		}
		if (icon && iconLabelKey && rowData[iconLabelKey]) {
			icon = (
				<TooltipTrigger label={rowData[iconLabelKey]} tooltipPlacement="top">
					<span>
						<Icon name={rowData[iconKey]} className={theme.icon} />
					</span>
				</TooltipTrigger>
			);
		}

		const defaultTitle = (
			<React.Fragment>
				<CellTitleSelector
					id={titleId}
					cellData={cellData}
					className={theme['main-title']}
					displayMode={displayMode}
					onClick={onClick}
					onEditCancel={onEditCancel}
					onEditSubmit={onEditSubmit}
					rowData={rowData}
					columnData={columnDataRest}
				/>
				<CellTitleActions
					getComponent={getComponent}
					id={actionsId}
					rowData={rowData}
					actionsKey={actionsKey}
					persistentActionsKey={persistentActionsKey}
					displayMode={displayMode}
					type={type}
				/>
			</React.Fragment>
		);

		return (
			<div
				id={titleId}
				className={classNames(theme['tc-list-title'], 'tc-list-title', {
					[theme['tc-list-title-filter']]: onClick,
					[theme['tc-list-title-disabled']]: disabled,
					'tc-list-title-filter': onClick,
				})}
			>
				{icon}
				{disabled ? (
					<TooltipTrigger label={tooltip} tooltipPlacement="top">
						<span id={titleId} className={theme['main-title']} title={cellData}>
							{cellData}
						</span>
					</TooltipTrigger>
				) : (
					defaultTitle
				)}
			</div>
		);
	}
}

CellTitle.displayName = 'VirtualizedList(CellTitle)';
CellTitle.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// The custom props passed to <VirtualizedList.Content columnData={}>.
	columnData: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({
			// The List id. This is used as the title parts ids prefix.
			id: PropTypes.string,
			// The onClick callback triggered on title main button click.
			onClick: PropTypes.func,
			// The actions property key. Actions = props.rowData[props.actionsKey]
			actionsKey: PropTypes.string,
			// The persistent actions property key. Actions = props.rowData[props.persistentActionsKey]
			persistentActionsKey: PropTypes.string,
			// The display mode property key. DisplayMode = props.rowData[props.displayModeKey]
			displayModeKey: PropTypes.string,
			// The icon property key. Icon = props.rowData[props.iconKey]
			iconKey: PropTypes.string,
			// The icon tooltip label key. tooltiplabel = props.rowData[iconLabelKey]
			iconLabelKey: PropTypes.string,
			// Input mode : the cancel callback on ESC keydown.
			onEditCancel: PropTypes.func,
			// Input mode : the submit callback on ENTER keydown or blur.
			onEditSubmit: PropTypes.func,
		}),
	]),
	getComponent: PropTypes.func,
	// The collection item.
	rowData: PropTypes.object, // eslint-disable-line
	// The collection item index.
	rowIndex: PropTypes.number,
	// The type of display
	type: PropTypes.oneOf([LARGE]),
};

export default CellTitle;
