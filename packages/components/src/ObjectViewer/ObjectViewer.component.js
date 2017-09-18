import PropTypes from 'prop-types';
import React from 'react';

import Table from './Table';
import JSONLike from './JSONLike';
import List from './List';

export const DISPLAY_MODES = {
	FLAT: 'flat',
	TABLE: 'table',
	TREE: 'tree',
	LIST: 'list',
};

export default function ObjectViewer({ displayMode, ...props }) {
	switch (displayMode) {
	case DISPLAY_MODES.TABLE:
		return (<Table {...props} />);
	case DISPLAY_MODES.FLAT:
		return (<Table {...props} flat />);
	case DISPLAY_MODES.TREE:
		return (<JSONLike {...props} />);
	case DISPLAY_MODES.LIST:
		return (<List {...props} />);
	default:
		return (<JSONLike {...props} />);
	}
}

ObjectViewer.propTypes = {
	displayMode: PropTypes.oneOf(Object.keys(DISPLAY_MODES).map(key => DISPLAY_MODES[key])),
	tupleLabel: PropTypes.string,
	rootLabel: PropTypes.string,
};

ObjectViewer.Table = Table;
ObjectViewer.Tree = JSONLike;
ObjectViewer.List = List;
