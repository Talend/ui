import { PropTypes } from 'react';
import ItemTitle from '../ItemTitle';

export default {
	columns: PropTypes.arrayOf(PropTypes.object),
	items: PropTypes.arrayOf(PropTypes.object),
	ifSelected: PropTypes.func,
	onElementSelect: PropTypes.func,
	onToggleSingle: PropTypes.func,
	onToggleAll: PropTypes.func,
	titleProps: ItemTitle.propTypes.titleProps,
	width: PropTypes.string,
};
