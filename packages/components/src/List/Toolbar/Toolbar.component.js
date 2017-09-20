import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

import SelectAll from './SelectAll';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Pagination from './Pagination';
import Filter from './Filter';
import Label from './Label';
import ActionBar from '../../ActionBar';

import theme from './Toolbar.scss';
import { getDefaultTranslate } from '../../translate';

function adaptActionsIds(actions, parentId) {
	return actions &&
		actions.map((action) => {
			if (action.id) {
				return {
					...action,
					id: `${parentId}-actions-${action.id}`,
				};
			}
			return action;
		});
}

function adaptLeftAndRightActions(actions, parentId) {
	return actions &&
		{
			left: adaptActionsIds(actions.left, parentId),
			right: adaptActionsIds(actions.right, parentId),
		};
}

/**
 * @param {string} id the id of Toolbar
 * @param {object} actionBar the ActionBar properties
 * @param {object} display the SelectDisplayMode properties
 * @param {object} sort the SelectSortBy properties
 * @param {object} pagination the Pagination properties
 * @param {object} filter the Filter properties
 * @example
 <Toolbar id="my-toolbar"></Toolbar>
 */
function Toolbar({ id, actionBar, selectAllCheckbox, display, sort, pagination, filter, t }) {
	let actionBarProps = actionBar;
	if (id && actionBar) {
		const { actions, multiSelectActions } = actionBar;
		actionBarProps = {
			...actionBar,
			actions: adaptLeftAndRightActions(actions, id),
			multiSelectActions: adaptLeftAndRightActions(multiSelectActions, id),
		};
	}
	const displayModeId = id && `${id}-display-mode`;
	const hasToolbarItem = (
		selectAllCheckbox ||
		display ||
		sort ||
		pagination ||
		filter
	);

	return (
		<div className="tc-list-toolbar">
			{actionBar && (<ActionBar {...actionBarProps} />)}
			{hasToolbarItem && (
				<Navbar
					componentClass="div"
					className={theme['tc-list-toolbar']}
					role="toolbar" fluid
				>
					{selectAllCheckbox && (<SelectAll {...selectAllCheckbox} t={t} />)}
					{display && (<Label text={t('LIST_TOOLBAR_DISPLAY', { defaultValue: 'Display:' })} htmlFor={displayModeId} />)}
					{display && (<SelectDisplayMode id={displayModeId} {...display} t={t} />)}
					{sort && (<Label text={t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })} htmlFor={id && `${id}-sort-by`} />)}
					{sort && (<SelectSortBy id={id && `${id}-sort`} {...sort} t={t} />)}
					{pagination && (<Label text={t('LIST_TOOLBAR_PAGINATION_SHOW', { defaultValue: 'Show:' })} htmlFor={id && `${id}-pagination-size`} />)}
					{pagination && (<Pagination id={id && `${id}-pagination`} {...pagination} />)}
					{filter && (<Filter id={id && `${id}-filter`} {...filter} t={t} />)}
				</Navbar>)}
		</div>
	);
}

Toolbar.propTypes = {
	id: PropTypes.string,
	actionBar: PropTypes.shape(ActionBar.propTypes),
	selectAllCheckbox: PropTypes.shape(SelectAll.propTypes),
	display: PropTypes.shape(SelectDisplayMode.propTypes),
	sort: PropTypes.shape(SelectSortBy.propTypes),
	pagination: PropTypes.shape(Pagination.propTypes),
	filter: PropTypes.shape(Filter.propTypes),
	t: PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
	t: getDefaultTranslate,
};

export default Toolbar;
