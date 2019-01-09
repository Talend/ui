import React from 'react';
import classNames from 'classnames';
import NameFilter from './NameFilter';
import SortOptions from './SortOptions';
import StateFilter from './StateFilter';

import theme from './Toolbar.scss';


function Toolbar(props) {
	return (
		<div className={classNames('toolbar-container', theme['toolbar-container'])}>
			<NameFilter {...props.nameFilter} />
			<SortOptions {...props.sortOptions} />
			<StateFilter {...props.stateFilter} />
		</div>
	);
}

Toolbar.propTypes = {
	nameFilter: NameFilter.propTypes,
	stateFilter: StateFilter.propTypes,
	sortOptions: SortOptions.propTypes,
};


export default Toolbar;
