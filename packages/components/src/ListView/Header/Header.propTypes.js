import { PropTypes } from 'react';

import Action from '../../Actions/Action';

export default {
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	headerLabel: PropTypes.string,
	required: PropTypes.bool,
	nbItems: PropTypes.number,
	nbItemsSelected: PropTypes.number,
};
