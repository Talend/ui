import React from 'react';
import { IconsProvider } from '@talend/react-components';

import { Filter } from '../src';

/*
const actions = {
	exampleFilter: {
		id: 'exampleFilter',
		'collection-to-filter': 'List#filterExample',
		filterExpression: 'filterByName',
		docked: false,
		dockable: false,
		toggeable: false,
		debounceMinLength: 2,
		debounceTimeout: 300,
		highlight: false,
		placeholder: 'My placeholder',
	},
};

function filterByName(event, collection) {
		if (event.target.value.length <= 0) {
		return List();
	}
	return collection.filter(item =>
		item
			.get('name')
			.toLowerCase()
			.includes(event.target.value.toLowerCase()),
	);
}
*/

const ExampleFilter = {
	undockAndUntoggle: () => (
		<div>
			<IconsProvider />
			<Filter
				id="exampleFilterUndock"
				actionId="example-filter:undock-and-untoggle"
				navbar={false}
			/>
		</div>
	),
	dockAndToggle: () => (
		<div>
			<IconsProvider />
			<Filter id="exampleFilterDock" actionId="example-filter:dock-and-toggle" navbar={false} />
		</div>
	),
};

export default ExampleFilter;
