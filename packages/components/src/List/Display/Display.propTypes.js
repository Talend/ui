import { PropTypes } from 'react';
import ItemTitle from '../ItemTitle';

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
	titleProps: ItemTitle.propTypes.titleProps,
	sort: PropTypes.shape({
		field: PropTypes.string,
		isDescending: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
	}),
};
