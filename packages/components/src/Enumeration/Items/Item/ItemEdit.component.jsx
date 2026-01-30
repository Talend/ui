import { Component } from 'react';
import { withTranslation } from 'react-i18next';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import Action from '../../../Actions/Action';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import ItemPropTypes from './Item.propTypes';
import ItemEditPropTypes from './ItemEdit.propTypes';

import theme from './Item.module.css';

function itemClasses(error) {
	return classNames(theme['tc-enumeration-item'], 'tc-enumeration-item', {
		[theme['has-error']]: !!error,
		'has-error': !!error,
	});
}

function itemErrorClasses() {
	return classNames(theme['tc-enumeration-item-error'], 'tc-enumeration-item-error');
}

function itemLabelClasses() {
	return classNames(theme['tc-enumeration-item-label'], 'tc-enumeration-item-label');
}

function itemEditActionsClasses() {
	return classNames(theme['tc-enumeration-item-actions'], 'tc-enumeration-item-actions');
}

class ItemEdit extends Component {
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
		switch (event.key) {
			case 'Esc':
			case 'Escape':
				this.cancel(event);
				break;
			case 'Enter':
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

		const editActions = this.props.item.itemProps.actions.map(action =>
			updateDisabledStatus(action, this.props.currentEdit),
		);

		const errorId = `${this.props.id}-error`;
		return (
			<div
				role="row"
				className={itemClasses(this.props.item.error)}
				id={this.props.id}
				style={this.props.style}
			>
				<input
					aria-label={this.props.t('TC_ENUMERATION_EDIT_ENTRY', {
						defaultValue: 'Enter the new value',
					})}
					aria-describedby={errorId}
					id={`${this.props.id}-input`}
					role="gridcell"
					className={itemLabelClasses()}
					ref={input => {
						this.itemInput = input;
					}}
					type="text"
					onKeyDown={this.onKeyDown}
					onChange={this.itemChange}
					// eslint-disable-next-line jsx-a11y/no-autofocus
					autoFocus
				/>
				<div role="gridcell" className={itemEditActionsClasses()}>
					{editActions.map((action, index) => this.getAction(action, index))}
				</div>
				{this.props.item.error && (
					<div id={errorId} className={itemErrorClasses()} aria-live="assertive">
						{this.props.item.error}
					</div>
				)}
			</div>
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

/** @type Function */
const ItemEditWithTranslation = withTranslation(I18N_DOMAIN_COMPONENTS)(ItemEdit);
export default ItemEditWithTranslation;
