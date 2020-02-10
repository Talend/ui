import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import Table from './Table';
import JSONLike from './JSONLike';
import List from './List';

export const DISPLAY_MODES = {
	FLAT: 'flat',
	TABLE: 'table',
	TREE: 'tree',
	LIST: 'list',
};

const DATASCHEMATYPES = [
	{
		TYPE: 'long',
		LOGICALTYPE: 'time-micros',
	},
	{
		TYPE: 'int',
		LOGICALTYPE: 'time-millis',
	},
	{
		TYPE: 'long',
		LOGICALTYPE: 'timestamp-micros',
	},
	{
		TYPE: 'long',
		LOGICALTYPE: 'timestamp-millis',
	},
	{
		TYPE: 'int',
		LOGICALTYPE: 'date',
	},
];

/**
 * Convert timestamp to ISO Date
 * @param {Object} dataSchema
 * @param {Array<Object>} data - the sample data fetched from BE
 * @return {Array<Object> | null}
 */
export function convertDate(dataSchema, data) {
	if (dataSchema && dataSchema.fields) {
		const dataSchemaType = dataSchema.fields.reduce((acc, val) => val.type, {});
		for (const DATASCHEMATYPE of DATASCHEMATYPES) {
			if (
				dataSchemaType &&
				dataSchemaType.type === DATASCHEMATYPE.TYPE &&
				dataSchemaType.logicalType === DATASCHEMATYPE.LOGICALTYPE
			) {
				return data.map(d => ({
					id: d.id,
					LastModifiedDate: new Date(d.LastModifiedDate).toISOString(),
				}));
			}
		}
	}
	return null;
}

export default function ObjectViewer({ displayMode, dataSchema, data, ...props }) {
	if (!data) {
		return null;
	}
	const memoizedConvertDate = useMemo(() => convertDate(dataSchema, data), [dataSchema, data]);
	const newProps = {
		...props,
		data: memoizedConvertDate || data,
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
