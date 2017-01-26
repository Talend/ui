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
	const increaseTopIndent = () => {
		top += 30;
	};
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

	const getIcon = (column, index) => (item[column.key] ? (
		<div key={index} className="tc-list-item-icon">
			<Icon name={item[column.key]} />
		</div>
	) : (
		<div key={index} className="tc-list-item-icon" />
	));

	const getTitle = (column, index) => {
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
	};

	const getCheckbox = () => {
		const className = classNames('tc-list-item-checkbox', isSelected(item) && 'checked');
		const style = { top: `${top}px` };
		increaseTopIndent();
		return (
			<div className={className} style={style}>
				<input
					id={id && `${id}-check`}
					type="checkbox"
					onChange={onItemSelect}
					checked={isSelected(item)}
				/>
			</div>
		);
	};

	const getActionByKey = key => actions.find(action => action.key === key);
	const getAction = (action, className, index) => {
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
	};
	const getActionColumn = (column, index) => {
		const action = getActionByKey(column.key);
		const className = classNames('tc-list-item-action', item[column.key] && 'pinned');
		return getAction(action, className, index);
	};

	const actionsOnHover = actions.filter(action =>
		columns.findIndex(column => action.key === column.key) < 0
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
	id: React.PropTypes.string,
	columns: React.PropTypes.arrayOf(Column.propTypes).isRequired,
	actions: React.PropTypes.arrayOf(React.PropTypes.shape({
		key: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string.isRequired,
		className: React.PropTypes.string,
		onClick: React.PropTypes.func.isRequired,
	})),
	item: React.PropTypes.shape({
		display: React.PropTypes.string,
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
	actions: [],
	itemProps: {},
};

export default Item;
