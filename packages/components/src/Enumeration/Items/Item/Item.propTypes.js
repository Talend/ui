import { PropTypes } from 'react';
import Action from '../../../Actions/Action';

export default {
	item: PropTypes.object.isRequired,
	itemProps: PropTypes.shape({
		key: PropTypes.string,
		onSubmitItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		actions: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	}).isRequired,
};
