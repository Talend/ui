import { PropTypes } from 'react';

export default {
	id: PropTypes.string,
	columns: PropTypes.arrayOf(PropTypes.object),
	items: PropTypes.arrayOf(PropTypes.object),
	itemProps: PropTypes.shape({
		classNameKey: PropTypes.string,
		isSelected: PropTypes.func,
		onSelect: PropTypes.func,
		onToggle: PropTypes.func,
		onToggleAll: PropTypes.func,
		width: PropTypes.string,
	}),
	titleProps: ItemTitle.propTypes.titleProps,
};
