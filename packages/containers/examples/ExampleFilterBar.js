import React from 'react';
import { IconsProvider } from '@talend/react-components';

import { FilterBar } from '../src';

/*
const actions = {
	exampleFilter: {
		id: 'exampleFilter',
		docked: false,
		navbar: false,
		toggeable: false,
		debounceMinLength: 2,
		debounceTimeout: 300,
		highlight: false,
		placeholder: 'My placeholder',
	},
};
*/

const ExampleFilter = {
	dockable: () => (
		<div>
			<IconsProvider />
			<FilterBar
				id="exampleFilterNavbar"
				placeholder="filter nav bar"
				dockable
				navbar
			/>
		</div>
	),
	'not dockable': () => (
		<div>
			<IconsProvider />
			<FilterBar
				id="exampleFilterNoNavbar"
				dockable={false}
				navbar={false}
				placeholder="filter no nav bar"
			/>
		</div>
	),
};

export default ExampleFilter;
