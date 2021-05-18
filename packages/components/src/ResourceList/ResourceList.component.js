import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import { getTheme } from '../theme';

import Resource from './Resource';
import ResourceListPropTypes from './ResourceList.propTypes';
import Toolbar from './Toolbar';
import VirtualizedList from '../VirtualizedList';
import getRowSelectionRenderer from '../VirtualizedList/RowSelection';

import cssModule from './ResourceList.scss';
import Icon from '../Icon';

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
	rowProps,
	...rest
}) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const Renderer = getRowSelectionRenderer(Resource, {
		as: renderAs,
		getRowData: ({ index }) => collection[index],
		rowProps,
	});
	const noRowsRenderer = React.useCallback(
		() => (
			<div className={theme('tc-resource-list--no-results')}>
				<span
					className={theme('tc-resource-list--no-results-text')}
					role="status"
					aria-live="polite"
				>
					<Icon className={theme('tc-resource-list--no-results-icon')} name="talend-fieldglass" />{' '}
					{t('RESOURCELIST_NO_RESULTS', { defaultValue: 'No results' })}
				</span>
			</div>
		),
		[renderAs],
	);
	return (
		<div className={theme('tc-resource-list')}>
			{toolbar && <Toolbar {...toolbar} />}
			<div
				className={classNames(className, theme('tc-resource-list-items'), {
					[theme('filtered')]: isFiltered(toolbar),
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
	...ResourceListPropTypes,
};

export default ResourceList;
