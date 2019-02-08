import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../Icon';

const ColumnVisibility = ({ onChange, value }) => (
	<span>
		<input onChange={() => onChange(!value)} type="checkbox" checked={value} value={value} />
	</span>
);

ColumnVisibility.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.bool,
};

const ColumnOrder = ({ onChange, value, length }) => (
	<span>
		<input
			style={{ width: '25px' }}
			onChange={event => onChange(event.target.value)}
			placeholder={value}
			type="text"
			value={value}
		/>
		{`/${length}`}
	</span>
);

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
}) => {
	return (
		<div
			id="columnDisplay"
			key={`${label}`}
			style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}
		>
			{locked ? (
				<Icon name="talend-locked" />
			) : (
				<ColumnVisibility onChange={onChangeVisibility} value={hidden} />
			)}
			<span>{label}</span>
			<ColumnOrder onChange={onChangeOrder} value={order} length={length} />
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
