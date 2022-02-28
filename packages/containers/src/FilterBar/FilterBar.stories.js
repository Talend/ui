import React from 'react';

import FilterBar from '.';

export default {
	title: 'FilterBar',
};

export function Dockable() {
	return <FilterBar id="exampleFilterNavbar" placeholder="filter nav bar" dockable navbar />;
}
export function NotDockable() {
	return (
		<FilterBar
			id="exampleFilterNoNavbar"
			dockable={false}
			navbar={false}
			placeholder="filter no nav bar"
		/>
	);
}
