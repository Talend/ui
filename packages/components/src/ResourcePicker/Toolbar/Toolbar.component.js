import React from 'react';
import classNames from 'classnames';
import NameFilter from './NameFilter';
import SortOptions, { TYPES as SORT_OPTIONS } from './SortOptions';
import StateFilter, { TYPES as STATE_FILTERS } from './StateFilter';

import theme from './Toolbar.scss';

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
	SORT_OPTIONS,
	STATE_FILTERS,
};

// Toolbar.propTypes = {
// 	name: NameFilter.propTypes,
// 	state: StateFilter.propTypes,
// 	sort: SortOptions.propTypes,
// };

export default Toolbar;
