import React from 'react';
// import { Filter as Component } from '../../../components/src/Filter';
import { Filter as Component } from '@talend/react-components';

class FilterBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const id = 'test';
		const filter = {
			onFilter: (event, value) => console.log('event', value),
			onToggle: () => console.log('toggle'),
			docked: false,
			undockable: true,
		};
		return <Component id={id && `${id}-filter`} {...filter} />;
	}
}

export default FilterBar;
