import React from 'react';
import Immutable from 'immutable';
import List from '../src/POCList/List';
import { IconsProvider } from '@talend/react-components';

const myItems = Immutable.fromJS([
	{
		id: 'id1',
		label: 'Title with actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
	{
		id: 'ID2',
		label: 'Title in input mode',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
		display: 'input',
		className: 'item-1-class',
	},
	{
		id: 'iD3',
		label: 'Super long title to trigger overflow on some rendering',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super long name',
	},
]);

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
		key: 'updated',
		order: 30,
		label: 'Updated',
		type: 'datetime',
		data: {
			mode: 'ago',
		},
	},
	{
		key: 'creator',
		order: 25,
		label: 'Author',
	},
];

class ListWithFilter extends React.Component {
	state = {
		filterQuery: '',
	};

	handleInputFilter = (event, values) => {
		this.setState({ filterQuery: values.query });
	};
	handleToggleFilter = () => {
		this.setState({ filterQuery: '' });
	};

	filterDatasets = items => items.filter(item => item.label.includes(this.state.filterQuery));

	render() {
		const items = this.filterDatasets(this.props.items.toJS());

		/*
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
		*/
		// const actions = { left: [{ actionId: 'dataset:add' }, { actionId: 'dataset:upload' }] };
		const actions = {};
		const cellDictionary = {};
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

const POCList = {
	default: () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<ListWithFilter
					collectionId={'datasets'}
					items={myItems}
				/>
			</div>
		</div>
	),
};

export default POCList;
