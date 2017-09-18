import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import Enumeration from 'react-talend-components/lib/Enumeration';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import { manageCtrlKey, manageShiftKey, deleteSelectedItems, resetItems } from './utils/utils';
import I18N_DOMAIN_FORMS from '../../constants';
import {
	DEFAULT_I18N,
	getDefaultTranslate,
} from '../../translate';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_ADD = 'DISPLAY_MODE_ADD';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';
const DISPLAY_MODE_SELECTED = 'DISPLAY_MODE_SELECTED';

const ENUMERATION_SEARCH_ACTION = 'ENUMERATION_SEARCH_ACTION';
const ENUMERATION_ADD_ACTION = 'ENUMERATION_ADD_ACTION';
const ENUMERATION_REMOVE_ACTION = 'ENUMERATION_REMOVE_ACTION';
const ENUMERATION_RENAME_ACTION = 'ENUMERATION_RENAME_ACTION';
const ENUMERATION_RESET_LIST = 'ENUMERATION_RESET_LIST';
const ITEMS_DEFAULT_HEIGHT = 33;
const ENUMERATION_LOAD_DATA_ACTION = 'ENUMERATION_LOAD_DATA_ACTION';
const ENUMERATION_IMPORT_FILE_ACTION = 'ENUMERATION_IMPORT_FILE_ACTION';
const ENUMERATION_IMPORT_FILE_CLICK = 'ENUMERATION_IMPORT_FILE_CLICK';
const ENUMERATION_IMPORT_FILE_OVERWRITE_MODE = 'ENUMERATION_IMPORT_FILE_OVERWRITE_MODE';
const ENUMERATION_IMPORT_FILE_APPEND_MODE = 'ENUMERATION_IMPORT_FILE_APPEND_MODE';

class EnumerationForm extends React.Component {

	static getItemHeight() {
		return ITEMS_DEFAULT_HEIGHT;
	}

	static parseStringValueToArray(values) {
		return values.split(',').map(value => value.trim());
	}

	static updateItemValidateDisabled(value, valueExist) {
		return {
			currentEdit: {
				validate: {
					disabled: value.value === '' || !!valueExist,
				},
			},
		};
	}

	constructor(props) {
		super(props);
		const t = props.t;

		this.timerSearch = null;
		this.allowDuplicate = false;
		this.allowImport = false;
		this.importFileHandler = this.importFileHandler.bind(this);

		if (props.schema) {
			this.allowDuplicate = !!props.schema.allowDuplicates;
			this.allowImport = !!props.schema.allowImport;
		}

		this.addInputs = [{
			disabled: true,
			label: t('ENUMERATION_WIDGET_VALIDATE_AND_ADD', { defaultValue: 'Validate and Add' }),
			icon: 'talend-check-plus',
			id: 'validate-and-add',
			key: 'validateAdd',
			onClick: this.onValidateAndAddHandler.bind(this),
		}, {
			disabled: true,
			label: t('ENUMERATION_WIDGET_VALIDATE', { defaultValue: 'Validate' }),
			icon: 'talend-check',
			id: 'validate',
			key: 'validate',
			onClick: this.onAddHandler.bind(this),
		}, {
			label: t('ENUMERATION_WIDGET_ABORT', { defaultValue: 'Abort' }),
			icon: 'talend-cross',
			id: 'abort',
			key: 'abort',
			onClick: this.onAbortHandler.bind(this),
		}];
		this.searchInputsActions = [{
			label: t('ENUMERATION_WIDGET_ABORT', { defaultValue: 'Abort' }),
			icon: 'talend-cross',
			id: 'abort',
			key: 'abort',
			onClick: this.onAbortHandler.bind(this),
		}];
		this.loadingInputsActions = [{
			label: t('ENUMERATION_WIDGET_LOADING', { defaultValue: 'Loading' }),
			icon: 'talend-cross',
			inProgress: true,
			id: 'loading',
		}];
		this.itemEditActions = [{
			disabled: true,
			label: t('ENUMERATION_WIDGET_LOADING', { defaultValue: 'Validate' }),
			icon: 'talend-check',
			id: 'validate',
			onClick: this.onSubmitItem.bind(this),
		}, {
			disabled: false,
			label: t('ENUMERATION_WIDGET_ABORT', { defaultValue: 'Abort' }),
			icon: 'talend-cross',
			id: 'abort',
			onClick: this.onAbortItem.bind(this),
		}];
		this.defaultActions = [{
			disabled: false,
			label: t('ENUMERATION_WIDGET_EDIT', { defaultValue: 'Edit' }),
			icon: 'talend-pencil',
			id: 'edit',
			onClick: this.onEnterEditModeItem.bind(this),
		}, {
			label: t('ENUMERATION_WIDGET_REMOVE_VALUE', { defaultValue: 'Remove value' }),
			icon: 'talend-trash',
			id: 'delete',
			onClick: this.onDeleteItem.bind(this),
		}];
		this.defaultHeaderActions = [{
			disabled: false,
			label: t('ENUMERATION_WIDGET_SEARCH_VALUES', { defaultValue: 'Search for specific values' }),
			icon: 'talend-search',
			id: 'search',
			onClick: this.changeDisplayToSearchMode.bind(this),
		}];

		if (this.allowImport) {
			this.defaultHeaderActions.push({
				label: t('ENUMERATION_WIDGET_IMPORT_FROM_FILE', { defaultValue: 'Import values from a file' }),
				icon: 'talend-download',
				id: 'upload',
				onClick: this.onImportButtonClick.bind(this),
				displayMode: 'dropdown',
				items: [{
					label: t('ENUMERATION_WIDGET_ADD_FROM_FILE', { defaultValue: 'Add values from a file' }),
					id: 'append-uploding',
					onClick: this.onImportAppendClick.bind(this),
				}, {
					label: t('ENUMERATION_WIDGET_OVERWRITE_VALUES', { defaultValue: 'Overwrite existing values' }),
					id: 'append-uploding',
					onClick: this.onImportOverwriteClick.bind(this),
				}],
			});
		}

		this.defaultHeaderActions.push({
			label: t('ENUMERATION_WIDGET_ADD_ITEM', { defaultValue: 'Add item' }),
			icon: 'talend-plus',
			id: 'add',
			onClick: this.changeDisplayToAddMode.bind(this),
		});

		this.selectedHeaderActions = [{
			label: t('ENUMERATION_WIDGET_REMOVE_SELECTED_VALUES', { defaultValue: 'Remove selected values' }),
			icon: 'talend-trash',
			id: 'delete',
			onClick: this.onDeleteItems.bind(this),
		}];

		let defaultDisplayMode = DISPLAY_MODE_DEFAULT;
		if (props.schema && props.schema.displayMode) {
			defaultDisplayMode = props.schema.displayMode;
		}

		this.state = {
			inputRef: this.setInputRef.bind(this),
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
				getItemHeight: this.constructor.getItemHeight.bind(this),
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
			setFormData: this.setFormData.bind(this),
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ items: nextProps.formData });
	}

	onImportAppendClick() {
		this.callActionHandler(
			ENUMERATION_IMPORT_FILE_APPEND_MODE,
			null,
			this.importFileHandler,
			this.importFileHandler
		);
	}

	onImportOverwriteClick() {
		this.callActionHandler(
			ENUMERATION_IMPORT_FILE_OVERWRITE_MODE,
			null,
			this.importFileHandler,
			this.importFileHandler
		);
	}

	// default mode
	onEnterEditModeItem(event, value) {
		this.setState((prevState) => {
			let items = resetItems([...prevState.items]);
			const item = items[value.index];
			item.displayMode = DISPLAY_MODE_EDIT;
			// resetting errors
			items[value.index].error = '';
			// reset selection
			items = items.map(currentItem => ({ ...currentItem, isSelected: false }));
			// exit from selected mode to not display 0 values selected
			let displayMode = prevState.displayMode;
			if (displayMode === DISPLAY_MODE_SELECTED) {
				displayMode = DISPLAY_MODE_DEFAULT;
			}
			const validation = this.constructor.updateItemValidateDisabled(item.values[0]);
			return { items, displayMode, ...validation };
		});
	}

	onSearchEditModeItem(event, value) {
		this.setState((prevState) => {
			let items = resetItems([...prevState.items]);
			const item = items[value.index];
			item.displayMode = DISPLAY_MODE_EDIT;
			// reset selection
			items = items.map(currentItem => ({ ...currentItem, isSelected: false }));
			const validation = this.constructor.updateItemValidateDisabled(item.values[0]);
			return { items, displayMode: DISPLAY_MODE_EDIT, ...validation };
		});
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
			this.setState(prevState => (
				{
					itemsProp: {
						...prevState.itemsProp, actionsDefault: this.loadingInputsActions,
					},
				}
			));
		} else {
			this.setState((prevState) => {
				const items = resetItems([...prevState.items]);
				items[value.index].displayMode = DISPLAY_MODE_DEFAULT;
				items.splice(value.index, 1);
				const countItems = items.filter(item => item.isSelected).length;

				let displayMode = prevState.displayMode;
				if (countItems === 0 && displayMode === DISPLAY_MODE_SELECTED) {
					displayMode = DISPLAY_MODE_DEFAULT;
				}
				return { items, displayMode };
			});
		}
	}

	onDeleteItemHandler() {
		this.setState((prevState) => {
			const newState = {
				itemsProp: {
					...prevState.itemsProp, actionsDefault: this.defaultActions,
				},
			};
			if (prevState.displayMode !== DISPLAY_MODE_SEARCH) {
				newState.displayMode = DISPLAY_MODE_DEFAULT;
			}
			return newState;
		});
	}

	onAbortItem(event, value) {
		this.setState((prevState) => {
			const items = [...prevState.items];
			items[value.index].displayMode = DISPLAY_MODE_DEFAULT;
			// resetting error as it was not saved
			items[value.index].error = '';
			return { items, displayMode: 'DISPLAY_MODE_DEFAULT' };
		});
	}

	onChangeItem(event, value) {
		const t = this.props.t;

		// if the value exist add an error
		this.setState((prevState) => {
			const valueExist = this.valueAlreadyExist(value.value, prevState);
			const items = [...prevState.items];
			items[value.index].error = valueExist ?
				t('ENUMERATION_WIDGET_DUPLICATION_ERROR', { defaultValue: 'This term is already in the list' }) :
				'';
			const validation = this.constructor.updateItemValidateDisabled(value, valueExist);
			return { items, ...validation };
		});
	}

	onSubmitItem(event, value) {
		const t = this.props.t;

		// dont want to fire select item on icon click
		event.preventDefault();
		event.stopPropagation();
		if (this.callActionHandler(
				ENUMERATION_RENAME_ACTION, {
					index: value.index,
					value: this.constructor.parseStringValueToArray(value.value),
				},
				this.itemSubmitHandler.bind(this),
				this.itemSubmitHandler.bind(this)
			)) {
			this.setState(prevState => ({
				itemsProp: {
					...prevState.itemsProp, actionsEdit: this.loadingInputsActions,
				},
			}));
		} else {
			this.setState((prevState) => {
				const items = [...prevState.items];
				items[value.index].displayMode = DISPLAY_MODE_DEFAULT;
				const valueExist = this.valueAlreadyExist(value.value, prevState);
				// if the value is empty, no value update is done
				if (value.value && !valueExist) {
					items[value.index].values =
						this.constructor.parseStringValueToArray(value.value);
				}
				if (valueExist) {
					items[value.index].error = t('ENUMERATION_WIDGET_DUPLICATION_ERROR', { defaultValue: 'This term is already in the list' });
				}
				return { items };
			});
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
		this.setState(prevState => ({
			headerInput: this.searchInputsActions,
			searchCriteria: prevState.loadingSearchCriteria,
			loadingSearchCriteria: '',
		}));
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
				this.onValidateAndAddHandler(event, value);
			}
		}
		if (event.keyCode === keycode('escape')) {
			event.stopPropagation();
			event.preventDefault();
			this.onAbortHandler();
		}
	}

	onSelectItem(item, event) {
		// needed to access to the original event in a asynchronous way
		// https://fb.me/react-event-pooling
		event.persist();
		this.setState((prevState) => {
			let itemsSelected = resetItems([...prevState.items]);
			if (event.ctrlKey || event.metaKey) {
				itemsSelected = manageCtrlKey(item.index, itemsSelected);
			} else if (event.shiftKey) {
				itemsSelected = manageShiftKey(item.index, itemsSelected);
			} else if (!itemsSelected[item.index].isSelected) {
				itemsSelected = itemsSelected.map(currentItem => ({ ...currentItem, isSelected: false }));
				itemsSelected[item.index].isSelected = true;
			} else {
				// deselect the given items
				itemsSelected[item.index].isSelected = !itemsSelected[item.index].isSelected;
			}
			const countItems = itemsSelected.filter(currentItem => currentItem.isSelected).length;

			// if unselect all, return to default mode
			if (countItems === 0) {
				return {
					items: itemsSelected,
					displayMode: DISPLAY_MODE_DEFAULT,
				};
			}
			return {
				items: itemsSelected,
				displayMode: DISPLAY_MODE_SELECTED,
				itemsProp: {
					...prevState.itemsProp, actionsDefault: this.defaultActions,
				},
			};
		});
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
			this.setState((prevState) => {
				const result = deleteSelectedItems([...prevState.items]);
				return {
					displayMode: DISPLAY_MODE_DEFAULT,
					items: result,
				};
			});
		}
	}

	onDeleteItemsHandler() {
		this.setState({
			displayMode: DISPLAY_MODE_DEFAULT,
			headerSelected: this.selectedHeaderActions,
		});
	}

	onValidateAndAddHandler(event, value) {
		if (!value.value) {
			this.setState({
				displayMode: DISPLAY_MODE_DEFAULT,
			});
			return;
		}

		if (this.callActionHandler(
				ENUMERATION_ADD_ACTION,
				this.constructor.parseStringValueToArray(value.value),
				this.validateAndAddSuccessHandler.bind(this),
				this.addFailHandler.bind(this))
		) {
			this.setState({
				headerInput: this.loadingInputsActions,
			});
			this.input.focus();
		} else if (!this.valueAlreadyExist(value.value, this.state)) {
			this.setState((prevState) => {
				const items = prevState.items.concat([{
					values: this.constructor.parseStringValueToArray(value.value),
				}]);
				return { items, inputValue: '' };
			});
			this.updateHeaderInputDisabled('');
			this.input.focus();
		}
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
				this.constructor.parseStringValueToArray(value.value),
				this.addSuccessHandler.bind(this),
				this.addFailHandler.bind(this))
		) {
			this.setState({
				headerInput: this.loadingInputsActions,
			});
		} else if (!this.valueAlreadyExist(value.value, this.state)) {
			this.setState(prevState => (
				{
					displayMode: 'DISPLAY_MODE_DEFAULT',
					items: prevState.items.concat([{
						values: this.constructor.parseStringValueToArray(value.value),
					}]),
				})
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

	onImportButtonClick() {
		this.callActionHandler(
			ENUMERATION_IMPORT_FILE_CLICK,
			{
				simulateClickInputFile: this.simulateClickInputFile.bind(this),
			},
			this.importFileHandler,
			this.importFileHandler
		);
	}

	setInputRef(input) {
		this.input = input;
	}

	setFormData() {
		this.props.onChange(this.state.items);
		if (this.props.onBlur) {
			this.props.onBlur(this.props.id, this.state.items);
		}
	}

	itemSubmitHandler() {
		this.setState(prevState => ({
			itemsProp: {
				...prevState.itemsProp, actionsEdit: this.itemEditActions,
			},
		}));
	}

	addSuccessHandler() {
		this.setState({
			displayMode: DISPLAY_MODE_DEFAULT,
		});
	}

	validateAndAddSuccessHandler() {
		this.setState({
			inputValue: '',
			headerInput: this.addInputs,
		});
		this.input.focus();
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
		// timeout to allow to lost the focus on the dropdown
		setTimeout(() => {
			this.inputFile.click();

			// when we close the file dialog focus is still on the import icon. The tooltip still appears.
			// we force to remove the current focus on the icon
			document.activeElement.blur();
		});
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
				this.importFileHandler,
				this.importFileHandler
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
		this.setState(prevState => ({
			items: resetItems([...prevState.items]),
			headerInput: this.addInputs,
			displayMode: DISPLAY_MODE_ADD,
		}));
	}

	changeDisplayToSearchMode() {
		this.setState(prevState => ({
			items: resetItems([...prevState.items]),
			headerInput: this.addInputs,
			displayMode: DISPLAY_MODE_SEARCH,
		}));
	}

	valueAlreadyExist(value, state) {
		return !this.allowDuplicate && state.items.find(item => item.values[0] === value);
	}

	updateHeaderInputDisabled(value) {
		const t = this.props.t;

		this.setState((prevState) => {
			// checking if the value already exist
			const valueExist = this.valueAlreadyExist(value, prevState);
			const [validateAndAddAction, validateAction, abortAction] = prevState.headerInput;
			validateAndAddAction.disabled = value === '' || valueExist;
			validateAction.disabled = value === '' || valueExist;

			return {
				headerInput: [validateAndAddAction, validateAction, abortAction],
				headerError: valueExist ?
					t('ENUMERATION_WIDGET_DUPLICATION_ERROR', { defaultValue: 'This term is already in the list' }) :
					'',
				inputValue: value,
			};
		});
	}

	renderImportFile() {
		return (
			<input
				type="file"
				ref={(element) => {
					this.inputFile = element;
				}}
				onChange={(event) => {
					this.importFile(event);
				}}
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
	EnumerationForm.propTypes = {
		id: PropTypes.string,
		registry: PropTypes.object, // eslint-disable-line
		formData: PropTypes.array, // eslint-disable-line
		schema: PropTypes.object, // eslint-disable-line
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func,
		t: PropTypes.func.isRequired,
	};
}

EnumerationForm.defaultProps = {
	t: getDefaultTranslate,
};

export { EnumerationForm };
export default translate(I18N_DOMAIN_FORMS, {
	i18n: DEFAULT_I18N,
})(EnumerationForm);
