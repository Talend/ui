import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VirtualizedList } from '../';
import Resource from './Resource';
import Toolbar from './Toolbar';

import theme from './ResourcePicker.scss';


export default function ResourcePicker({ collection }) {
	console.warn(
		"UNSTABLE WARNING: The 'ResourcePicker' and all the sub components aren't ready to be used in Apps. Code can (will) change outside the release process until it's ready.",
	);

	return (
		<div
			className={classNames('resource-picker', theme['resource-picker'])}
		>
			<Toolbar />
			<VirtualizedList
				collection={collection}
				type="resource"
				rowRenderers={{ resource: Resource }}
				rowHeight={60}
			/>
		</div>
	);
}

ResourcePicker.propTypes = {
	collection: PropTypes.arrayOf(PropTypes.object),
};
