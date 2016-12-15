import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Pagination from './Pagination';
import Filter from './Filter';
import Label from './Label';
import ActionBar from '../../ActionBar';

import theme from './Toolbar.scss';

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
function Toolbar({ id, actionBar, display, sort, pagination, filter }) {
	const actionBarProps = actionBar;
	if (id && actionBarProps) {
		if (actionBarProps.actions) {
			actionBarProps.actions = {
				left: adaptActionsIds(actionBarProps.actions.left, id),
				right: adaptActionsIds(actionBarProps.actions.right, id),
			};
		}
		if (actionBarProps.multiSelectActions) {
			actionBarProps.multiSelectActions = {
				left: adaptActionsIds(actionBarProps.multiSelectActions.left, id),
				right: adaptActionsIds(actionBarProps.multiSelectActions.right, id),
			};
		}
	}
	const displayModeId = id && `${id}-display-mode`;

	return (
		<div>
			{actionBar && (<ActionBar {...actionBarProps} />)}
			<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
				{display && (<Label text="Display:" htmlFor={displayModeId} />)}
				{display && (<SelectDisplayMode id={displayModeId} {...display} />)}
				{sort && (<Label text="Sort by:" htmlFor={id && `${id}-sort-by`} />)}
				{sort && (<SelectSortBy id={id && `${id}-sort`} {...sort} />)}
				{pagination && (<Label text="Show:" htmlFor={id && `${id}-pagination-size`} />)}
				{pagination && (<Pagination id={id && `${id}-pagination`} {...pagination} />)}
				{filter && (<Filter id={id && `${id}-filter`} {...filter} />)}
			</Navbar>
		</div>
	);
}

Toolbar.propTypes = {
	id: React.PropTypes.string,
	actionBar: React.PropTypes.shape(ActionBar.propTypes),
	display: React.PropTypes.shape(SelectDisplayMode.propTypes),
	sort: React.PropTypes.shape(SelectSortBy.propTypes),
	pagination: React.PropTypes.shape(Pagination.propTypes),
	filter: React.PropTypes.shape(Filter.propTypes),
};

export default Toolbar;
