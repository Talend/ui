import { PropTypes } from 'react';

export default {
	id: PropTypes.number,
	values: PropTypes.arrayOf(PropTypes.string).isRequired,
};
