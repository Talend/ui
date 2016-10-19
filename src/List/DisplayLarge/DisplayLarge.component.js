import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Actions from '../../Actions';
import theme from './DisplayLarge.scss';

function getColumnsData({ columns, item, titleKey }) {
	return columns
		.filter(column => column.key !== titleKey)
		.map((column) => {
			const data = {
				label: column.label,
				value: item[column.key],
			};
			if (column.dateformat && data.value) {
				data.value = data.value.format(column.dateformat);
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

function rowRenderer({ item, index, columns, titleKey, onTitleClick }) {
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
	return (
		<div className={panel} key={index}>
			<button
				className={title}
				role="link"
				onClick={event => onTitleClick(item, event)}
			>
				<span>{item[titleKey]}</span>
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
	item: PropTypes.object,
	index: PropTypes.number,
	columns: PropTypes.arrayOf(
		PropTypes.object
	),
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func.isRequired,
};

/**
 * @param {object} props react props
 * @example

<DisplayLarge items={items} columns={columns} elementTitle={title} />
 */
function DisplayLarge({ items, columns, titleKey, onTitleClick }) {
	const oItems = items || [];
	const oKey = titleKey || 'name';
	return (
		<div className={theme.container}>
			{oItems.map((item, index) => rowRenderer({
				item,
				index,
				columns,
				onTitleClick,
				titleKey: oKey,
			}))}
		</div>
	);
}

DisplayLarge.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.object
	),
	columns: PropTypes.arrayOf(
		PropTypes.object
	),
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func.isRequired,
};

export default DisplayLarge;
