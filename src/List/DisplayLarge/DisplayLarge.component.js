import React, { PropTypes } from 'react';
import classNames from 'classnames';

import DisplayPropTypes from '../Display/Display.propTypes';
import { Actions } from '../../Actions';
import Icon from '../../Icon';
import theme from './DisplayLarge.scss';

function getColumnsData({ columns, item, titleKey }) {
	return columns
		.filter(column => column.key !== titleKey)
		.map((column) => {
			const data = {
				label: column.label,
				value: item[column.key],
			};
			if (column.formater && data.value) {
				data.value = column.formater(data.value);
			}
			return data;
		});
}

function getTwoDim(columnsData) {
	return columnsData
		.filter((column, i) => i % 2 === 0)
		.map((column) => {
			const i = columnsData.indexOf(column);
			if (columnsData.length > i + 1) {
				return [column, columnsData[i + 1]];
			}
			return [column];
		});
}

function rowRenderer({ item, index, columns, titleKey, onTitleClick, iconKey }) {
	const columnsData = getColumnsData({ columns, item, titleKey });
	const info = getTwoDim(columnsData);
	const panel = classNames(
		'panel',
		'panel-default',
		theme.panel
	);
	const title = classNames(
		'btn',
		'btn-link',
		theme.title,
	);
	const iconName = iconKey && item[iconKey];
	return (
		<div className={panel} key={index}>
			<button
				className={title}
				role="link"
				onClick={event => onTitleClick(item, event)}
			>
				{iconName && <Icon name={iconName} />}
				{item[titleKey]}
			</button>
			<Actions
				actions={item.actions ? item.actions : []}
				hideLabel
				link
			/>
			<div className={theme.columns}>
				{info.map((group, i) => (
					<ul key={i}>
						{group.map((obj, j) => (
							<li key={j}>
								<span className={theme.label}>{obj.label}</span>
								<span className={theme.value}>{obj.value}</span>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
}

rowRenderer.propTypes = {
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	index: PropTypes.number,
	columns: PropTypes.arrayOf(
		PropTypes.object
	),
	iconKey: PropTypes.string,
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func,
};

/**
 * @param {object} props react props
 * @example

<DisplayLarge items={items} columns={columns} elementTitle={title} />
 */
function DisplayLarge({ items, columns, iconKey, titleKey, onTitleClick }) {
	return (
		<div className={theme.container}>
			{items.map((item, index) => rowRenderer({
				item,
				index,
				columns,
				onTitleClick,
				iconKey,
				titleKey,
			}))}
		</div>
	);
}

DisplayLarge.propTypes = DisplayPropTypes;

DisplayLarge.defaultProps = {
	items: [],
	titleKey: 'name',
};

export default DisplayLarge;
