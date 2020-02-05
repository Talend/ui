import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import Table from './Table';
import JSONLike from './JSONLike';
import List from './List';

export const DISPLAY_MODES = {
	FLAT: 'flat',
	TABLE: 'table',
	TREE: 'tree',
	LIST: 'list',
};

/**
 * Convert timestamp to ISO Date
 * @param {Object} dataSchema
 * @param {Array<Object>} data - the sample data fetched form BE
 * @return {Array<Object> | null}
 */
function convertDate(dataSchema, data) {
	const schemaType = _.get(dataSchema, ['fields', '1', 'type'], null);
	if (schemaType && schemaType.type === 'long' && schemaType.logicalType === 'timestamp-millis') {
		return data.map(d => ({
			id: d.id,
			LastModifiedDate: new Date(d.LastModifiedDate).toISOString(),
		}));
	}
	return null;
}

export default function ObjectViewer({ displayMode, dataSchema, ...props }) {
	if (!props.data) {
		return null;
	}

	const convertedDataElements = convertDate(dataSchema, props.data);
	if (convertedDataElements) {
		props.data = convertedDataElements;
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
		default:
			return <JSONLike {...props} />;
	}
}

ObjectViewer.displayName = 'ObjectViewer';

ObjectViewer.propTypes = {
	displayMode: PropTypes.oneOf(Object.keys(DISPLAY_MODES).map(key => DISPLAY_MODES[key])),
	tupleLabel: PropTypes.string,
	rootLabel: PropTypes.string,
	showTypes: PropTypes.bool,
	data: PropTypes.arrayOf(PropTypes.object),
	dataSchema: PropTypes.arrayOf(PropTypes.object),
};

ObjectViewer.Table = Table;
ObjectViewer.Tree = JSONLike;
ObjectViewer.List = List;
