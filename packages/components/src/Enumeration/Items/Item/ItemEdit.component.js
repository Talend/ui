import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';

import Action from '../../../Actions/Action';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';
import ItemEditPropTypes from './ItemEdit.propTypes';

function itemClasses(error) {
	return classNames({
		[theme['tc-enumeration-item']]: true,
		'tc-enumeration-item': true,
		'has-error': !!error,
	});
}

function itemErrorClasses() {
	return classNames({
		[theme['tc-enumeration-item-error']]: true,
		'tc-enumeration-item-error': true,
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
		this.onActionClick = this.onActionClick.bind(this);
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

	onActionClick(event, action) {
		const indexItem = this.props.item.index;
		if (action.onClick) {
			action.onClick(event, {
				value: this.itemInput.value,
				index: indexItem,
			});
		}
	}

	getAction(action, index) {
		return (
			<Action
				key={index}
				label={action.label}
				icon={action.icon}
				disabled={action.disabled}
				onClick={event => this.onActionClick(event, action)}
				tooltipPlacement="bottom"
				inProgress={action.inProgress}
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
		function updateDisabledStatus(action, currentEdit) {
			if (currentEdit[action.id] !== undefined && 'disabled' in currentEdit[action.id]) {
				return {
					...action,
					disabled: currentEdit[action.id].disabled,
				};
			}

			return action;
		}

		const editActions = this.props.item.itemProps.actions.map(
			action => updateDisabledStatus(action, this.props.currentEdit)
		);

		return (
			<li className={itemClasses(this.props.item.error)} id={this.props.id}>
				<input
					className={itemLabelClasses()}
					ref={(input) => {
						this.itemInput = input;
					}}
					type="text"
					onKeyDown={this.onKeyDown}
					onChange={this.itemChange}
					autoFocus
				/>
				<div className={itemEditActionsClasses()}>
					{editActions.map((action, index) => this.getAction(action, index))}
				</div>
				{
					this.props.item.error &&
					<div className={itemErrorClasses()}>{this.props.item.error}</div>
				}
			</li>
		);
	}
}

ItemEdit.propTypes = {
	...ItemPropTypes,
	...ItemEditPropTypes,
	currentEdit: PropTypes.shape({
		validate: PropTypes.shape({
			disabled: PropTypes.bool,
		}),
		abort: PropTypes.shape({
			disabled: PropTypes.bool,
		}),
	}),
};

export default ItemEdit;
