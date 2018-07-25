import React from 'react';
import PropTypes from 'prop-types';
import PickerAction from '../../../PickerAction';

export default function RowRenderer({ index, key, parent, style }) {
	const { items, onSelect, selectedItemId } = parent.props;
	const item = items[index];

	return (
		<PickerAction
			aria-label={`Select '${item.label}'`}
			isSelected={item.id === selectedItemId}
			key={key}
			label={item.label}
			onClick={() => onSelect(item)}
			style={style}
		/>
	);
}
RowRenderer.propTypes = {
	index: PropTypes.number.isRequired,
	key: PropTypes.string.isRequired,
	parent: PropTypes.shape({
		items: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired,
		selectedItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	style: PropTypes.object,
};
