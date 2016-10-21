import React, { PropTypes } from 'react';
import classNames from 'classnames';

import theme from './DisplayTile.scss';

const columnPropType = PropTypes.shape({
	key: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
});

/**
 * render a tile sub element
 */
function tileItem(column, value) {
	let renderValue = value;
	if (column.formater) {
		renderValue = column.formater(value);
	}
	return [
		(<dt className={theme.itemtitle}>{column.label}</dt>),
		(<dd title={renderValue} className={theme.itemvalue}>{renderValue}</dd>),
	];
}

/**
 * Render a tile title
 */
function renderTitle(item, onTitleClick, titleKey) {
	let onClick;
	const classes = classNames(
		theme.title,
		theme.titlelink,
		{ btn: onTitleClick, 'btn-link': onTitleClick }
	);
	if (onTitleClick) {
		onClick = (event) => {
			event.stopPropagation();
			onTitleClick(item, event);
		};
	}
	if (onClick) {
		return (
			<button className={classes} onClick={onClick} role="link">
				{item[titleKey]}
			</button>
		);
	}
	return <span className={classes}>{item[titleKey]}</span>;
}

/**
 * Render a tile
 */
function Tile({ columns, item, onElementSelect, onTitleClick, titleKey }) {
	const filteredColumns = columns.filter(column => column.key !== titleKey);
	let onClick;
	let onSelect;
	if (onTitleClick) {
		onClick = event => onTitleClick(item, event);
	}
	if (onElementSelect) {
		onSelect = event => onElementSelect(item, event);
	}
	return (
		<div
			className={theme.tile}
			onClick={onSelect}
			onDoubleClick={onClick}
		>
			{renderTitle(item, onTitleClick, titleKey)}
			<dl className={theme.itemlist}>
				{[].concat(filteredColumns.map(column =>
					tileItem(column, item[column.key])
				))}
			</dl>
		</div>
	);
}

Tile.propTypes = {
	item: PropTypes.any.isRequired,
	columns: PropTypes.arrayOf(columnPropType).isRequired,
	titleKey: PropTypes.string.isRequired,
	onTitleClick: PropTypes.func,
	onElementSelect: PropTypes.func,
};

/**
 * @param {object} props react props
 * @example
<DisplayTile name="Hello world"></DisplayTile>
 */
function DisplayTile({ columns, items, onElementSelect, onTitleClick, titleKey, width }) {
	return (
		<ul className={theme.tiles}>
			{items.map((item, index) =>
				<li key={index}>
					<Tile
						columns={columns}
						item={item}
						onElementSelect={onElementSelect}
						onTitleClick={onTitleClick}
						style={{ width }}
						titleKey={titleKey}
					/>
				</li>
			)}
		</ul>
	);
}

DisplayTile.propTypes = {
	items: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
	columns: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
	width: PropTypes.string,
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func,
	onElementSelect: PropTypes.func,
};

DisplayTile.defaultProps = {
	titleKey: 'name',
	width: '250px',
};

export default DisplayTile;
