import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from 'talend-icons/dist/react';

import { ObjectViewer, IconsProvider } from '../src/index';

const icons = {
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
};

const data = [
	{
		int: 1,
		str: 'test data for the object viewer',
		bool: true,
		obj: {
			bool: true,
		},
		arrayInt: [
			1, 2, 3, 4,
		],
		arrayOb: [
			{ foo: 'bar' },
		],
	},
	{
		int: 2,
		str: 'hello world',
		bool: false,
		obj: {
			bool: false,
		},
		arrayOb: [
			{ foo: 3.2 },
		],
	},
];

const handler = {
	edited: ['$[0][\'int\']'],
	opened: ['$', '$[0]', '$[0][\'obj\']'],
	onClick: action('onClick'),
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
};

storiesOf('ObjectViewer', module)
	.addWithInfo('tree default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} />
		</div>
	))
	.addWithInfo('tree with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} {...handler} />
		</div>
	))
	.addWithInfo('list default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} displayMode="list" />
		</div>
	))
	.addWithInfo('list with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} displayMode="list" {...handler} />
		</div>
	))
	.addWithInfo('table default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} displayMode="table" />
		</div>
	))
	.addWithInfo('table with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} {...handler} displayMode="table" />
		</div>
	))
	.addWithInfo('flat default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} displayMode="flat" />
		</div>
	))
	.addWithInfo('flat with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} {...handler} displayMode="flat" />
		</div>
	));
