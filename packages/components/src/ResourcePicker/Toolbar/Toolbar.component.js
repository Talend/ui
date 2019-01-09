import React from 'react';
import classNames from 'classnames';
import NameFilter from './NameFilter';
import SortOptions from './SortOptions';
import StateFilter from './StateFilter';

import theme from './Toolbar.scss';

export const CONSTS = {
	SORT_OPTIONS: SortOptions.TYPES,
	STATE_FILERS: StateFilter.TYPES,
};

function Toolbar({ name, sort, state }) {
	return (
		<div className={classNames('toolbar-container', theme['toolbar-container'])}>
			{name && <NameFilter {...name} />}
			{sort && <SortOptions {...sort} />}
			{state && <StateFilter {...state} />}
		</div>
	);
}

Toolbar.CONSTS = {
	SORT_OPTIONS: SortOptions.TYPES,
	STATE_FILTERS: StateFilter.TYPES,
};

Toolbar.propTypes = {
	name: NameFilter.propTypes,
	state: StateFilter.propTypes,
	sort: SortOptions.propTypes,
};

export default Toolbar;
