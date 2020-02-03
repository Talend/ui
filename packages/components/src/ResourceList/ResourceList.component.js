import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getTheme } from '../theme';

import Resource from './Resource';
import Toolbar from './Toolbar';
import VirtualizedList from '../VirtualizedList';
import getRowSelectionRenderer from '../VirtualizedList/RowSelection';

import cssModule from './ResourceList.scss';

const theme = getTheme(cssModule);

function isFiltered({ state } = {}) {
	return state && (state.certified || state.favorites);
}

function ResourceList({
	className,
	collection,
	isLoading,
	onRowClick,
	renderAs,
	toolbar,
	...rest
}) {
	const Renderer = getRowSelectionRenderer(Resource, {
		as: renderAs,
		getRowData: ({ index }) => collection[index],
	});

	return (
		<div className={theme('tc-resource-list')}>
			{toolbar && <Toolbar {...toolbar} />}
			<div className={classNames(className, theme('tc-resource-list-container'), { [theme.filtered]: isFiltered(toolbar) })}>
				<VirtualizedList
					{...rest}
					collection={collection}
					inProgress={isLoading}
					onRowClick={onRowClick}
					rowHeight={100}
					rowRenderers={{ resource: Renderer }}
					type="resource"
				/>
			</div>
		</div>
	);
}

ResourceList.propTypes = {
	className: PropTypes.string,
	collection: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	onRowClick: PropTypes.func,
	renderAs: PropTypes.func,
	toolbar: PropTypes.shape(Toolbar.propTypes),
};

export default ResourceList;
