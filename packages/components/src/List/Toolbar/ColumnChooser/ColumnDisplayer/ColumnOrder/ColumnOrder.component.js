import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../../Actions/ActionButton';
import theme from '../ColumnDisplayer.scss';
import { columnChooserContext } from '../../Content/columnChooser.context';

export const OrderDisplay = ({ order, length }) => (
	<React.Fragment>
		<span
			className={classNames(
				theme['tc-column-displayer-order-value'],
				'tc-column-displayer-order-value',
			)}
		>
			{order}
		</span>
		{`/ ${length}`}
	</React.Fragment>
);

OrderDisplay.propTypes = {
	order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	length: PropTypes.number.isRequired,
};

function isOrderCorrect(value, length) {
	if (Number.isInteger(value) && (value <= length && value > 0)) {
		return true;
	}
	throw new Error(`ColumnDisplayer, isOrderCorrect : Bad order number = ${value}`);
}

const ColumnOrder = ({ index, length, locked, value }) => {
	const [editMode, setEditMode] = useState(false);
	const [ctrlValue, setCtrlValue] = useState(value);
	const { onBlurOrder, onKeyPressOrder, t } = useContext(columnChooserContext);
	useEffect(() => {
		setCtrlValue(value);
	}, [value]);

	function onBlur(event) {
		const formatValue = parseInt(ctrlValue, 10);
		if (formatValue !== value) {
			if (isOrderCorrect(formatValue, length)) {
				onBlurOrder(index)(event, formatValue);
			}
		}
		setEditMode(prevState => !prevState);
	}

	function onKeyPress(event) {
		const formatValue = parseInt(ctrlValue, 10);
		if (event.key === 'Enter') {
			if (isOrderCorrect(formatValue, length)) {
				onKeyPressOrder(index)(event, formatValue);
				setEditMode(prevState => !prevState);
			}
		}
	}

	if (locked || !editMode) {
		return (
			<div className={classNames(theme['tc-column-displayer-order'], 'tc-column-displayer-order')}>
				<ActionButton
					aria-label={t('INPUT_TEXT_EDIT_COLUMN_CHOOSER', { defaultValue: 'Edit order' })}
					disabled={locked}
					link
					onClick={() => setEditMode(!editMode)}
					label={<OrderDisplay order={ctrlValue} length={length} />}
				/>
			</div>
		);
	}
	return (
		<div className={classNames(theme['tc-column-displayer-order'], 'tc-column-displayer-order')}>
			<input
				autoFocus
				aria-label={t('INPUT_TEXT_ORDER_COLUMN_CHOOSER', {
					defaultValue: 'Input order',
				})}
				className={classNames(
					theme['tc-column-displayer-order-input-text'],
					'tc-column-displayer-order-input-text',
				)}
				onBlur={event => onBlur(event)}
				onChange={event => setCtrlValue(event.target.value)}
				onKeyPress={event => onKeyPress(event)}
				placeholder={ctrlValue}
				type="text"
				value={ctrlValue}
			/>
			{`/ ${length}`}
		</div>
	);
};

ColumnOrder.propTypes = {
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ColumnOrder;
