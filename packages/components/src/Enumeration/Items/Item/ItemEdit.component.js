import React from 'react';
import classNames from 'classnames';

import Action from '../../../Actions/Action';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';

const itemClasses = () => classNames({
	[theme['tc-enumeration-item']]: true,
	'tc-enumeration-item': true,
});

const itemLabelClasses = () => classNames({
	[theme['tc-enumeration-item-label']]: true,
	'tc-enumeration-item-label': true,
});

const itemEditActionsClasses = () => classNames({
	[theme['tc-enumeration-item-actions']]: true,
	'tc-enumeration-item-actions': true,
});

const ESC_KEY = 27;
const ENTER_KEY = 13;

class ItemEdit extends React.Component {
	constructor(props) {
		super(props);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.submit = this.submit.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	componentDidMount() {
		this.itemInput.value = this.props.item[this.props.itemProps.key].join(',');
	}

	getAction = (action, index) => {
		const propsAction = {
			key: index,
			label: action.label,
			icon: action.icon,
			onClick: action.onClick && (event => action.onClick(event, { value: event.target.value })),
		};

		return (
			<Action
				{...propsAction}
				tooltipPlacement="bottom"
				hideLabel
				link
			/>
		);
	};

	submit(event) {
		return this.props.itemProps.onSubmitItem(event, {
			value: event.target.value,
			model: this.props.item,
		});
	}

	cancel(event) {
		return this.props.itemProps.onAbortItem(event, {
			value: event.target.value,
			model: this.props.item,
		});
	}

	onKeyUp(event) {
		switch (event.keyCode) {
		case ESC_KEY:
			this.cancel(event);
			break;
		case ENTER_KEY:
			this.submit(event);
			break;
		default:
			break;
		}
	}

	render() {
		return (
			<li className={itemClasses()}>
				<input className={itemLabelClasses()}
					   ref={(input) => { this.itemInput = input; }}
					   type="text"
					   onKeyUp={this.onKeyUp}
					   onBlur={this.submit}
					   autoFocus
				/>
				<div className={itemEditActionsClasses()}>
					{this.props.itemProps.actions.map((action, index) => this.getAction(action, index))}
				</div>
			</li>
		);
	}
}

ItemEdit.propTypes = ItemPropTypes;

export default ItemEdit;
