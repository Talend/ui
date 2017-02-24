import React, { PropTypes } from 'react';
import keycode from 'keycode';
import Enumeration from 'react-talend-components/lib/Enumeration';

class EnumerationWidget extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			displayMode: 'DISPLAY_MODE_DEFAULT',

			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: this.onChangeDisplay.bind(this),
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
				actionsDefault: [{
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
				}],
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
		});

		this.updateItemValidateDisabled(item.values[0]);
	}

	onDeleteItem(event, value) {
		const items = [...this.state.items];
		items[value.index].displayMode = 'DISPLAY_MODE_EDIT';
		items.splice(value.index, 1);

		this.setState({
			items,
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
		const items = [...this.state.items];
		items[value.index].displayMode = 'DISPLAY_MODE_DEFAULT';

		// if the value is empty, no value update is done
		if (value.value) {
			items[value.index].values[0] = value.value;
		}
		this.setState({
			items,
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
