import React from 'react';
import PropTypes from 'prop-types';

import { getTheme } from '../theme';

import ResourceList from '../ResourceList/ResourceList.component';

import cssModule from './ResourcePicker.scss';
import Toolbar from '../ResourceList/Toolbar';

const theme = getTheme(cssModule);

export default function ResourcePicker(props) {
	return (
		<div className={theme('tc-resource-picker')}>
			<ResourceList
				{...props}
				className={theme('tc-resource-picker-list')}
				toolbar={{ ...props.toolbar, nameFilerAsInput: true }}
			/>
		</div>
	);
}

ResourcePicker.defaultProps = {
	collection: [],
};

ResourcePicker.propTypes = {
	className: PropTypes.string,
	collection: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	onRowClick: PropTypes.func,
	renderAs: PropTypes.func,
	toolbar: PropTypes.shape(Toolbar.propTypes),
};
