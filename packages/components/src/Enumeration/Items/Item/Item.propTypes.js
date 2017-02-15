import { PropTypes } from 'react';
import Action from '../../../Actions/Action';

export default {
	id: PropTypes.string,
	item: PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
        itemsProp: PropTypes.shape({
            key: PropTypes.string,
            onSubmitItem: PropTypes.func,
            onAbortItem: PropTypes.func,
            actions: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
		})
    }).isRequired,
};
