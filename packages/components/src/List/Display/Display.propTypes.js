import PropTypes from 'proptypes';

export default {
	id: PropTypes.string,
	columns: PropTypes.arrayOf(PropTypes.object),
	items: PropTypes.arrayOf(PropTypes.object),
	itemProps: PropTypes.shape({
		classNameKey: PropTypes.string,
		isActive: PropTypes.func,
		isSelected: PropTypes.func,
		onRowClick: PropTypes.func,
		onSelect: PropTypes.func,
		onToggle: PropTypes.func,
		onToggleAll: PropTypes.func,
		width: PropTypes.string,
	}),
	titleProps: PropTypes.shape({
		key: PropTypes.string,
		iconKey: PropTypes.string,
		displayModeKey: PropTypes.string,
		onClick: PropTypes.func,
		onEditSubmit: PropTypes.func,
		onEditCancel: PropTypes.func,
	}),
	sort: PropTypes.shape({
		field: PropTypes.string,
		isDescending: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
	}),
	t: PropTypes.func,
};
