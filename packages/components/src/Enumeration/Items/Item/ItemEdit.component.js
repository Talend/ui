import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';

import Action from '../../../Actions/Action';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';

function itemClasses() {
	return classNames({
		[theme['tc-enumeration-item']]: true,
		'tc-enumeration-item': true,
	});
}

function itemLabelClasses() {
	return classNames({
		[theme['tc-enumeration-item-label']]: true,
		'tc-enumeration-item-label': true,
	});
}

function itemEditActionsClasses() {
	return classNames({
		[theme['tc-enumeration-item-actions']]: true,
		'tc-enumeration-item-actions': true,
	});
}

class ItemEdit extends React.Component {
	constructor(props) {
		super(props);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.submit = this.submit.bind(this);
		this.itemChange = this.itemChange.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	componentDidMount() {
		this.itemInput.value = this.props.item[this.props.item.itemProps.key].join(',');
	}

	onKeyDown(event) {
		switch (event.keyCode) {
		case keycode('escape'):
			this.cancel(event);
			break;
		case keycode('enter'):
			this.submit(event);
			break;
		default:
			break;
		}
	}

	getAction(action, index) {
		const indexItem = this.props.item.index;

		function onClick(event) {
			if (action.onClick) {
				action.onClick(event, {
					value: event.target.value,
					index: indexItem,
				});
			}
		}

		return (
			<Action
				key={index}
				label={action.label}
				icon={action.icon}
				disabled={action.disabled}
				onClick={onClick}
				tooltipPlacement="bottom"
				hideLabel
				link
			/>
		);
	}

	submit(event) {
		return this.props.item.itemProps.onSubmitItem(event, {
			value: event.target.value,
			model: this.props.item,
			index: this.props.item.index,
		});
	}

	itemChange(event) {
		return this.props.item.itemProps.onChangeItem(event, {
			value: event.target.value,
			model: this.props.item,
			index: this.props.item.index,
		});
	}

	cancel(event) {
		return this.props.item.itemProps.onAbortItem(event, {
			value: event.target.value,
			model: this.props.item,
			index: this.props.item.index,
		});
	}

	render() {
		return (
			<li className={itemClasses()} id={this.props.id}>
				<input
					className={itemLabelClasses()}
					ref={(input) => { this.itemInput = input; }}
					type="text"
					onKeyDown={this.onKeyDown}
					onBlur={this.submit}
					onChange={this.itemChange}
					autoFocus
				/>
				<div className={itemEditActionsClasses()}>
					{this.props.item.itemProps.actions.map((action, index) => this.getAction(action, index))}
				</div>
			</li>
		);
	}
}

ItemEdit.propTypes = ItemPropTypes;

export default ItemEdit;
