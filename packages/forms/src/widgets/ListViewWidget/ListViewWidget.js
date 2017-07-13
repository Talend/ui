import React, { PropTypes } from 'react';
import ListView from 'react-talend-components/lib/ListView';

import {
	search,
	abort,
} from './ListViewWidget.actions';

import {
	onInputChange,
	onToggleAll,
	onAbortHandler,
	onItemChange,
	onAddKeyDown,
} from './ListViewWidget.handlers';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DEFAULT_ITEM_HEIGHT = 33;

class ListViewWidget extends React.Component {
	constructor(props) {
		super(props);
		const { options, value } = props;

		this.timerSearch = null;
		this.value = value;

		this.defaultHeaderActions = [
			{ ...search, onClick: this.changeDisplayToSearchMode.bind(this) },
		];
		this.searchInputsActions = [
			{ ...abort, onClick: onAbortHandler.bind(this) },
		];

		let defaultDisplayMode = DISPLAY_MODE_DEFAULT;
		if (props.schema && props.schema.displayMode) {
			defaultDisplayMode = props.schema.displayMode;
		}

		const items = options.enumOptions.map((option, index) => ({
			index,
			checked: value.indexOf(option.value) !== -1,
			label: option.label,
			value: option.value,
			onChange: onItemChange.bind(this),
		}));

		this.state = {
			displayMode: defaultDisplayMode,
			required: !!(props.schema && props.schema.required),
			emptyLabel: props.schema && props.schema.emptyLabel,
			noResultLabel: props.schema && props.schema.noResultLabel,
			headerLabel: props.schema && props.schema.title,
			headerDefault: this.defaultHeaderActions,
			headerSelected: this.selectedHeaderActions,
			headerInput: this.addInputs,
			onToggleAll: onToggleAll.bind(this),
			onInputChange: onInputChange.bind(this),
			onAddKeyDown: onAddKeyDown.bind(this),
			onAbortHandler: onAbortHandler.bind(this),
			toggleAllChecked: items.length === items.filter(i => i.checked).length,
			getItemHeight: () => DEFAULT_ITEM_HEIGHT,
			items,
			displayedItems: items,
		};
	}

	setFormData() {
		this.props.onChange(
			this.state.items.filter(item => item.checked)
				.map(itemChecked => itemChecked.value)
		);
	}

	callActionHandler(actionName, value, successHandler, errorHandler) {
		if (this.props.registry &&
			this.props.registry.formContext &&
			this.props.registry.formContext.handleAction !== undefined) {
			this.props.registry.formContext.handleAction(
				this.props.id, actionName, value, successHandler, errorHandler
			);
			return true;
		}
		return false;
	}

	changeDisplayToSearchMode() {
		this.setState({
			headerInput: this.searchInputsActions,
			displayMode: DISPLAY_MODE_SEARCH,
		});
	}

	render() {
		const listViewProps = {
			...this.state,
			items: this.state.displayedItems,
		};
		return (
			<div>
				<ListView {...listViewProps} />
			</div>
		);
	}
}


ListViewWidget.defaultProps = {
	options: {
		enumOptions: [],
	},
};

if (process.env.NODE_ENV !== 'production') {
	ListViewWidget.propTypes = {
		id: PropTypes.string,
		registry: PropTypes.object, // eslint-disable-line
		formData: PropTypes.array, // eslint-disable-line
		schema: PropTypes.object, // eslint-disable-line
		onChange: PropTypes.func.isRequired,
		value: PropTypes.any,
		options: PropTypes.shape({
			enumOptions: PropTypes.array,
		}).isRequired,
	};
}

export default ListViewWidget;
