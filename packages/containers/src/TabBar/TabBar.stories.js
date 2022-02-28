import React from 'react';
import TabBar from '.';

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

export default {
	title: 'TabBar',
};

export const Default = () => <TabBar {...view} />;
