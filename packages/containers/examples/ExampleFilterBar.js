import React from 'react';

import { FilterBar } from '../src';

const ExampleFilter = {
	dockable: () => (
		<div>
			<FilterBar id="exampleFilterNavbar" placeholder="filter nav bar" dockable navbar />
		</div>
	),
	'not dockable': () => (
		<div>
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
