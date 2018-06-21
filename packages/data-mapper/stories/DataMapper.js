import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';

import {
	Table,
	ActionBar,
	IconsProvider,
} from '@talend/react-components';

import Mapper, {
	Constants,
	DataAccessorWithUndoRedo,
	MappingAccessor,
} from '../src/index';

import { isSelected } from '../src/Schema/Schema';

const Keys = {
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	ENTER: 13,
	ESCAPE: 27,
	DELETE: 46,
	REDO: 89,
	UNDO: 90,
};

const inputSchemaUX = {
	id: 'd1fg158sc',
	name: 'CUSTOMERS-25K PREP',
	elements: [
		'ID',
		'FIRSTNAME',
		'LASTNAME',
		'company_name',
		'ADDRESS',
		'CITY',
		'county',
		'STATE',
		'zip',
		'phone1',
		'phone2',
		'Industry',
		'EMAIL',
		'web',
		'CUST_TYPE',
	],
	types: [
		'string',
		'First Name',
		'text',
		'text',
		'Address Line.',
		'City',
		'US County',
		'US State Code',
		'FR Postal Code',
		'US Phone',
		'US Phone',
		'string',
		'Email',
		'URL',
		'City',
	],
};

const outputSchemaUX = {
	id: 'sdc22c25sd1csd',
	name: 'SALESFORCE.ACCOUNT',
	elements: [
		'AccountNumber',
		'AccountStore',
		'AnnualRevenue',
		'BillingAddress',
		'BillingCity',
		'BillingCountry',
		'BillingCountryCode',
		'BillingGeocodeAccuracy',
		'BillingLatitude',
		'BillingLongitude',
		'BillingPostalCode',
		'BillingState',
		'BillingStateCode',
		'BillingStreet',
		'CleanStatus',
		'ConnectionReceivedId',
		'ConnectionSentId',
		'Description',
		'DunsNumber',
		'EmailAddress',
		'Industry',
		'IsCustomerPortal',
		'IsDeleted',
		'IsPartner',
		'IsPersonAccount',
		'Jigsaw',
		'LastActivityDate',
		'LastReferencedDate',
		'MasterRecordId',
	],
	mandatories: [
		false,
		false,
		false,
		true,
		true,
		true,
		true,
		false,
		false,
		false,
		true,
		true,
		false,
		true,
		false,
		false,
		false,
		false,
		false,
		false,
		true,
		false,
		true,
		false,
		false,
		false,
		false,
		false,
		false,
	],
	types: [
		'string',
		'picklist',
		'currency',
		'address',
		'string',
		'string',
		'picklist',
		'picklist',
		'double',
		'double',
		'string',
		'string',
		'picklist',
		'textarea',
		'picklist',
		'reference',
		'reference',
		'textarea',
		'string',
		'email',
		'picklist',
		'boolean',
		'boolean',
		'boolean',
		'boolean',
		'string',
		'date',
		'date',
		'string',
	],
	descriptions: [
		'Account number assigned to this account (not the unique, system-generated ID assigned during creation). Maximum size is 40 characters.',
		'The source of the account record. For example, Advertisement, Data.com, or Trade Show. The source is selected from a picklist of available values, which are set by an administrator. Each picklist value can have up to 40 characters.',
		'Estimated annual revenue of the account.',
		'The compound form of the billing address. Read-only. See Address Compound Fields for details on compound address fields.',
		'Details for the billing address of this account. Maximum size is 40 characters.',
		'Details for the billing address of this account. Maximum size is 80 characters.',
		'The ISO country code for the account’s billing address.',
		'Accuracy level of the geocode for the billing address. See Compound Field Considerations and Limitations for details on geolocation compound fields.',
		'Used with BillingLongitude to specify the precise geolocation of a billing address. Acceptable values are numbers between –90 and 90 with up to 15 decimal places. See Compound Field Considerations and Limitations for details on geolocation compound fields.',
		'Used with BillingLatitude to specify the precise geolocation of a billing address. Acceptable values are numbers between –180 and 180 with up to 15 decimal places. See Compound Field Considerations and Limitations for details on geolocation compound fields.',
		'Details for the billing address of this account. Maximum size is 20 characters.',
		'Details for the billing address of this account. Maximum size is 80 characters.',
		'The ISO state code for the account’s billing address.',
		'Street address for the billing address of this account.',
		'Indicates the record’s clean status as compared with Data.com. Values are: Matched, Different, Acknowledged, NotFound, Inactive, Pending, SelectMatch, or Skipped.',
		'ID of the PartnerNetworkConnection that shared this record with your organization. This field is available if you enabled Salesforce to Salesforce',
		'ID of the PartnerNetworkConnection that you shared this record with. This field is available if you enabled Salesforce to Salesforce. This field is supported using API versions earlier than 15.0. In all other API versions, this field’s value is null. You can use the new PartnerNetworkRecordConnection object to forward records to connections.',
		'Text description of the account. Limited to 32,000 KB.',
		'The Data Universal Numbering System (D-U-N-S) number is a unique, nine-digit number assigned to every business location in the Dun & Bradstreet database that has a unique, separate, and distinct operation. D-U-N-S numbers are used by industries and organizations around the world as a global standard for business identification and tracking. Maximum size is 9 characters. This field is available on business accounts, not person accounts.',
		'Principal email address for the account.',
		'An industry associated with this account. Maximum size is 40 characters.',
		'',
		'',
		'',
		'',
		'References the ID of a company in Data.com. If an account has a value in this field, it means that the account was imported from Data.com. If the field value is null, the account was not imported from Data.com. Maximum size is 20 characters. Available in API version 22.0 and later. Label is Data.com Key. This field is available on business accounts, not person accounts.',
		'Value is one of the following, whichever is the most recent: Due date of the most recent event logged against the record.',
		'The timestamp for when the current user last viewed this record. If this value is null, this record might only have been referenced (LastReferencedDate) and not viewed.',
		'',
	],
};

// function getMapperClassNames(side) {
// 	return {
// 		root: classnames('mapper-table-container', side),
// 		titleBar: classnames('mapper-table-title-bar', side),
// 		title: classnames('mapper-table-title', side),
// 		filtersBar: classnames('mapper-table-filters-bar', side),
// 		table: classnames('mapper-table', side),
// 		header: classnames('mapper-table-header', side),
// 		body: classnames('mapper-table-body', side),
// 		row: classnames('mapper-table-row', side),
// 	};
// }

// COLUMNS DEFINITION

const Columns = {
	NAME: {
		key: 'name',
		label: 'Name',
	},
	TYPE: {
		key: 'type',
		label: 'Type',
	},
	DESC: {
		key: 'description',
		label: 'Description',
	},
	MANDATORY: {
		key: 'mandatory',
		label: '',
	},
};

function addSortExtraProps(column) {
	column.headExtraProps = {
		iconPosition: 'right',
		link: true,
	};
	return column;
}

const inputColumns = [
	addSortExtraProps(Columns.TYPE),
	addSortExtraProps(Columns.NAME),
];

const outputColumns = [
	Columns.MANDATORY,
	addSortExtraProps(Columns.NAME),
	addSortExtraProps(Columns.TYPE),
	addSortExtraProps(Columns.DESC),
];

// SORTERS DEFINITION

const SortDirection = {
	NONE: 'none',
	ASCENDING: 'ascending',
	DESCENDING: 'descending',
};

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

const inputSorterKeys = [Columns.NAME.key, Columns.TYPE.key];
const outputSorterKeys = [Columns.NAME.key, Columns.TYPE.key, Columns.DESC.key];

const sorterIcons = {
	none: null,
	ascending: 'talend-sort-asc',
	descending: 'talend-sort-desc',
};

function createSorter() {
	return {
		direction: SortDirection.NONE,
		icons: sorterIcons,
	}
}

function createSorters(keys) {
	const sorters = {};
	for (let i = 0; i < keys.length; i += 1) {
		sorters[keys[i]] = createSorter();
	}
	return sorters;
}

// FILTERS DEFINITION

const nameFilterId = 'name-filter';

function matchName(element, filterParams) {
	const value = filterParams.value;
	const name = element.name;
	return Boolean(name.match(value) || name.toLowerCase().match(value));
}

function createNameFilter() {
	return {
		id: nameFilterId,
		active: false,
		params: {
			value: null,
			docked: true,
		},
		match: matchName,
		renderer: Table.StringFilterComponent,
		rendererProps: {
			placeHolder: 'Filter...',
			dockable: true,
			navbar: true,
		},
	};
}

const mandatoryFieldFilterId = 'mandatory-field-filter';

function matchMandatory(element) {
	return element.mandatory;
}

function createMandatoryFieldFilter() {
	return {
		id: mandatoryFieldFilterId,
		active: false,
		match: matchMandatory,
		renderer: Table.ToggleFilterComponent,
		rendererProps: {
			label: 'Show Mandatory Fields (*) Only',
		},
	};
}

function createInputFilters() {
	return [createNameFilter()];
}

function createOutputFilters() {
	return [
		createNameFilter(),
		createMandatoryFieldFilter(),
	];
}

const autoMapping = [];

function buildElement(elem, index, types, descriptions, mandatories) {
	const type = types ? types[index] : 'string';
	const description = descriptions ? descriptions[index] : `Description of ${elem}: bla bla bla`;
	const mandatory = mandatories ? mandatories[index] : false;
	return {
		id: `${index}`,
		name: elem,
		type,
		description,
		mandatory,
	};
}

function finalizeSchema(schema) {
	const result = {
		id: schema.id,
		name: schema.name,
	};
	const elements = schema.elements.map(
		(elem, index) => buildElement(elem, index,
			schema.types, schema.descriptions, schema.mandatories)
	);
	result.elements = elements;
	return result;
}

function createDataAccessor() {
	return new DataAccessorWithUndoRedo(new MappingAccessor());
}

function prefs(showAll, gradientStops50, gradientStops100) {
	return { showAll, gradientStops50, gradientStops100 };
}

function getDefaultPreferences() {
	return prefs(false, null, null);
}

const defaultGradientStops50 = [
	{
		key: 51,
		offset: 0,
	},
	{
		key: 51,
		offset: 3,
	},
	{
		key: 52,
		offset: 6,
	},
	{
		key: 52,
		offset: 100,
	},
];

const defaultGradientStops100 = [
	{
		key: 101,
		offset: 0,
	},
	{
		key: 101,
		offset: 10,
	},
	{
		key: 102,
		offset: 20,
	},
	{
		key: 102,
		offset: 80,
	},
	{
		key: 101,
		offset: 90,
	},
	{
		key: 101,
		offset: 100,
	},
];

const alternativePrefs = prefs(true, defaultGradientStops50, defaultGradientStops100);

const input = {
	schema: finalizeSchema(inputSchemaUX),
	columns: inputColumns,
	rowsClassName: {},
	withTitle: true,
	withHeader: true,
	filters: createInputFilters(),
	sorters: createSorters(inputSorterKeys),
};

const output = {
	schema: finalizeSchema(outputSchemaUX),
	columns: outputColumns,
	rowsClassName: {},
	withTitle: true,
	withHeader: true,
	filters: createOutputFilters(),
	sorters: createSorters(outputSorterKeys),
};

const MainActions = {
	UNDO: 'undo',
	REDO: 'redo',
	SHOW_ALL: 'show-all',
	CLEAR: 'clear',
	CLEAR_ALL: 'clear-all',
};

function getShowHideAction(state, getAction) {
	const action = {
		id: MainActions.SHOW_ALL,
		tooltipPlacement: 'bottom',
		onClick: getAction(MainActions.SHOW_ALL),
		disabled: false,
	}
	if (state.preferences.showAll) {
		action.icon = 'talend-eye-slash';
		action.tooltipLabel = 'Hide all connections';
	} else {
		action.icon = 'talend-eye';
		action.tooltipLabel = 'Show all connections';
	}
	return action;
}

function getClearAction(state, getAction) {
	const action = {
		id: MainActions.CLEAR,
		icon: 'talend-cross',
		tooltipLabel: 'Remove selected connection(s)',
		tooltipPlacement: 'bottom',
		onClick: getAction(MainActions.CLEAR),
	}
	action.disabled = !state.selection ||
		!state.dataAccessor.isElementMapped(state.mapping, state.selection.element, state.selection.side);
	return action;
}

function getClearAllAction(state, getAction) {
	const action = {
		id: MainActions.CLEAR_ALL,
		icon: 'talend-trash',
		tooltipLabel: 'Clear all mapping',
		tooltipPlacement: 'bottom',
		onClick: getAction(MainActions.CLEAR_ALL),
	}
	action.disabled = state.dataAccessor.isMappingEmpty(state.mapping);
	return action;
}

function getMainActions(state, getAction) {
	const dataAccessor = state.dataAccessor;
	return {
		left: [
			{
				displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
				actions: [
					{
						id: MainActions.UNDO,
						icon: 'talend-undo',
						tooltipLabel: dataAccessor.getUndoLabel(),
						tooltipPlacement: 'bottom',
						onClick: getAction(MainActions.UNDO),
						disabled: !dataAccessor.canUndo(),
					},
					{
						id: MainActions.REDO,
						icon: 'talend-redo',
						tooltipLabel: dataAccessor.getRedoLabel(),
						tooltipPlacement: 'bottom',
						onClick: getAction(MainActions.REDO),
						disabled: !dataAccessor.canRedo(),
					},
				],
			},
			{
				displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
				actions: [
					getShowHideAction(state, getAction),
					getClearAction(state, getAction),
					getClearAllAction(state, getAction),
				],
			},
		],
	};
}

/**
 * isSelectionEmpty returns true if the given selection is empty
 */
function isSelectionEmpty(selection) {
	return selection == null || selection.element == null || selection.side == null;
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

function getSelection(dataAccessor, ctrl, mapping, selection, element, side) {
	if (isSelected(dataAccessor, selection, element, side) && ctrl) {
		return null;
	}
	return select(dataAccessor, mapping, element, side);
}

function getFocused(element, side) {
	return { element, side };
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

function removeConnections(dataAccessor, mapping, selection) {
	if (isSelectionEmpty(selection)) {
		return mapping;
	}
	const items = dataAccessor.getMappingItemsWithElement(mapping, selection.element, selection.side);
	if (items != null) {
		// remove items
		let updatedMapping = mapping;
		for (let i = 0; i < items.length; i += 1) {
			const item = items[i];
			const source = dataAccessor.getMappedElement(item, Constants.MappingSide.INPUT);
			const target = dataAccessor.getMappedElement(item, Constants.MappingSide.OUTPUT);
			updatedMapping = dataAccessor.removeMapping(updatedMapping, source, target);
		}
		return updatedMapping;
	}
	return mapping;
}

function getCurrentSelectedSchema(state) {
	if (isSelectionEmpty(state.selection)) {
		return null;
	}
	if (state.selection.side === Constants.MappingSide.INPUT) {
		return state.input.schema;
	} else if (state.selection.side === Constants.MappingSide.OUTPUT) {
		return state.output.schema;
	}
	return null;
}

function getNextElement(dataAccessor, schema, element, nav) {
	const selectedElemIndex = dataAccessor.getSchemaElementIndex(schema, element, true);
	const size = dataAccessor.getSchemaSize(schema, true);
	let newSelectedElemIndex = selectedElemIndex;
	switch (nav) {
		case Keys.UP:
			newSelectedElemIndex = selectedElemIndex - 1;
			if (newSelectedElemIndex < 0) {
				newSelectedElemIndex = size - 1;
			}
			break;
		case Keys.DOWN:
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
			case Keys.PAGE_UP:
				targetIndex = Math.max(0, index - pageSize);
				break;
			case Keys.PAGE_DOWN:
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

	if (state.pendingItem != null
		&& state.pendingItem.side !== selection.side
		&& selection.side === Constants.MappingSide.OUTPUT) {
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

/**
 * This method tries to find an element in the schema with the same name as
 * given element.
 */
function findTargetElement(dataAccessor, schema, selection, mappingInProgress) {
	const elements = dataAccessor.getSchemaElements(schema, true);
	return elements.find(elem =>
		(!mappingInProgress && dataAccessor.haveSameData(elem, selection.element, Columns.NAME.key))
		|| (mappingInProgress
		&& dataAccessor.haveSameData(elem, selection.element, Columns.NAME.key)
		&& (selection.connected == null || !dataAccessor.includes(selection.connected, elem)))
	);
}

function findTargetElementByPosition(selection, mapper) {
	const mapperInstance = mapper.getDecoratedComponentInstance();
	const sourcePosition = mapperInstance.getYPosition(selection.element, selection.side);
	const targetSide = Constants.switchMappingSide(selection.side);
	return mapperInstance.getElementAtPosition(sourcePosition, targetSide);
}

function findNonConnectedTargetElement(dataAccessor, schema, mapping, side) {
	for (let i = 0; i < dataAccessor.getSchemaSize(schema, true); i += 1) {
		const elem = dataAccessor.getSchemaElement(schema, i, true);
		if (!dataAccessor.isElementMapped(mapping, elem, side)) {
			return elem;
		}
	}
	return null;
}

function switchSchema(state, mappingInProgress, mapper, usePosition) {
	const dataAccessor = state.dataAccessor;
	const selection = state.selection;
	const targetSide = Constants.switchMappingSide(selection.side);
	let targetElem = null;
	if (!mappingInProgress
		&& selection.connected != null
		&& selection.connected.length > 0
		&& !usePosition) {
		targetElem = selection.connected[0];
	}
	const targetSchema = getSchema(state, targetSide);
	if (targetElem == null) {
		if (usePosition) {
			targetElem = findTargetElementByPosition(selection, mapper);
		} else {
			// try to find an element with the same name
			targetElem = findTargetElement(dataAccessor, targetSchema, selection, mappingInProgress);
		}
	}
	if (targetElem == null) {
		// get the first element in target schema
		if (mappingInProgress) {
			// for connexion context we try to get a non connected element
			targetElem = findNonConnectedTargetElement(dataAccessor, targetSchema, state.mapping, targetSide);
		} else {
			// by default select the first element
			targetElem = dataAccessor.getSchemaElement(targetSchema, 0, true);
		}
	}
	return {
		element: targetElem,
		connected: dataAccessor.getConnectedElements(state.mapping, targetElem, targetSide),
		side: targetSide,
	};
}

function firstSelect(state, code) {
	const dataAccessor = state.dataAccessor;
	let side = Constants.MappingSide.INPUT;
	if (code === Keys.RIGHT) {
		side = Constants.MappingSide.OUTPUT;
	}
	const schema = getSchema(state, side);
	const element = dataAccessor.getSchemaElement(schema, 0, true);
	return {
		element,
		connected: dataAccessor.getConnectedElements(state.mapping, element, side),
		side,
	};
}

function navigate(state, nav, mapper, usePosition) {
	switch (nav) {
		case Keys.UP:
			return navigateUpDown(state, nav);
		case Keys.DOWN:
			return navigateUpDown(state, nav);
		case Keys.PAGE_UP:
			return navigatePage(state, nav, mapper);
		case Keys.PAGE_DOWN:
			return navigatePage(state, nav, mapper);
		case Keys.LEFT:
			return switchSchema(state, false, mapper, usePosition);
		case Keys.RIGHT:
			return switchSchema(state, false, mapper, usePosition);
		case Keys.ENTER:
			return switchSchema(state, true, mapper, usePosition);
		default:
			break;
	}
	return state.selection;
}

function filterSelection(state, selection) {
	if (selection) {
		const schema = getSchema(state, selection.side);
		if (state.dataAccessor.isFiltered(schema, selection.element)) {
			// clear selection
			return null;
		}
		return selection;
	}
	return null;
}

function filterFocused(state, focused) {
	if (focused) {
		const schema = getSchema(state, focused.side);
		if (state.dataAccessor.isFiltered(schema, focused.element)) {
			// clear focused
			return null;
		}
		return focused;
	}
	return null;
}

function focusElement(elementId) {
	let activeElemId = null;
	if (document.activeElement) {
		activeElemId = document.activeElement.id;
	}
	if (!activeElemId || elementId !== activeElemId) {
		if (document.activeElement) {
			document.activeElement.blur();
		}
	}
	const element = document.getElementById(elementId);
	if (element && element.focus) {
		element.focus();
	}
}

function indexOfFilter(filters, id) {
	for (let i = 0; i < filters.length; i += 1) {
		if (filters[i].id === id) {
			return i;
		}
	}
	return -1;
}

function updateFilters(filters, id, active, params) {
	const index = indexOfFilter(filters, id);
	if (index === -1) {
		return filters;
	}
	const updatedFilters = filters.slice();
	updatedFilters[index].active = active;
	updatedFilters[index].params = params;
	return updatedFilters;
}

function computeFilter(elements, filter, active, params) {
	if (active) {
		return elements.filter(elem => filter.match(elem, params));
	}
	return elements;
}

function updateFilteredElements(elements, filters, id, active, params) {
	let result = elements.slice();
	for (let i = 0; i < filters.length; i += 1) {
		const filter = filters[i];
		if (filter.id === id) {
			result = computeFilter(result, filter, active, params);
		} else {
			result = computeFilter(result, filter, filter.active, filter.params);
		}
	}
	return result;
}

function getCompare(key, direction) {

	const coefs = {
		none: 0,
		ascending: 1,
		descending: -1,
	};

	function compare(element1, element2) {
		const val1 = element1[key];
		const val2 = element2[key];
		const coef = coefs[direction];
		if (val1 < val2) {
			return -1 * coef;
		} else if (val1 > val2) {
			return coef;
		}
		return 0;
	}

	return compare;
}

function sort(elements, key, direction) {
	if (direction === SortDirection.ASCENDING || direction === SortDirection.DESCENDING) {
		const compare = getCompare(key, direction);
		const sortedElements = elements.slice();
		return sortedElements.sort(compare);
	}
	return elements;
}

function isActiveSorter(sorter) {
	return sorter.direction === SortDirection.ASCENDING || sorter.direction === SortDirection.DESCENDING;
}

function updateSortedElements(elements, sorters, columns) {
	const sortedColumn = columns.find(col => sorters && sorters[col.key] && isActiveSorter(sorters[col.key]));
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
	for (let i = 0; i < columns.length; i += 1) {
		const key = columns[i].key;
		if (sorters[key]) {
			updatedSorters[key] = {};
			updatedSorters[key].direction = SortDirection.NONE;
			updatedSorters[key].icons = sorters[key].icons;
		}
	}
	// update the modified sorter to the next direction
	updatedSorters[columnKey].direction = nextDirection(prevDirection);
	return updatedSorters;
}

class ConnectedDataMapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataAccessor: createDataAccessor(),
			input: this.props.input,
			output: this.props.output,
			mapping: [],
			dnd: null,
			pendingItem: null,
			selection: null,
			focused: null,
			preferences: props.preferences,
		};
		this.performMapping = this.performMapping.bind(this);
		this.clearMapping = this.clearMapping.bind(this);
		this.clearConnection = this.clearConnection.bind(this);
		this.selectElement = this.selectElement.bind(this);
		this.handleNavigation = this.handleNavigation.bind(this);
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
		this.getMainAction = this.getMainAction.bind(this);
		// initialize
		this.initialize(this.state.dataAccessor, this.props.input, this.props.output);
	}

	initialize(dataAccessor, input, output) {
		dataAccessor.registerSchema(input.schema, Constants.MappingSide.INPUT);
		dataAccessor.registerSchema(output.schema, Constants.MappingSide.OUTPUT);
	}

	handleKeyEvent(ev) {
		let reveal = false;
		let focus = false;
		if (this.handleFirstSelect(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				trigger: null,
				selection: firstSelect(prevState, ev.keyCode),
				status: Constants.StateStatus.SELECTION,
			}));
			reveal = true;
			focus = true;
		} else if (this.handleNavigation(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				trigger: null,
				selection: navigate(prevState, ev.keyCode, this.mapper, !ev.altKey),
				status: Constants.StateStatus.SELECTION,
			}));
			reveal = true;
			focus = true;
		} else if (this.handleStartConnection(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				trigger: null,
				selection: navigate(prevState, ev.keyCode, this.mapper, false),
				pendingItem: {
					element: prevState.selection.element,
					side: prevState.selection.side,
				},
				status: Constants.StateStatus.SELECTION | Constants.StateStatus.PENDING,
			}));
			reveal = true;
		} else if (this.handleEndConnection(ev)) {
			ev.preventDefault();
			if (this.state.pendingItem.side === Constants.MappingSide.INPUT) {
				this.performMapping(this.state.pendingItem.element,
					this.state.selection.element,
					this.state.pendingItem.side);
			} else {
				this.performMapping(this.state.selection.element,
					this.state.pendingItem.element,
					this.state.pendingItem.side);
			}
			reveal = true;
		} else if (this.handleEscape(ev)) {
			ev.preventDefault();
			const fromElement = this.state.pendingItem.element;
			const fromSide = this.state.pendingItem.side;
			this.setState(prevState => ({
				trigger: null,
				pendingItem: null,
				selection: select(prevState.dataAccessor, prevState.mapping, fromElement, fromSide),
				status: Constants.StateStatus.SELECTION | Constants.StateStatus.PENDING,
			}));
		} else if (this.handleDelete(ev)) {
			this.clearConnection();
		} else if (this.isPreventDefaultNeeded(ev)) {
			ev.preventDefault();
		} else if (this.handleUndo(ev)) {
			this.onUndo();
		} else if (this.handleRedo(ev)) {
			this.onRedo();
		}
		if (reveal) {
			// reveal
			const mapperInstance = this.mapper.getDecoratedComponentInstance();
			mapperInstance.revealSelection(this.state.selection);
		}
		if (focus) {
			focusElement(this.props.mapperId);
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyEvent);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyEvent);
	}

	handleUndo(ev) {
		return ev.keyCode === Keys.UNDO && ev.ctrlKey;
	}

	handleRedo(ev) {
		return ev.keyCode === Keys.REDO && ev.ctrlKey;
	}

	handleStartConnection(ev) {
		if (ev.keyCode === Keys.ENTER
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.pendingItem == null) {
			if (this.state.selection.side === Constants.MappingSide.INPUT) {
				// input case
				// at least one output element must be free (i.e. not connected)
				return !this.state.dataAccessor.isFullMapped(
					this.state.mapping,
					this.state.outputSchema,
					Constants.MappingSide.OUTPUT
				);
			}
			// output case
			// the current selected element cannot be already connected
			return !this.state.dataAccessor.isElementMapped(
				this.state.mapping,
				this.state.selection.element,
				this.state.selection.side
			);
		}
		return false;
	}

	handleEndConnection(ev) {
		return ev.keyCode === Keys.ENTER
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.pendingItem != null
			&& this.state.selection.side !== this.state.pendingItem.side;
	}

	handleNavigation(ev) {
		const key = ev.keyCode;
		const isValidKey = key === Keys.UP
			|| key === Keys.DOWN
			|| key === Keys.PAGE_UP
			|| key === Keys.PAGE_DOWN;
		const isValidSwitch = (key === Keys.LEFT || key === Keys.RIGHT)
			&& this.state.pendingItem == null;
		return !isSelectionEmpty(this.state.selection)
			&& (isValidKey || isValidSwitch);
	}

	handleFirstSelect(ev) {
		const isValidKey = ev.keyCode === Keys.LEFT
			|| ev.keyCode === Keys.RIGHT;
		return isValidKey && isSelectionEmpty(this.state.selection);
	}

	handleEscape(ev) {
		const isValidKey = ev.keyCode === Keys.ESCAPE;
		return isValidKey && this.state.pendingItem != null;
	}

	handleDelete(ev) {
		const isValidKey = ev.keyCode === Keys.DELETE;
		return isValidKey
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.selection.connected != null;
	}

	isPreventDefaultNeeded(ev) {
		return ((ev.keyCode === Keys.LEFT || ev.keyCode === Keys.RIGHT)
			&& this.state.pendingItem != null)
			|| ev.keyCode === Keys.ENTER;
	}

	performMapping(sourceElement, targetElement, selectionSide) {
		let selectedSourceElement = sourceElement;
		let selectedTargetElement = targetElement;
		if (selectionSide === Constants.MappingSide.OUTPUT) {
			selectedSourceElement = targetElement;
			selectedTargetElement = sourceElement;
		}
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.ADD_MAPPING,
				source: sourceElement,
				target: targetElement,
			},
			mapping: prevState.dataAccessor.addMapping(prevState.mapping, sourceElement, targetElement),
			selection: {
				element: selectedSourceElement,
				connected: appendConnected(prevState.dataAccessor,
					prevState.mapping,
					selectedSourceElement,
					selectedTargetElement,
					selectionSide),
				side: selectionSide,
			},
			pendingItem: null,
			dnd: null,
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
			status: Constants.MAPPING_STATE_STATUS,
		}));
	}

	clearConnection() {
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.REMOVE_MAPPING,
				element: prevState.selection.element,
			},
			mapping: removeConnections(prevState.dataAccessor, prevState.mapping, prevState.selection),
			selection: clearConnected(prevState.selection),
			pendingItem: null,
			dnd: null,
			status: Constants.MAPPING_STATE_STATUS,
		}));
	}

	selectElement(ctrl, element, side) {
		if (this.state.pendingItem == null) {
			this.setState(prevState => ({
				trigger: null,
				selection: getSelection(prevState.dataAccessor, ctrl, prevState.mapping,
					prevState.selection, element, side),
				status: Constants.StateStatus.SELECTION,
			}));
		} else if (this.state.pendingItem.side === side) {
			// stop the link process
			this.setState(prevState => ({
				trigger: null,
				selection: getSelection(prevState.dataAccessor, ctrl, prevState.mapping,
					prevState.selection, element, side),
				pendingItem: null,
				status: Constants.StateStatus.SELECTION | Constants.StateStatus.PENDING,
			}));
		} else if (this.state.pendingItem.side === Constants.MappingSide.INPUT) {
			this.performMapping(this.state.pendingItem.element,
				element,
				side);
		} else {
			this.performMapping(element,
				this.state.pendingItem.element,
				side);
		}
	}

	clearSelection() {
		this.setState({
			trigger: null,
			selection: null,
			status: Constants.StateStatus.SELECTION,
		});
	}

	onEnterElement(element, side) {
		if (this.state.focused &&
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
			focused: getFocused(element, side),
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
		this.setState(prevState => ({
			trigger: null,
			preferences: {
				showAll: !prevState.preferences.showAll,
				gradientStops50: prevState.preferences.gradientStops50,
				gradientStops100: prevState.preferences.gradientStops100,
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
			if (this.state.dnd.target != null
				&& this.state.dataAccessor.areElementsEqual(this.state.dnd.target.element, targetItem.element)
				&& this.state.dnd.target.side === targetItem.side) {
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
		return targetItem.side !== sourceItem.side
			&& ((targetItem.side === Constants.MappingSide.INPUT
					&& !this.state.dataAccessor.isElementMapped(
						this.state.mapping, sourceItem.element, sourceItem.side
					))
				|| (targetItem.side === Constants.MappingSide.OUTPUT
					&& !this.state.dataAccessor.isElementMapped(
						this.state.mapping, targetItem.element, targetItem.side
					))
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

	onFilterChange(id, active, params, side) {
		const schema = getSchema(this.state, side);
		const elements = this.state[side].schema.elements;
		const filters = this.state[side].filters;
		const sorters = this.state[side].sorters;
		const columns = this.state[side].columns;
		const filteredElements = updateFilteredElements(elements, filters, id, active, params);
		const sortedElements = updateSortedElements(filteredElements, sorters, columns);
		const updatedFilters = updateFilters(filters, id, active, params);
		this.state.dataAccessor.setFilteredElements(schema, filteredElements);
		this.state.dataAccessor.setSortedElements(schema, sortedElements);
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.FILTERING,
				filterId: id,
				side,
			},
			pendingItem: null,
			dnd: null,
			selection: filterSelection(prevState, prevState.selection),
			focused: filterFocused(prevState, prevState.focused),
			input: {
				...prevState.input,
				filters: side === Constants.MappingSide.INPUT ? updatedFilters : prevState.input.filters,
			},
			output: {
				...prevState.output,
				filters: side === Constants.MappingSide.OUTPUT ? updatedFilters : prevState.output.filters,
			},
			status: Constants.FILTERING_STATE_STATUS,
		}));
	}

	onSortChange(columnKey, side) {
		const schema = getSchema(this.state, side);
		const sorters = this.state[side].sorters;
		const columns = this.state[side].columns;
		const updatedSorters = updateSorters(sorters, columns, columnKey);
		const updatedSortedElements = updateSortedElements(this.state.dataAccessor.getFilteredElements(schema), updatedSorters, columns);
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
		const source = this.state.dataAccessor.getElementFromCache(Constants.MappingSide.INPUT, sourceId);
		const target = this.state.dataAccessor.getElementFromCache(Constants.MappingSide.OUTPUT, targetId);
		const mapperInstance = this.mapper.getDecoratedComponentInstance();
		mapperInstance.revealConnection(source, target);
	}

	onUndo() {
		const cmd = this.state.dataAccessor.getACopyOfUndoCommand();
		const mapping = this.state.dataAccessor.undo(this.state.mapping);
		this.setState({
			trigger: {
				code: Constants.Events.UNDO,
			},
			pendingItem: null,
			dnd: null,
			mapping,
			status: Constants.UNDO_REDO_STATE_STATUS,
		}, () => {
			if (cmd.code === Constants.Commands.REMOVE_MAPPING) {
				// reveal connection
				this.revealConnection(cmd.sourceId, cmd.targetId);
			}
		});
	}

	onRedo() {
		const cmd = this.state.dataAccessor.getACopyOfRedoCommand();
		const mapping = this.state.dataAccessor.redo(this.state.mapping);
		this.setState({
			trigger: {
				code: Constants.Events.REDO,
			},
			pendingItem: null,
			dnd: null,
			mapping,
			status: Constants.UNDO_REDO_STATE_STATUS,
		}, () => {
			if (cmd.code === Constants.Commands.ADD_MAPPING) {
				// reveal connection
				this.revealConnection(cmd.sourceId, cmd.targetId);
			}
		});
	}

	getMainAction(actionId) {
		switch (actionId) {
			case MainActions.UNDO:
				return this.onUndo;
			case MainActions.REDO:
				return this.onRedo;
			case MainActions.SHOW_ALL:
				return this.onShowAll;
			case MainActions.CLEAR:
				return this.clearConnection;
			case MainActions.CLEAR_ALL:
				return this.clearMapping;
			default:
				return null;
		}
	}

	updateMapperRef(ref) {
		this.mapper = ref;
	}

	render() {
		const {
			mapperId,
			mappingActions,
			preferences,
		} = this.props;
		return (
			<div>
				<ActionBar
					className="main-tools"
					actions={getMainActions(this.state, this.getMainAction)}
				/>
				<Mapper
					ref={this.updateMapperRef}
					dataAccessor={this.state.dataAccessor}
					mapperId={mapperId}
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

ConnectedDataMapper.propTypes = {
	mapperId: PropTypes.string,
	mappingActions: PropTypes.object,
	input: PropTypes.object,
	output: PropTypes.object,
	preferences: PropTypes.object,
};

const stories = storiesOf('DataMapper', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => (
		<div id="mapper-container">
			<IconsProvider />
			{story()}
		</div>
	)).addWithInfo('UX proto', () => {
	return <ConnectedDataMapper
		mapperId="mapper"
		mappingActions={autoMapping}
		input={input}
		output={output}
		preferences={alternativePrefs}
	/>;
});
