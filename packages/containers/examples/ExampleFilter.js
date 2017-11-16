import React from 'react';
import { IconsProvider } from '@talend/react-components';

import { Filter } from '../src';

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
	undockAndUntoggle: () => (
		<div>
			<IconsProvider />
			<Filter
				id="exampleFilterNavbar"
				docked={false}
				placeholder="filter nav bar"
				toggeable
				navbar
			/>
		</div>
	),
	dockAndToggle: () => (
		<div>
			<IconsProvider />
			<Filter
				id="exampleFilterNoNavbar"
				toggeable={false}
				navbar={false}
				placeholder="filter no nav bar"
			/>
		</div>
	),
};

export default ExampleFilter;
