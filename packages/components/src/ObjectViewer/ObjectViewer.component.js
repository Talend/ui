import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import Table from './Table';
import JSONLike from './JSONLike';
import List from './List';

import { checkDataSchemaToConvert, convertDate } from './convertDate';

const DISPLAY_MODES = {
	FLAT: 'flat',
	TABLE: 'table',
	TREE: 'tree',
	LIST: 'list',
};

export default function ObjectViewer({ displayMode, dataSchema, data, ...props }) {
	if (!data) {
		return null;
	}

	// check if we need to convert timestamp to ISO String Date
	const toConvert = useMemo(() => checkDataSchemaToConvert(dataSchema), [dataSchema]);
	const newData = useMemo(() => convertDate(data, toConvert), [data, toConvert]);

	const newProps = {
		...props,
		data: newData || data,
	};

	switch (displayMode) {
		case DISPLAY_MODES.TABLE:
			return <Table {...newProps} />;
		case DISPLAY_MODES.FLAT:
			return <Table {...newProps} flat />;
		case DISPLAY_MODES.TREE:
			return <JSONLike {...newProps} />;
		case DISPLAY_MODES.LIST:
			return <List {...newProps} />;
		default:
			return <JSONLike {...newProps} />;
	}
}

ObjectViewer.displayName = 'ObjectViewer';

ObjectViewer.propTypes = {
	displayMode: PropTypes.oneOf(Object.keys(DISPLAY_MODES).map(key => DISPLAY_MODES[key])),
	tupleLabel: PropTypes.string,
	rootLabel: PropTypes.string,
	showTypes: PropTypes.bool,
	data: PropTypes.array,
	dataSchema: PropTypes.arrayOf(PropTypes.object),
};

ObjectViewer.DISPLAY_MODES = DISPLAY_MODES;
ObjectViewer.Table = Table;
ObjectViewer.Tree = JSONLike;
ObjectViewer.List = List;
