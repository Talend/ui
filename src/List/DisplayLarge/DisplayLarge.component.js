import React, { PropTypes } from 'react';
import classNames from 'classnames';

import DisplayPropTypes from '../Display/Display.propTypes';
import { Actions } from '../../Actions';
import ItemTitle from '../ItemTitle';
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

function rowRenderer({ id, index, columns, item, itemProps, titleProps }) {
	const { onToggle, isSelected } = itemProps || {};
	const columnsData = getColumnsData({ columns, item, titleKey: titleProps.key });
	const info = getTwoDim(columnsData);
	const panel = classNames(
		'panel',
		'panel-default',
		theme.panel
	);

	const checkboxColumn = onToggle && isSelected ?
		(<input
			id={id && `${id}-check`}
			type="checkbox"
			onChange={(e) => { onToggle(e, item); }}
			checked={isSelected(item)}
		/>) :
		null;

	const displayActions =
		!titleProps.displayModeKey ||
		item[titleProps.displayModeKey] === 'text';
	const actions = displayActions ?
		(<Actions
			actions={item.actions || []}
			hideLabel
			link
		/>) :
		null;

	return (
		<div id={id} className={panel} key={index}>
			{checkboxColumn}
			<div className={theme.head}>
				<ItemTitle
					id={id && `${id}-title`}
					className={theme.title}
					item={item}
					titleProps={titleProps}
				/>
				{actions}
			</div>
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
	id: PropTypes.string,
	index: PropTypes.number,
	columns: PropTypes.arrayOf(PropTypes.object),
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	itemProps: DisplayPropTypes.itemProps,
	titleProps: ItemTitle.propTypes.titleProps,
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
<DisplayLarge {...props} />
 */
function DisplayLarge(props) {
	const {
		id,
		columns,
		items,
		itemProps,
		titleProps,
	} = props;
	const { isSelected, onToggleAll } = itemProps || {};
	const isAllSelected = () => {
		const selected = items.reduce((sum, item) => {
			if (isSelected(item)) {
				return sum + 1;
			}
			return sum;
		}, 0);
		return items.length > 0 && selected === items.length;
	};
	const checkbox = onToggleAll && isSelected ?
		(<div>
			<input
				id={id && `${id}-check-all`}
				type="checkbox"
				onChange={(e) => { onToggleAll(e, items); }}
				checked={isAllSelected()}
				disabled={items.length === 0}
			/>Select All
		</div>) :
		null;
	return (
		<div className={theme.container}>
			{checkbox}
			{items.map((item, index) => rowRenderer({
				index,
				id: id && `${id}-${index}`,
				columns,
				item,
				itemProps,
				titleProps,
			}))}
		</div>
	);
}

DisplayLarge.propTypes = DisplayPropTypes;

DisplayLarge.defaultProps = {
	items: [],
	titleProps: { key: 'name' },
};

export default DisplayLarge;
