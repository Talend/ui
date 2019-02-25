import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './ColumnChooser.scss';
import ActionButton from '../../../../Actions/ActionButton';
import ColumnDisplayer from '../ColumnDisplayer';

export const DefaultHeader = ({ t }) => {
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

export const getColumnDisplay = (
	length,
	onChangeVisibility,
	onBlurOrder,
	onKeyPressOrder,
	t,
) => {
	return (column, index) => {
		const displayerProps = {
			...column,
			length,
			onBlurOrder: onBlurOrder(index),
			onChangeVisibility: onChangeVisibility(index),
			onKeyPressOrder: onKeyPressOrder(index),
			t,
		};
		return <ColumnDisplayer key={column.label} {...displayerProps} />;
	};
};

export const DefaultBody = ({
	columns,
	onChangeVisibility,
	onBlurOrder,
	onKeyPressOrder,
	t,
}) => {
	return (
		<div
			id="column-chooser-content"
			className={classNames(theme['tc-column-chooser-body'], 'tc-column-chooser-body')}
		>
			{columns.map(
				getColumnDisplay(
					columns.length,
					onChangeVisibility,
					onBlurOrder,
					onKeyPressOrder,
					t,
				),
			)}
		</div>
	);
};

DefaultBody.propTypes = {
	columns: PropTypes.array.isRequired,
	onBlurOrder: PropTypes.func.isRequired,
	onChangeVisibility: PropTypes.func.isRequired,
	onKeyPressOrder: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export const DefaultFooter = ({ selectAllValue, onSelectAll, submit, t }) => {
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
						checked={!selectAllValue}
						value={!selectAllValue}
					/>
				</span>
				<label id="select-all-label" htmlFor="selectAll">
					Select All
				</label>
			</span>
			<ActionButton
				onClick={event => submit(event)}
				label={t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
			/>
		</div>
	);
};

DefaultFooter.propTypes = {
	onSelectAll: PropTypes.func.isRequired,
	selectAllValue: PropTypes.bool.isRequired,
	submit: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};
