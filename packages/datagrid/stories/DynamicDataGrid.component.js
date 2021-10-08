import React from 'react';
import random from 'lodash/random';
import { IconsProvider } from '@talend/react-components';
import PropTypes from 'prop-types';

import DataGrid from '../src/components/';
import serializer from '../src/components/DatasetSerializer';
import sample from './sample.json';
import getComponent from './getComponent';

const ADD_ITEMS_NUMBER = 4;
const LOADING_ITEM = {
	loaded: false,
	value: {},
};

/**
 * getRowDataInfos - this function return information about how many row of each type are loaded
 *
 * @param  {array} rowData array of rowData
 * @return {object}        state of the rowData
 */
export function getRowDataInfos(rowData) {
	return rowData.reduce(
		(acc, item) => {
			if (item.loading === false && Object.keys(item).length === 2) {
				// eslint-disable-next-line no-param-reassign
				acc.notLoaded += 1;
			} else if (item.loading === true) {
				// eslint-disable-next-line no-param-reassign
				acc.loading += 1;
			} else {
				// eslint-disable-next-line no-param-reassign
				acc.loaded += 1;
			}
			return acc;
		},
		{
			loaded: 0,
			loading: 0,
			notLoaded: 0,
		},
	);
}

/**
 * redrawRows - call redrawRows only if necessary. (improve ag-grid performance)
 *
 * @param  {object} props     component props
 * @param  {object} prevProps previous component prop
 * @return {boolean}         return true if we need to reload the grid
 */
function forceRedrawRows(props, prevProps) {
	const prevInfos = getRowDataInfos(prevProps.rowData);
	const currentInfos = getRowDataInfos(props.rowData);

	return (
		prevInfos.loaded !== currentInfos.loaded ||
		prevInfos.loading !== currentInfos.loading ||
		prevInfos.notLoaded !== currentInfos.notLoaded
	);
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
	static propTypes = {
		forceRedraw: PropTypes.bool,
	};

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
				<DataGrid
					data={this.state.sample}
					getComponent={getComponent}
					rowSelection="multiple"
					forceRedrawRows={this.props.forceRedraw ? forceRedrawRows : null}
					rowData={this.props.forceRedraw ? serializer.getRowData(this.state.sample) : null} //
				/>
			</div>
		);
	}
}
