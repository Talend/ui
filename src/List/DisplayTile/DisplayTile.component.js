import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ItemTitle from '../ItemTitle';
import DisplayPropTypes from '../Display/Display.propTypes';
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
function Tile({ columns, item, onElementSelect, titleProps, onToggleSingle, ifSelected }) {
	let onDoubleClick;
	let onSelect;
	if (titleProps.onClick) {
		onDoubleClick = event => titleProps.onClick(event, item);
	}
	if (onElementSelect) {
		onSelect = event => onElementSelect(item, event);
	}

	const checkbox = onToggleSingle && ifSelected ?
		<input
			type="checkbox"
			onChange={(e) => { onToggleSingle(e, item); }}
			checked={ifSelected(item)}
		/> :
		null;

	const titleClasses = classNames(
		theme.title,
		theme.titlelink,
	);

	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			className={theme.tile}
			onClick={onSelect}
			onDoubleClick={onDoubleClick}
		>
			{checkbox}
			<ItemTitle
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
	columns: PropTypes.arrayOf(columnPropType).isRequired,
	item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	ifSelected: PropTypes.func,
	onElementSelect: PropTypes.func,
	onToggleSingle: PropTypes.func,
	titleProps: ItemTitle.propTypes.titleProps,
};

/**
 * @param {array} columns the array of column definitions
 * @param {array} items the array of items to display
 * @param {function} onElementSelect the tile click callback
 * @param {object} titleProps the title configuration props
 * @param {object} width the tile width
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
	onElementSelect: action('onSelect'),
	titleProps: {
		key: 'name',
		iconKey: 'icon',
		displayModeKey: 'display',
		onClick: action('onClick'),
		onCancel: action('onCancel'),
		onChange: action('onChange'),
	},
	width: '250px'
};
<DisplayTile {...props} />
 */
function DisplayTile(props) {
	const {
		columns,
		items,
		titleProps,
		onElementSelect,
		ifSelected,
		onToggleAll,
		onToggleSingle,
		width,
	} = props;
	const ifAllSelected = () => {
		let selected = 0;
		items.forEach((item) => {
			if (ifSelected(item)) {
				selected += 1;
			}
		});
		return selected === items.length;
	};
	const checkbox = onToggleAll && ifSelected ?
		<div className={theme.container}>
			<input
				type="checkbox"
				onChange={(e) => { onToggleAll(e, items); }}
				checked={ifAllSelected()}
			/>Select All
		</div> :
		null;
	return (
		<div>
			{checkbox}
			<ul className={theme.tiles}>
				{items.map((item, index) =>
					<li key={index}>
						<Tile
							columns={columns}
							item={item}
							ifSelected={ifSelected}
							onElementSelect={onElementSelect}
							onToggleSingle={onToggleSingle}
							style={{ width }}
							titleProps={titleProps}
						/>
					</li>
				)}
			</ul>
		</div>
	);
}

DisplayTile.propTypes = DisplayPropTypes;

DisplayTile.defaultProps = {
	items: [],
	titleProps: { key: 'name' },
	width: '250px',
};

export default DisplayTile;
