import React, { PropTypes } from 'react';
import keycode from 'keycode';
import Enumeration from '@talend/react-components/lib/Enumeration';
import classNames from 'classnames';
import { manageCtrlKey, manageShiftKey, deleteSelectedItems, resetItems } from './utils/utils';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_ADD = 'DISPLAY_MODE_ADD';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';
const DISPLAY_MODE_SELECTED = 'DISPLAY_MODE_SELECTED';
const DUPLICATION_ERROR = 'This term is already in the list';

const ENUMERATION_SEARCH_ACTION = 'ENUMERATION_SEARCH_ACTION';
const ENUMERATION_ADD_ACTION = 'ENUMERATION_ADD_ACTION';
const ENUMERATION_REMOVE_ACTION = 'ENUMERATION_REMOVE_ACTION';
const ENUMERATION_RENAME_ACTION = 'ENUMERATION_RENAME_ACTION';
const ENUMERATION_RESET_LIST = 'ENUMERATION_RESET_LIST';
const ITEMS_DEFAULT_HEIGHT = 33;
const ENUMERATION_LOAD_DATA_ACTION = 'ENUMERATION_LOAD_DATA_ACTION';
const ENUMERATION_IMPORT_FILE_ACTION = 'ENUMERATION_IMPORT_FILE_ACTION';

class EnumerationWidget extends React.Component {
	constructor(props) {
		super(props);
		this.timerSearch = null;
		this.allowDuplicate = false;
		this.allowImport = false;

		if (props.schema) {
			this.allowDuplicate = !!props.schema.allowDuplicates;
			this.allowImport = !!props.schema.allowImport;
		}

		this.addInputs = [{
			disabled: true,
			label: 'Validate',
			icon: 'talend-check',
			id: 'validate',
			key: 'validate',
			onClick: this.onAddHandler.bind(this),
		}, {
			label: 'Abort',
			icon: 'talend-cross',
			id: 'abort',
			key: 'abort',
			onClick: this.onAbortHandler.bind(this),
		}];
		this.searchInputsActions = [{
			label: 'Abort',
			icon: 'talend-cross',
			id: 'abort',
			key: 'abort',
			onClick: this.onAbortHandler.bind(this),
		}];
		this.loadingInputsActions = [{
			label: 'Loading',
			icon: 'talend-cross',
			inProgress: true,
			id: 'loading',
		}];
		this.itemEditActions = [{
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
		}];
		this.defaultActions = [{
			disabled: false,
			label: 'Edit',
			icon: 'talend-pencil',
			id: 'edit',
			onClick: this.onEnterEditModeItem.bind(this),
		}, {
			label: 'Remove value',
			icon: 'talend-trash',
			id: 'delete',
			onClick: this.onDeleteItem.bind(this),
		}];
		this.defaultHeaderActions = [{
			disabled: false,
			label: 'Search for specific values',
			icon: 'talend-search',
			id: 'search',
			onClick: this.changeDisplayToSearchMode.bind(this),
		}];

		if (this.allowImport) {
			this.defaultHeaderActions.push({
				label: 'Import values from a file',
				icon: 'talend-download',
				id: 'upload',
				onClick: this.simulateClickInputFile.bind(this),
			});
		}

		this.defaultHeaderActions.push({
			label: 'Add item',
			icon: 'talend-plus',
			id: 'add',
			onClick: this.changeDisplayToAddMode.bind(this),
		});

		this.selectedHeaderActions = [{
			label: 'Remove selected values',
			icon: 'talend-trash',
			id: 'delete',
			onClick: this.onDeleteItems.bind(this),
		}];

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
				onSubmitItem: this.onSubmitItem.bind(this),
				onAbortItem: this.onAbortItem.bind(this),
				onChangeItem: this.onChangeItem.bind(this),
				onSelectItem: this.onSelectItem.bind(this),
				onLoadData: this.onLoadData.bind(this),
				actionsDefault: this.defaultActions,
				actionsEdit: this.itemEditActions,
			},
			onInputChange: this.onInputChange.bind(this),
			onAddKeyDown: this.onAddKeyDown.bind(this),
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ ...this.state, items: nextProps.formData });
	}

	// default mode
	onEnterEditModeItem(event, value) {
		let items = resetItems([...this.state.items]);
		const item = items[value.index];
		item.displayMode = DISPLAY_MODE_EDIT;
		// resetting errors
		items[value.index].error = '';
		// reset selection
		items = items.map(currentItem => ({ ...currentItem, isSelected: false }));
		// exit from selected mode to not display 0 values selected
		let displayMode = this.state.displayMode;
		if (displayMode === DISPLAY_MODE_SELECTED) {
			displayMode = DISPLAY_MODE_DEFAULT;
		}
		this.setState({ items, displayMode });
		this.updateItemValidateDisabled(item.values[0]);
	}

	onSearchEditModeItem(event, value) {
		let items = resetItems([...this.state.items]);
		const item = items[value.index];
		item.displayMode = DISPLAY_MODE_EDIT;
		// reset selection
		items = items.map(currentItem => ({ ...currentItem, isSelected: false }));
		this.setState({ items, displayMode: DISPLAY_MODE_EDIT });
		this.updateItemValidateDisabled(item.values[0]);
	}

	onDeleteItem(event, value) {
		// dont want to fire select item on icon click
		event.stopPropagation();
		if (this.callActionHandler(
				ENUMERATION_REMOVE_ACTION,
				[this.state.items[value.index].id],
				this.onDeleteItemHandler.bind(this),
				this.onDeleteItemHandler.bind(this),
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
			const countItems = items.filter(item => item.isSelected).length;

			let displayMode = this.state.displayMode;
			if (countItems === 0 && displayMode === DISPLAY_MODE_SELECTED) {
				displayMode = DISPLAY_MODE_DEFAULT;
			}
			this.setState({ items, displayMode }, this.setFormData.bind(this));
		}
	}

	onDeleteItemHandler() {
		const newState = {
			itemsProp: {
				...this.state.itemsProp, actionsDefault: this.defaultActions,
			},
		};
		if (this.state.displayMode !== DISPLAY_MODE_SEARCH) {
			newState.displayMode = DISPLAY_MODE_DEFAULT;
		}
		this.setState(newState);
	}

	onAbortItem(event, value) {
		const items = [...this.state.items];
		items[value.index].displayMode = DISPLAY_MODE_DEFAULT;
		// resetting error as it was not saved
		items[value.index].error = '';
		this.setState({ items, displayMode: 'DISPLAY_MODE_DEFAULT' });
	}

	onChangeItem(event, value) {
		// if the value exist add an error
		const valueExist = this.valueAlreadyExist(value.value);
		const items = [...this.state.items];
		items[value.index].error = valueExist ? DUPLICATION_ERROR : '';
		this.setState({ items });
		this.updateItemValidateDisabled(value, valueExist);
	}

	onSubmitItem(event, value) {
		// dont want to fire select item on icon click
		event.preventDefault();
		event.stopPropagation();
		if (this.callActionHandler(
				ENUMERATION_RENAME_ACTION, {
					index: value.index,
					value: this.parseStringValueToArray(value.value),
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
				items[value.index].values =
					this.parseStringValueToArray(value.value);
			}
			if (valueExist) {
				items[value.index].error = DUPLICATION_ERROR;
			}
			this.setState({
				items,
			}, this.setFormData.bind(this));
		}
	}

	onInputChange(event, value) {
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
						this.onSearchHandler.bind(this)
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

	onLazyHandler() {
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

	onSearchHandler() {
		this.setState({
			headerInput: this.searchInputsActions,
			searchCriteria: this.state.loadingSearchCriteria,
			loadingSearchCriteria: '',
		});
	}

	onAbortHandler() {
		if (this.state.displayMode === DISPLAY_MODE_ADD) {
			this.updateHeaderInputDisabled('');
		}
		if (this.callActionHandler(
				ENUMERATION_RESET_LIST,
				null,
				this.onConnectedAbortHandler.bind(this))
		) {
			this.setState({
				headerDefault: this.loadingInputsActions,
			});
		}
		this.setState({ displayMode: DISPLAY_MODE_DEFAULT, searchCriteria: null });
	}

	onConnectedAbortHandler() {
		this.setState({
			headerDefault: this.defaultHeaderActions,
		});
	}

	onAddKeyDown(event, value) {
		if (event.keyCode === keycode('enter')) {
			event.stopPropagation();
			event.preventDefault();
			if (this.state.displayMode === DISPLAY_MODE_ADD) {
				this.onAddHandler(event, value);
			}
		}
		if (event.keyCode === keycode('escape')) {
			event.stopPropagation();
			event.preventDefault();
			this.onAbortHandler();
		}
	}

	onSelectItem(item, event) {
		let itemsSelected = resetItems([...this.state.items]);
		if (event.ctrlKey || event.metaKey) {
			itemsSelected = manageCtrlKey(item.index, itemsSelected);
		} else if (event.shiftKey) {
			itemsSelected = manageShiftKey(item.index, itemsSelected);
		} else {
			itemsSelected = itemsSelected.map(currentItem => ({ ...currentItem, isSelected: false }));
			itemsSelected[item.index].isSelected = true;
		}
		const countItems = itemsSelected.filter(currentItem => currentItem.isSelected).length;

		// if unselect all, return to default mode
		if (countItems === 0) {
			this.setState({
				items: itemsSelected,
				displayMode: DISPLAY_MODE_DEFAULT,
			});
		} else {
			this.setState({
				items: itemsSelected,
				displayMode: DISPLAY_MODE_SELECTED,
				itemsProp: {
					...this.state.itemsProp, actionsDefault: this.defaultActions,
				},
			});
		}
	}

	onDeleteItems() {
		const itemsToDelete = [];
		this.state.items.forEach((item) => {
			if (item.isSelected) {
				itemsToDelete.push(item.id);
			}
		});
		if (this.callActionHandler(
				ENUMERATION_REMOVE_ACTION,
				itemsToDelete,
				this.onDeleteItemsHandler.bind(this)
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

	onDeleteItemsHandler() {
		this.setState({
			displayMode: DISPLAY_MODE_DEFAULT,
			headerSelected: this.selectedHeaderActions,
		});
	}

	onAddHandler(event, value) {
		if (!value.value) {
			this.setState({
				displayMode: DISPLAY_MODE_DEFAULT,
			});
			return;
		}

		if (this.callActionHandler(
				ENUMERATION_ADD_ACTION,
				this.parseStringValueToArray(value.value),
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
						values: this.parseStringValueToArray(value.value),
					}]),
				},
				this.setFormData.bind(this)
			);
			this.updateHeaderInputDisabled('');
		}
	}

	// lazy loading
	onLoadData() {
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

	getItemHeight(/* isInEdit */) {
		return ITEMS_DEFAULT_HEIGHT;
	}

	setFormData() {
		this.props.onChange(this.state.items);
		if (this.props.onBlur) {
			this.props.onBlur(this.props.id, this.state.items);
		}
	}

	parseStringValueToArray(values) {
		return values.split(',').map(value => value.trim());
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


	/**
	 * simulateClickInputFile - simulate the click on the hidden input
	 *
	 */
	simulateClickInputFile() {
		this.inputFile.click();

		// when we close the file dialog focus is still on the import icon. The tooltip still appears.
		// we force to remove the current focus on the icon
		document.activeElement.blur();
	}


	/**
	 * importFile - importFile
	 *
	 * @param  {Event} event Event trigger when the user change the input file
	 */
	importFile(event) {
		if (this.callActionHandler(
			ENUMERATION_IMPORT_FILE_ACTION,
			event.target.files[0],
			this.importFileHandler.bind(this),
			this.importFileHandler.bind(this)
		)) {
			this.setState({
				headerDefault: this.loadingInputsActions,
			});
		}
		this.resetInputFile();
	}

	resetInputFile() {
		// reinit the input file
		this.inputFile.value = '';
	}


	/**
	 * importFileHandler - Action after the upload
	 *
	 */
	importFileHandler() {
		this.setState({
			headerDefault: this.defaultHeaderActions,
		});
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

	renderImportFile() {
		return (
			<input
				type="file"
				ref={(element) => { this.inputFile = element; }}
				onChange={(event) => { this.importFile(event); }}
				className={classNames('hidden')}
			/>
		);
	}

	render() {
		const items = this.searchItems(this.state.searchCriteria);
		const stateToShow = { ...this.state, items };
		return (
			<div>
				{ this.allowImport && this.renderImportFile() }
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
