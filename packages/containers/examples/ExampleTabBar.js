import React from 'react';
import { TabBar } from '../src';

const view = {
	items: [
		{
			id: 1,
			label: 'School',
			key: 'school',
		},
		{
			id: 2,
			label: 'Office',
			key: 'office',
		},
		{
			id: 3,
			label: 'Hospital',
			key: 'hospital',
		},
	],
	selectedKey: 'office',
};

const ExampleTabBar = {
	default: () => (
		<div>
			<TabBar {...view} />
		</div>
	),
};

export default ExampleTabBar;
