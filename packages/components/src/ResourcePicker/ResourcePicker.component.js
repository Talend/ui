import React from 'react';
import PropTypes from 'prop-types';
import { VirtualizedList } from '../';
import Resource from './Resource';

export default function ResourcePicker({ collection }) {
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
