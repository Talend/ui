import React from 'react';
import PropTypes from 'prop-types';

import VirtualizedList from '../VirtualizedList';
import getRowSelectionRenderer from '../VirtualizedList/RowSelection';
import Resource from '../ResourcePicker/Resource';
import NameFilter from '../ResourcePicker/Toolbar/NameFilter';

function ResourceList({ collection, filter, isLoading, onRowClick, rowHeight, as }) {
	const Renderer = getRowSelectionRenderer(Resource, {
		as,
		getRowData: ({ index }) => collection[index],
	});

	return (
		<div>
			{filter && <NameFilter {...filter} />}
			<VirtualizedList
				as={as}
				collection={collection}
				inProgress={isLoading}
				onRowClick={onRowClick}
				rowHeight={rowHeight || 60}
				rowRenderers={{ resource: Renderer }}
				type="resource"
			/>
		</div>
	);
}

ResourceList.defaultProps = {
	collection: [],
};

ResourceList.propTypes = {
	collection: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	onRowClick: PropTypes.func,
	rowHeight: PropTypes.number,
	filter: PropTypes.object,
	as: PropTypes.func,
};

export default ResourceList;
