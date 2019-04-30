import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import omit from 'lodash/omit';
import { translate } from 'react-i18next';
import classNames from 'classnames';

import SelectAll from './SelectAll';
import SelectDisplayMode from './SelectDisplayMode';
import Pagination from './Pagination';
import FilterBar from '../../FilterBar';
import Label from './Label';
import ActionBar from '../../ActionBar';
import DisplayModeToggle from './DisplayModeToggle';

import theme from './Toolbar.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import '../../translate';
import Inject from '../../Inject';
import SelectSortBy from './SelectSortBy/SelectSortBy.component';

function adaptActionsIds(actions, parentId) {
	return (
		actions &&
		actions.map(action => {
			if (action.id) {
				return {
					...action,
					id: `${parentId}-actions-${action.id}`,
				};
			}
			return action;
		})
	);
}

function adaptLeftAndRightActions(actions, parentId) {
	return (
		actions && {
			left: adaptActionsIds(actions.left, parentId),
		}
	);
}

/**
 * @param {string} id the id of Toolbar
 * @param {object} actionBar the ActionBar properties
 * @param {object} selectAllCheckbox the select all checkbox props
 * @param {object} display the SelectDisplayMode properties
 * @param {object} sort the SelectSortBy properties
 * @param {object} pagination the Pagination properties
 * @param {object} filter the Filter properties
 * @param {function} t the translate function
 * @example
 <Toolbar id="my-toolbar"></Toolbar>
 */
function Toolbar({
	id,
	actionBar,
	selectAllCheckbox,
	display,
	sort,
	pagination,
	filter,
	t,
	getComponent,
	components,
}) {
	const Renderer = Inject.getAll(getComponent, {
		ActionBar,
		FilterBar,
	});
	const injected = Inject.all(getComponent, components);
	let actionBarProps = actionBar;
	if (id && actionBar) {
		const { actions, multiSelectActions } = actionBar;
		actionBarProps = {
			...actionBar,
			getComponent,
			actions: adaptLeftAndRightActions(actions, id),
			multiSelectActions: adaptLeftAndRightActions(multiSelectActions, id),
		};
	}
	const displayModeId = id && `${id}-display-mode`;
	const showSelectAll = selectAllCheckbox && display && display.mode === 'large';
	const showSort = sort && display && display.mode === 'large';

	return (
		<div className={theme['tc-list-toolbar']}>
			{injected('before-actionbar')}
			{actionBar && (
				<Renderer.ActionBar {...actionBarProps}>
					<ActionBar.Content right>
						<ul>
							{injected('before-filter')}
							{filter && (
								<li className="separated">
									<Renderer.FilterBar id={id && `${id}-filter`} {...filter} t={t} navbar />
								</li>
							)}
							{injected('after-filter')}
							{injected('before-sort')}
							{showSort && (
								<li className="select-sort-by separated">
									<Label
										text={t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}
										htmlFor={id && `${id}-sort-by`}
									/>
									<SelectSortBy id={id && `${id}-sort`} {...sort} t={t} />
								</li>
							)}
							{injected('after-sort')}
							{injected('before-displaymode')}
							{display && (
								<li className="separated">
									<DisplayModeToggle id={displayModeId} {...display} t={t} />
								</li>
							)}
							{injected('after-displaymode')}
						</ul>
					</ActionBar.Content>
				</Renderer.ActionBar>
			)}
			{injected('after-actionbar')}
			{pagination && (
				<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
					{injected('before-pagination')}
					{pagination && (
						<Label
							text={t('LIST_TOOLBAR_PAGINATION_SHOW', { defaultValue: 'Show:' })}
							htmlFor={id && `${id}-pagination-size`}
						/>
					)}
					{pagination && <Pagination id={id && `${id}-pagination`} {...pagination} t={t} />}
					{injected('after-pagination')}
				</Navbar>
			)}
			{showSelectAll && <SelectAll {...selectAllCheckbox} t={t} />}
		</div>
	);
}

Toolbar.propTypes = {
	id: PropTypes.string,
	actionBar: PropTypes.shape(ActionBar.propTypes),
	selectAllCheckbox: PropTypes.shape(omit(SelectAll.propTypes, 't')),
	display: PropTypes.shape(omit(SelectDisplayMode.propTypes, 't')),
	sort: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			field: PropTypes.string,
			isDescending: PropTypes.bool,
			onChange: PropTypes.func.isRequired,
		}),
	]),
	pagination: PropTypes.shape(Pagination.propTypes),
	filter: PropTypes.shape(omit(FilterBar.propTypes, 't')),
	t: PropTypes.func.isRequired,
	getComponent: PropTypes.func,
	components: PropTypes.object,
};

Toolbar.defaultProps = {};

export default translate(I18N_DOMAIN_COMPONENTS)(Toolbar);
