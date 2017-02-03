import React from 'react';
import Enumeration from 'react-talend-components/lib/Enumeration';

const KEY_CODE_ENTER = 13;

class ObjectEnumerationField extends React.Component {
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
			items: props.formData.map((item) => {
				return {
					label: item.label,
				};
			}),
			onAddChange: this.onAddChange.bind(this),
			onAddKeyDown: this.onAddKeyDown.bind(this),
		};
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
		if (event.keyCode === KEY_CODE_ENTER) {
			event.stopPropagation();
			event.preventDefault();
			this.onAddHandler(event, value);
		}
	}

	onAddHandler(event, value) {
		this.setState({
			displayMode: 'DISPLAY_MODE_DEFAULT',
			items: this.state.items.concat([{
				label: value.value,
			}]),
		}, () => this.props.onChange(this.state.items));

		this.updateHeaderInputDisabled('');
	}

	updateHeaderInputDisabled(value) {
		const [validateAction, abortAction] = this.state.headerInput;

		validateAction.disabled = value === '';

		this.setState({
			headerInput: [validateAction, abortAction],
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

export default ObjectEnumerationField;
