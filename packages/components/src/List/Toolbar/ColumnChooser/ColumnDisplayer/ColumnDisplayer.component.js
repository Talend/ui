import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../../Icon';
import theme from './ColumnDisplayer.scss';

const ColumnVisibility = ({ onChange, locked, value }) => {
	if (locked) {
		return <Icon name="talend-locked" />;
	}
	return <input onChange={() => onChange(!value)} type="checkbox" checked={value} value={value} />;
};

ColumnVisibility.propTypes = {
	onChange: PropTypes.func.isRequired,
	locked: PropTypes.bool,
	value: PropTypes.bool,
};

const ColumnOrder = ({ length, order, locked, onBlur, onChange, onKeyPress, value }) => {
	if (locked) {
		return (
			<div>
				<span
					className={classNames(
						theme['tc-column-displayer-order-value'],
						'tc-column-displayer-order-value',
					)}
				>
					{order}
				</span>
				{`/ ${length}`}
			</div>
		);
	}
	return (
		<React.Fragment>
			<input
				onChange={event => onChange(event.target.value)}
				placeholder={value}
				type="text"
				value={value}
				onBlur={event => onBlur(event.target.value)}
				onKeyPress={event => onKeyPress(event, event.target.value)}
			/>
			{`/${length}`}
		</React.Fragment>
	);
};

ColumnOrder.propTypes = {
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
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
	onChangeOrder,
	onBlurOrder,
	onKeyPressOrder,
}) => {
	return (
		<div
			id="column-chooser-displayer"
			key={`${label}`}
			className={classNames(theme['tc-column-displayer'], 'tc-column-displayer')}
		>
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
					onChange={onChangeOrder}
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
	label: PropTypes.string.isRequired,
	length: PropTypes.number.isRequired,
	locked: PropTypes.bool,
	onBlurOrder: PropTypes.func.isRequired,
	onChangeOrder: PropTypes.func.isRequired,
	onChangeVisibility: PropTypes.func.isRequired,
	onKeyPressOrder: PropTypes.func.isRequired,
	order: PropTypes.number.isRequired,
};

export default ColumnDisplayer;
