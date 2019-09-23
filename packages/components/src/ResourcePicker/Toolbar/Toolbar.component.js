import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import NameFilter from './NameFilter';
import SortOptions from './SortOptions';
import StateFilter from './StateFilter';

import theme from './Toolbar.scss';

function Toolbar({ name, sort, state }) {
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
			{name && <NameFilter {...name} />}
			{sort && <SortOptions {...sort} />}
			{state && <StateFilter {...state} />}
		</div>
	);
}

Toolbar.propTypes = {
	name: PropTypes.shape(NameFilter.propTypes),
	state: PropTypes.shape(StateFilter.propTypes),
	sort: PropTypes.shape(SortOptions.propTypes),
};

export default Toolbar;
