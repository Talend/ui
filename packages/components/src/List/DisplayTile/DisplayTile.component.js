import React, { PropTypes } from 'react';
import classNames from 'classnames';

import ItemTitle from '../ItemTitle';
import DisplayPropTypes from '../Display/Display.propTypes';
import NoRows from '../../VirtualizedList/NoRows';
import theme from './DisplayTile.scss';

const columnPropType = PropTypes.shape({
	key: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
});

/**
 * render a tile sub element
 */
function tileItem(column, value) {
	return [
		(<dt className={theme.itemtitle}>{column.label}</dt>),
		(<dd title={value} className={theme.itemvalue}>{value}</dd>),
	];
}

/**
 * Render a tile
 */
function Tile({ id, columns, item, itemProps, titleProps }) {
	let onDoubleClick;
	let onItemSelect;
	const { classNameKey, onSelect, onToggle, isSelected, selectedClass } = itemProps || {};
	if (titleProps.onClick) {
		onDoubleClick = event => titleProps.onClick(event, item);
	}
	if (onSelect) {
		onItemSelect = event => onSelect(item, event);
	}

	const checkbox = onToggle && isSelected ?
		(<div className="checkbox">
			<label htmlFor={id && `${id}-check`}>
				<input
					id={id && `${id}-check`}
					type="checkbox"
					onChange={e => onToggle(e, item)}
					checked={isSelected(item)}
				/>
				<span><span className="sr-only">Select {item.name}</span></span>
			</label>
		</div>) :
		null;

	const titleClasses = classNames(
		theme.title,
		theme.titlelink,
	);

	const tileClasses = classNames(
		theme.tile,
		classNameKey && item[classNameKey],
		isSelected && isSelected(item) && (selectedClass || 'active'),
	);

	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			id={id}
			className={tileClasses}
			onClick={onItemSelect}
			onDoubleClick={onDoubleClick}
		>
			{checkbox}
			<ItemTitle
				id={id && `${id}-title`}
				className={titleClasses}
				item={item}
				titleProps={titleProps}
			/>
			<dl className={theme.itemlist}>
				{
					columns
						.filter(column => column.key !== titleProps.key)
						.map(column => tileItem(column, item[column.key]))
				}
			</dl>
		</div>
	);
}

Tile.propTypes = {
	id: PropTypes.string,
	columns: PropTypes.arrayOf(columnPropType).isRequired,
	item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	itemProps: DisplayPropTypes.itemProps,
	titleProps: ItemTitle.propTypes.titleProps,
};

/**
 * @param {array} columns the array of column definitions
 * @param {array} items the array of items to display
 * @param {object} itemProps the item configuration props
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
	itemProps: {
		onSelect: action('onSelect'),
		width: '250px'
	}
};
<DisplayTile {...props} />
 */
function DisplayTile(props) {
	const {
		id,
		columns,
		items,
		itemProps,
		titleProps,
	} = props;
	const { width = '250px' } = itemProps || {};
	return (
		<div className="tc-list-display">
			{ !!items.length && (
				<ul className={theme.tiles}>
					{items.map((item, index) => (
						<li key={index}>
							<Tile
								id={id && `${id}-${index}`}
								columns={columns}
								item={item}
								itemProps={itemProps}
								titleProps={titleProps}
								style={{ width }}
							/>
						</li>
					))}
				</ul>
			)}
			{!items.length && <NoRows />}
		</div>
	);
}

DisplayTile.propTypes = DisplayPropTypes;

DisplayTile.defaultProps = {
	items: [],
	titleProps: { key: 'name' },
};

export default DisplayTile;
