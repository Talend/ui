import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../../Icon';

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
 * Render a tile title
 */
function renderTitle(item, onTitleClick, titleKey, iconKey) {
	const classes = classNames(
		theme.title,
		theme.titlelink,
		{ btn: onTitleClick, 'btn-link': onTitleClick }
	);

	const iconName = iconKey && item[iconKey];
	const icon = iconName ?
		<Icon name={iconName} /> :
		null;

	let title;
	if (onTitleClick) {
		const onClick = (event) => {
			event.stopPropagation();
			onTitleClick(item, event);
		};

		title = (
			<button className={classes} onClick={onClick} role="link">
				{item[titleKey]}
			</button>
		);
	} else {
		title = (<span className={classes}>{item[titleKey]}</span>);
	}
	return (<div>{icon}{title}</div>);
}

/**
 * Render a tile
 */
function Tile({ columns, item, onElementSelect, onTitleClick, titleKey, iconKey }) {
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
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			className={theme.tile}
			onClick={onSelect}
			onDoubleClick={onClick}
		>
			{renderTitle(item, onTitleClick, titleKey, iconKey)}
			<dl className={theme.itemlist}>
				{[].concat(filteredColumns.map(column =>
					tileItem(column, item[column.key])
				))}
			</dl>
		</div>
	);
}

Tile.propTypes = {
	item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	columns: PropTypes.arrayOf(columnPropType).isRequired,
	iconKey: PropTypes.string,
	titleKey: PropTypes.string.isRequired,
	onTitleClick: PropTypes.func,
	onElementSelect: PropTypes.func,
};

/**
 * @param {object} props react props
 * @example
 <DisplayTile name="Hello world"></DisplayTile>
 */
function DisplayTile({ columns, items, onElementSelect, onTitleClick, titleKey, iconKey, width }) {
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
						iconKey={iconKey}
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
	iconKey: PropTypes.string,
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func,
	onElementSelect: PropTypes.func,
};

DisplayTile.defaultProps = {
	items: [],
	titleKey: 'name',
	width: '250px',
};

export default DisplayTile;
