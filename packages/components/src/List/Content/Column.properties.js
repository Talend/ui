import React from 'react';

const ACTION = 'action';
const ICON = 'icon';
const TEXT = 'text';
const TITLE = 'title';

const Column = {
	propTypes: React.PropTypes.shape({
		key: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		type: React.PropTypes.oneOf([ACTION, ICON, TEXT, TITLE]),
	}),
};

export default Column;
