import React, {PropTypes} from 'react';
import classnames from 'classnames';
import {Actions, Action} from '../../Actions';
import ItemTitle from '../ItemTitle';
import TooltipTrigger from '../../TooltipTrigger';

import DisplayPropTypes from '../Display/Display.propTypes';

import theme from './DisplayTable.scss';

function cellContent(isTitle, item, column, titleProps, id) {
	if (isTitle) {
		return (<ItemTitle
			id={id && `${id}-title`}
			item={item}
			titleProps={titleProps}
		/>);
	}
	if (item[column.key] instanceof Array) {
		return (<Actions
			actions={item[column.key]}
			link
			hideLabel
		/>);
	}
	return (
		<TooltipTrigger label={item[column.key]} tooltipPlacement="top">
			<span className={classnames(theme['item-text'], 'item-text')}>
				{item[column.key]}
			</span>
		</TooltipTrigger>
	);
}

function RowRenderer(props) {
	const { id, item, itemProps, titleProps } = props;
	const { classNameKey, onToggle, isSelected, selectedClass } = itemProps || {};
	const checkboxColumn = onToggle && isSelected ?
		(<td>
			<input
				id={id && `${id}-check`}
				type="checkbox"
				onChange={(e) => { onToggle(e, item); }}
				checked={isSelected(item)}
			/>
		</td>) :
		null;
	const classes = classnames(
		classNameKey && item[classNameKey],
		isSelected && isSelected(item) && (selectedClass || 'active')
	);
	return (
		<tr id={id} className={classes}>
			{checkboxColumn}
			{props.columns.map((column, index) => {
				const isTitle = column.key === titleProps.key;
				const cell = cellContent(isTitle, item, column, titleProps, id);

				// actions are only on title and on 'text' display mode
				const { displayModeKey } = titleProps;
				const displayActions =
					isTitle &&
					(!displayModeKey || !item[displayModeKey] || item[displayModeKey] === 'text');
				const actions = displayActions ?
					(<Actions
						actions={item.actions || []}
						hideLabel
						link
					/>) :
					null;

				return (
					<td key={index}>
						{cell}
						{actions}
					</td>
				);
			})}
		</tr>
	);
}
RowRenderer.propTypes = {
	id: PropTypes.string,
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	columns: PropTypes.arrayOf(
		PropTypes.shape({ key: PropTypes.string.isRequired })
	).isRequired,
	itemProps: DisplayPropTypes.itemProps,
	titleProps: ItemTitle.propTypes.titleProps,
};

function getCaretIcon(isCurrentSortField) {
	if (isCurrentSortField) {
		return 'talend-caret-down';
	}
	return null;
}

function getIconTransform(isDescending) {
	if (isDescending) {
		return 'rotate-180';
	}
	return null;
}

function getNextDirection(isCurrentSortField, currentSort) {
	if (isCurrentSortField) {
		return !currentSort;
	}

	return false;
}

function headerContent(column, sort) {
	if (!sort) {
		return column.label;
	}

	const isCurrentSortField = sort.field === column.key;
	const onChange = event => sort.onChange(
		event,
		{
			field: column.key,
			isDescending: getNextDirection(isCurrentSortField, sort.isDescending),
		},
	);

	return (
		<Action
			icon={getCaretIcon(isCurrentSortField)}
			link
			label={column.label}
			iconPosition="right"
			iconTransform={getIconTransform(sort.isDescending)}
			onClick={onChange}
		/>
	);
}

function ListHeader(props) {
	const {
		columns,
		isSelected,
		onToggleAll,
		sort,
	} = props;
	return (
		<tr>
			{(isSelected && onToggleAll) && (<th />)}
			{columns.map((column, index) => (
				<th key={index}>
					{column.label}
					<div aria-hidden="true" className={theme.header}>
						{headerContent(column, sort)}
					</div>
				</th>
			))}
		</tr>
	);
}
ListHeader.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({ label: PropTypes.string })
	),
	isSelected: PropTypes.func,
	onToggleAll: PropTypes.func,
	sort: PropTypes.shape({
		field: PropTypes.string,
		isDescending: PropTypes.bool,
		onChange: PropTypes.func,
	}),
};

/**
 * @param {array} columns the array of column definitions
 * @param {array} items the array of items to display
 * @param {object} titleProps the title configuration props
 * @example
 const props = {
	items: [
		{
			id: 1,
			name: 'Title with actions',
			created: '2016-09-22',
			modified: '2016-09-22',
			author: 'Jean-Pierre DUPONT',
			actions: [{
				label: 'edit',
				icon: 'fa fa-edit',
				onClick: action('onEdit'),
			}],
			icon: 'fa fa-file-excel-o',
			display: 'text',
		},
		{
			id: 2,
			name: 'Title in input mode',
			created: '2016-09-22',
			modified: '2016-09-22',
			author: 'Jean-Pierre DUPONT',
			icon: 'fa fa-file-pdf-o',
			display: 'input',
		},
	],
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'name', label: 'Name' },
		{ key: 'author', label: 'Author' },
		{ key: 'created', label: 'Created' },
		{ key: 'modified', label: 'Modified' },
	],
	titleProps: {
		key: 'name',
		iconKey: 'icon',
		displayModeKey: 'display',
		onClick: action('onClick'),
		onEditCancel: action('onEditCancel'),
		onEditValidate: action('onEditValidate'),
	},
};
 <DisplayTable {...props} />
 */
function DisplayTable(props) {
	const {
		id,
		columns,
		items,
		itemProps,
		sort,
		titleProps,
	} = props;
	const { isSelected, onToggleAll } = itemProps || {};
	const containerClassName = classnames(
		'tc-list-display',
		theme.container,
	);
	const tableClassName = classnames(
		'table',
		'tc-list-display-table',
		theme.table,
	);
	return (
		<div className={containerClassName}>
			<div>
				<table className={tableClassName}>
					<thead>
					<ListHeader
						id={id}
						columns={columns}
						isSelected={isSelected}
						items={items}
						onToggleAll={onToggleAll}
						sort={sort}
					/>
					</thead>
					<tbody>
					{items.map(
						(item, index) => (
							<RowRenderer
								id={id && `${id}-${index}`}
								key={index}
								columns={columns}
								item={item}
								itemProps={itemProps}
								titleProps={titleProps}
							/>
						)
					)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

DisplayTable.propTypes = DisplayPropTypes;

DisplayTable.defaultProps = {
	items: [],
	titleProps: { key: 'name' },
};

export default DisplayTable;
