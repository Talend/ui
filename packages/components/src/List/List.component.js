import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import omit from 'lodash/omit';

import Toolbar from './Toolbar';
import ListToVirtualizedList from './ListToVirtualizedList';
import theme from './List.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { DEFAULT_I18N } from '../translate';

function ListToolbar({ id, toolbar, displayMode, list, t, renderers }) {
	if (!toolbar) {
		return null;
	}

	const shouldHideSortOptions = !!(displayMode === 'table' && list.sort);
	const toolbarProps = {
		...toolbar,
		id,
		renderers,
		t,
	};

	if (toolbar.display) {
		toolbarProps.display.mode = displayMode;
	}

	if (list.itemProps && list.itemProps.isSelected && list.itemProps.onToggleAll) {
		toolbarProps.selectAllCheckbox = {
			id,
			items: list.items,
			isSelected: list.itemProps.isSelected,
			onToggleAll: list.itemProps.onToggleAll,
		};
	}

	return <Toolbar {...toolbarProps} sort={!shouldHideSortOptions && toolbarProps.sort} />;
}

ListToolbar.propTypes = {
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
	t: PropTypes.func.isRequired,
	renderers: PropTypes.object,
};

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
function List({ displayMode, id, list, toolbar, defaultHeight, t, renderers, rowHeight }) {
	const classnames = classNames('tc-list', theme.list);
	return (
		<div className={classnames}>
			<ListToolbar
				id={id}
				toolbar={toolbar}
				displayMode={displayMode}
				list={list}
				t={t}
				renderers={renderers}
			/>
			<div className={'tc-list-display-virtualized'}>
				<ListToVirtualizedList
					id={id}
					displayMode={displayMode}
					defaultHeight={defaultHeight}
					rowHeight={rowHeight}
					t={t}
					{...list}
				/>
			</div>
		</div>
	);
}

List.propTypes = {
	...omit(ListToolbar.propTypes, 't'),
	renderers: PropTypes.object,
	t: PropTypes.func,
};

List.defaultProps = {
	displayMode: 'table',
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(List);
