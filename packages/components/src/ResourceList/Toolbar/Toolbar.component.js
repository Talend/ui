import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import FilterBar from '../../FilterBar';
import NameFilter from './NameFilter';
import SortOptions from './SortOptions';
import StateFilter from './StateFilter';

import theme from './Toolbar.scss';

function Toolbar({ name, nameFilerAsInput, sort, state }) {
	if (!name && !sort && !state) {
		return null;
	}

	return (
		<div
			className={classNames(
				'tc-resource-picker-toolbar-container',
				theme['tc-resource-picker-toolbar-container'],
			)}
		>
			{name &&
				(nameFilerAsInput ? (
					<NameFilter {...name} />
				) : (
					<FilterBar className={'tc-resource-list-filter'} placeholder={name.label} onFilter={name.onChange} dockable={false} {...name} />
				))}
			{sort && <SortOptions {...sort} />}
			{state && <StateFilter {...state} />}
		</div>
	);
}

Toolbar.propTypes = {
	name: PropTypes.shape(NameFilter.propTypes),
	nameFilerAsInput: PropTypes.bool,
	state: PropTypes.shape(StateFilter.propTypes),
	sort: PropTypes.shape(SortOptions.propTypes),
};

export default Toolbar;
