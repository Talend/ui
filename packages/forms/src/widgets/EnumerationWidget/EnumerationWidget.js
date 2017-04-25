import React, { PropTypes } from 'react';
import Enumeration from 'react-talend-components/lib/Enumeration';
import { resetItems } from './utils/utils';

import {
	DISPLAY_MODE_DEFAULT,
	DISPLAY_MODE_ADD,
	DISPLAY_MODE_SEARCH,
	DUPLICATION_ERROR,
	ITEMS_DEFAULT_HEIGHT,
} from './EnumerationWidget.constants';

import {
	validate,
	abort,
	loading,
	edit,
	removeOne,
	add,
	search,
	remove,
} from './EnumerationWidget.actions';

import {
	onEnterEditModeItem,
	onDeleteItem,
	onAbortItem,
	onChangeItem,
	onSubmitItem,
	onInputChange,
	onAbortHandler,
	onAddKeyDown,
	onSelectItem,
	onLoadData,
	onDeleteItems,
	onAddHandler,
	onToggleAll,
} from './EnumerationWidget.handlers';


class EnumerationWidget extends React.Component {
	constructor(props) {
		super(props);

		this.timerSearch = null;
		this.allowDuplicate = false;
		if (props.schema) {
			this.allowDuplicate = !!props.schema.allowDuplicates;
		}

		this.loadingInputsActions = [loading];
		this.addInputs = [
			{ ...validate, onClick: onAddHandler.bind(this) },
			{ ...abort, onClick: onAbortHandler.bind(this) },
		];
		this.searchInputsActions = [
			{ ...abort, onClick: onAbortHandler.bind(this) },
		];
		this.itemEditActions = [
			{ ...validate, onClick: onSubmitItem.bind(this) },
			{ ...abort, disabled: false, onClick: onAbortItem.bind(this) },
		];
		this.defaultActions = [
			{ ...edit, onClick: onEnterEditModeItem.bind(this) },
			{ ...removeOne, onClick: onDeleteItem.bind(this) },
		];
		this.defaultHeaderActions = [
			{ ...add, onClick: this.changeDisplayToAddMode.bind(this) },
			{ ...search, onClick: this.changeDisplayToSearchMode.bind(this) },
		];
		this.selectedHeaderActions = [
			{ ...remove, onClick: onDeleteItems.bind(this) },
		];

		let defaultDisplayMode = DISPLAY_MODE_DEFAULT;
		if (props.schema && props.schema.displayMode) {
			defaultDisplayMode = props.schema.displayMode;
		}

		this.state = {
			displayMode: defaultDisplayMode,
			required: (props.schema && props.schema.required) || false,
			headerDefault: this.defaultHeaderActions,
			headerSelected: this.selectedHeaderActions,
			headerInput: this.addInputs,
			items: (props.formData || []).map(item => ({
				id: item.id,
				values: item.values,
			})),
			itemsProp: {
				key: 'values',
				getItemHeight: this.getItemHeight.bind(this),
				onSubmitItem: onSubmitItem.bind(this),
				onAbortItem: onAbortItem.bind(this),
				onChangeItem: onChangeItem.bind(this),
				onSelectItem: onSelectItem.bind(this),
				onLoadData: onLoadData.bind(this),
				actionsDefault: this.defaultActions,
				actionsEdit: this.itemEditActions,
			},
			onToggleAll: onToggleAll.bind(this),
			onInputChange: onInputChange.bind(this),
			onAddKeyDown: onAddKeyDown.bind(this),
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ ...this.state, items: nextProps.formData });
	}

	getItemHeight(/* isInEdit */) {
		return ITEMS_DEFAULT_HEIGHT;
	}

	setFormData() {
		this.props.onChange(this.state.items);
		if (this.props.onBlur) {
			this.props.onBlur(this.props.id, this.state.items);
		}
	}

	itemSubmitHandler() {
		this.setState({
			itemsProp: {
				...this.state.itemsProp, actionsEdit: this.itemEditActions,
			},
		});
	}

	addSuccessHandler() {
		this.setState({
			displayMode: DISPLAY_MODE_DEFAULT,
		});
	}

	addFailHandler() {
		this.setState({
			headerInput: this.addInputs,
		});
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

	searchItems(searchCriteria) {
		if (!searchCriteria) {
			return this.state.items;
		}
		const searchedItems = [];
		this.state.items.forEach((item) => {
			if (item.values &&
				item.values[0] &&
				item.values[0].toLowerCase().includes(searchCriteria.toLowerCase())
			) {
				searchedItems.push(item);
			}
		});

		return searchedItems;
	}

	changeDisplayToAddMode() {
		const items = resetItems([...this.state.items]);
		this.setState({
			items,
			headerInput: this.addInputs,
			displayMode: DISPLAY_MODE_ADD,
		});
	}

	changeDisplayToSearchMode() {
		const items = resetItems([...this.state.items]);
		this.setState({
			items,
			headerInput: this.searchInputsActions,
			displayMode: DISPLAY_MODE_SEARCH,
		});
	}

	valueAlreadyExist(value) {
		return !this.allowDuplicate && this.state.items.find(item => item.values[0] === value);
	}

	updateHeaderInputDisabled(value) {
		this.setState((prevState) => {
			// checking if the value already exist
			const valueExist = this.valueAlreadyExist(value);
			const [validateAction, abortAction] = prevState.headerInput;
			validateAction.disabled = value === '' || valueExist;

			return {
				headerInput: [validateAction, abortAction],
				headerError: valueExist ? DUPLICATION_ERROR : '',
			};
		});
	}

	updateItemValidateDisabled(value, valueExist) {
		this.setState(() => ({
			currentEdit: {
				validate: {
					disabled: value.value === '' || !!valueExist,
				},
			},
		}));
	}

	render() {
		const items = this.searchItems(this.state.searchCriteria);
		const stateToShow = { ...this.state, items };
		return (
			<div>
				<Enumeration
					{...stateToShow}
				/>
			</div>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	EnumerationWidget.propTypes = {
		id: PropTypes.string,
		registry: PropTypes.object, // eslint-disable-line
		formData: PropTypes.array, // eslint-disable-line
		schema: PropTypes.object, // eslint-disable-line
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func,
	};
}

export default EnumerationWidget;
