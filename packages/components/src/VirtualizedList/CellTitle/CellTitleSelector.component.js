import PropTypes from 'prop-types';
import React from 'react';
import { Action } from '../../Actions';
import { cellTitleDisplayModes } from '../utils/constants';
import CellTitleInput from './CellTitleInput.component';
import TooltipTrigger from '../../TooltipTrigger';

const { TITLE_MODE_TEXT, TITLE_MODE_INPUT } = cellTitleDisplayModes;

/**
 * Component that selects and renders the requested title display mode
 */
function CellTitleSelector(props) {
	const {
		id,
		cellData,
		className,
		displayMode,
		onClick,
		onEditSubmit,
		onEditCancel,
		rowData,
		columnData,
		tooltip,
	} = props;

	if (displayMode === TITLE_MODE_INPUT) {
		return (
			<CellTitleInput
				id={id && `${id}-input`}
				cellData={cellData}
				rowData={rowData}
				onEditSubmit={onEditSubmit}
				onEditCancel={onEditCancel}
			/>
		);
	}

	if (onClick) {
		return (
			<Action
				{...columnData}
				{...rowData}
				id={id && `${id}-btn`}
				icon={undefined}
				className={className}
				onClick={event => onClick(event, rowData)}
				role="link"
				bsStyle="link"
				label={cellData}
				type="button"
				tooltip={tooltip || cellData}
			/>
		);
	}

	return (
		<TooltipTrigger label={tooltip || cellData} tooltipPlacement="top">
			<span id={id} className={className}>
				{cellData}
			</span>
		</TooltipTrigger>
	);
}

CellTitleSelector.propTypes = {
	/** The id prefix. */
	id: PropTypes.string,
	/** The input value. */
	cellData: PropTypes.string.isRequired,
	/** The title element className. */
	className: PropTypes.string,
	/** The display mode. */
	displayMode: PropTypes.oneOf([TITLE_MODE_TEXT, TITLE_MODE_INPUT]),
	/** The onClick callback triggered on title main button click. */
	onClick: PropTypes.func,
	/** Input mode : the cancel callback on ESC keydown. */
	onEditCancel: PropTypes.func,
	/** Input mode : the submit callback on ENTER keydown or blur. */
	onEditSubmit: PropTypes.func,
	/** The column item */
	columnData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	/** The collection item. */
	rowData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	/** The title element tooltip */
	tooltip: PropTypes.string,
};

export default CellTitleSelector;
