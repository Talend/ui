import type { Meta, StoryObj } from '@storybook/react';
import Actions from './Actions.component';

const actions = [
	{
		label: 'Preparations',
		icon: 'fa fa-asterisk',
		'data-feature': 'actions.item',
		onClick: () => console.log('Preparations clicked'),
		bsStyle: 'primary',
	},
	{
		label: 'Datasets',
		icon: 'fa fa-file-excel-o',
		'data-feature': 'actions.item',
		onClick: () => console.log('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'fa fa-star',
		'data-feature': 'actions.item',
		onClick: () => console.log('Favorites clicked'),
		inProgress: true,
	},
	{
		id: 'dropdown',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'fa fa-file-excel-o',
		items: [
			{
				label: 'document 1',
				'data-feature': 'actions.dropdown.items',
				onClick: () => console.log('document 1 click'),
			},
			{
				label: 'document 2',
				'data-feature': 'actions.dropdown.items',
				onClick: () => console.log('document 2 click'),
			},
		],
	},
	{
		id: 'split-dropdown-id',
		displayMode: 'splitDropdown',
		label: 'add file',
		'data-feature': 'actions.splitdropdown',
		onClick: () => console.log('click'),
		items: [
			{
				label: 'file 1',
				'data-feature': 'actions.splitdropdown.items',
				onClick: () => console.log('file 1 click'),
			},
			{
				label: 'file 2',
				'data-feature': 'actions.splitdropdown.items',
				onClick: () => console.log('file 2 click'),
			},
		],
	},
];

type Story = StoryObj<typeof Actions>;

const meta: Meta<typeof Actions> = {
	title: 'Components/Actions/ButtonGroup',
	component: Actions,
	tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
	render: () => (
		<div>
			<p>By default :</p>
			<div id="default">
				<Actions actions={actions} />
			</div>
			<p>Vertical</p>
			<div id="vertical">
				<Actions actions={actions} vertical />
			</div>
		</div>
	),
};
