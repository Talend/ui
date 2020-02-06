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

const dataSchemaTypes = [
	{
		type: 'long',
		logicalType: 'time-micros',
	},
	{
		type: 'int',
		logicalType: 'time-millis',
	},
	{
		type: 'long',
		logicalType: 'timestamp-micros',
	},
	{
		type: 'long',
		logicalType: 'timestamp-millis',
	},
	{
		type: 'int',
		logicalType: 'date',
	},
];

/**
 * Convert timestamp to ISO Date
 * @param {Object} dataSchema
 * @param {Array<Object>} data - the sample data fetched form BE
 * @return {Array<Object> | null}
 */
function convertDate(dataSchema, data) {
	const schemaType = _.get(dataSchema, ['fields', '1', 'type'], null);
	for (const dataSchemaType of dataSchemaTypes) {
		if (
			schemaType &&
			schemaType.type === dataSchemaType.type &&
			schemaType.logicalType === dataSchemaType.logicalType
		) {
			return data.map(d => ({
				id: d.id,
				LastModifiedDate: new Date(d.LastModifiedDate).toISOString(),
			}));
		}
	}
	return null;
}

export default function ObjectViewer({ displayMode, dataSchema, data, ...props }) {
	if (!data) {
		return null;
	}
	const convertedDataElements = convertDate(dataSchema, data);
	console.log(convertedDataElements);
	const newProps = {
		...props,
		data: convertedDataElements || data,
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
	data: PropTypes.arrayOf(PropTypes.object),
	dataSchema: PropTypes.arrayOf(PropTypes.object),
};

ObjectViewer.Table = Table;
ObjectViewer.Tree = JSONLike;
ObjectViewer.List = List;
