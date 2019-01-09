import React from 'react';
import classNames from 'classnames';
import NameFilter from './NameFilter';
import SortOptions from './SortOptions';
import StateFilter from './StateFilter';

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


// FIXME: tests fails if not commented :
// Toolbar.propTypes = {
// 	name: NameFilter.propTypes,
// 	state: StateFilter.propTypes,
// 	sort: SortOptions.propTypes,
// };

export default Toolbar;
