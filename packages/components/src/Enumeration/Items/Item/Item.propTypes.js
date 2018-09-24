import PropTypes from 'prop-types';
import Action from '../../../Actions/Action';
import Icon from '../../../Icon';

export default {
	id: PropTypes.string,
	style: PropTypes.object,
	item: PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
		error: PropTypes.string,
		icon: PropTypes.shape(Icon.propTypes),
		className: PropTypes.string,
		itemsProp: PropTypes.shape({
			key: PropTypes.string,
			onSubmitItem: PropTypes.func,
			onChangeItem: PropTypes.func,
			onAbortItem: PropTypes.func,
			onSelectItem: PropTypes.func,
			isSelected: PropTypes.bool,
			actions: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
		}),
	}).isRequired,
};
