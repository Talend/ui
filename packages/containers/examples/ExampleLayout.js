import React from 'react';
import { IconsProvider } from '@talend/react-components';
import talendIcons from '@talend/icons/dist/react';

import { Inject } from '@talend/react-cmf';
import Immutable from 'immutable';

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-badge': talendIcons['talend-badge'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-cog': talendIcons['talend-cog'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-expanded': talendIcons['talend-expanded'],
	'talend-file': talendIcons['talend-file'],
	'talend-file-json-o': talendIcons['talend-file-json-o'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-icons': talendIcons['talend-icons'],
	'talend-logo': talendIcons['talend-logo'],
	'talend-pencil': talendIcons['talend-pencil'],
	'talend-plus': talendIcons['talend-plus'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-star': talendIcons['talend-star'],
	'talend-streams': talendIcons['talend-streams'],
	'talend-table': talendIcons['talend-table'],
	'talend-tiles': talendIcons['talend-tiles'],
	'talend-trash': talendIcons['talend-trash'],
	'talend-opener': talendIcons['talend-opener'],
	'talend-upload': talendIcons['talend-upload'],
};

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

const content = [
	tabs,
	list,
];

const ExampleLayout = {
	default: () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<Inject component="Layout" mode="TwoColumns" header={header} one={sidepanel} content={content} />
		</div>
	),
};
export default ExampleLayout;
