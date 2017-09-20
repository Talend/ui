import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import ItemTitle from '../ItemTitle';
import Icon from '../../../Icon';
import { Action } from '../../../Actions';
import Column from '../Column.properties';

function getDefinitionItem(column, value, index) {
	return (
		<div key={index} className="tc-list-item-definition-item">
			<div className="tc-list-item-definition-term">{column.label}</div>
			<div title={value} className="tc-list-item-definition-description">{value}</div>
		</div>
	);
}

function Item({ id, columns, actions, item, itemProps }) {
	const { classNameKey, onSelect, onOpen, isSelected, onChange, onSubmit, onCancel } = itemProps;
	let top = 5;
	function increaseTopIndent() {
		top += 30;
	}
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

	function getIcon(column, index) {
		if (item[column.key]) {
			return (
				<div key={index} className="tc-list-item-icon">
					<Icon name={item[column.key]} />
				</div>
			);
		}
		return <div key={index} className="tc-list-item-icon" />;
	}

	function getTitle(column, index) {
		const titleProperties = {
			id: id && `${id}-title`,
			value: item[column.key],
			display: item.display,
			onClick: onItemOpen,
			onChange: onTitleChange,
			onSubmit: onTitleSubmit,
			onCancel: onTitleCancel,
		};
		return <ItemTitle key={index} {...titleProperties} />;
	}

	function getCheckbox() {
		const className = classNames('checkbox tc-list-item-checkbox', isSelected(item) && 'checked');
		const style = { top: `${top}px` };
		increaseTopIndent();
		return (
			<div className={className} style={style}>
				<label htmlFor={id && `${id}-check`}>
					<input
						id={id && `${id}-check`}
						type="checkbox"
						onChange={onItemSelect}
						checked={isSelected(item)}
					/>
					<span><span className="sr-only">Select {item.name}</span></span>
				</label>
			</div>
		);
	}

	function getActionByKey(key) {
		return actions.find(action => action.key === key);
	}

	function getAction(action, className, index) {
		const style = { top: `${top}px` };
		increaseTopIndent();
		const actionProps = {
			label: action.label,
			icon: action.icon,
			className: action.className,
			onClick: (event) => {
				action.onClick(event, item);
			},
			hideLabel: true,
			link: true,
		};
		return (
			<div key={index} className={className} style={style}>
				<Action {...actionProps} />
			</div>
		);
	}

	function getActionColumn(column, index) {
		const action = getActionByKey(column.key);
		const className = classNames('tc-list-item-action', item[column.key] && 'pinned');
		return getAction(action, className, index);
	}

	const actionsOnHover = actions.filter(action =>
		columns.findIndex(column => action.key === column.key) < 0,
	);
	const getActionOnHover = (action, index) => getAction(action, 'tc-actions', index);

	const customClass = classNameKey && item[classNameKey];
	const selectedClass = isSelected && isSelected(item) && (itemProps.selectedClass || 'active');
	const itemClasses = classNames('tc-list-item', customClass, selectedClass);

	const textColumns = columns.filter(column => !column.type || column.type === 'text');

	const getCellFor = (column, index) => {
		switch (column.type) {
		case 'action':
			return getActionColumn(column, index);
		case 'icon':
			return getIcon(column, index);
		case 'title':
			return getTitle(column, index);
		default:
			return null;
		}
	};

	return (
		<div className={itemClasses}>
			{(onSelect && isSelected) && getCheckbox()}
			{columns.map((column, index) => getCellFor(column, index))}
			{actionsOnHover && actionsOnHover.map((action, index) => getActionOnHover(action, index))}
			<div className="tc-list-item-definition-list">
				{textColumns.map((column, index) => getDefinitionItem(column, item[column.key], index))}
			</div>
		</div>
	);
}

Item.propTypes = {
	id: PropTypes.string,
	columns: PropTypes.arrayOf(Column.propTypes).isRequired,
	actions: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		className: PropTypes.string,
		onClick: PropTypes.func.isRequired,
	})),
	item: PropTypes.shape({
		display: PropTypes.string,
	}).isRequired,
	itemProps: PropTypes.shape({
		classNameKey: PropTypes.string,
		selectedClass: PropTypes.string,
		isSelected: PropTypes.func,
		onSelect: PropTypes.func,
		onOpen: PropTypes.func,
		onChange: PropTypes.func,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func,
	}),
};

Item.defaultProps = {
	actions: [],
	itemProps: {},
};

export default Item;
