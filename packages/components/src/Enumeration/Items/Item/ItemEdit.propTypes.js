import { PropTypes } from 'react';

export default {
	currentEdit: PropTypes.shape({
		validate: PropTypes.shape({
			disabled: PropTypes.bool,
		}),
		abort: PropTypes.shape({
			disabled: PropTypes.bool,
		}),
	}),
};
