import React, { PropTypes } from 'react';
import keycode from 'keycode';
import Enumeration from 'react-talend-components/lib/Enumeration';

class EnumerationWidget extends React.Component {
	constructor(props) {
		console.dir(props);
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
				id: item.id,
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
				}],
			},
			onAddChange: this.onAddChange.bind(this),
			onAddKeyDown: this.onAddKeyDown.bind(this),
		};
	}

	// default mode
	onEnterEditModeItem(event, value) {
		const items = [...this.state.items];
		items[value.index].displayMode = 'DISPLAY_MODE_EDIT';
		//items[value.index].itemProps.actions;
		this.setState({
			items,
		});
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
		this.setState({
			displayMode: 'DISPLAY_MODE_DEFAULT',
			items: this.state.items.concat([{
				id: -1,
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
		this.setState((prevState) => {
			const items = [...prevState.items];
			const [itemToProcess] = prevState.items[value.index].itemProps.actions;
			itemToProcess.disabled = value.value === '';
			return {
				items,
			};
		});
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

/*Enumeration.propTypes = {
	onChange: PropTypes.func.isRequired,
	formData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		values: PropTypes.arrayOf(PropTypes.string),
	})),
};*/

export default EnumerationWidget;
