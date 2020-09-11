import React from 'react';

import { getTheme } from '../theme';

import ResourceList from '../ResourceList';

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

export default ResourcePicker;
