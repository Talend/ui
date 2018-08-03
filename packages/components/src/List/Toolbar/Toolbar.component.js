import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { translate } from 'react-i18next';

import SelectAll from './SelectAll';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Pagination from './Pagination';
import FilterBar from '../../FilterBar';
import Label from './Label';
import ActionBar from '../../ActionBar';

import theme from './Toolbar.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import '../../translate';
import Inject from '../../Inject';

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
			right: adaptActionsIds(actions.right, parentId),
		}
	);
}

function getSortProps(props) {
	if (props.displayMode !== 'table' && props.onSortChange) {
		return get(props, 'toolbar.sort', {
			options: props.sortOptions,
			onChange: props.onSortChange,
			field: props.sortOn,
			isDescending: props.sortIsDescending,
		});
	}
	return undefined;
}

function getDisplayProps(props) {
	let display = get(props, 'toolbar.display');
	if (!display && props.onDisplayChange) {
		display = {
			displayModes: props.displayModes,
			onChange: props.onDisplayChange,
		};
	}
	if (display) {
		if (!display.mode && props.displayMode) {
			display.mode = props.displayMode;
		}
		if (!display.id && props.id) {
			display.id = props.id && `${props.id}-display-mode`;
		}
	}
	return display;
}

function getPaginationProps(props) {
	let pagination = get(props, 'toolbar.pagination');
	if (pagination || props.pagination) {
		pagination = {
			onChange: get(props, 'toolbar.pagination.onChange', props.onPaginationChange),
			itemsPerPage: get(props, 'toolbar.pagination.itemsPerPage', props.itemsPerPage),
			totalResults: get(props, 'toolbar.pagination.totalResults', props.totalResults),
			startIndex: get(props, 'toolbar.pagination.startIndex', props.startIndex),
		};
		if (!pagination.id && props.id) {
			pagination.id = `${props.id}-pagination`;
		}
	}
	return pagination;
}

function getFilterProps(props) {
	let filter = get(props, 'toolbar.filter');
	if (props.onFilterChange) {
		filter = {
			onFilter: props.onFilterChange,
		};
	}
	if (filter) {
		if (!filter.id && props.id) {
			filter.id = `${props.id}-filter`;
		}
		if (!filter.onFilter && props.onFilterChange) {
			filter.onFilter = props.onFilterChange;
		}
		if (!filter.onToggle && props.onFilterToggle) {
			filter.onToggle = props.onFilterToggle;
		}
		if (filter.docked === undefined && props.filterDocked !== undefined) {
			filter.docked = props.filterDocked;
		}
		if (filter.highlight === undefined && props.filterHighlight !== undefined) {
			filter.highlight = props.filterHighlight;
		}
		if (!filter.debounceTimeout && props.filterDebounceTimeout) {
			filter.debounceTimeout = props.filterDebounceTimeout;
		}
	}
	return filter;
}

function isChecked(items, isSelected) {
	return items.length > 0 && items.findIndex(item => !isSelected(item)) < 0;
}

function getSelectAllProps(props) {
	// -- backward compatibility
	const selectAll = props.selectAllCheckbox; // deprecated
	const items = get(props, 'list.items', props.items);
	const isSelected = get(props, 'list.itemProps.isSelected', props.isSelected);
	const onToggleAll = get(props, 'list.itemProps.onToggleAll', props.onToggleAll);
	const checked = () => isChecked(items, isSelected);
	if (selectAll) {
		// should I add isSelected and onToggleAll ?
		if (!selectAll.checked) {
			selectAll.checked = checked;
		}
		return selectAll;
	}
	if (!selectAll && onToggleAll && isSelected) {
		return {
			items,
			onToggleAll,
			checked,
		};
	}
	return selectAll;
}

function getActionBarProps(props) {
	const actionBar = get(props, 'toolbar.actionBar');
	if (props.actions || props.multiSelectActions) {
		return {
			actions: props.actions,
			multiSelectActions: props.multiSelectActions,
			selected: props.selectedCount || 0,
		};
	}
	return actionBar;
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
function Toolbar({ t, getComponent, components, ...props }) {
	if (props.hideToolbar) {
		return null;
	}
	const selectAll = getSelectAllProps(props);
	const sort = getSortProps(props);
	const display = getDisplayProps(props);
	const pagination = getPaginationProps(props);
	const filter = getFilterProps(props);
	const actions = getActionBarProps(props);
	const Renderer = Inject.getAll(getComponent, {
		ActionBar,
		FilterBar,
	});
	const injected = Inject.all(getComponent, components);
	const hasToolbar = !!(selectAll || display || sort || pagination || filter || props.toolbar);
	return (
		<div className="tc-list-toolbar">
			{injected('before-actionbar')}
			{actions && <Renderer.ActionBar {...actions} />}
			{injected('after-actionbar')}
			{injected('before-navbar')}
			{hasToolbar && (
				<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
					{injected('before-selectall')}
					{selectAll && <SelectAll {...selectAll} t={t} />}
					{injected('after-selectall')}
					{injected('before-displaymode')}
					{display && (
						<Label
							text={t('LIST_TOOLBAR_DISPLAY', { defaultValue: 'Display:' })}
							htmlFor={display.id}
						/>
					)}
					{display && <SelectDisplayMode {...display} t={t} />}
					{injected('after-displaymode')}
					{injected('before-sort')}
					{sort && (
						<Label
							text={t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}
							htmlFor={props.id && `${props.id}-sort-by`}
						/>
					)}
					{sort && <SelectSortBy id={props.id && `${props.id}-sort`} {...sort} t={t} />}
					{injected('after-sort')}
					{injected('before-pagination')}
					{pagination && (
						<Label
							text={t('LIST_TOOLBAR_PAGINATION_SHOW', { defaultValue: 'Show:' })}
							htmlFor={pagination.id && `${pagination.id}-size`}
						/>
					)}
					{pagination && <Pagination {...pagination} t={t} />}
					{injected('after-pagination')}
					{injected('before-filter')}
					{filter && <Renderer.FilterBar {...filter} t={props.t} navbar className="navbar-right" />}
					{injected('after-filter')}
				</Navbar>
			)}
			{injected('after-navbar')}
		</div>
	);
}

Toolbar.propTypes = {
	id: PropTypes.string,
	...ActionBar.propTypes,
	...SelectAll.propTypes,
	display: PropTypes.shape(omit(SelectDisplayMode.propTypes, 't')),
	sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape(Pagination.propTypes)]),
	filter: PropTypes.shape(omit(FilterBar.propTypes, 't')),
	t: PropTypes.func.isRequired,
	getComponent: PropTypes.func,
	components: PropTypes.object,
};

Toolbar.defaultProps = {};

export default translate(I18N_DOMAIN_COMPONENTS)(Toolbar);
