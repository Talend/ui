import React from 'react';

import DataGrid from '../src/components/';
import { COLUMN_INDEX, NAMESPACE_DATA, NAMESPACE_INDEX } from '../src/constants';
import sample from './sample.json';
import getComponent from './getComponent';

const CHANGE_QUALITY_COLUMN_ID = 'field3';

function getRowData(rowRawData = [], startIndex = 0) {
	return rowRawData.map((row, index) =>
		Object.keys(row.value).reduce(
			(rowData, key) =>
				Object.assign(rowData, {
					[`${NAMESPACE_DATA}${key}`]: row.value[key],
				}),
			{
				[`${NAMESPACE_INDEX}${COLUMN_INDEX}`]: index + startIndex,
				loading: !!row.loading,
			},
		),
	);
}

export default class FasterDatagrid extends React.Component {
	constructor() {
		super();

		this.state = {
			data: sample,
			rowData: getRowData(sample.data),
		};
	}

	changeColumnQuality = columnId => {
		this.setState({
			rowData: this.state.rowData.map(rowData =>
				Object.assign({}, rowData, {
					[`${NAMESPACE_DATA}${columnId}`]: Object.assign(
						{},
						rowData[`${NAMESPACE_DATA}${columnId}`],
						{ quality: rowData[`${NAMESPACE_DATA}${columnId}`].quality === -1 ? 1 : -1 },
					),
				}),
			),
		});
	};

	render() {
		return (
			<div style={{ height: '100vh' }}>
				<input
					type="button"
					value={'change quality for field3 column'}
					onClick={() => this.changeColumnQuality(CHANGE_QUALITY_COLUMN_ID)}
				/>
				<DataGrid
					data={this.state.data}
					rowData={this.state.rowData}
					getComponent={getComponent}
					getRowDataFn={null}
				/>
			</div>
		);
	}
}
