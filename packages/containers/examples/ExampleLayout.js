import React from 'react';

import { Inject } from '@talend/react-cmf';
import Immutable from 'immutable';

const header = {
	component: 'HeaderBar',
	brand: { label: 'Example app' },
};

const sidepanel = {
	component: 'SidePanel',
	actionIds: ['menu:first', 'menu:second', 'menu:third'],
};

const tabs = {
	component: 'TabBar',
	id: 'layout-example-tabs',
	items: [
		{
			label: 'School',
			key: 'school',
		},
		{
			label: 'Office',
			key: 'office',
		},
		{
			label: 'Hospital',
			key: 'hospital',
		},
	],
	selectedKey: 'office',
};

const list = {
	component: 'List',
	list: {
		columns: [
			{ key: 'id', label: 'Id' },
			{ key: 'label', label: 'Name' },
			{ key: 'author', label: 'Author' },
			{ key: 'created', label: 'Created' },
			{ key: 'modified', label: 'Modified' },
		],
		titleProps: {
			key: 'label',
		},
	},
	actions: {},
	items: Immutable.fromJS([
		{
			id: 'id1',
			label: 'Title',
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
	]),
};

const content = [tabs, list];

const ExampleLayout = {
	default: () => (
		<div>
			<Inject
				component="Layout"
				mode="TwoColumns"
				header={header}
				one={sidepanel}
				content={content}
			/>
		</div>
	),
};
export default ExampleLayout;
