import React from 'react';
import PropTypes from 'prop-types';

import FilterBar from '../../FilterBar';
import NameFilter from './NameFilter';
import SortOptions from './SortOptions';
import StateFilter from './StateFilter';

import { getTheme } from '../../theme';
import cssModule from './Toolbar.scss';

const theme = getTheme(cssModule);

function Toolbar({ name, nameFilerAsInput, sort, state }) {
	if (!name && !sort && !state) {
		return null;
	}

	return (
		<div className={theme('tc-resource-list-toolbar')}>
			{name &&
				(nameFilerAsInput ? (
					<NameFilter {...name} />
				) : (
					<FilterBar
						className={theme('tc-resource-list-toolbar-filter')}
						placeholder={name.label}
						onFilter={name.onChange}
						dockable={false}
						{...name}
					/>
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
