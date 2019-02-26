import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../../Actions/ActionButton';
import theme from '../ColumnDisplayer.scss';

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

const ColumnOrder = ({ length, locked, value, t, ...rest }) => {
	const [editMode, setEditMode] = useState(false);
	const [ctrlValue, setCtrlValue] = useState(value);
	useEffect(() => {
		setCtrlValue(value);
	}, [value]);

	function onBlur(event) {
		const formatValue = parseInt(ctrlValue, 10);
		if (formatValue !== value) {
			if (isOrderCorrect(formatValue, length)) {
				rest.onBlur(event, formatValue);
			}
		}
		setEditMode(prevState => !prevState);
	}

	function onKeyPress(event) {
		const formatValue = parseInt(ctrlValue, 10);
		if (event.key === 'Enter') {
			if (isOrderCorrect(formatValue, length)) {
				rest.onKeyPress(event, formatValue);
				setEditMode(prevState => !prevState);
			}
		}
	}

	if (locked || !editMode) {
		return (
			<ActionButton
				aria-label={t('INPUT_TEXT_EDIT_COLUMN_CHOOSER', { defaultValue: 'Edit order' })}
				disabled={locked}
				link
				onClick={() => setEditMode(!editMode)}
				label={<OrderDisplay order={ctrlValue} length={length} />}
			/>
		);
	}
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};

ColumnOrder.propTypes = {
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	onBlur: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	t: PropTypes.func.isRequired,
};

export default ColumnOrder;
