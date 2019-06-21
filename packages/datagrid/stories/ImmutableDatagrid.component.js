import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { fromJS } from 'immutable';
import get from 'lodash/get'

import DataGrid from '../src/components/';
import sample from './sample.json';
import { getComponent } from './datagrid.component';

export function getRowData(sample, startIndex = 0) {
	if (!sample) {
		return [];
	}

	const plainObjectSample = convertSample(sample);

	return get(plainObjectSample, 'data', []).map((row, index) =>
		Object.keys(row.value).reduce(
			(rowData, key) => ({
				...rowData,
				[`${NAMESPACE_DATA}${key}`]: sample
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
					.map(rowData => rowData.setIn(['value', 'field5', 'quality'], 1)),
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
				<DataGrid data={this.state.sample} getRowData={} getComponent={getComponent} />
			</div>
		);
	}
}
