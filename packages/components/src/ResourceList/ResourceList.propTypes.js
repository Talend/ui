import PropTypes from 'prop-types';
import Toolbar from './Toolbar';

export default {
	className: PropTypes.string,
	collection: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	onRowClick: PropTypes.func,
	renderAs: PropTypes.func,
	toolbar: PropTypes.shape(Toolbar.propTypes),
	rowProps: PropTypes.object,
};
