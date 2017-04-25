import keycode from 'keycode';

import {
	ENUMERATION_SEARCH_ACTION,
	ENUMERATION_ADD_ACTION,
	ENUMERATION_REMOVE_ACTION,
	ENUMERATION_RENAME_ACTION,
	ENUMERATION_RESET_LIST,
	ENUMERATION_LOAD_DATA_ACTION,
	DISPLAY_MODE_DEFAULT,
	DISPLAY_MODE_ADD,
	DISPLAY_MODE_EDIT,
	DISPLAY_MODE_SEARCH,
	DUPLICATION_ERROR,
} from './EnumerationWidget.constants';

import {
	deleteSelectedItems,
	resetItems,
	manageShiftKey,
} from './utils/utils';


// default mode
export function onEnterEditModeItem(event, value) {
	const items = resetItems([...this.state.items]);
	const item = items[value.index];
	item.displayMode = DISPLAY_MODE_EDIT;
	// resetting errors
	items[value.index].error = '';
	this.setState({ items });
	this.updateItemValidateDisabled(item.values[0]);
}

export function onSearchEditModeItem(event, value) {
	let items = resetItems([...this.state.items]);
	const item = items[value.index];
	item.displayMode = DISPLAY_MODE_EDIT;
	// reset selection
	items = items.map(currentItem => ({ ...currentItem, isSelected: false }));
	this.setState({ items, displayMode: DISPLAY_MODE_EDIT });
	this.updateItemValidateDisabled(item.values[0]);
}

export function onDeleteItemHandler() {
	this.setState({
		displayMode: DISPLAY_MODE_DEFAULT,
		itemsProp: {
			...this.state.itemsProp, actionsDefault: this.defaultActions,
		},
	});
}

export function onDeleteItem(event, value) {
	// dont want to fire select item on icon click
	event.stopPropagation();
	if (this.callActionHandler(
			ENUMERATION_REMOVE_ACTION,
			[this.state.items[value.index].id],
			onDeleteItemHandler.bind(this),
			onDeleteItemHandler.bind(this),
		)) {
		this.setState({
			itemsProp: {
				...this.state.itemsProp, actionsDefault: this.loadingInputsActions,
			},
		});
	} else {
		const items = resetItems([...this.state.items]);
		items[value.index].displayMode = DISPLAY_MODE_DEFAULT;
		items.splice(value.index, 1);
		this.setState({ items }, this.setFormData.bind(this));
	}
}

export function onLazyHandler() {
	let headerActions;
	if (this.state.searchCriteria) {
		headerActions = this.searchInputsActions;
	} else {
		headerActions = this.defaultHeaderActions;
	}

	this.setState({
		headerDefault: this.defaultHeaderActions,
		headerInput: headerActions,
	});
}

export function onSearchHandler() {
	this.setState({
		headerInput: this.searchInputsActions,
		searchCriteria: this.state.loadingSearchCriteria,
		loadingSearchCriteria: '',
	});
}

export function onAbortItem(event, value) {
	const items = [...this.state.items];
	items[value.index].displayMode = DISPLAY_MODE_DEFAULT;
	// resetting error as it was not saved
	items[value.index].error = '';
	this.setState({ items, displayMode: 'DISPLAY_MODE_DEFAULT' });
}

export function onChangeItem(event, value) {
	// if the value exist add an error
	const valueExist = this.valueAlreadyExist(value.value);
	const items = [...this.state.items];
	items[value.index].error = valueExist ? DUPLICATION_ERROR : '';
	this.setState({ items });
	this.updateItemValidateDisabled(value, valueExist);
}

export function onSubmitItem(event, value) {
	// dont want to fire select item on icon click
	event.preventDefault();
	event.stopPropagation();
	if (this.callActionHandler(
			ENUMERATION_RENAME_ACTION, {
				index: value.index,
				value: value.value,
				oldValue: this.state.items[value.index].values[0],
			},
			this.itemSubmitHandler.bind(this),
			this.itemSubmitHandler.bind(this)
		)) {
		this.setState({
			itemsProp: {
				...this.state.itemsProp, actionsEdit: this.loadingInputsActions,
			},
		});
	} else {
		const items = [...this.state.items];
		items[value.index].displayMode = DISPLAY_MODE_DEFAULT;
		const valueExist = this.valueAlreadyExist(value.value);
		// if the value is empty, no value update is done
		if (value.value && !valueExist) {
			items[value.index].values[0] = value.value;
		}
		if (valueExist) {
			items[value.index].error = DUPLICATION_ERROR;
		}
		this.setState({
			items,
		}, this.setFormData.bind(this));
	}
}

export function onInputChange(event, value) {
	if (this.state.displayMode === DISPLAY_MODE_ADD) {
		this.updateHeaderInputDisabled(value.value);
	}
	if (this.state.displayMode === DISPLAY_MODE_SEARCH) {
		if (this.timerSearch !== null) {
			clearTimeout(this.timerSearch);
		}
		this.timerSearch = setTimeout(() => {
			this.timerSearch = null;
			if (this.callActionHandler(
					ENUMERATION_SEARCH_ACTION,
					value.value,
					onSearchHandler.bind(this)
				)) {
				this.setState({
					loadingSearchCriteria: value.value,
					headerInput: this.loadingInputsActions,
				});
			} else {
				this.setState({
					searchCriteria: value.value,
				});
			}
		}, 400);
	}
}

export function onConnectedAbortHandler() {
	this.setState({
		headerDefault: this.defaultHeaderActions,
	});
}

export function onAbortHandler() {
	if (this.state.displayMode === DISPLAY_MODE_ADD) {
		this.updateHeaderInputDisabled('');
	}
	if (this.callActionHandler(
			ENUMERATION_RESET_LIST,
			null,
			onConnectedAbortHandler.bind(this))
	) {
		this.setState({
			headerDefault: this.loadingInputsActions,
		});
	}
	this.setState({ displayMode: DISPLAY_MODE_DEFAULT, searchCriteria: null });
}

export function onAddHandler(event, value) {
	if (!value.value) {
		this.setState({
			displayMode: DISPLAY_MODE_DEFAULT,
		});
		return;
	}

	if (this.callActionHandler(
			ENUMERATION_ADD_ACTION,
			value.value,
			this.addSuccessHandler.bind(this),
			this.addFailHandler.bind(this))
	) {
		this.setState({
			headerInput: this.loadingInputsActions,
		});
	} else if (!this.valueAlreadyExist(value.value)) {
		this.setState(
			{
				displayMode: 'DISPLAY_MODE_DEFAULT',
				items: this.state.items.concat([{
					values: [value.value],
				}]),
			},
			this.setFormData.bind(this)
		);
		this.updateHeaderInputDisabled('');
	}
}

// lazy loading
export function onLoadData() {
	if (this.callActionHandler(
			ENUMERATION_LOAD_DATA_ACTION,
			undefined,
			this.onLazyHandler.bind(this))
	) {
		this.setState({
			headerDefault: this.loadingInputsActions,
			headerInput: this.loadingInputsActions,
		});
	}
}

export function onAddKeyDown(event, value) {
	if (event.keyCode === keycode('enter')) {
		event.stopPropagation();
		event.preventDefault();
		if (this.state.displayMode === DISPLAY_MODE_ADD) {
			onAddHandler.call(this, event, value);
		}
	}
	if (event.keyCode === keycode('escape')) {
		event.stopPropagation();
		event.preventDefault();
		onAbortHandler();
	}
}

export function onSelectItem(item, event) {
	let items = resetItems(this.state.items);
	if (event.shiftKey) {
		items = manageShiftKey(item.index, items);
	} else {
		items[item.index].isSelected = !item.isSelected;
	}

	const nbItems = items.length;
	const nbItemsSelected = items.filter(i => i.isSelected).length;
	const toggleAllChecked = (nbItems === nbItemsSelected);

	this.setState({
		items,
		toggleAllChecked,
	}, this.setFormData.bind(this));
}

export function onDeleteItemsHandler() {
	this.setState({
		displayMode: DISPLAY_MODE_DEFAULT,
		headerSelected: this.selectedHeaderActions,
	});
}

export function onDeleteItems() {
	const itemsToDelete = [];
	this.state.items.forEach((item) => {
		if (item.isSelected) {
			itemsToDelete.push(item.id);
		}
	});
	if (this.callActionHandler(
			ENUMERATION_REMOVE_ACTION,
			itemsToDelete,
			onDeleteItemsHandler.bind(this)
		)) {
		this.setState({
			headerSelected: this.loadingInputsActions,
		});
	} else {
		const result = deleteSelectedItems([...this.state.items]);
		this.setState({
			displayMode: DISPLAY_MODE_DEFAULT,
			items: result,
		}, this.setFormData.bind(this));
	}
}

export function onToggleAll() {
	const checked = !this.state.toggleAllChecked;
	this.setState({
		...this.state,
		toggleAllChecked: checked,
		items: this.state.items.map(i => ({ ...i, isSelected: checked })),
	});
}
