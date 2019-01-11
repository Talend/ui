import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import ResourcePicker, { TOOLBAR_OPTIONS } from '../src/ResourcePicker';
import IconsProvider from '../src/IconsProvider';


const icons = {
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
	'talend-check-circle': talendIcons['talend-check-circle'],
	'talend-star': talendIcons['talend-star'],
	'talend-badge': talendIcons['talend-badge'],
	'talend-sort-az': talendIcons['talend-sort-az'],
	'talend-sort-desc': talendIcons['talend-sort-desc'],
	'talend-caret-down': talendIcons['talend-caret-down'],
};

const collection = [
	{
		id: 0,
		name: 'Title with few actions',
		modified: '2016-09-22',
		icon: 'talend-file-xls-o',
		author: 'First Author',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
	{
		id: 1,
		name: 'Title with lot of actions',
		modified: '2016-09-22',
		icon: 'talend-file-xls-o',
		author: 'Second Author',
	},
	{
		id: 2,
		name: 'Title with persistant actions',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		flags: ['FAVORITE'],
	},
	{
		id: 3,
		name: 'Title with icon',
		modified: '2016-09-22',
		author: 'Third Author',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED'],
	},
	{
		id: 4,
		name: 'Title in input mode',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
	},
	{
		id: 5,
		name: 'Title with long long long long long long long long long long long text',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super super super long text',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
];


const name = {
	onChange: action('Name filter changed'),
	label: 'Toolbar name label',
	placeholder: 'Toolbar name placeholder',
};

const sort = {
	onChange: action('Sort option changed'),
	orders: {
		[TOOLBAR_OPTIONS.SORT_OPTIONS.DATE]: TOOLBAR_OPTIONS.ORDERS.ASC,
	},
};
const state = {
	certified: true,
	onChange: action('State filter changed'),
};

const props = {
	collection,
	toolbar: { name, sort, state },
};


storiesOf('ResourcePicker', module)
	.addDecorator(story => (
		<section>
			<IconsProvider defaultIcons={icons} />
			{story()}
		</section>
	))
	.add('default', () => (
		<div>
			<p>By default :</p>
			<ResourcePicker id="default" {...props} />
		</div>
	))
	.add('without toolbar', () => (
		<div>
			<p>By default :</p>
			<ResourcePicker id="default" collection={collection} />
		</div>
	))
	.add('without sort options', () => (
		<div>
			<p>By default :</p>
			<ResourcePicker id="default" collection={collection} toolbar={{ name, state }} />
		</div>
	))
	.add('with partial sort options', () => (
		<div>
			<p>By default :</p>
			<ResourcePicker
				id="default"
				collection={collection}
				toolbar={{
					name,
					state,
					sort: {
						...sort,
						types: [TOOLBAR_OPTIONS.SORT_OPTIONS.DATE],
					},
				}}
			/>
		</div>
	))
	.add('without state filter', () => (
		<div>
			<p>By default :</p>
			<ResourcePicker id="default" collection={collection} toolbar={{ name, sort }} />
		</div>
	))
	.add('with partial state options', () => (
		<div>
			<p>By default :</p>
			<ResourcePicker
				id="default"
				collection={collection}
				toolbar={{
					name,
					sort,
					state: {
						...state,
						types: [TOOLBAR_OPTIONS.STATE_FILTERS.CERTIFIED],
					},
				}}
			/>
		</div>
	));
