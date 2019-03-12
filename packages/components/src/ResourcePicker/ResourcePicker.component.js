import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VirtualizedList } from '../';
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
					inProgress={isLoading}
					collection={collection}
					type="resource"
					rowRenderers={{ resource: Renderer }}
					onRowClick={onRowClick}
					rowHeight={60}
				/>
			</div>
		</div>
	);
}

ResourcePicker.defaultProps = {
	collection: [],
};

ResourcePicker.propTypes = {
	isSelected: PropTypes.func,
	onRowClick: PropTypes.func,
	collection: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	toolbar: Toolbar.propTypes,
};
