import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { ActionBar } from '@talend/react-components';
import Mapper from './Mapper.component';
import Table from './Table';
import { Constants, DataAccessorWithUndoRedo } from './index';

// SORTERS DEFINITION
const SortDirection = {
	NONE: 'none',
	ASCENDING: 'ascending',
	DESCENDING: 'descending',
};

const sorterIcons = {
	none: null,
	ascending: 'talend-sort-asc',
	descending: 'talend-sort-desc',
};

function createSorter() {
	return {
		direction: SortDirection.NONE,
		icons: sorterIcons,
	};
}

function createSorters(keys) {
	const sorters = {};
	keys.forEach(key => (sorters[key] = createSorter()));
	return sorters;
}

/**
 * This function computes the next sort direction.
 */
function nextDirection(direction) {
	switch (direction) {
		case SortDirection.NONE:
			return SortDirection.ASCENDING;
		case SortDirection.ASCENDING:
			return SortDirection.DESCENDING;
		case SortDirection.DESCENDING:
			return SortDirection.NONE;
		default:
			return direction;
	}
}

/**
 * isSelectionEmpty returns true if the given selection is empty
 */
function isSelectionEmpty(selection) {
	return !selection || !selection.element || !selection.side;
}

function updateShowAllIcon(showAll) {
	return showAll ? 'talend-eye-slash' : 'talend-eye';
}

function updateShowAllTooltip(showAll) {
	return showAll ? 'Hide all connections' : 'Show all connections';
}

function updateClearDisabled(dataAccessor, selection, mapping) {
	return !selection || !dataAccessor.isElementMapped(mapping, selection.element, selection.side);
}

function updateClearAllDisabled(mapping) {
	return mapping.length === 0;
}

function removeConnections(dataAccessor, mapping, selection) {
	if (isSelectionEmpty(selection)) {
		return mapping;
	}
	const items = dataAccessor.getMappingItemsWithElement(mapping, selection.element, selection.side);
	if (items != null) {
		// remove items
		let updatedMapping = mapping;
		items.forEach(item => {
			const source = dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT);
			const target = dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT);
			updatedMapping = dataAccessor.removeMapping(updatedMapping, source, target);
		});
		return updatedMapping;
	}
	return mapping;
}

function navigate(state, nav, mapper, usePosition) {
	switch (nav) {
		case keycode.codes.up:
		case keycode.codes.down:
			return navigateUpDown(state, nav);
		case keycode.codes.pgup:
		case keycode.codes.pgdn:
			return navigatePage(state, nav, mapper);
		case keycode.codes.left:
		case keycode.codes.right:
			return navigateBetweenSchema(state, mapper, usePosition);
		case keycode.codes.enter:
			return switchToTargetSchema(state, mapper);
		default:
			break;
	}
	return state.selection;
}

function filterItem(state, item) {
	if (item) {
		const schema = getSchema(state, item.side);
		if (state.dataAccessor.isFiltered(schema, item.element)) {
			// clear item
			return null;
		}
		return item;
	}
	return null;
}

function focusElement(selector) {
	const element = document.querySelector(selector);
	if (element && element.focus) {
		element.focus();
	}
}

function navigateBetweenSchema(state, mapper, usePosition) {
	const dataAccessor = state.dataAccessor;
	const selection = state.selection;
	const targetSide = Constants.switchMappingSide(selection.side);
	const targetSchema = getSchema(state, targetSide);
	let targetElem = null;
	if (selection.connected != null && selection.connected.length > 0 && !usePosition) {
		targetElem = selection.connected[0];
	}
	if (targetElem == null && usePosition) {
		targetElem = findTargetElementByPosition(selection, mapper);
	}
	if (targetElem == null) {
		// get the first element in target schema
		targetElem = dataAccessor.getSchemaElement(targetSchema, 0, true);
	}
	return {
		element: targetElem,
		connected: dataAccessor.getConnectedElements(state.mapping, targetElem, targetSide),
		side: targetSide,
	};
}

function switchToTargetSchema(state, mapper) {
	const dataAccessor = state.dataAccessor;
	const selection = state.selection;
	const targetSide = Constants.switchMappingSide(selection.side);
	const targetSchema = getSchema(state, targetSide);
	let targetElem = null;
	if (state.mappingKey) {
		// try to find an element...
		targetElem = findTargetElement(dataAccessor, targetSchema, selection, state.mappingKey);
	}
	if (targetElem == null) {
		// for connexion context we try to get a non connected element
		targetElem = findNonConnectedTargetElement(
			dataAccessor,
			targetSchema,
			state.mapping,
			targetSide,
		);
	}
	return {
		element: targetElem,
		connected: dataAccessor.getConnectedElements(state.mapping, targetElem, targetSide),
		side: targetSide,
	};
}

function updateFilters(filters, id, active, params) {
	const index = filters.findIndex(filter => filter.id === id);
	if (index === -1) {
		return filters;
	}
	const updatedFilters = filters.slice();
	updatedFilters[index].active = active;
	updatedFilters[index].params = params;
	return updatedFilters;
}

function haveSameData(element1, element2, key) {
	const data1 = element1[key];
	const data2 = element2[key];
	return data1 && data2 && data1 === data2;
}

/**
 * This method tries to find an element in the schema with the same name as
 * given element.
 */
function findTargetElement(dataAccessor, schema, selection, mappingKey) {
	const elements = dataAccessor.getSchemaElements(schema, true);
	return elements.find(
		elem =>
			haveSameData(elem, selection.element, mappingKey) &&
			(selection.connected == null || !dataAccessor.includes(selection.connected, elem)),
	);
}

function findTargetElementByPosition(selection, mapper) {
	const mapperInstance = mapper.getDecoratedComponentInstance();
	const sourcePosition = mapperInstance.getYPosition(selection.element, selection.side);
	const targetSide = Constants.switchMappingSide(selection.side);
	return mapperInstance.getElementAtPosition(sourcePosition, targetSide);
}

function findNonConnectedTargetElement(dataAccessor, schema, mapping, side) {
	const elements = dataAccessor.getSchemaElements(schema, true);
	return elements.find(elem => !dataAccessor.isElementMapped(mapping, elem, side));
}

function updateFilteredElements(elements, filters, id, active, params) {
	let result = elements.slice();
	filters.forEach(filter => {
		if (filter.id === id) {
			result = computeFilter(result, filter, active, params);
		} else {
			result = computeFilter(result, filter, filter.active, filter.params);
		}
	});
	return result;
}

function computeFilter(elements, filter, active, params) {
	if (active) {
		return elements.filter(elem => filter.match(elem, params));
	}
	return elements;
}

function updateSortedElements(elements, sorters, columns) {
	const sortedColumn = columns.find(
		col => sorters && sorters[col.key] && isActiveSorter(sorters[col.key]),
	);
	if (sortedColumn) {
		const sortedKey = sortedColumn.key;
		return sort(elements, sortedKey, sorters[sortedKey].direction);
	}
	return elements;
}

function updateSorters(sorters, columns, columnKey) {
	// get the current direction of the modified sorter
	const prevDirection = sorters[columnKey].direction;
	// clone sorters
	const updatedSorters = {};
	// reset all the sorters to NONE direction
	columns.forEach(column => {
		const key = column.key;
		if (sorters[key]) {
			updatedSorters[key] = {};
			updatedSorters[key].direction = SortDirection.NONE;
			updatedSorters[key].icons = sorters[key].icons;
		}
	});
	// update the modified sorter to the next direction
	updatedSorters[columnKey].direction = nextDirection(prevDirection);
	return updatedSorters;
}

function getCompare(key, direction) {
	const coefs = {
		none: 0,
		ascending: 1,
		descending: -1,
	};

	return function compare(element1, element2) {
		const val1 = element1[key];
		const val2 = element2[key];
		const coef = coefs[direction];
		if (val1 < val2) {
			return -1 * coef;
		} else if (val1 > val2) {
			return coef;
		}
		return 0;
	};
}

function navigatePage(state, nav, mapper) {
	const dataAccessor = state.dataAccessor;
	const selection = state.selection;
	const mapperInstance = mapper.getDecoratedComponentInstance();
	const visibleElements = mapperInstance.getVisibleElements(selection.side);
	const pageSize = visibleElements.length;
	let newSelectedElement = selection.element;
	if (pageSize > 0) {
		const schema = getSchema(state, selection.side);
		const index = dataAccessor.getSchemaElementIndex(schema, selection.element, true);
		let targetIndex = -1;
		switch (nav) {
			case keycode.codes.pgup:
				targetIndex = Math.max(0, index - pageSize);
				break;
			case keycode.codes.pgdn:
				targetIndex = Math.min(index + pageSize, dataAccessor.getSchemaSize(schema, true) - 1);
				break;
			default:
				break;
		}
		if (targetIndex >= 0) {
			newSelectedElement = dataAccessor.getSchemaElement(schema, targetIndex, true);
		}
	}
	return {
		element: newSelectedElement,
		connected: dataAccessor.getConnectedElements(state.mapping, newSelectedElement, selection.side),
		side: selection.side,
	};
}

function navigateUpDown(state, nav) {
	const dataAccessor = state.dataAccessor;
	const selection = state.selection;
	const schema = getCurrentSelectedSchema(state);
	let newSelectedElement = getNextElement(dataAccessor, schema, selection.element, nav);

	if (
		state.pendingItem != null &&
		state.pendingItem.side !== selection.side &&
		selection.side === Constants.MappingSide.OUTPUT
	) {
		// do not select an already connected output elements
		while (dataAccessor.isElementMapped(state.mapping, newSelectedElement, selection.side)) {
			newSelectedElement = getNextElement(dataAccessor, schema, newSelectedElement, nav);
		}
	}

	return {
		element: newSelectedElement,
		connected: dataAccessor.getConnectedElements(state.mapping, newSelectedElement, selection.side),
		side: selection.side,
	};
}

/** Returns the schema corresponding to the given side */
function getSchema(state, side) {
	if (side === Constants.MappingSide.INPUT) {
		return state.input.schema;
	} else if (side === Constants.MappingSide.OUTPUT) {
		return state.output.schema;
	}
	return null;
}

function appendConnected(dataAccessor, mapping, source, target, side) {
	const connected = dataAccessor.getConnectedElements(mapping, source, side);
	if (connected != null) {
		return connected.concat(target);
	}
	return [target];
}

function select(dataAccessor, mapping, element, side) {
	return {
		element,
		connected: dataAccessor.getConnectedElements(mapping, element, side),
		side,
	};
}

/**
 * This function indicates if the given (element, side) is selected
 * (i.e. if it appears in the selection)
 */
function isSelected(dataAccessor, selection, element, side) {
	return (
		selection != null &&
		dataAccessor.areElementsEqual(selection.element, element) &&
		selection.side === side
	);
}

function updateSelection(dataAccessor, ctrl, mapping, selection, element, side) {
	if (isSelected(dataAccessor, selection, element, side) && ctrl) {
		return null;
	}
	return select(dataAccessor, mapping, element, side);
}

function clearConnected(selection) {
	if (selection == null) {
		return null;
	}
	return {
		element: selection.element,
		connected: null,
		side: selection.side,
	};
}

function getCurrentSelectedSchema(state) {
	if (isSelectionEmpty(state.selection)) {
		return null;
	}
	return getSchema(state, state.selection.side);
}

function getNextElement(dataAccessor, schema, element, nav) {
	const selectedElemIndex = dataAccessor.getSchemaElementIndex(schema, element, true);
	const size = dataAccessor.getSchemaSize(schema, true);
	let newSelectedElemIndex = selectedElemIndex;
	switch (nav) {
		case keycode.codes.up:
			newSelectedElemIndex = selectedElemIndex - 1;
			if (newSelectedElemIndex < 0) {
				newSelectedElemIndex = size - 1;
			}
			break;
		case keycode.codes.down:
			newSelectedElemIndex = selectedElemIndex + 1;
			if (newSelectedElemIndex >= size) {
				newSelectedElemIndex = 0;
			}
			break;
		default:
			return element;
	}
	return dataAccessor.getSchemaElement(schema, newSelectedElemIndex, true);
}

function sort(elements, key, direction) {
	if (isActiveSorter({ direction })) {
		const sortedElements = elements.slice();
		return sortedElements.sort(getCompare(key, direction));
	}
	return elements;
}

function isActiveSorter({ direction }) {
	return [SortDirection.ASCENDING, SortDirection.DESCENDING].includes(direction);
}

function initializeSchema(data) {
	return {
		...data,
		sorters: createSorters(data.sorterKeys),
	};
}

function layoutActions(actions) {
	return {
		left: [
			{
				displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
				actions: [actions.undo, actions.redo],
			},
			{
				displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
				actions: [actions.showAll, actions.clear, actions.clearAll],
			},
		],
	};
}

function initializeActions(onUndo, onRedo, onShowAll, onClear, onClearAll, showAll) {
	return {
		undo: {
			id: 'undo',
			icon: 'talend-undo',
			tooltipLabel: null,
			tooltipPlacement: 'bottom',
			onClick: onUndo,
			disabled: true,
		},
		redo: {
			id: 'redo',
			icon: 'talend-redo',
			tooltipLabel: null,
			tooltipPlacement: 'bottom',
			onClick: onRedo,
			disabled: true,
		},
		showAll: {
			id: 'show-all',
			tooltipPlacement: 'bottom',
			onClick: onShowAll,
			disabled: false,
			icon: updateShowAllIcon(showAll),
			tooltipLabel: updateShowAllTooltip(showAll),
		},
		clear: {
			id: 'clear',
			icon: 'talend-cross',
			tooltipLabel: 'Remove selected connection(s)',
			tooltipPlacement: 'bottom',
			onClick: onClear,
			disabled: true,
		},
		clearAll: {
			id: 'clear-all',
			icon: 'talend-trash',
			tooltipLabel: 'Clear all mapping',
			tooltipPlacement: 'bottom',
			onClick: onClearAll,
			disabled: true,
		},
	};
}

class DataMapperContainer extends React.Component {
	constructor(props) {
		super(props);
		this.performMapping = this.performMapping.bind(this);
		this.clearMapping = this.clearMapping.bind(this);
		this.clearConnection = this.clearConnection.bind(this);
		this.selectElement = this.selectElement.bind(this);
		this.isNavigationEvent = this.isNavigationEvent.bind(this);
		this.handleKeyEvent = this.handleKeyEvent.bind(this);
		this.onEnterElement = this.onEnterElement.bind(this);
		this.onLeaveElement = this.onLeaveElement.bind(this);
		this.onShowAll = this.onShowAll.bind(this);
		this.beginDrag = this.beginDrag.bind(this);
		this.dndInProgress = this.dndInProgress.bind(this);
		this.canDrop = this.canDrop.bind(this);
		this.drop = this.drop.bind(this);
		this.endDrag = this.endDrag.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
		this.updateMapperRef = this.updateMapperRef.bind(this);
		this.onUndo = this.onUndo.bind(this);
		this.onRedo = this.onRedo.bind(this);
		this.state = {
			dataAccessor: new DataAccessorWithUndoRedo(),
			input: initializeSchema(this.props.input),
			output: initializeSchema(this.props.output),
			mapping: [],
			mappingKey: this.props.mappingKey,
			dnd: null,
			pendingItem: null,
			selection: null,
			focused: null,
			preferences: props.preferences,
			actions: initializeActions(
				this.onUndo,
				this.onRedo,
				this.onShowAll,
				this.clearConnection,
				this.clearMapping,
				props.preferences.showAll,
			),
		};
		// initialize data accessor
		this.initialize(this.state.dataAccessor, this.props.input, this.props.output);
	}

	initialize(dataAccessor, input, output) {
		dataAccessor.registerSchema(input.schema, Constants.MappingSide.INPUT);
		dataAccessor.registerSchema(output.schema, Constants.MappingSide.OUTPUT);
	}

	handleKeyEvent(ev) {
		let handled = false;
		let reveal = false;
		let focus = false;
		if (this.isNavigationEvent(ev)) {
			const selection = navigate(this.state, ev.keyCode, this.mapper, !ev.altKey);
			this.setState(prevState => ({
				trigger: null,
				selection,
				actions: {
					...prevState.actions,
					clear: {
						...prevState.actions.clear,
						disabled: updateClearDisabled(prevState.dataAccessor, selection, this.state.mapping),
					},
				},
				status: Constants.StateStatus.SELECTION,
			}));
			handled = true;
			reveal = true;
			focus = true;
		} else if (this.isStartConnectionEvent(ev)) {
			const selection = navigate(this.state, ev.keyCode, this.mapper, false);
			this.setState(prevState => ({
				trigger: null,
				selection,
				pendingItem: {
					element: prevState.selection.element,
					side: prevState.selection.side,
				},
				actions: {
					...prevState.actions,
					clear: {
						...prevState.actions.clear,
						disabled: updateClearDisabled(prevState.dataAccessor, selection, this.state.mapping),
					},
				},
				status: Constants.StateStatus.SELECTION | Constants.StateStatus.PENDING,
			}));
			handled = true;
			reveal = true;
		} else if (this.isEndConnectionEvent(ev)) {
			if (this.state.pendingItem.side === Constants.MappingSide.INPUT) {
				this.performMapping(
					this.state.pendingItem.element,
					this.state.selection.element,
					this.state.pendingItem.side,
				);
			} else {
				this.performMapping(
					this.state.selection.element,
					this.state.pendingItem.element,
					this.state.pendingItem.side,
				);
			}
			handled = true;
			reveal = true;
		} else if (this.isEscapeEvent(ev)) {
			const fromElement = this.state.pendingItem.element;
			const fromSide = this.state.pendingItem.side;
			const selection = select(this.state.dataAccessor, this.state.mapping, fromElement, fromSide);
			this.setState(prevState => ({
				trigger: null,
				pendingItem: null,
				selection,
				actions: {
					...prevState.actions,
					clear: {
						...prevState.actions.clear,
						disabled: updateClearDisabled(prevState.dataAccessor, selection, this.state.mapping),
					},
				},
				status: Constants.StateStatus.SELECTION | Constants.StateStatus.PENDING,
			}));
			handled = true;
		} else if (this.isDeleteEvent(ev)) {
			this.clearConnection();
			handled = true;
		} else if (this.isUndoEvent(ev)) {
			this.onUndo();
			handled = true;
		} else if (this.isRedoEvent(ev)) {
			this.onRedo();
			handled = true;
		} else if (this.isHandledEvent(ev)) {
			handled = true;
		}
		if (handled) {
			ev.preventDefault();
		}
		if (reveal) {
			// reveal
			this.mapper.getDecoratedComponentInstance().revealSelection(this.state.selection);
		}
		if (focus) {
			focusElement('[data-focusable]');
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyEvent);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyEvent);
	}

	isUndoEvent(ev) {
		return ev.keyCode === keycode.codes.z && ev.ctrlKey;
	}

	isRedoEvent(ev) {
		return ev.keyCode === keycode.codes.y && ev.ctrlKey;
	}

	isStartConnectionEvent(ev) {
		if (
			ev.keyCode === keycode.codes.enter &&
			!isSelectionEmpty(this.state.selection) &&
			this.state.pendingItem == null
		) {
			if (this.state.selection.side === Constants.MappingSide.INPUT) {
				// input case
				// at least one output element must be free (i.e. not connected)
				return !this.state.dataAccessor.isFullMapped(
					this.state.mapping,
					this.state.output.schema,
					Constants.MappingSide.OUTPUT,
				);
			}
			// output case
			// the current selected element cannot be already connected
			return !this.state.dataAccessor.isElementMapped(
				this.state.mapping,
				this.state.selection.element,
				this.state.selection.side,
			);
		}
		return false;
	}

	isEndConnectionEvent(ev) {
		return (
			ev.keyCode === keycode.codes.enter &&
			!isSelectionEmpty(this.state.selection) &&
			this.state.pendingItem != null &&
			this.state.selection.side !== this.state.pendingItem.side
		);
	}

	isNavigationEvent(ev) {
		const key = ev.keyCode;
		const isValidKey =
			key === keycode.codes.up ||
			key === keycode.codes.down ||
			key === keycode.codes.pgup ||
			key === keycode.codes.pgdn;
		const isValidSwitch =
			(key === keycode.codes.left || key === keycode.codes.right) && this.state.pendingItem == null;
		return !isSelectionEmpty(this.state.selection) && (isValidKey || isValidSwitch);
	}

	isEscapeEvent(ev) {
		const isValidKey = ev.keyCode === keycode.codes.esc;
		return isValidKey && this.state.pendingItem != null;
	}

	isDeleteEvent(ev) {
		const isValidKey = ev.keyCode === keycode.codes.del;
		return (
			isValidKey &&
			!isSelectionEmpty(this.state.selection) &&
			this.state.selection.connected != null
		);
	}

	isHandledEvent(ev) {
		return (
			((ev.keyCode === keycode.codes.left || ev.keyCode === keycode.codes.right) &&
				this.state.pendingItem != null) ||
			ev.keyCode === keycode.codes.enter
		);
	}

	performMapping(sourceElement, targetElement, selectionSide) {
		let selectedSourceElement = sourceElement;
		let selectedTargetElement = targetElement;
		if (selectionSide === Constants.MappingSide.OUTPUT) {
			selectedSourceElement = targetElement;
			selectedTargetElement = sourceElement;
		}
		const mapping = this.state.dataAccessor.addMapping(
			this.state.mapping,
			sourceElement,
			targetElement,
		);
		const selection = {
			element: selectedSourceElement,
			connected: appendConnected(
				this.state.dataAccessor,
				this.state.mapping,
				selectedSourceElement,
				selectedTargetElement,
				selectionSide,
			),
			side: selectionSide,
		};
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.ADD_MAPPING,
				source: sourceElement,
				target: targetElement,
			},
			mapping,
			selection,
			pendingItem: null,
			dnd: null,
			actions: {
				...prevState.actions,
				undo: {
					...prevState.actions.undo,
					tooltipLabel: prevState.dataAccessor.getUndoLabel(),
					disabled: !prevState.dataAccessor.canUndo(),
				},
				redo: {
					...prevState.actions.redo,
					tooltipLabel: prevState.dataAccessor.getRedoLabel(),
					disabled: !prevState.dataAccessor.canRedo(),
				},
				clear: {
					...prevState.actions.clear,
					disabled: updateClearDisabled(prevState.dataAccessor, selection, mapping),
				},
				clearAll: {
					...prevState.actions.clearAll,
					disabled: updateClearAllDisabled(mapping),
				},
			},
			status: Constants.MAPPING_STATE_STATUS,
		}));
	}

	clearMapping() {
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.CLEAR_MAPPING,
			},
			mapping: prevState.dataAccessor.clearMapping(prevState.mapping),
			selection: clearConnected(prevState.selection),
			pendingItem: null,
			dnd: null,
			actions: {
				...prevState.actions,
				undo: {
					...prevState.actions.undo,
					tooltipLabel: prevState.dataAccessor.getUndoLabel(),
					disabled: !prevState.dataAccessor.canUndo(),
				},
				redo: {
					...prevState.actions.redo,
					tooltipLabel: prevState.dataAccessor.getRedoLabel(),
					disabled: !prevState.dataAccessor.canRedo(),
				},
				clear: {
					...prevState.actions.clear,
					disabled: true,
				},
				clearAll: {
					...prevState.actions.clearAll,
					disabled: true,
				},
			},
			status: Constants.MAPPING_STATE_STATUS,
		}));
	}

	clearConnection() {
		const mapping = removeConnections(
			this.state.dataAccessor,
			this.state.mapping,
			this.state.selection,
		);
		const selection = clearConnected(this.state.selection);
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.REMOVE_MAPPING,
				element: prevState.selection.element,
			},
			mapping,
			selection,
			pendingItem: null,
			dnd: null,
			actions: {
				...prevState.actions,
				undo: {
					...prevState.actions.undo,
					tooltipLabel: prevState.dataAccessor.getUndoLabel(),
					disabled: !prevState.dataAccessor.canUndo(),
				},
				redo: {
					...prevState.actions.redo,
					tooltipLabel: prevState.dataAccessor.getRedoLabel(),
					disabled: !prevState.dataAccessor.canRedo(),
				},
				clear: {
					...prevState.actions.clear,
					disabled: updateClearDisabled(prevState.dataAccessor, selection, mapping),
				},
				clearAll: {
					...prevState.actions.clearAll,
					disabled: updateClearAllDisabled(mapping),
				},
			},
			status: Constants.MAPPING_STATE_STATUS,
		}));
	}

	selectElement(ctrl, element, side) {
		const selection = updateSelection(
			this.state.dataAccessor,
			ctrl,
			this.state.mapping,
			this.state.selection,
			element,
			side,
		);
		if (this.state.pendingItem == null) {
			this.setState(prevState => ({
				trigger: null,
				selection,
				actions: {
					...prevState.actions,
					clear: {
						...prevState.actions.clear,
						disabled: updateClearDisabled(prevState.dataAccessor, selection, this.state.mapping),
					},
				},
				status: Constants.StateStatus.SELECTION,
			}));
		} else if (this.state.pendingItem.side === side) {
			// stop the link process
			this.setState(prevState => ({
				trigger: null,
				selection,
				pendingItem: null,
				actions: {
					...prevState.actions,
					clear: {
						...prevState.actions.clear,
						disabled: updateClearDisabled(prevState.dataAccessor, selection, this.state.mapping),
					},
				},
				status: Constants.StateStatus.SELECTION | Constants.StateStatus.PENDING,
			}));
		} else if (this.state.pendingItem.side === Constants.MappingSide.INPUT) {
			this.performMapping(this.state.pendingItem.element, element, side);
		} else {
			this.performMapping(element, this.state.pendingItem.element, side);
		}
	}

	clearSelection() {
		this.setState(prevState => ({
			trigger: null,
			selection: null,
			actions: {
				...prevState.actions,
				clear: {
					...prevState.actions.clear,
					disabled: true,
				},
			},
			status: Constants.StateStatus.SELECTION,
		}));
	}

	onEnterElement(element, side) {
		if (
			this.state.focused &&
			this.state.focused.side === side &&
			this.state.dataAccessor.areElementsEqual(this.state.focused.element, element)
		) {
			return;
		}
		this.setState({
			trigger: {
				code: Constants.Events.ENTER_ELEM,
				element,
				side,
			},
			focused: { element, side },
			status: Constants.StateStatus.FOCUSED,
		});
	}

	onLeaveElement(element, side) {
		if (this.state.focused) {
			this.setState({
				trigger: {
					code: Constants.Events.LEAVE_ELEM,
					element,
					side,
				},
				focused: null,
				status: Constants.StateStatus.FOCUSED,
			});
		}
	}

	onShowAll() {
		const showAll = !this.state.preferences.showAll;
		this.setState(prevState => ({
			trigger: null,
			preferences: {
				...prevState.preferences,
				showAll,
			},
			actions: {
				...prevState.actions,
				showAll: {
					...prevState.actions.showAll,
					icon: updateShowAllIcon(showAll),
					tooltipLabel: updateShowAllTooltip(showAll),
				},
			},
			status: Constants.StateStatus.PREFERENCES,
		}));
	}

	beginDrag(element, side) {
		this.setState({
			trigger: null,
			dnd: {
				source: { element, side },
				target: null,
				inProgress: false,
			},
			status: Constants.StateStatus.DND,
		});
		return { element, side };
	}

	dndInProgress(pos) {
		if (!this.state.dnd.inProgress) {
			this.setState(prevState => ({
				trigger: null,
				dnd: {
					source: prevState.dnd.source,
					target: null,
					inProgress: true,
				},
				status: Constants.StateStatus.DND,
			}));
		}
	}

	canDrop(sourceItem, targetItem) {
		let update = true;
		if (this.state.dnd != null) {
			if (
				this.state.dnd.target != null &&
				this.state.dataAccessor.areElementsEqual(
					this.state.dnd.target.element,
					targetItem.element,
				) &&
				this.state.dnd.target.side === targetItem.side
			) {
				update = false;
			}
			if (this.state.dnd.source.side === targetItem.side) {
				update = false;
			}
		}
		if (update) {
			this.setState(prevState => ({
				trigger: null,
				dnd: {
					source: prevState.dnd.source,
					target: targetItem,
					inProgress: false,
				},
				status: Constants.StateStatus.DND,
			}));
		}
		return (
			targetItem.side !== sourceItem.side &&
			((targetItem.side === Constants.MappingSide.INPUT &&
				!this.state.dataAccessor.isElementMapped(
					this.state.mapping,
					sourceItem.element,
					sourceItem.side,
				)) ||
				(targetItem.side === Constants.MappingSide.OUTPUT &&
					!this.state.dataAccessor.isElementMapped(
						this.state.mapping,
						targetItem.element,
						targetItem.side,
					)))
		);
	}

	drop(sourceItem, targetItem) {
		if (sourceItem.side === Constants.MappingSide.INPUT) {
			this.performMapping(sourceItem.element, targetItem.element, Constants.MappingSide.OUTPUT);
		} else {
			this.performMapping(targetItem.element, sourceItem.element, Constants.MappingSide.INPUT);
		}
	}

	endDrag() {
		this.setState({
			trigger: null,
			dnd: null,
			status: Constants.StateStatus.DND,
		});
	}

	filterAndSortElements(filters, id, active, params, side) {
		const schema = getSchema(this.state, side);
		const schemaState = this.state[side];
		const { sorters, columns } = schemaState;
		const elements = schemaState.schema.elements;
		const filteredElements = updateFilteredElements(elements, filters, id, active, params);
		const sortedElements = updateSortedElements(filteredElements, sorters, columns);
		this.state.dataAccessor.setFilteredElements(schema, filteredElements);
		this.state.dataAccessor.setSortedElements(schema, sortedElements);
	}

	onFilterChange(id, active, params, side) {
		const schema = getSchema(this.state, side);
		const schemaState = this.state[side];
		const { filters } = schemaState;

		this.filterAndSortElements(filters, id, active, params, side);

		const updatedFilters = updateFilters(filters, id, active, params);
		const selection = filterItem(this.state, this.state.selection);

		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.FILTERING,
				filterId: id,
				filtersVersion: prevState.dataAccessor.getFiltersVersionForSide(side),
				side,
			},
			pendingItem: null,
			dnd: null,
			selection,
			focused: filterItem(prevState, prevState.focused),
			input: {
				...prevState.input,
				filters: side === Constants.MappingSide.INPUT ? updatedFilters : prevState.input.filters,
			},
			output: {
				...prevState.output,
				filters: side === Constants.MappingSide.OUTPUT ? updatedFilters : prevState.output.filters,
			},
			actions: {
				...prevState.actions,
				clear: {
					...prevState.actions.clear,
					disabled: updateClearDisabled(prevState.dataAccessor, selection, prevState.mapping),
				},
			},
			status: Constants.FILTERING_STATE_STATUS,
		}));
	}

	onSortChange(columnKey, side) {
		const schema = getSchema(this.state, side);
		const sorters = this.state[side].sorters;
		const columns = this.state[side].columns;
		const updatedSorters = updateSorters(sorters, columns, columnKey);
		const updatedSortedElements = updateSortedElements(
			this.state.dataAccessor.getFilteredElements(schema),
			updatedSorters,
			columns,
		);
		this.state.dataAccessor.setSortedElements(schema, updatedSortedElements);
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.SORT,
				sorterId: columnKey,
				side,
			},
			input: {
				...prevState.input,
				sorters: side === Constants.MappingSide.INPUT ? updatedSorters : prevState.input.sorters,
			},
			output: {
				...prevState.output,
				sorters: side === Constants.MappingSide.OUTPUT ? updatedSorters : prevState.output.sorters,
			},
			status: Constants.StateStatus.SORT,
		}));
	}

	revealConnection(sourceId, targetId) {
		const source = this.state.dataAccessor.getElementFromCache(
			Constants.MappingSide.INPUT,
			sourceId,
		);
		const target = this.state.dataAccessor.getElementFromCache(
			Constants.MappingSide.OUTPUT,
			targetId,
		);
		const mapperInstance = this.mapper.getDecoratedComponentInstance();
		mapperInstance.revealConnection(source, target);
	}

	onUndo() {
		const dataAccessor = this.state.dataAccessor;
		const cmd = dataAccessor.getCurrentUndoCommand();
		const mapping = dataAccessor.undo(this.state.mapping);
		this.setState(
			prevState => ({
				trigger: {
					code: Constants.Events.UNDO,
				},
				pendingItem: null,
				dnd: null,
				mapping,
				actions: {
					...prevState.actions,
					undo: {
						...prevState.actions.undo,
						tooltipLabel: prevState.dataAccessor.getUndoLabel(),
						disabled: !prevState.dataAccessor.canUndo(),
					},
					redo: {
						...prevState.actions.redo,
						tooltipLabel: prevState.dataAccessor.getRedoLabel(),
						disabled: !prevState.dataAccessor.canRedo(),
					},
					clear: {
						...prevState.actions.clear,
						disabled: updateClearDisabled(prevState.dataAccessor, prevState.selection, mapping),
					},
					clearAll: {
						...prevState.actions.clearAll,
						disabled: updateClearAllDisabled(mapping),
					},
				},
				status: Constants.UNDO_REDO_STATE_STATUS,
			}),
			() => {
				if (cmd.code === Constants.Commands.REMOVE_MAPPING) {
					// reveal connection
					this.revealConnection(cmd.sourceId, cmd.targetId);
				}
			},
		);
	}

	onRedo() {
		const cmd = this.state.dataAccessor.getCurrentRedoCommand();
		const mapping = this.state.dataAccessor.redo(this.state.mapping);
		this.setState(
			prevState => ({
				trigger: {
					code: Constants.Events.REDO,
				},
				pendingItem: null,
				dnd: null,
				mapping,
				actions: {
					...prevState.actions,
					undo: {
						...prevState.actions.undo,
						tooltipLabel: prevState.dataAccessor.getUndoLabel(),
						disabled: !prevState.dataAccessor.canUndo(),
					},
					redo: {
						...prevState.actions.redo,
						tooltipLabel: prevState.dataAccessor.getRedoLabel(),
						disabled: !prevState.dataAccessor.canRedo(),
					},
					clear: {
						...prevState.actions.clear,
						disabled: updateClearDisabled(prevState.dataAccessor, prevState.selection, mapping),
					},
					clearAll: {
						...prevState.actions.clearAll,
						disabled: updateClearAllDisabled(mapping),
					},
				},
				status: Constants.UNDO_REDO_STATE_STATUS,
			}),
			() => {
				if (cmd.code === Constants.Commands.ADD_MAPPING) {
					// reveal connection
					this.revealConnection(cmd.sourceId, cmd.targetId);
				}
			},
		);
	}

	updateMapperRef(ref) {
		this.mapper = ref;
	}

	render() {
		const { mappingActions, ...rest } = this.props;
		return (
			<div {...rest}>
				<ActionBar className="main-tools" actions={layoutActions(this.state.actions)} />
				<Mapper
					ref={this.updateMapperRef}
					dataAccessor={this.state.dataAccessor}
					mapping={this.state.mapping}
					mappingActions={mappingActions}
					input={this.state.input}
					output={this.state.output}
					onFilterChange={this.onFilterChange}
					onSortChange={this.onSortChange}
					selection={this.state.selection}
					onSelect={this.selectElement}
					focused={this.state.focused}
					dnd={this.state.dnd}
					dndListener={this}
					pendingItem={this.state.pendingItem}
					onEnterElement={this.onEnterElement}
					onLeaveElement={this.onLeaveElement}
					preferences={this.state.preferences}
					trigger={this.state.trigger}
					status={this.state.status}
				/>
			</div>
		);
	}
}

DataMapperContainer.propTypes = {
	mappingActions: PropTypes.object,
	mappingKey: PropTypes.string,
	input: PropTypes.shape({
		schema: PropTypes.object,
		columns: PropTypes.array,
		rowsClassName: PropTypes.objectOf(PropTypes.string),
		withTitle: PropTypes.bool,
		withHeader: PropTypes.bool,
		filters: PropTypes.array,
		sorterKeys: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	output: PropTypes.shape({
		schema: PropTypes.object,
		columns: PropTypes.array,
		rowsClassName: PropTypes.objectOf(PropTypes.string),
		withTitle: PropTypes.bool,
		withHeader: PropTypes.bool,
		filters: PropTypes.array,
		sorterKeys: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	preferences: PropTypes.object,
};

export default DataMapperContainer;
