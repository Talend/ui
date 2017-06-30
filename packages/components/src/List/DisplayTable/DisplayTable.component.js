import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { Actions, Action } from '../../Actions';
import ItemTitle from '../ItemTitle';
import TooltipTrigger from '../../TooltipTrigger';
import NoRows from '../../VirtualizedList/NoRows';
import DisplayPropTypes from '../Display/Display.propTypes';

import theme from './DisplayTable.scss';

function getItemString(item) {
	if (item === undefined || item === null) {
		return '';
	}
	return item.toString();
}

export function CellContent({ isTitle, item, column, titleProps, id }) {
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
	const str = getItemString(item[column.key]);
	return (
		<TooltipTrigger label={str} tooltipPlacement="top">
			<span className={classnames(theme['item-text'], 'item-text')}>
				{str}
			</span>
		</TooltipTrigger>
	);
}
CellContent.propTypes = {
	isTitle: PropTypes.bool,
	item: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	column: PropTypes.shape({
		key: PropTypes.string,
	}).isRequired,
	titleProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	id: PropTypes.string,
};

export function RowRenderer(props) {
	const { id, item, itemProps, titleProps } = props;
	const { classNameKey, onToggle, isSelected, selectedClass } = itemProps || {};
	const checkboxColumn = onToggle && isSelected ? (
		<td>
			<div className="checkbox">
				<label htmlFor={id && `${id}-check`}>
					<input
						id={id && `${id}-check`}
						type="checkbox"
						onChange={(e) => {
							onToggle(e, item);
						}}
						checked={isSelected(item)}
					/>
					<span><span className="sr-only">Select {item.name}</span></span>
				</label>
			</div>
		</td>
	) : null;
	const classes = classnames(
		classNameKey && item[classNameKey],
		isSelected && isSelected(item) && (selectedClass || 'active'),
	);
	return (
		<tr id={id} className={classes}>
			{checkboxColumn}
			{props.columns.map((column, index) => {
				const isTitle = column.key === titleProps.key;
				const cell = (<CellContent
					isTitle={isTitle}
					item={item}
					column={column}
					titleProps={titleProps}
					id={id}
				/>);

				// actions are only on title and on 'text' display mode
				const { displayModeKey } = titleProps;
				const displayActions =
					isTitle &&
					(!displayModeKey || !item[displayModeKey] || item[displayModeKey] === 'text');

				return (
					<td key={index}>
						<div
							className={classnames(
								'tc-list-display-table-td',
								theme['tc-list-display-table-td'],
							)}
						>
							<div className={classnames('cell', theme.cell)}>{cell}</div>
							{
								displayActions &&
								item.actions &&
								(
									<div className={classnames('actions', theme.actions)}>
										<Actions
											actions={item.actions}
											hideLabel
											link
										/>
									</div>
								)
							}
						</div>
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
		PropTypes.shape({ key: PropTypes.string.isRequired }),
	).isRequired,
	itemProps: DisplayPropTypes.itemProps,
	titleProps: PropTypes.shape(ItemTitle.propTypes.titleProps).isRequired,
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

export function ColumnHeader({ index, column, sort }) {
	let header;

	if (column.hideHeader) {
		header = (<span className="sr-only">{column.label}</span>);
	} else	if (sort) {
		const isCurrentSortField = sort.field === column.key;
		const onChange = event => sort.onChange(
			event,
			{
				field: column.key,
				isDescending: getNextDirection(isCurrentSortField, sort.isDescending),
			},
		);
		const actionProps = {
			'aria-label': `Sort on ${column.label} field`,
			className: theme.header,
			icon: getCaretIcon(isCurrentSortField),
			iconPosition: 'right',
			iconTransform: getIconTransform(sort.isDescending),
			label: column.label,
			link: true,
			onClick: onChange,
		};
		header = (<Action {...actionProps} />);
	} else {
		header = (<span className={theme.header}>{column.label}</span>);
	}

	return (
		<th key={index}>
			{header}
			{ !column.hideHeader && (<div aria-hidden="true">{column.label}</div>)}
		</th>
	);
}
ColumnHeader.propTypes = {
	index: PropTypes.number,
	column: PropTypes.shape({
		key: PropTypes.string,
		label: PropTypes.string,
		hideHeader: PropTypes.bool,
	}).isRequired,
	sort: PropTypes.shape({
		field: PropTypes.string,
		isDescending: PropTypes.bool,
		onChange: PropTypes.func,
	}),
};

export function ListHeaders(props) {
	const {
		columns,
		isSelected,
		onToggleAll,
		sort,
	} = props;
	return (
		<tr>
			{(isSelected && onToggleAll) && (<th />)}
			{columns.map((column, index) => (<ColumnHeader
				key={index}
				index={index}
				column={column}
				sort={sort}
			/>))}
		</tr>
	);
}

ListHeaders.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({ label: PropTypes.string }),
	).isRequired,
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
						<ListHeaders
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
							),
						)}
					</tbody>
				</table>
				{ !items.length && <NoRows /> }
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
