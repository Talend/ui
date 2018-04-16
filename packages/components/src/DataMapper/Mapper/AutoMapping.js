import React, { Component } from 'react';
import PropTypes from 'prop-types';
import talendIcons from '@talend/icons/dist/react';
import { Actions } from '../../Actions/index.js';

const icons = {
	'talend-replicate': talendIcons['talend-replicate'],
  'talend-cog': talendIcons['talend-cog'],
};

function getActions(autoMap) {
	return [
		{
			id: 'auto-map',
      icon: 'talend-cog',
			label: 'AUTO MAP!',
			onClick: autoMap,
		},
	];
}

export default class AutoMapping extends Component {
	render() {
		const { autoMap } = this.props;
		return (
			<Actions
				className="auto-mapping"
				actions={getActions(autoMap)}
			/>
		);
	}
}
