import React from 'react';
import List from '../List';

const titleProps = {
	key: 'label',
	iconKey: 'icon',
	actionsKey: 'actions',
	persistentActionsKey: 'persistentActions',
};

const columns = [
	{
		key: 'label',
		order: 10,
		label: 'Name',
	},
	{
		type: 'connection',
		order: 20,
		key: 'datastore',
		label: 'Connection Name',
	},
	{
		key: 'updated',
		order: 30,
		label: 'Updated',
		type: 'datetime',
		data: {
			mode: 'ago',
		},
	},
	{
		type: 'favorite',
		order: 15,
		key: 'favorite',
		header: 'icon',
		sortFunction: 'list-favorite-sort',
		data: {
			iconName: 'talend-star',
		},
		label: 'Favorite',
	},
	{
		type: 'quality',
		order: 11,
		key: 'talendGlobalQuality',
		header: 'icon',
		sortFunction: 'list-quality-sort',
		data: {
			iconName: 'talend-pie-charts',
		},
		label: 'Quality',
	},
	{
		type: 'certification',
		order: 14,
		key: 'certification',
		header: 'icon',
		sortFunction: 'list-certification-sort',
		data: {
			iconName: 'talend-badge',
			entitlement: 'TDP_DATASET_CERTIFY',
		},
		label: 'Certification',
	},
	{
		key: 'creator',
		order: 25,
		label: 'Author',
	},
];

class DatasetList extends React.Component {
	state = {
		filterQuery: '',
	};

	handleSort = () => {
		// if (props.toolbar.sort) {
		// 	props.toolbar.sort.isDescending = !state.sortAsc;
		// 	props.toolbar.sort.field = state.sortOn;
		// 	props.toolbar.sort.onChange = (event, data) => {
		// 		this.props.dispatch({
		// 			type: Constants.LIST_CHANGE_SORT_ORDER,
		// 			payload: data,
		// 			collectionId: props.collectionId,
		// 			event,
		// 		});
		// 	};
		// }
	};

	handleDisplay = () => {
		// if (props.toolbar.display) {
		// 	props.toolbar.display = {
		// 		...props.toolbar.display,
		// 		onChange: (event, data) => {
		// 			this.onSelectDisplayMode(event, data);
		// 		},
		// 	};
		// }
	};

	handleInputFilter = (event, values) => {
		// 	props.toolbar.filter.onFilter = (event, data) => {
		// 		this.props.dispatch({
		// 			type: Constants.LIST_FILTER_CHANGE,
		// 			payload: data,
		// 			collectionId: props.collectionId,
		// 			event,
		// 		});
		// 	};
		this.setState({ filterQuery: values.query });
	};
	handleToggleFilter = () => {
		// 	props.toolbar.filter.onToggle = (event, data) => {
		// 		this.props.dispatch({
		// 			type: Constants.LIST_TOGGLE_FILTER,
		// 			payload: Object.assign({}, data, {
		// 				filterDocked: state.filterDocked,
		// 				searchQuery: state.searchQuery,
		// 			}),
		// 			collectionId: props.collectionId,
		// 			event,
		// 		});
		// 	};
		this.setState({ filterQuery: '' });
	};

	// if (props.toolbar.filter) {
	// 	props.toolbar.filter.docked = state.filterDocked;
	// 	props.toolbar.filter.value = state.searchQuery;
	// }

	filterDatasets = items => items.filter(item => item.label.includes(this.state.filterQuery));

	render() {
		const items = this.filterDatasets(this.props.items.toJS());

		const cellDictionary = {
			connection: {
				component: 'ConnectionCellRenderer',
			},
			favorite: {
				component: 'FavoriteCellRenderer',
			},
			quality: {
				component: 'QualityCellRenderer',
			},
			certification: {
				component: 'CertificationCellRenderer',
			},
		};
		const actions = { left: [{ actionId: 'dataset:add' }, { actionId: 'dataset:upload' }] };
		return (
			<List
				getComponent={this.props.getComponent}
				collectionId={this.props.collectionId}
				cellDictionary={cellDictionary}
			>
				<List.Toolbar
					handleInputFilter={this.handleInputFilter}
					handleToggleFilter={this.handleToggleFilter}
				>
					<List.Toolbar.ActionBar actions={actions} />
					<List.Toolbar.Sort
						options={[
							{
								id: 'label',
								name: 'Name',
							},
							{
								id: 'datastore',
								name: 'Connection Name',
							},
							{
								id: 'updated',
								name: 'Updated',
							},
						]}
					/>
					<List.Toolbar.DisplayMode />
					<div>
						<List.Toolbar.FilterBar id={'dataset'} placeholder={'Find a dataset'} />
					</div>
				</List.Toolbar>
				<List.VirtualizedList titleProps={titleProps} items={items} columns={columns} />
			</List>
		);
	}
}

export default DatasetList;
