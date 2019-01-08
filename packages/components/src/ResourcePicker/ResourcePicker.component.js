import React from 'react';
import PropTypes from 'prop-types';
import { VirtualizedList } from '../';
import Resource from './Resource';

export default function ResourcePicker({ collection }) {
	console.warn(
		"UNSTABLE WARNING: The 'ResourcePicker' and all the sub components aren't ready to be used in Apps. Code can (will) change outside the release process until it's ready.",
	);

	return (
		<div>
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
