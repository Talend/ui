import React from 'react';
import { IconsProvider } from '@talend/react-components';
import Immutable, { fromJS } from 'immutable';

import DataGrid from '../src/components/';
import { NAMESPACE_DATA, NAMESPACE_INDEX, COLUMN_INDEX } from '../src/constants';
import sample from './sample.json';
import getComponent from './getComponent';

export function getRowData(sampleData, startIndex = 0) {
	if (!sample) {
		return [];
	}

	return sampleData.get('data', []).map((row, index) =>
		[...row.get('value', Immutable.Map({})).keys()].reduce(
			(rowData, key) => ({
				...rowData,
				[`${NAMESPACE_DATA}${key}`]: sampleData
					.get('data')
					.get(index)
					.get('value')
					.get(key),
			}),
			{
				[`${NAMESPACE_INDEX}${COLUMN_INDEX}`]: index + startIndex,
				loading: !!row.loading,
			},
		),
	);
}

export default class ImmutableDataGrid extends React.Component {
	constructor() {
		super();

		this.state = { sample: fromJS(sample) };
	}

	changeColumnQuality = () => {
		this.setState({
			sample: this.state.sample.set(
				'data',
				this.state.sample
					.get('data')
					.map(rowData =>
						rowData.setIn(
							['value', 'field5', 'quality'],
							rowData.getIn(['value', 'field5', 'quality']) === 1 ? -1 : 1,
						),
					),
			),
		});
	};

	render() {
		return (
			<div style={{ height: '100vh' }}>
				<input
					type="button"
					value={'change quality for 1 column(#6)'}
					onClick={this.changeColumnQuality}
				/>
				<IconsProvider />
				<DataGrid data={this.state.sample} getRowDataFn={getRowData} getComponent={getComponent} />
			</div>
		);
	}
}
