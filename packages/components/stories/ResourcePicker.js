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
		modified: '2016-09-22',
		icon: 'talend-file-xls-o',
		author: 'First Author',
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
	},
	{
		id: 3,
		name: 'Title with icon',
		modified: '2016-09-22',
		author: 'Third Author',
		icon: 'talend-file-xls-o',
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
