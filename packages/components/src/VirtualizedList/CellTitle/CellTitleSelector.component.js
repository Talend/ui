import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { cellTitleDisplayModes } from '../utils/constants';
import CellTitleInput from './CellTitleInput.component';

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
	} = props;

	if (displayMode === TITLE_MODE_INPUT) {
		return (
			<CellTitleInput
				id={id}
				cellData={cellData}
				rowData={rowData}
				onEditSubmit={onEditSubmit}
				onEditCancel={onEditCancel}
			/>
		);
	}

	if (onClick) {
		return (
			<Button
				id={id}
				className={className}
				onClick={event => onClick(event, rowData)}
				role="link"
				bsStyle="link"
			>
				{cellData}
			</Button>
		);
	}

	return (<span id={id} className={className}>{cellData}</span>);
}

CellTitleSelector.propTypes = {
	id: PropTypes.string,
	cellData: PropTypes.string.isRequired,
	className: PropTypes.string,
	displayMode: PropTypes.oneOf([TITLE_MODE_TEXT, TITLE_MODE_INPUT]),
	onClick: PropTypes.func,
	onEditCancel: PropTypes.func,
	onEditSubmit: PropTypes.func,
	rowData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default CellTitleSelector;
