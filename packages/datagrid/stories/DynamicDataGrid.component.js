import React from 'react';
import random from 'lodash/random';
import { IconsProvider } from '@talend/react-components';

import DataGrid from '../src/components/';
import DefaultRenderer from '../src/components/DefaultCellRenderer/DefaultRenderer.component';
import DefaultIntCellRenderer from '../src/components/DefaultIntCellRenderer';
import DefaultPinHeaderRenderer from '../src/components/DefaultPinHeaderRenderer';
import DefaultCellRenderer from '../src/components/DefaultCellRenderer';
import DefaultHeaderRenderer from '../src/components/DefaultHeaderRenderer';
import sample from './sample.json';

const ADD_ITEMS_NUMBER = 4;
const LOADING_ITEM = {
	loading: true,
	value: {},
};

export function getComponent(component) {
	switch (component) {
		case 'DefaultIntCellRenderer':
			return DefaultIntCellRenderer;
		case 'DefaultHeaderRenderer':
			return DefaultHeaderRenderer;
		case 'DefaultPinHeaderRenderer':
			return DefaultPinHeaderRenderer;
		case 'DefaultCellRenderer':
			return DefaultCellRenderer;
		case 'DefaultStringCellRenderer':
			return DefaultRenderer;
		default:
			console.error(component);
	}
}

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
		const datagridSample = Object.assign({}, sample);
		datagridSample.data = new Array(ADD_ITEMS_NUMBER).fill(LOADING_ITEM);
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

	addLoadingsItems() {
		const datagridSample = Object.assign({}, this.state.sample);
		datagridSample.data = datagridSample.data.concat(
			new Array(ADD_ITEMS_NUMBER).fill(LOADING_ITEM),
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
				Number of data : {this.state.sample.data.length}
				<IconsProvider />
				<DataGrid
					data={this.state.sample}
					getComponent={getComponent}
					rowSelection="multiple"
					forceRedrawRows={() => true}
				/>
			</div>
		);
	}
}
