import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import _isEmpty from 'lodash/isEmpty';
import Enumeration from '@talend/react-components/lib/Enumeration';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import FocusManager from '@talend/react-components/lib/FocusManager';

import { manageCtrlKey, manageShiftKey, deleteSelectedItems, resetItems } from './utils/utils';
import { I18N_DOMAIN_FORMS } from '../../../constants';
import getDefaultT from '../../../translate';
import FieldTemplate from '../../../UIForm/fields/FieldTemplate';

export const enumerationStates = {
	DISPLAY_MODE_DEFAULT: 'DISPLAY_MODE_DEFAULT',
	DISPLAY_MODE_ADD: 'DISPLAY_MODE_ADD',
	DISPLAY_MODE_SEARCH: 'DISPLAY_MODE_SEARCH',
	DISPLAY_MODE_EDIT: 'DISPLAY_MODE_EDIT',
	DISPLAY_MODE_SELECTED: 'DISPLAY_MODE_SELECTED',
	IMPORT_MODE_APPEND: 'IMPORT_MODE_APPEND',
	IMPORT_MODE_OVERWRITE: 'IMPORT_MODE_OVERWRITE',
};

const ENUMERATION_SEARCH_ACTION = 'ENUMERATION_SEARCH_ACTION';
const ENUMERATION_NEXT_PAGE_ACTION = 'ENUMERATION_NEXT_PAGE_ACTION';
const ENUMERATION_ADD_ACTION = 'ENUMERATION_ADD_ACTION';
const ENUMERATION_REMOVE_ACTION = 'ENUMERATION_REMOVE_ACTION';
const ENUMERATION_RENAME_ACTION = 'ENUMERATION_RENAME_ACTION';
const ITEMS_DEFAULT_HEIGHT = 33;
const ENUMERATION_IMPORT_FILE_ACTION = 'ENUMERATION_IMPORT_FILE_ACTION';

/*
For this widget we distinguish 2 modes :

- Connected mode. All items are passed via props by callee
There are no computation of items here, all computation is done by the callee application

- Non-connected Mode :
Note: The item's index retrieved on event is different than the one in the global state list
The items display is computed on frontend-side
Add, Remove, Edit, Submit, Search actions imply a computation on frontend side.
This is the case for story book for example.
There is a special method isConnectedMode() indicating in what mode we are
*/
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
		const disabledAction = props.schema ? props.schema.disabled : false;
		this.importFileHandler = this.importFileHandler.bind(this);

		if (props.schema) {
			this.allowDuplicate = !!props.schema.allowDuplicates;
			this.allowImport = !!props.schema.allowImport;
		}

		this.addInputs = [
			{
				disabled: true,
				label: t('ENUMERATION_WIDGET_VALIDATE_AND_ADD', {
					defaultValue: 'Validate and Add',
				}),
				icon: 'talend-check-plus',
				id: 'validate-and-add',
				key: 'validateAdd',
				onClick: this.onValidateAndAddHandler.bind(this),
			},
			{
				disabled: true,
				label: t('ENUMERATION_WIDGET_VALIDATE', { defaultValue: 'Validate' }),
				icon: 'talend-check',
				id: 'validate',
				key: 'validate',
				onClick: this.onSingleAddHandler.bind(this),
			},
			{
				label: t('ENUMERATION_WIDGET_ABORT', { defaultValue: 'Abort' }),
				icon: 'talend-cross',
				id: 'abort',
				key: 'abort',
				onClick: this.onAbortHandler.bind(this),
			},
		];
		this.searchInputsActions = [
			{
				label: t('ENUMERATION_WIDGET_ABORT', { defaultValue: 'Abort' }),
				icon: 'talend-cross',
				id: 'abort',
				key: 'abort',
				onClick: this.onAbortHandler.bind(this),
			},
		];
		this.loadingInputsActions = [
			{
				label: t('ENUMERATION_WIDGET_LOADING', { defaultValue: 'Loading' }),
				icon: 'talend-cross',
				inProgress: true,
				id: 'loading',
			},
		];
		this.itemEditActions = [
			{
				disabled: true,
				label: t('ENUMERATION_WIDGET_VALIDATE', { defaultValue: 'Validate' }),
				icon: 'talend-check',
				id: 'validate',
				onClick: this.onSubmitItem.bind(this),
			},
			{
				disabled: false,
				label: t('ENUMERATION_WIDGET_ABORT', { defaultValue: 'Abort' }),
				icon: 'talend-cross',
				id: 'abort',
				onClick: this.onAbortItem.bind(this),
			},
		];
		this.defaultActions = [
			{
				disabled: disabledAction,
				label: t('ENUMERATION_WIDGET_EDIT', { defaultValue: 'Edit' }),
				icon: 'talend-pencil',
				id: 'edit',
				onClick: this.onEnterEditModeItem.bind(this),
			},
			{
				disabled: disabledAction,
				label: t('ENUMERATION_WIDGET_REMOVE_VALUE', { defaultValue: 'Remove value' }),
				icon: 'talend-trash',
				id: 'delete',
				onClick: this.onDeleteItem.bind(this),
			},
		];
		this.defaultHeaderActions = [
			{
				disabled: false,
				label: t('ENUMERATION_WIDGET_SEARCH_VALUES', {
					defaultValue: 'Search for specific values',
				}),
				icon: 'talend-search',
				id: 'search',
				onClick: this.changeDisplayToSearchMode.bind(this),
			},
		];

		if (this.allowImport) {
			const dataFeature = this.props.schema['data-feature'];
			this.defaultHeaderActions.push({
				disabled: disabledAction,
				label: t('ENUMERATION_WIDGET_IMPORT_FROM_FILE', {
					defaultValue: 'Import values from a file',
				}),
				icon: 'talend-download',
				id: 'upload',
				onClick: this.onImportButtonClick.bind(this),
				'data-feature': dataFeature ? dataFeature.importFile : undefined,
				displayMode: 'dropdown',
				items: [
					{
						label: t('ENUMERATION_WIDGET_ADD_FROM_FILE', {
							defaultValue: 'Add values from a file',
						}),
						id: 'append-uploading',
						onClick: this.onImportAppendClick.bind(this),
						'data-feature': dataFeature ? dataFeature.addFromFile : undefined,
					},
					{
						label: t('ENUMERATION_WIDGET_OVERWRITE_VALUES', {
							defaultValue: 'Overwrite existing values',
						}),
						id: 'overwrite-uploading',
						onClick: this.onImportOverwriteClick.bind(this),
						'data-feature': dataFeature ? dataFeature.overwriteExisting : undefined,
					},
				],
			});
		}

		this.defaultHeaderActions.push({
			label: t('ENUMERATION_WIDGET_ADD_ITEM', { defaultValue: 'Add item' }),
			icon: 'talend-plus',
			id: 'add',
			disabled: disabledAction,
			onClick: this.changeDisplayToAddMode.bind(this),
		});

		this.selectedHeaderActions = [
			{
				disabled: disabledAction,
				label: t('ENUMERATION_WIDGET_REMOVE_SELECTED_VALUES', {
					defaultValue: 'Remove selected values',
				}),
				icon: 'talend-trash',
				id: 'delete',
				onClick: this.onDeleteItems.bind(this),
			},
		];

		let defaultDisplayMode = enumerationStates.DISPLAY_MODE_DEFAULT;
		if (props.schema && props.schema.displayMode) {
			defaultDisplayMode = props.schema.displayMode;
		}

		this.state = {
			inputRef: this.setInputRef.bind(this),
			displayMode: defaultDisplayMode,
			searchCriteria: '',
			required: (props.schema && props.schema.required) || false,
			headerDefault: this.defaultHeaderActions,
			headerSelected: this.selectedHeaderActions,
			headerInput: this.addInputs,
			items: (props.value || []).map(item => ({
				id: item.id,
				values: item.values,
			})),
			itemsProp: {
				key: 'values',
				getItemHeight: EnumerationForm.getItemHeight,
				onSubmitItem: this.onSubmitItem.bind(this),
				onAbortItem: this.onAbortItem.bind(this),
				onChangeItem: this.onChangeItem.bind(this),
				onSelectItem: !disabledAction ? this.onSelectItem.bind(this) : () => {},
				onLoadData: this.onLoadData.bind(this),
				actionsDefault: this.defaultActions,
				actionsEdit: this.itemEditActions,
			},
			onInputChange: this.onInputChange.bind(this),
			onAddKeyDown: this.onAddKeyDown.bind(this),
		};
		this.onBlur = this.onBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value) {
			this.setState(prevState => ({ ...prevState, items: nextProps.value }));
		}
	}

	onBlur(event) {
		const { schema, onFinish } = this.props;
		onFinish(event, { schema });
	}

	onChange(event, payload) {
		const { schema, onFinish, onChange } = this.props;
		onChange(event, payload);
		onFinish(event, { schema });
	}

	onImportAppendClick() {
		this.setState(
			state => ({ ...state, importMode: enumerationStates.IMPORT_MODE_APPEND }),
			this.simulateClickInputFile.bind(this),
		);
	}

	onImportOverwriteClick() {
		this.setState(
			state => ({ ...state, importMode: enumerationStates.IMPORT_MODE_OVERWRITE }),
			this.simulateClickInputFile.bind(this),
		);
	}

	// default mode
	onEnterEditModeItem(event, value) {
		this.setState(prevState => {
			let items = resetItems([...prevState.items]);
			let item = items[value.index];
			// if there is a search criteria, retrieve correct item from state in non-connected mode
			if (prevState.searchCriteria && !this.isConnectedMode()) {
				item = this.getItemInSearchMode(prevState.searchCriteria, value.index, items);
			}
			item.displayMode = enumerationStates.DISPLAY_MODE_EDIT;
			// resetting errors
			items[value.index].error = '';
			// reset selection
			items = items.map(currentItem => ({ ...currentItem, isSelected: false }));
			// exit from selected mode to not display 0 values selected
			let displayMode = prevState.displayMode;
			if (displayMode === enumerationStates.DISPLAY_MODE_SELECTED) {
				displayMode = enumerationStates.DISPLAY_MODE_DEFAULT;
			}
			const validation = EnumerationForm.updateItemValidateDisabled(item.values[0]);
			return { items, displayMode, ...validation };
		});
	}

	onSearchEditModeItem(event, value) {
		this.setState(prevState => {
			let items = resetItems([...prevState.items]);
			const item = items[value.index];
			item.displayMode = enumerationStates.DISPLAY_MODE_EDIT;
			// reset selection
			items = items.map(currentItem => ({ ...currentItem, isSelected: false }));
			const validation = EnumerationForm.updateItemValidateDisabled(item.values[0]);
			return { items, displayMode: enumerationStates.DISPLAY_MODE_EDIT, ...validation };
		});
	}

	onDeleteItem(event, value) {
		// dont want to fire select item on icon click
		event.stopPropagation();
		const { schema } = this.props;

		if (this.isConnectedMode()) {
			// loading
			this.setState(prevState => ({
				itemsProp: {
					...prevState.itemsProp,
					actionsDefault: this.loadingInputsActions,
				},
			}));
			this.props
				.onTrigger(event, {
					trigger: { ids: [this.state.items[value.index].id], action: ENUMERATION_REMOVE_ACTION },
					schema,
				})
				.then(() => {
					const payload = {
						schema,
						value: this.state.items.filter((item, index) => index !== value.index),
					};
					this.onChange(event, payload);
				})
				.finally(() => {
					this.onDeleteItemHandler();
				});
		} else {
			this.setState(prevState => {
				const items = resetItems([...prevState.items]);
				let indexToRemove = value.index;
				const sc = prevState.searchCriteria;
				if (sc) {
					// retrieve correct item when in non-connected mode
					indexToRemove = this.getIndexToRemoveInSearchMode(sc, value.index, items);
				}
				items[indexToRemove].displayMode = enumerationStates.DISPLAY_MODE_DEFAULT;
				items.splice(indexToRemove, 1);
				const countItems = items.filter(item => item.isSelected).length;

				let displayMode = prevState.displayMode;
				if (countItems === 0 && displayMode === enumerationStates.DISPLAY_MODE_SELECTED) {
					displayMode = enumerationStates.DISPLAY_MODE_DEFAULT;
				}
				const payload = {
					schema,
					value: items,
				};
				this.onChange(event, payload);
				return { displayMode };
			});
		}
	}

	onDeleteItemHandler() {
		this.setState(prevState => {
			const newState = {
				itemsProp: {
					...prevState.itemsProp,
					actionsDefault: this.defaultActions,
				},
			};
			if (prevState.displayMode !== enumerationStates.DISPLAY_MODE_SEARCH) {
				newState.displayMode = enumerationStates.DISPLAY_MODE_DEFAULT;
			}
			return newState;
		});
	}

	onAbortItem(event, value) {
		this.setState(prevState => {
			const items = [...prevState.items];
			items[value.index].displayMode = enumerationStates.DISPLAY_MODE_DEFAULT;
			// resetting error as it was not saved
			items[value.index].error = '';
			return { items, displayMode: enumerationStates.DISPLAY_MODE_DEFAULT };
		});
	}

	onChangeItem(event, value) {
		const t = this.props.t;

		// if the value exist add an error
		this.setState(prevState => {
			const valueExist = this.valueAlreadyExist(value.value, prevState);
			const items = [...prevState.items];
			items[value.index].error = '';
			if (valueExist) {
				items[value.index].error = t('ENUMERATION_WIDGET_DUPLICATION_ERROR', {
					defaultValue: 'This term is already in the list',
				});
			}
			const validation = EnumerationForm.updateItemValidateDisabled(value, valueExist);
			return { items, ...validation };
		});
	}

	onSubmitItem(event, value) {
		// dont want to fire select item on icon click
		event.preventDefault();
		event.stopPropagation();

		const { schema } = this.props;

		if (this.isConnectedMode()) {
			this.setState(prevState => ({
				itemsProp: {
					...prevState.itemsProp,
					actionsEdit: this.loadingInputsActions,
				},
			}));
			const formattedValue = EnumerationForm.parseStringValueToArray(value.value);
			this.props
				.onTrigger(event, {
					trigger: {
						id: this.state.items[value.index].id,
						index: value.index,
						value: formattedValue,
						action: ENUMERATION_RENAME_ACTION,
					},
					schema,
				})
				.then(() => {
					const payload = {
						schema,
						value: this.state.items.map((item, index) => {
							if (index === value.index) {
								return { ...item, values: formattedValue };
							}
							return item;
						}),
					};
					this.onChange(event, payload);
				})
				.finally(() => {
					this.itemSubmitHandler();
				});
		} else {
			const items = [...this.state.items];
			let item = items[value.index];
			if (this.state.searchCriteria) {
				// retrieve correct item when in non-connected mode
				item = this.getItemInSearchMode(this.state.searchCriteria, value.index, items);
			}
			item.displayMode = enumerationStates.DISPLAY_MODE_DEFAULT;
			const valueExist = this.valueAlreadyExist(value.value, this.state);
			// if the value is empty, no value update is done
			if (value.value && !valueExist) {
				item.values = EnumerationForm.parseStringValueToArray(value.value);
			}
			if (valueExist) {
				item.error = this.props.t('ENUMERATION_WIDGET_DUPLICATION_ERROR', {
					defaultValue: 'This term is already in the list',
				});
			}
			const payload = {
				schema,
				value: items,
			};
			this.onChange(event, payload);
		}
	}

	onInputChange(event, value) {
		if (this.state.displayMode === enumerationStates.DISPLAY_MODE_ADD) {
			this.updateHeaderInputDisabled(value.value);
		}
		if (this.state.displayMode === enumerationStates.DISPLAY_MODE_SEARCH) {
			if (this.timerSearch !== null) {
				clearTimeout(this.timerSearch);
			}
			this.timerSearch = setTimeout(() => {
				const { schema } = this.props;
				this.timerSearch = null;
				if (this.isConnectedMode()) {
					this.setState({
						headerInput: this.loadingInputsActions,
					});
					this.props
						.onTrigger(event, {
							trigger: { value: value.value, action: ENUMERATION_SEARCH_ACTION },
							schema,
						})
						.then(items => {
							const payload = {
								schema,
								value: items.map(item => ({ id: item.id, values: item.values })),
							};
							this.onChange(event, payload);
							this.onSearchHandler(value.value);
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

	onSearchHandler(value) {
		this.setState(prevState => ({
			headerInput: this.searchInputsActions,
			searchCriteria: value,
			// since onSearchHandler() is processed asynchronously,
			// the line below is mandatory to refresh the items (highlight them)
			items: [...prevState.items],
		}));
	}

	onAbortHandler() {
		if (this.state.displayMode === enumerationStates.DISPLAY_MODE_ADD) {
			this.updateHeaderInputDisabled('');
		}

		const { schema } = this.props;
		if (this.isConnectedMode()) {
			this.setState({
				headerDefault: this.loadingInputsActions,
			});
			this.props
				.onTrigger(event, {
					trigger: { value: '', action: ENUMERATION_SEARCH_ACTION },
					schema,
				})
				.then(items => {
					const payload = {
						schema,
						value: items.map(item => ({ id: item.id, values: item.values })),
					};
					this.onChange(event, payload);
					this.onConnectedAbortHandler();
				});
		} else {
			this.onConnectedAbortHandler();
		}
	}

	onConnectedAbortHandler() {
		this.setState({
			headerDefault: this.defaultHeaderActions,
			searchCriteria: null,
			displayMode: enumerationStates.DISPLAY_MODE_DEFAULT,
		});
	}

	onAddKeyDown(event, value) {
		if (event.keyCode === keycode('enter')) {
			event.stopPropagation();
			event.preventDefault();
			if (this.state.displayMode === enumerationStates.DISPLAY_MODE_ADD) {
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
		this.setState(prevState => {
			let itemsSelected = resetItems([...prevState.items]);
			if (event.ctrlKey || event.metaKey) {
				itemsSelected = manageCtrlKey(item.index, itemsSelected);
			} else if (event.shiftKey) {
				itemsSelected = manageShiftKey(item.index, itemsSelected);
			} else if (!itemsSelected[item.index].isSelected) {
				itemsSelected = itemsSelected.map(currentItem => ({
					...currentItem,
					isSelected: false,
				}));
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
					displayMode: enumerationStates.DISPLAY_MODE_DEFAULT,
				};
			}
			return {
				items: itemsSelected,
				displayMode: enumerationStates.DISPLAY_MODE_SELECTED,
				itemsProp: {
					...prevState.itemsProp,
					actionsDefault: this.defaultActions,
				},
			};
		});
	}

	onDeleteItems(event) {
		const { schema } = this.props;
		const itemsToDelete = [];
		this.state.items.forEach(item => {
			if (item.isSelected) {
				itemsToDelete.push(item.id);
			}
		});

		if (this.isConnectedMode()) {
			// loading
			this.setState({
				headerSelected: this.loadingInputsActions,
			});
			this.props
				.onTrigger(event, {
					trigger: { ids: itemsToDelete, action: ENUMERATION_REMOVE_ACTION },
					schema,
				})
				.then(() => {
					const payload = {
						schema,
						value: this.state.items.filter(item => !item.isSelected),
					};
					this.onChange(event, payload);
					this.onDeleteItemsHandler();
				});
		} else {
			this.setState(prevState => {
				const result = deleteSelectedItems([...prevState.items]);
				const payload = {
					schema,
					value: result,
				};
				this.onChange(event, payload);
				return {
					displayMode: enumerationStates.DISPLAY_MODE_DEFAULT,
				};
			});
		}
	}

	onDeleteItemsHandler() {
		this.setState({
			displayMode: enumerationStates.DISPLAY_MODE_DEFAULT,
			headerSelected: this.selectedHeaderActions,
		});
	}

	onAddHandler(event, value, successHandler, failHandler, isSingleAdd = false) {
		const { schema } = this.props;
		if (!value.value) {
			this.setState({
				displayMode: enumerationStates.DISPLAY_MODE_DEFAULT,
			});
			return;
		}

		if (this.isConnectedMode()) {
			this.setState({
				headerInput: this.loadingInputsActions,
			});
			this.props
				.onTrigger(event, {
					trigger: {
						value: EnumerationForm.parseStringValueToArray(value.value),
						action: ENUMERATION_ADD_ACTION,
					},
					schema,
				})
				.then(
					newDocument => {
						const payload = {
							schema: this.props.schema,
							value: this.props.value.concat(newDocument),
						};
						this.onChange(event, payload);
						this.input.focus();
						successHandler();
					},
					() => {
						failHandler();
					},
				);
		} else if (!this.valueAlreadyExist(value.value, this.state)) {
			const payload = {
				schema,
				value: this.state.items.concat([
					{
						values: EnumerationForm.parseStringValueToArray(value.value),
					},
				]),
			};
			this.onChange(event, payload);
			if (isSingleAdd) {
				successHandler();
			}
			this.updateHeaderInputDisabled('');
		}
	}

	onValidateAndAddHandler(event, value) {
		this.onAddHandler(
			event,
			value,
			this.validateAndAddSuccessHandler.bind(this),
			this.addFailHandler.bind(this),
		);
	}

	onSingleAddHandler(event, value) {
		this.onAddHandler(
			event,
			value,
			this.addSuccessHandler.bind(this),
			this.addFailHandler.bind(this),
			true,
		);
	}

	// lazy loading
	onLoadData() {
		if (this.isConnectedMode()) {
			const { schema } = this.props;
			this.setState({
				headerDefault: this.loadingInputsActions,
				headerInput: this.loadingInputsActions,
			});
			this.props
				.onTrigger(event, {
					trigger: {
						value: this.state.searchCriteria,
						action: ENUMERATION_NEXT_PAGE_ACTION,
						numberItems: this.state.items.length,
					},
					schema,
				})
				.then(items => {
					const payload = {
						schema,
						value: this.props.value.concat(
							items.map(item => ({ id: item.id, values: item.values })),
						),
					};
					this.onChange(event, payload);
				})
				.finally(() => {
					this.onLazyHandler();
				});
		}
	}

	onImportButtonClick() {
		if (this.state.items.length === 0) {
			this.setState(
				state => ({ ...state, importMode: enumerationStates.IMPORT_MODE_APPEND }),
				this.simulateClickInputFile.bind(this),
			);
		}
	}

	setInputRef(input) {
		this.input = input;
	}

	getItemSelectedInSearchMode(searchCriteria, index) {
		const searchedItems = this.searchItems(searchCriteria);
		return searchedItems[index];
	}

	getItemInSearchMode(searchCriteria, index, items) {
		const selectedItem = this.getItemSelectedInSearchMode(searchCriteria, index);
		return items.find(currentItem => currentItem.values[0] === selectedItem.values[0]);
	}

	getIndexToRemoveInSearchMode(searchCriteria, index, items) {
		const selectedItem = this.getItemSelectedInSearchMode(searchCriteria, index);
		return items.findIndex(currentItem => currentItem.values[0] === selectedItem.values[0]);
	}

	isConnectedMode() {
		return !!(this.props.properties && this.props.properties.connectedMode);
	}

	itemSubmitHandler() {
		this.setState(prevState => ({
			itemsProp: {
				...prevState.itemsProp,
				actionsEdit: this.itemEditActions,
			},
			items: resetItems([...prevState.items]),
		}));
	}

	addSuccessHandler() {
		this.setState({
			displayMode: enumerationStates.DISPLAY_MODE_DEFAULT,
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

	/**
	 * simulateClickInputFile - simulate the click on the hidden input
	 *
	 */
	simulateClickInputFile() {
		if (this.state.importMode) {
			// timeout to allow to lost the focus on the dropdown
			setTimeout(() => {
				this.inputFile.click();
				// when we close the file dialog focus is still on the import icon.
				// The tooltip still appears.
				// we force to remove the current focus on the icon
				document.activeElement.blur();
			});
		}
	}

	/**
	 * importFile - importFile
	 *
	 * @param  {Event} event Event trigger when the user change the input file
	 */
	importFile(event) {
		const { schema } = this.props;
		if (this.isConnectedMode()) {
			this.setState({
				headerDefault: this.loadingInputsActions,
			});
			return this.props
				.onTrigger(event, {
					trigger: {
						value: event.target.files[0],
						action: ENUMERATION_IMPORT_FILE_ACTION,
						importMode: this.state.importMode,
						label: this.props.properties.label,
					},
					schema,
				})
				.then(items => {
					if (!_isEmpty(items)) {
						const payload = {
							schema,
							value: items.map(item => ({ id: item.id, values: item.values })),
						};
						this.onChange(event, payload);
					}
				})
				.finally(() => {
					this.resetInputFile();
					this.importFileHandler();
				});
		}
		return Promise.resolve();
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
			importMode: '',
		});
	}

	searchItems(searchCriteria) {
		if (!searchCriteria) {
			return this.state.items;
		}
		const searchedItems = [];
		this.state.items.forEach(item => {
			if (
				item.values &&
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
			displayMode: enumerationStates.DISPLAY_MODE_ADD,
		}));
	}

	changeDisplayToSearchMode() {
		this.setState(prevState => ({
			items: resetItems([...prevState.items]),
			headerInput: this.searchInputsActions,
			displayMode: enumerationStates.DISPLAY_MODE_SEARCH,
		}));
	}

	valueAlreadyExist(value, state) {
		return !this.allowDuplicate && state.items.find(item => item.values[0] === value);
	}

	updateHeaderInputDisabled(value) {
		const t = this.props.t;

		this.setState(prevState => {
			// checking if the value already exist
			const valueExist = this.valueAlreadyExist(value, prevState);
			const [validateAndAddAction, validateAction, abortAction] = prevState.headerInput;
			// in this case, we could have the loading state that implied we have just one icon
			if (!validateAction && !abortAction) {
				// returning null in setState prevent re-rendering
				// see here for documentation https://reactjs.org/blog/2017/09/26/react-v16.0.html#breaking-changes
				return null;
			}
			validateAndAddAction.disabled = value === '' || valueExist;
			validateAction.disabled = value === '' || valueExist;

			let headerError = '';
			if (valueExist) {
				headerError = t('ENUMERATION_WIDGET_DUPLICATION_ERROR', {
					defaultValue: 'This term is already in the list',
				});
			}
			return {
				headerInput: [validateAndAddAction, validateAction, abortAction],
				headerError,
				inputValue: value,
			};
		});
	}

	renderImportFile() {
		return (
			<input
				type="file"
				ref={element => {
					this.inputFile = element;
				}}
				onChange={event => {
					this.importFile(event);
				}}
				className={classNames('hidden')}
			/>
		);
	}

	render() {
		let items = this.state.items;
		// filter items only in non-connected mode, since in connected mode items are up-to-date
		if (!this.isConnectedMode()) {
			items = this.searchItems(this.state.searchCriteria);
		}
		const stateToShow = { ...this.state, items };
		const { description, required, title } = this.props.schema;
		const { errorMessage, isValid } = this.props;
		return (
			<FieldTemplate
				description={description}
				label={title}
				required={required}
				isValid={isValid}
				errorMessage={errorMessage}
			>
				{this.allowImport && this.renderImportFile()}
				<FocusManager onFocusOut={this.onBlur}>
					<Enumeration {...stateToShow} />
				</FocusManager>
			</FieldTemplate>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	EnumerationForm.propTypes = {
		errorMessage: PropTypes.string,
		isValid: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		onTrigger: PropTypes.func.isRequired,
		properties: PropTypes.object,
		schema: PropTypes.object,
		t: PropTypes.func.isRequired,
		value: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				values: PropTypes.arrayOf(PropTypes.string),
			}),
		),
	};
}

EnumerationForm.defaultProps = {
	t: getDefaultT(),
};

export { EnumerationForm };
export default withTranslation(I18N_DOMAIN_FORMS)(EnumerationForm);
