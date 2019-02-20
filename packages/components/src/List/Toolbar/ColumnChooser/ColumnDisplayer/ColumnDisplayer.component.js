import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../Icon';

import ActionButton from '../../../../Actions/ActionButton';
import theme from './ColumnDisplayer.scss';

export const ColumnVisibility = ({ onChange, locked, value, t }) => {
	if (locked) {
		return <Icon name="talend-locked" />;
	}
	return (
		<input
			aria-label={t('CHECKBOX_VISIBILITY_COLUMN_CHOOSER', {
				defaultValue: 'change visibility',
			})}
			className={classNames(
				theme['tc-column-displayer-visibility-checkbox'],
				'tc-column-displayer-visibility-checkbox',
			)}
			onChange={() => onChange(event, !value)}
			type="checkbox"
			checked={!value}
			value={!value}
		/>
	);
};

ColumnVisibility.propTypes = {
	locked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	value: PropTypes.bool,
};

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
	order: PropTypes.number.isRequired,
	length: PropTypes.number.isRequired,
};

function isOrderCorrect(value, length) {
	return Number.isInteger(value) && (value <= length && value > 0);
}

export const ColumnOrder = ({ length, order, locked, value, t, ...rest }) => {
	const [editMode, setEditMode] = useState(false);
	const [ctrlValue, setCtrlValue] = useState(value);
	useEffect(() => {
		setCtrlValue(value);
	}, [value]);

	function onBlur(event) {
		const formatValue = parseInt(ctrlValue, 10);
		if (isOrderCorrect(formatValue, length)) {
			if (formatValue !== value) {
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
			} else {
				throw new Error(`ColumnDisplayer, onKeyPress : Bad order number: ${value}`);
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
				label={<OrderDisplay order={order} length={length} />}
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
				onBlur={event => {
					onBlur(event);
				}}
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
	order: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
};

const ColumnDisplayer = ({
	label,
	hidden,
	locked,
	order,
	length,
	onChangeVisibility,
	onBlurOrder,
	onKeyPressOrder,
	t,
}) => {
	return (
		<div
			id="column-chooser-displayer"
			className={classNames(theme['tc-column-displayer'], 'tc-column-displayer')}
		>
			<div
				className={classNames(
					theme['tc-column-displayer-visibility'],
					'tc-column-displayer-visibility',
				)}
			>
				<ColumnVisibility onChange={onChangeVisibility} value={hidden} locked={locked} t={t} />
			</div>
			<span className={classNames(theme['tc-column-displayer-label'], 'tc-column-displayer-label')}>
				{label}
			</span>
			<div className={classNames(theme['tc-column-displayer-order'], 'tc-column-displayer-order')}>
				<ColumnOrder
					length={length}
					locked={locked}
					onBlur={onBlurOrder}
					onKeyPress={onKeyPressOrder}
					order={order}
					t={t}
					value={order}
				/>
			</div>
		</div>
	);
};

ColumnDisplayer.propTypes = {
	hidden: PropTypes.bool,
	label: PropTypes.string.isRequired,
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	onBlurOrder: PropTypes.func.isRequired,
	onChangeVisibility: PropTypes.func.isRequired,
	onKeyPressOrder: PropTypes.func.isRequired,
	order: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
};

export default ColumnDisplayer;
