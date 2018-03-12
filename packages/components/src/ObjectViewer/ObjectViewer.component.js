import PropTypes from 'prop-types';
import React from 'react';

import Table from './Table';
import JSONLike from './JSONLike';
import List from './List';
import Model from './Model';
import Records from './Records';

export const DISPLAY_MODES = {
	FLAT: 'flat',
	LIST: 'list',
	MODEL: 'model',
	RECORDS: 'records',
	TABLE: 'table',
	TREE: 'tree',
};

export default function ObjectViewer({ displayMode, ...props }) {
	if (!props.data) {
		return null;
	}

	switch (displayMode) {
		case DISPLAY_MODES.TABLE:
			return <Table {...props} />;
		case DISPLAY_MODES.FLAT:
			return <Table {...props} flat />;
		case DISPLAY_MODES.TREE:
			return <JSONLike {...props} />;
		case DISPLAY_MODES.LIST:
			return <List {...props} />;
		case DISPLAY_MODES.MODEL:
			return <Model {...props} />;
		case DISPLAY_MODES.RECORDS:
			return <Records {...props} />;
		default:
			return <JSONLike {...props} />;
	}
}

ObjectViewer.displayName = 'ObjectViewer';

ObjectViewer.propTypes = {
	data: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
	displayMode: PropTypes.oneOf(Object.keys(DISPLAY_MODES).map(key => DISPLAY_MODES[key])),
	rootLabel: PropTypes.string,
	showTypes: PropTypes.bool,
	tupleLabel: PropTypes.string,
};

ObjectViewer.Table = Table;
ObjectViewer.Tree = JSONLike;
ObjectViewer.List = List;
