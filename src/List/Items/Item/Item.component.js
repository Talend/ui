import React from 'react';
import classNames from 'classnames';

import ItemTitle from '../ItemTitle';
import Icon from '../../../Icon';
import { Actions } from '../../../Actions';
import Column from '../Column.properties';

function getDefinitionItem(column, value, index) {
	return (
		<div key={index} className="tc-list-item-definition-item">
			<div className="tc-list-item-definition-term">{column.label}</div>
			<div title={value} className="tc-list-item-definition-description">{value}</div>
		</div>
	);
}

function Item({ id, columns, item, itemProps, titleProps }) {
	const { classNameKey, onSelect, onToggle, isSelected } = itemProps;
	const onItemOpen = titleProps.onClick && (event => titleProps.onClick(event, item));
	const onItemSelect = onSelect && (event => onSelect(event, item));

	const iconColumn = columns.find(column => column.type === 'icon');
	const getIcon = iconKey => (item[iconKey] ? (
		<div className="tc-list-item-icon">
			<Icon name={item[iconKey]} />
		</div>
	) : (
		<div className="tc-list-item-icon" />
	));

	const checkbox = (onToggle && isSelected) &&
		(<input
			id={id && `${id}-check`}
			type="checkbox"
			onChange={(e) => { onToggle(e, item); }}
			checked={isSelected(item)}
		/>);

	const actions = item.actions &&
		(<Actions
			actions={item.actions}
			hideLabel
			link
		/>);


	const customClass = classNameKey && item[classNameKey];
	const selectedClass = isSelected && isSelected(item) && (itemProps.selectedClass || 'active');
	const tileClasses = classNames('tc-list-item', customClass, selectedClass);

	const textColumns = columns.filter(column => !column.type || column.type === 'text');
	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			id={id}
			role="button"
			className={tileClasses}
			onClick={onItemSelect}
			onDoubleClick={onItemOpen}
		>
			{iconColumn && getIcon(iconColumn.key)}
			<ItemTitle
				id={id && `${id}-title`}
				item={item}
				titleProps={titleProps}
			/>
			{checkbox}
			{actions}
			<div className="tc-list-item-definition-list">
				{textColumns.map((column, index) => getDefinitionItem(column, item[column.key], index))}
			</div>
		</div>
	);
}

Item.propTypes = {
	id: React.PropTypes.string,
	columns: React.PropTypes.arrayOf(Column.propTypes).isRequired,
	item: React.PropTypes.shape({
		actions: Actions.propTypes.actions,
	}).isRequired,
	itemProps: React.PropTypes.shape({
		classNameKey: React.PropTypes.string,
		selectedClass: React.PropTypes.string,
		isSelected: React.PropTypes.func,
		onSelect: React.PropTypes.func,
		onToggle: React.PropTypes.func,
		onToggleAll: React.PropTypes.func,
	}),
	titleProps: ItemTitle.propTypes.titleProps,
};

Item.defaultProps = {
	itemProps: {},
	titleProps: { key: 'name' },
};

export default Item;
