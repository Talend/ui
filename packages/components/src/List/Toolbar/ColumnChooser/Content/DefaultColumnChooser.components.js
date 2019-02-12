import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classNames from 'classnames';
import theme from './ColumnChooser.scss';
import ActionButton from '../../../../Actions/ActionButton';
import ColumnDisplayer from '../ColumnDisplayer';
import ColumnDisplayerDraggable from '../ColumnDisplayerDraggable';

const DefaultHeader = ({ t }) => {
	return (
		<div className={classNames(theme['tc-column-chooser-header'], 'tc-column-chooser-header')}>
			{t('COLUMN_CHOOSER_HEADER_TITLE', {
				defaultValue: 'Modify columns position',
			})}
		</div>
	);
};

DefaultHeader.propTypes = {
	t: PropTypes.func.isRequired,
};

const getColumnDisplay = (
	length,
	onChangeVisibility,
	onChangeOrder,
	onDragAndDrop,
	onBlurColumnOrder,
	onKeyPressOrder,
) => {
	return (column, index) => {
		const displayerProps = {
			...column,
			index,
			length,
			onBlurColumnOrder: onBlurColumnOrder(index),
			onChangeOrder: onChangeOrder(index),
			onChangeVisibility: onChangeVisibility(index),
			onDragAndDrop,
			onKeyPressOrder: onKeyPressOrder(index),
		};
		if (column.locked) {
			return <ColumnDisplayer {...displayerProps} />;
		}
		return <ColumnDisplayerDraggable {...displayerProps} />;
	};
};

const DefaultBody = ({
	columns,
	changeColumnOrder,
	changeColumnVisibility,
	onDragAndDrop,
	onBlurColumnOrder,
	onKeyPressOrder,
}) => {
	return (
		<DragDropContextProvider backend={HTML5Backend}>
			<div
				id="column-chooser-content"
				className={classNames(theme['tc-column-chooser-body'], 'tc-column-chooser-body')}
			>
				{columns.map(
					getColumnDisplay(
						columns.length,
						changeColumnVisibility,
						changeColumnOrder,
						onDragAndDrop,
						onBlurColumnOrder,
						onKeyPressOrder,
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

const DefaultFooter = ({ selectAllValue, onSelectAll, submitColumns, t }) => {
	return (
		<div className={classNames(theme['tc-column-chooser-footer'], 'tc-column-chooser-footer')}>
			<span
				className={classNames(
					theme['tc-column-chooser-footer-select-all'],
					'tc-column-chooser-footer-select-all',
				)}
			>
				<span>
					<input
						id="select-all-checkbox"
						name="selectAll"
						aria-label="select all"
						onChange={() => onSelectAll(!selectAllValue)}
						type="checkbox"
						checked={selectAllValue}
						value={selectAllValue}
					/>
				</span>
				<label htmlFor="selectAll">Select All</label>
			</span>
			<ActionButton
				id="select-all-label"
				onClick={event => submitColumns(event)}
				label={t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
			/>
		</div>
	);
};

DefaultFooter.propTypes = {
	submitColumns: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export { DefaultBody, DefaultFooter, DefaultHeader };
