import { PropTypes } from 'react';

export default {
	items: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.object),
	iconKey: PropTypes.string,
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func,
	onElementSelect: PropTypes.func,
	width: PropTypes.string,
	onToggleSingle: PropTypes.func,
	onToggleAll: PropTypes.func,
	ifSelected: PropTypes.func,
};
