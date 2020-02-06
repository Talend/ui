import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { getTheme } from '../theme';

import Resource from './Resource';
import Toolbar from './Toolbar';
import VirtualizedList from '../VirtualizedList';
import getRowSelectionRenderer from '../VirtualizedList/RowSelection';

import cssModule from './ResourceList.scss';
import { Icon } from '../index';

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
	const { t } = useTranslation();
	const Renderer = getRowSelectionRenderer(Resource, {
		as: renderAs,
		getRowData: ({ index }) => collection[index],
	});
	const noRowsRenderer = () => (
		<div className={theme('tc-resource-list--no-results')}>
			<span className={theme('tc-resource-list--no-results-text')} role="status" aria-live="polite">
				<Icon className={theme('tc-resource-list--no-results-icon')} name={'talend-fieldglass'} />{' '}
				{t('RESOURCELIST_NO_ITEMS', {
					defaultValue: 'No existing {{type, lowercase}}s',
					type: renderAs?.name,
				})}
			</span>
		</div>
	);
	return (
		<div className={theme('tc-resource-list')}>
			{toolbar && <Toolbar {...toolbar} />}
			<div
				className={classNames(className, theme('tc-resource-list-items'), {
					[theme.filtered]: isFiltered(toolbar),
				})}
			>
				<VirtualizedList
					rowHeight={100}
					{...rest}
					collection={collection}
					inProgress={isLoading}
					onRowClick={onRowClick}
					rowRenderers={{ resource: Renderer }}
					noRowsRenderer={noRowsRenderer}
					type="resource"
				/>
			</div>
		</div>
	);
}

ResourceList.defaultProps = {
	collection: [],
};

ResourceList.propTypes = {
	className: PropTypes.string,
	collection: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	onRowClick: PropTypes.func,
	renderAs: PropTypes.func,
	toolbar: PropTypes.shape(Toolbar.propTypes),
};

export default ResourceList;
