import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Pagination from './Pagination';
import Filter from './Filter';
import Label from './Label';
import ActionBar from '../../ActionBar';

import theme from './Toolbar.scss';

export function getSubProps(props, component) {
	const subProps = {};
	Object.keys(component.propTypes)
		.filter(key => props[key] !== undefined)
		.forEach((key) => {
			subProps[key] = props[key];
		});
	return subProps;
}

function adaptActionsIds(actions, parentId) {
	return actions &&
		actions.map((action) => {
			if (action.id) {
				return {
					...action,
					id: `${parentId}-${action.id}`,
				};
			}
			return action;
		});
}

function hasProps(props) {
	return Object.keys(props).find(key => key !== 'id');
}

/**
 * @param {object} props react props
 * @example
 <Toolbar name="Hello world"></Toolbar>
 */
function Toolbar(props) {
	const actionBarProps = getSubProps(props, ActionBar);
	const displayModeProps = getSubProps(props, SelectDisplayMode);
	const sortProps = getSubProps(props, SelectSortBy);
	const filterProps = getSubProps(props, Filter);
	const paginationProps = getSubProps(props, Pagination);
	const id = props.id;

	const hasActionBarProps = hasProps(actionBarProps);
	const hasDisplayModeProps = hasProps(displayModeProps);
	const hasSortProps = hasProps(sortProps);
	const hasFilterProps = hasProps(filterProps);
	const hasPaginationProps = hasProps(paginationProps);

	if (id && hasActionBarProps) {
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

	return (
		<div>
			{hasActionBarProps && (<ActionBar {...actionBarProps} />)}
			<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
				{hasDisplayModeProps && (<Label text="Display:" htmlFor={id && `${id}-display-mode`} />)}
				{hasDisplayModeProps && (<SelectDisplayMode {...displayModeProps} />)}
				{hasSortProps && (<Label text="Sort by:" htmlFor={id && `${id}-sort-by`} />)}
				{hasSortProps && (<SelectSortBy {...sortProps} />)}
				{hasPaginationProps && (<Label text="Show:" htmlFor={id && `${id}-pagination-size`} />)}
				{hasPaginationProps && (<Pagination {...paginationProps} />)}
				{hasFilterProps && (<Filter {...filterProps} />)}
			</Navbar>
		</div>
	);
}

Toolbar.propTypes = {
	id: React.PropTypes.string,
	...ActionBar.propTypes,
	...SelectDisplayMode.propTypes,
	...SelectSortBy.propTypes,
	...Pagination.propTypes,
	...Filter.propTypes,
};

export default Toolbar;
