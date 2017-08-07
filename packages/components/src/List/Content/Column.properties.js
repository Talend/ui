import PropTypes from 'prop-types';
import React from 'react';

const ACTION = 'action';
const ICON = 'icon';
const TEXT = 'text';
const TITLE = 'title';

const Column = {
	propTypes: PropTypes.shape({
		key: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		type: PropTypes.oneOf([ACTION, ICON, TEXT, TITLE]),
	}),
};

export default Column;
