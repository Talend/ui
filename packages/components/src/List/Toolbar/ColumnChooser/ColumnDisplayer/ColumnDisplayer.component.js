import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../Icon';
import classNames from 'classnames';
import theme from './ColumnDisplayer.scss';

const ColumnVisibility = ({ onChange, value }) => (
	<input onChange={() => onChange(!value)} type="checkbox" checked={value} value={value} />
);

ColumnVisibility.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.bool,
};

const ColumnOrder = ({ length, order, locked, onBlur, onChange, onKeyPress, value }) => {
	if (locked) {
		return <div>{`${order} / ${length}`}</div>;
	}
	return (
		<React.Fragment>
			<input
				style={{ width: '25px' }}
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
	onChange: PropTypes.func.isRequired,
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
				{locked ? (
					<Icon name="talend-locked" />
				) : (
					<ColumnVisibility onChange={onChangeVisibility} value={hidden} />
				)}
			</div>
			<div style={{ display: 'flex', paddingLeft: '20px', width: '100%' }}>{label}</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					width: '100%',
					alignItems: 'center',
				}}
			>
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
	onChangeOrder: PropTypes.func.isRequired,
	onChangeVisibility: PropTypes.func.isRequired,
	order: PropTypes.number.isRequired,
};

export default ColumnDisplayer;
