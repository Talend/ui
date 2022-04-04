import PropTypes from 'prop-types';
import Icon from '../../../Icon';

export default {
	id: PropTypes.string,
	label: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	measure: PropTypes.func,
	icon: PropTypes.shape(Icon.propTypes),
	dataTest: PropTypes.string,
};
