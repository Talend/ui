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

function Item({ id, columns, item, itemProps }) {
	const { classNameKey, onSelect, onOpen, isSelected, onChange, onSubmit, onCancel } = itemProps;
	const onItemOpen = onOpen && ((event) => {
		event.stopPropagation();
		onOpen(event, item);
	});
	const onItemSelect = onSelect && (event => onSelect(event, item));
	const onTitleChange = onChange && ((event) => {
		onChange(event, {
			value: event.target.value,
			model: item,
		});
	});
	const onTitleSubmit = onSubmit && ((event) => {
		onSubmit(event, {
			value: event.target.value,
			model: item,
		});
	});
	const onTitleCancel = onCancel && ((event) => {
		onCancel(event, item);
	});

	const iconColumn = columns.find(column => column.type === 'icon');
	const getIcon = () => (item[iconColumn.key] ? (
		<div className="tc-list-item-icon">
			<Icon name={item[iconColumn.key]} />
		</div>
	) : (
		<div className="tc-list-item-icon" />
	));

	const titleColumn = columns.find(column => column.type === 'title');
	const getTitle = () => {
		const titleProperties = {
			id: id && `${id}-title`,
			value: item[titleColumn.key],
			display: item.display,
			onClick: onItemOpen,
			onChange: onTitleChange,
			onSubmit: onTitleSubmit,
			onCancel: onTitleCancel,
		};
		return <ItemTitle {...titleProperties} />;
	};

	const checkbox = (onSelect && isSelected) &&
		(<input
			id={id && `${id}-check`}
			type="checkbox"
			onChange={onItemSelect}
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
	const itemClasses = classNames('tc-list-item', customClass, selectedClass);

	const textColumns = columns.filter(column => !column.type || column.type === 'text');
	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			id={id}
			role="button"
			className={itemClasses}
			onClick={onItemSelect}
			onDoubleClick={onItemOpen}
		>
			{iconColumn && getIcon()}
			{titleColumn && getTitle()}
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
		display: React.PropTypes.string,
		actions: Actions.propTypes.actions,
	}).isRequired,
	itemProps: React.PropTypes.shape({
		classNameKey: React.PropTypes.string,
		selectedClass: React.PropTypes.string,
		isSelected: React.PropTypes.func,
		onSelect: React.PropTypes.func,
		onOpen: React.PropTypes.func,
		onChange: React.PropTypes.func,
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}),
};

Item.defaultProps = {
	itemProps: {},
};

export default Item;
