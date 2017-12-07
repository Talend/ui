import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import omit from 'lodash/omit';

import Toolbar from './Toolbar';
import DisplayPropTypes from './Display/Display.propTypes';
import DisplayLarge from './DisplayLarge';
import DisplayTable from './DisplayTable';
import DisplayTile from './DisplayTile';
import Content from './Content';
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
	list: PropTypes.oneOfType([
		PropTypes.shape(DisplayPropTypes),
		PropTypes.shape(Content.propTypes),
	]),
	toolbar: PropTypes.shape(omit(Toolbar.propTypes, 't')),
	t: PropTypes.func.isRequired,
	renderers: PropTypes.object,
};

function DisplayModeComponent({ displayMode, id, list, rowHeight, useContent, virtualized, t }) {
	const translatedList = Object.assign({}, list, { t });
	if (useContent) {
		return <Content id={id && `${id}-content`} displayMode={displayMode} {...translatedList} />;
	}
	if (virtualized) {
		return (
			<div className={'tc-list-display-virtualized'}>
				<ListToVirtualizedList
					id={id}
					displayMode={displayMode}
					rowHeight={rowHeight}
					{...translatedList}
				/>
			</div>
		);
	}
	switch (displayMode) {
		case 'tile':
			return <DisplayTile id={id} {...translatedList} />;
		case 'large':
			return <DisplayLarge id={id} {...translatedList} />;
		default:
			return <DisplayTable id={id} {...translatedList} />;
	}
}

DisplayModeComponent.propTypes = {
	displayMode: PropTypes.string,
	id: PropTypes.string,
	list: PropTypes.oneOfType([
		PropTypes.shape(DisplayPropTypes),
		PropTypes.shape(Content.propTypes),
	]),
	useContent: PropTypes.bool,
	virtualized: PropTypes.bool,
	rowHeight: PropTypes.number,
	t: PropTypes.func,
};

function ListDisplay({ displayMode, id, list, useContent, rowHeight, virtualized, t }) {
	return (
		<DisplayModeComponent
			id={id}
			useContent={useContent}
			displayMode={displayMode}
			list={list}
			virtualized={virtualized}
			rowHeight={rowHeight}
			t={t}
		/>
	);
}

ListDisplay.propTypes = DisplayModeComponent.propTypes;

/**
 * @param {object} props react props
 * @example
 const props = {
	displayMode: 'table' / 'large' / 'tile' / component
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
function List({
	displayMode,
	id,
	list,
	toolbar,
	useContent,
	virtualized,
	t,
	renderers,
	rowHeight,
}) {
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
			<ListDisplay
				displayMode={displayMode}
				id={id}
				list={list}
				useContent={useContent}
				virtualized={virtualized}
				renderers={renderers}
				rowHeight={rowHeight}
				t={t}
			/>
		</div>
	);
}

List.propTypes = {
	...omit(ListToolbar.propTypes, 't'),
	...ListDisplay.propTypes,
	renderers: PropTypes.object,
	t: PropTypes.func,
};

List.defaultProps = {
	displayMode: 'table',
	useContent: false,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(List);
