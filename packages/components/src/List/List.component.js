import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';

import Toolbar from './Toolbar';
import ListToVirtualizedList from './ListToVirtualizedList';
import theme from './List.scss';
import Inject from '../Inject';

/**
 * @param {object} props react props
 * @example
 const props = {
	displayMode: 'table' / 'large'
	items: [{}, {}, ...],
	columns: [
		{key, label},
		{key, label},
	]
	onDisplayChange: function,
	sortOn: key,
	sortOptions: [
		{key, label},
	],
	sortIsDescending: true / false,
	onSortChange: function,
	onPaginationChange: function,
	itemsLength: number, // pagination ??
	onFilterChange: function,
};
 <List {...props}></List>
 */
function List(props) {
	const classnames = classNames('tc-list', theme.list);
	const injected = Inject.all(props.getComponent, omit(props.components, ['toolbar', 'list']));
	const list = props.list || {};
	return (
		<div className={classnames}>
			{injected('before-component')}
			{injected('before-toolbar')}
			<Toolbar {...props} />
			{injected('after-toolbar')}
			{injected('before-list-wrapper')}
			<div className={'tc-list-display-virtualized'}>
				{injected('before-list')}
				<ListToVirtualizedList {...props} {...list} />
				{injected('after-list')}
			</div>
			{injected('after-list-wrapper')}
			{injected('after-component')}
		</div>
	);
}

List.displayName = 'List';

List.propTypes = {
	...Inject.propTypes,
};

List.defaultProps = {
	displayMode: 'table',
};

export default List;
