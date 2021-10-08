import React from 'react';

import { getTheme } from '../theme';

import ResourceList from '../ResourceList';
import { SORT_OPTIONS, ORDERS, STATE_FILTERS } from '../ResourceList/Toolbar';

import cssModule from './ResourcePicker.scss';
import ResourceListPropTypes from '../ResourceList/ResourceList.propTypes';

const theme = getTheme(cssModule);

function ResourcePicker(props) {
	return (
		<div className={theme('tc-resource-picker')}>
			<ResourceList
				{...props}
				rowHeight={60}
				className={theme('tc-resource-picker-list')}
				toolbar={{ ...props.toolbar, nameFilerAsInput: true }}
			/>
		</div>
	);
}

ResourcePicker.propTypes = {
	...ResourceListPropTypes,
};

ResourcePicker.TOOLBAR_OPTIONS = {
	ORDERS,
	SORT_OPTIONS,
	STATE_FILTERS,
};
export default ResourcePicker;
