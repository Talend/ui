import React from 'react';
import keycode from 'keycode';
import Enumeration from 'react-talend-components/lib/Enumeration';
import { manageCtrlKey, manageShiftKey, deleteSelectedItems } from './utils/utils';

class EnumerationWidget extends React.Component {
	constructor(props) {
		super(props);

		this.defaultActions = [{
			disabled: false,
			label: 'Edit',
			icon: 'talend-pencil',
			id: 'edit',
			onClick: this.onEnterEditModeItem.bind(this),
		}, {
			label: 'Delete',
			icon: 'talend-trash',
			id: 'delete',
			onClick: this.onDeleteItem.bind(this),
		}];

		this.state = {
			displayMode: 'DISPLAY_MODE_DEFAULT',

			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: this.onChangeDisplay.bind(this),
			}],
			headerSelected: [{
				label: 'Delete items',
				icon: 'talend-trash',
				id: 'delete',
				onClick: this.onDeleteItems.bind(this),
			}],
			headerInput: [{
				disabled: true,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: this.onAddHandler.bind(this),
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: this.onAbortHandler.bind(this),
			}],
			items: (props.formData || []).map((item) => ({
				values: item.values,
			})),
			itemsProp: {
				key: 'values',
				onSubmitItem: this.onSubmitItem.bind(this),
				onAbortItem: this.onAbortItem.bind(this),
				onChangeItem: this.onChangeItem.bind(this),
				onSelectItem: this.onSelectItem.bind(this),
				actionsDefault: this.defaultActions,
				actionsEdit: [{
					disabled: true,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: this.onSubmitItem.bind(this),
				}, {
					disabled: false,
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: this.onAbortItem.bind(this),
				}],
			},
			onAddChange: this.onAddChange.bind(this),
			onAddKeyDown: this.onAddKeyDown.bind(this),
		};
	}

	// default mode
	onEnterEditModeItem(event, value) {
		const items = [...this.state.items];
		const item = items[value.index];
		item.displayMode = 'DISPLAY_MODE_EDIT';

		this.setState({
			items,
			displayMode: 'DISPLAY_MODE_EDIT',
		});

		this.updateItemValidateDisabled(item.values[0]);
	}

	onDeleteItem(event, value) {
		// dont want to fire select item on icon click
		event.stopPropagation();
		const items = [...this.state.items];
		items[value.index].displayMode = 'DISPLAY_MODE_DEFAULT';
		items.splice(value.index, 1);
		const countnbItems = items.filter((item) => item.isSelected).length;

		this.setState({
			items,
			displayMode: countnbItems > 0 ? 'DISPLAY_MODE_SELECTED' : 'DISPLAY_MODE_DEFAULT',
		}, this.setFormData.bind(this));
	}

	// edit mode
	onAbortItem(event, value) {
		const items = [...this.state.items];
		items[value.index].displayMode = 'DISPLAY_MODE_DEFAULT';
		this.setState({
			items,
		});
	}

	// edit mode
	onChangeItem(event, value) {
		this.updateItemValidateDisabled(value);
	}

	onSubmitItem(event, value) {
		// dont want to fire select item on icon click
		event.stopPropagation();
		const items = [...this.state.items];
		items[value.index].displayMode = 'DISPLAY_MODE_DEFAULT';

		// if the value is empty, no value update is done
		if (value.value) {
			items[value.index].values[0] = value.value;
		}
		this.setState({
			items,
			displayMode: 'DISPLAY_MODE_DEFAULT',
		}, this.setFormData.bind(this));
	}

	onChangeDisplay() {
		this.setState({
			displayMode: 'DISPLAY_MODE_ADD',
		});
	}

	onAddChange(event, value) {
		this.updateHeaderInputDisabled(value.value);
	}

	onAbortHandler() {
		this.setState({
			displayMode: 'DISPLAY_MODE_DEFAULT',
		});
		this.updateHeaderInputDisabled('');
	}

	onAddKeyDown(event, value) {
		if (event.keyCode === keycode('enter')) {
			event.stopPropagation();
			event.preventDefault();
			this.onAddHandler(event, value);
		}
	}

	onSelectItem(item, event) {
		let result = [];
		if (event.ctrlKey || event.metaKey) {
			result = manageCtrlKey(item.index, this.state.items);
		} else if (event.shiftKey) {
			result = manageShiftKey(item.index, this.state.items);
		} else {
			result = [...this.state.items].map((currentItem) => ({ ...currentItem, isSelected: false }));
			result[item.index].isSelected = true;
		}
		const countItems = result.filter((currentItem) => currentItem.isSelected).length;

		// if unselect all, return to default mode
		if (countItems === 0) {
			this.setState({
				items: result,
				displayMode: 'DISPLAY_MODE_DEFAULT',
			});
		} else if (countItems > 1) {
			// remove delete action when multiselection
			const newActions = this.state.itemsProp.actionsDefault
                .filter((action) => action.id !== 'delete');
			const itemsProp = { ...this.state.itemsProp, actionsDefault: newActions };
			this.setState({
				items: result,
				displayMode: 'DISPLAY_MODE_SELECTED',
				itemsProp,
			});
		} else {
			this.setState({
				items: result,
				displayMode: 'DISPLAY_MODE_SELECTED',
				itemsProp: { ...this.state.itemsProp, actionsDefault: this.defaultActions,
				},
			});
		}
	}

	onDeleteItems() {
		const result = deleteSelectedItems([...this.state.items]);
		this.setState({
			displayMode: 'DISPLAY_MODE_DEFAULT',
			items: result,
		});
	}

	onAddHandler(event, value) {
		if (!value.value) {
			this.setState({
				displayMode: 'DISPLAY_MODE_DEFAULT',
			});
			return;
		}
		this.setState({
			displayMode: 'DISPLAY_MODE_DEFAULT',
			items: this.state.items.concat([{
				values: [value.value],
			}]),
		}, this.setFormData.bind(this));

		this.updateHeaderInputDisabled('');
	}

	setFormData() {
		this.props.onChange(this.state.items);
	}

	updateHeaderInputDisabled(value) {
		this.setState((prevState) => {
			const [validateAction, abortAction] = prevState.headerInput;
			validateAction.disabled = value === '';

			return {
				headerInput: [validateAction, abortAction],
			};
		});
	}

	updateItemValidateDisabled(value) {
		this.setState(() => ({
			currentEdit: {
				validate: {
					disabled: value.value === '',
				},
			},
		}));
	}

	render() {
		return (
			<div>
				<Enumeration
					{...this.state}
				/>
			</div>
		);
	}
}

export default EnumerationWidget;
