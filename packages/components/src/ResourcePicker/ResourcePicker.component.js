import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VirtualizedList from '../VirtualizedList';
import getRowSelectionRenderer from '../VirtualizedList/RowSelection';

import Resource from './Resource';
import Toolbar from './Toolbar';

import theme from './ResourcePicker.scss';

function isFiltered({ state } = {}) {
	return state && (state.certified || state.favorites);
}

export default function ResourcePicker({ collection, isSelected, onRowClick, toolbar, isLoading }) {
	console.warn(
		"UNSTABLE WARNING: The 'ResourcePicker' and all the sub components aren't ready to be used in Apps. Code can (will) change outside the release process until it's ready.",
	);

	const Renderer = getRowSelectionRenderer(Resource, {
		isSelected,
		getRowData: ({ index }) => collection[index],
	});

	return (
		<div className={classNames('tc-resource-picker', theme['tc-resource-picker'])}>
			{toolbar && <Toolbar {...toolbar} />}
			<div
				className={classNames(theme['tc-resource-picker-list-container'], {
					[theme.filtered]: isFiltered(toolbar),
				})}
			>
				<VirtualizedList
					collection={collection}
					inProgress={isLoading}
					onRowClick={onRowClick}
					rowHeight={60}
					rowRenderers={{ resource: Renderer }}
					type="resource"
				/>
			</div>
		</div>
	);
}

ResourcePicker.defaultProps = {
	collection: [],
};

ResourcePicker.propTypes = {
	collection: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	isSelected: PropTypes.func,
	onRowClick: PropTypes.func,
	toolbar: PropTypes.shape(Toolbar.propTypes),
};
