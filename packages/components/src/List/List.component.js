import PropTypes from 'prop-types';
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
	list: {
		items: [{}, {}, ...],
		columns: [
			{key, label},
			{key, label},
		]
	},
	toolbar: {
		display: {
			onChange: function,
		},
		sort: {
			field: key,
			options: [
				{key, label},
			],
			isDescending: true / false,
			onChange: function,
		},
		pagination: {
			onChange: function,
			itemsLength: number,
		},
		filter: {
			onFilter: function,
		},
	}
}
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
	id: PropTypes.string,
	displayMode: PropTypes.string,
	list: PropTypes.shape({
		items: PropTypes.arrayOf(PropTypes.object),
		itemProps: PropTypes.shape({
			classNameKey: PropTypes.string,
			isActive: PropTypes.func,
			isSelected: PropTypes.func,
			onRowClick: PropTypes.func,
			onSelect: PropTypes.func,
			onToggle: PropTypes.func,
			onToggleAll: PropTypes.func,
			width: PropTypes.string,
		}),
		sort: PropTypes.shape({
			field: PropTypes.string,
			isDescending: PropTypes.bool,
			onChange: PropTypes.func.isRequired,
		}),
	}),
	toolbar: PropTypes.shape(omit(Toolbar.propTypes, 't')),
	renderers: PropTypes.object,
};

List.defaultProps = {
	displayMode: 'table',
};

export default List;
