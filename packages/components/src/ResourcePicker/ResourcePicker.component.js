import React from 'react';

import { getTheme } from '../theme';

import ResourceList from '../ResourceList/ResourceList.component';

import cssModule from './ResourcePicker.scss';

const theme = getTheme(cssModule);

export default function ResourcePicker(props) {
	return (
		<div className={theme('tc-resource-picker')}>
			<ResourceList
				{...props}
				className={theme('tc-resource-picker-list-container')}
				toolbar={{ ...props.toolbar, nameFilerAsInput: true }}
			/>
		</div>
	);
}

ResourcePicker.defaultProps = {
	collection: [],
};

ResourcePicker.propTypes = {
	...ResourceList.props,
};
