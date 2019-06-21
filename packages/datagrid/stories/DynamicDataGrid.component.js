import React from 'react';
import random from 'lodash/random';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/components/';
import sample from './sample.json';
import { getComponent } from './datagrid.component';

const ADD_ITEMS_NUMBER = 4;
const LOADING_ITEM = {
	loading: true,
	value: {},
};

function getItemWithRandomValue() {
	return {
		loading: false,
		value: {
			field2: {
				value: random(0, 10000000),
				quality: 1,
			},
			field8: {
				value: random(0, 10000000),
				quality: 0,
			},
			field5: {
				value: random(0, 10000000),
				quality: -1,
			},
			field4: {
				value: random(0, 10000000),
				quality: 1,
			},
			field7: {
				value: random(0, 10000000),
				quality: 1,
			},
			field3: {
				value: random(0, 10000000),
				quality: 1,
			},
			field1: {
				value: random(0, 10000000),
				quality: 1,
			},
			field0: {
				value: `Aéroport ${random(0, 10000000)}`,
				quality: 1,
			},
			field9: {
				value: random(0, 10000000),
				quality: 1,
			},
			field6: {
				value: random(0, 10000000),
				quality: 1,
			},
		},
		quality: 1,
	};
}

export default class DynamicDataGrid extends React.Component {
	constructor() {
		super();

		this.addLoadingsItems = this.addLoadingsItems.bind(this);
		this.terminateItems = this.terminateItems.bind(this);
		this.changeColumnQuality = this.changeColumnQuality.bind(this);

		const datagridSample = Object.assign({}, sample);
		datagridSample.data = new Array(ADD_ITEMS_NUMBER).fill().map(() => ({ ...LOADING_ITEM }));
		this.state = { sample: datagridSample, loading: true, index: 1 };

		setTimeout(this.terminateItems, 1000);
	}

	terminateItems() {
		this.setState(prevState => {
			const datagridSample = Object.assign({}, prevState.sample);
			datagridSample.data.splice(
				(prevState.index - 1) * ADD_ITEMS_NUMBER,
				ADD_ITEMS_NUMBER,
				...new Array(ADD_ITEMS_NUMBER).fill().map(getItemWithRandomValue),
			);

			return {
				sample: datagridSample,
				loading: !prevState.loading,
			};
		});
	}

	changeColumnQuality() {
		this.setState(prevState => {
			const datagridSample = Object.assign({}, prevState.sample);
			datagridSample.data = datagridSample.data.map(rowData => ({
				...rowData,
				value: {
					...rowData.value,
					field5: {
						...rowData.value.field5,
						quality: rowData.value.field5.quality === 1 ? -1 : 1,
					},
				},
			}));

			return {
				sample: datagridSample,
			};
		});
	}

	addLoadingsItems() {
		const datagridSample = Object.assign({}, this.state.sample);
		datagridSample.data = datagridSample.data.concat(
			new Array(ADD_ITEMS_NUMBER).fill().map(() => ({ ...LOADING_ITEM })),
		);

		this.setState(prevState => ({
			index: prevState.index + 1,
			sample: datagridSample,
			loading: !prevState.loading,
		}));

		setTimeout(this.terminateItems, 1000);
	}

	render() {
		return (
			<div style={{ height: '100vh' }}>
				<input
					type="button"
					value={`add ${ADD_ITEMS_NUMBER} items`}
					onClick={this.addLoadingsItems}
					disabled={this.state.loading}
				/>
				<input
					type="button"
					value={'change quality for 1 column(#6)'}
					onClick={this.changeColumnQuality}
					disabled={this.state.loading}
				/>
				Number of data : {this.state.sample.data.length}
				<IconsProvider />
				<DataGrid data={this.state.sample} getComponent={getComponent} rowSelection="multiple" />
			</div>
		);
	}
}
