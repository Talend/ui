import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ActionButton from '../../../../Actions/ActionButton';
import ColumnDisplayer from '../ColumnDisplayer';
import ColumnDisplayerDraggable from '../ColumnDisplayerDraggable';

const DefaultHeader = ({ t }) => {
	return (
		<React.Fragment>
			{t('COLUMN_CHOOSER_HEADER_TITLE', {
				defaultValue: 'Modifying columns position',
			})}
		</React.Fragment>
	);
};

DefaultHeader.propTypes = {
	t: PropTypes.func.isRequired,
};

const getColumnDisplay = (length, onChangeVisibility, onChangeOrder, onDragAndDrop) => {
	return (column, index) => {
		const displayerProps = {
			...column,
			length,
			onChangeVisibility: onChangeVisibility(index),
			onChangeOrder: onChangeOrder(index),
			onDragAndDrop,
		};
		if (column.locked) {
			return <ColumnDisplayer {...displayerProps} />;
		}
		return <ColumnDisplayerDraggable {...displayerProps} />;
	};
};

const DefaultBody = ({ columns, changeColumnOrder, changeColumnVisibility, onDragAndDrop }) => {
	return (
		<DragDropContextProvider backend={HTML5Backend}>
			<div id="defaultContent" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				{columns.map(
					getColumnDisplay(
						columns.length,
						changeColumnVisibility,
						changeColumnOrder,
						onDragAndDrop,
					),
				)}
			</div>
		</DragDropContextProvider>
	);
};

DefaultBody.propTypes = {
	// TODO more explicit proptypes for columns
	columns: PropTypes.array.isRequired,
	changeColumnOrder: PropTypes.func.isRequired,
	changeColumnVisibility: PropTypes.func.isRequired,
	onDragAndDrop: PropTypes.func.isRequired,
};

const DefaultFooter = ({ submitColumns, t }) => {
	return (
		<React.Fragment>
			<ActionButton
				onClick={event => submitColumns(event)}
				label={t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
			/>
		</React.Fragment>
	);
};

DefaultFooter.propTypes = {
	submitColumns: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export { DefaultBody, DefaultFooter, DefaultHeader };
