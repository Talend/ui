import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { Actions } from '../../Actions';
import Icon from '../../Icon';
import theme from './CellTitle.scss';

function CellTitle({ cellData, columnData, dataKey, rowData, rowIndex }) {
	const { id, onClick, iconKey, actionsKey } = columnData;

	return (
		<div
			id={id && `${id}-${rowIndex}-title-cell`}
			className={classNames('tc-list-title', theme['tc-list-title'])}
		>
			{
				iconKey &&
				rowData[iconKey] &&
				(<Icon name={rowData[iconKey]} className={theme.icon} />)
			}

			<Button
				id={id && `${id}-${rowIndex}-title-cell`}
				className={theme['main-button']}
				onClick={event => onClick(event, rowData)}
				role="link"
				bsStyle="link"
			>
				{cellData}
			</Button>

			{
				actionsKey &&
				rowData[actionsKey] &&
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
		onClick: PropTypes.func.isRequired,
		iconKey: PropTypes.string,
		actionsKey: PropTypes.string,
	}),
	dataKey: PropTypes.string,
	rowData: PropTypes.object, // eslint-disable-line
	rowIndex: PropTypes.number,
};

export default CellTitle;
