import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { action as stAction } from '@storybook/addon-actions';
import List from '../src/POCList/List';

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
		// const actions = { left: [{ actionId: 'dataset:add' }, { actionId: 'dataset:upload' }] };
(
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
*/

const items = [
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
];

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
/*
class ListWithFilter extends React.Component {
	state = {
		filterQuery: '',
	};

	getState = () => ({ filterQuery: this.props.filterQuery || this.state.filterQuery });
	handleInputFilter = (event, values) => {
		this.setState({ filterQuery: values.query });
	};
	handleToggleFilter = () => {
		this.setState({ filterQuery: '' });
	};
	filterDatasets = items => items.filter(item => item.label.includes(this.getState().filterQuery));

	render() {
		const items = this.filterDatasets(this.props.items);
		const actions = {};
		const cellDictionary = {};

		return (
			<List collectionId={this.props.collectionId} cellDictionary={cellDictionary}>
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
						<List.Toolbar.FilterBar id={'myFilterBar'} placeholder={'Find something'} />
					</div>
				</List.Toolbar>
				<List.VirtualizedList titleProps={titleProps} items={items} columns={columns} />
			</List>
		);
	}
}
*/

const actions = {};

/**
 * To handle filtering you need to create your callback and make the filtering in an upper component.
 */
class ListFilter extends React.Component {
	state = { filter: '' };
	filter = (event, values) => {
		this.setState({ filter: values.query });
	};
	toggle = () => {
		this.setState({ filter: '' });
	};
	render() {
		const filteredItems = this.props.items.filter(item => item.label.includes(this.state.filter));
		return (
			<List collectionId={'myCollection'}>
				<List.Toolbar handleInputFilter={this.filter} handleToggleFilter={this.toggle}>
					<List.Toolbar.FilterBar id={'myFilterBar'} placeholder={'Find something'} />
				</List.Toolbar>
				<List.VirtualizedList items={filteredItems} columns={columns} />
			</List>
		);
	}
}

const POCList = {
	withAllElement: () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<List collectionId={'myCollection'}>
					<List.Toolbar
						handleInputFilter={stAction('input filter')}
						handleToggleFilter={stAction('toggle filter')}
					>
						<List.Toolbar.Sort
							options={[
								{
									id: 'sort1',
									name: 'sort1',
								},
								{
									id: 'sort2',
									name: 'sort2',
								},
							]}
						/>
						<List.Toolbar.DisplayMode />
						<List.Toolbar.FilterBar id={'myFilterBar'} placeholder={'Find something'} />
					</List.Toolbar>
					<List.VirtualizedList items={items} columns={columns} />
				</List>
			</div>
		</div>
	),
	withFilter: () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<ListFilter items={items} />
			</div>
		</div>
	),
};

export default POCList;
