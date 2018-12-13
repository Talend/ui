import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { action as stAction } from '@storybook/addon-actions';
import List from '../src/POCList/List';

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
};

const columns = [
	{ key: 'id', label: 'Id' },
	{ key: 'label', label: 'Name' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];

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
