import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { ResourcePicker, IconsProvider } from '../src/index';


const icons = {
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
};

const collection = [
	{
		id: 0,
		name: 'Title with few actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with few actions',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		className: 'item-0-class',
		icon: 'talend-file-xls-o',
	},
	{
		id: 1,
		name: 'Title with lot of actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with lot of actions',
		display: 'text',
		className: 'item-1-class',
		icon: 'talend-file-xls-o',
	},
	{
		id: 2,
		name: 'Title with persistant actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with icon and actions',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		className: 'item-2-class',
		icon: 'talend-file-xls-o',
	},
	{
		id: 3,
		name: 'Title with icon',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row without icon',
		author: '',
		display: 'text',
		className: 'item-3-class',
		icon: 'talend-file-xls-o',
	},
	{
		id: 4,
		name: 'Title in input mode',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with title in edit mode',
		author: 'Jean-Pierre DUPONT',
		display: 'input',
		className: 'item-4-class',
		icon: 'talend-file-xls-o',
	},
	{
		id: 5,
		name: 'Title with long long long long long long long long long long long text',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Row with a super super long text to show the ellipsis',
		author: 'Jean-Pierre DUPONT with super super super long text',
		className: 'item-5-class',
		icon: 'talend-file-xls-o',
	},
];

const props = {
	label: 'Click me',
	'data-feature': 'actionfile',
	icon: 'talend-upload',
	onChange: action('You changed me'),
	displayMode: 'file',
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
			<ResourcePicker id="default" collection={collection} {...props} />
		</div>
	));
