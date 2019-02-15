import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../Icon';

import ActionButton from '../../../../Actions/ActionButton';
import theme from './ColumnDisplayer.scss';

export const ColumnVisibility = ({ onChange, locked, value }) => {
	if (locked) {
		return <Icon name="talend-locked" />;
	}
	return (
		<input
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
	onChange: PropTypes.func.isRequired,
	locked: PropTypes.bool,
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

export const ColumnOrder = ({ length, order, locked, onBlur, onKeyPress, value }) => {
	const [editMode, setEditMode] = useState(false);
	const [ctrlValue, setCtrlValue] = useState(value);
	useEffect(() => {
		setCtrlValue(value);
	}, [value]);
	function changeEditMode(fn, event) {
		if (fn(event, ctrlValue)) {
			setEditMode(prevState => !prevState);
		}
	}
	if (locked || !editMode) {
		return (
			<ActionButton
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
				className={classNames(
					theme['tc-column-displayer-order-input-text'],
					'tc-column-displayer-order-input-text',
				)}
				onBlur={event => {
					changeEditMode(onBlur, event);
				}}
				onChange={event => setCtrlValue(event.target.value)}
				onKeyPress={event => changeEditMode(onKeyPress, event)}
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
	isDragging,
	isOver,
}) => {
	return (
		<div
			id="column-chooser-displayer"
			className={classNames(theme['tc-column-displayer'], 'tc-column-displayer')}
		>
			{isOver && (
				<div
					className={classNames(
						theme['tc-column-displayer-dragging'],
						'tc-column-displayer-dragging',
					)}
				/>
			)}
			<div
				className={classNames(
					theme['tc-column-displayer-visibility'],
					'tc-column-displayer-visibility',
				)}
			>
				<ColumnVisibility onChange={onChangeVisibility} value={hidden} locked={locked} />
			</div>
			<div className={classNames(theme['tc-column-displayer-label'], 'tc-column-displayer-label')}>
				{label}
			</div>
			<div className={classNames(theme['tc-column-displayer-order'], 'tc-column-displayer-order')}>
				<ColumnOrder
					length={length}
					locked={locked}
					onBlur={onBlurOrder}
					onKeyPress={onKeyPressOrder}
					order={order}
					value={order}
				/>
			</div>
		</div>
	);
};

ColumnDisplayer.propTypes = {
	hidden: PropTypes.bool,
	isDragging: PropTypes.bool,
	label: PropTypes.string.isRequired,
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	onBlurOrder: PropTypes.func.isRequired,
	onChangeVisibility: PropTypes.func.isRequired,
	onKeyPressOrder: PropTypes.func.isRequired,
	order: PropTypes.number.isRequired,
};

export default ColumnDisplayer;
