import React from 'react';
import { IconsProvider } from '@talend/react-components';

import { FilterBar } from '../src';

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
