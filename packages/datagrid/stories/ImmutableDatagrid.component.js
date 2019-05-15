import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { fromJS } from 'immutable';

import DataGrid from '../src/components/';
import sample from './sample.json';
import { getComponent } from './datagrid.component';

export default class ImmutableDataGrid extends React.Component {
	constructor() {
		super();

		this.state = { sample: fromJS(sample) };
	}

	changeColumnQuality = () => {
		this.setState({
			sample: this.state.sample.set(
				'data',
				this.state.sample.get('data').map(rowData => {
					const test = rowData.setIn(['value', 'field5', 'quality'], 1);
					return test;
				}),
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
				<DataGrid data={this.state.sample} getComponent={getComponent} />
			</div>
		);
	}
}
