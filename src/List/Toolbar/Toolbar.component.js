import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Pagination from './Pagination';
import Filter from './Filter';
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
	const displayProps = getSubProps(props, SelectDisplayMode);
	const sortProps = getSubProps(props, SelectSortBy);
	const filterProps = getSubProps(props, Filter);
	const paginationProps = getSubProps(props, Pagination);

	let actions = props.actions;
	if (props.id && actions) {
		actions = {
			left: adaptActionsIds(actions.left, props.id),
			right: adaptActionsIds(actions.right, props.id),
		};
	}

	const hasDisplayMode = hasProps(displayProps);
	const hasSortProps = hasProps(sortProps);
	const hasFilterProps = hasProps(filterProps);
	const hasPaginationProps = hasProps(paginationProps);

	return (
		<div>
			{actions && (<ActionBar actions={actions} />)}
			<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
				{hasDisplayMode && (<SelectDisplayMode {...displayProps} />)}
				{hasSortProps && (<SelectSortBy {...sortProps} />)}
				{hasFilterProps && (<Filter {...filterProps} />)}
				{hasPaginationProps && (<Pagination {...paginationProps} />)}
			</Navbar>
		</div>
	);
}

Toolbar.propTypes = {
	id: React.PropTypes.string,
	...Filter.propTypes,
	...SelectDisplayMode.propTypes,
	...SelectSortBy.propTypes,
};

export default Toolbar;
