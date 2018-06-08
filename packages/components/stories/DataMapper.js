import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import {
	DataAccessorWithUndoRedo,
	DataAccessorWithSorterAndFilter,
	DraggableComponent as draggable,
	FilterFactory,
	MappingAccessor,
	Sorter,
	SortOrder,
} from '../src/index';
import { DataMapper as Mapper } from '../src/index';
import * as Constants from '../src/DataMapper/Constants';
import { isSelected } from '../src/DataMapper/Schema/Schema';
import { ActionBar, IconsProvider } from '../src/index';

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

/**
 * This interface provides all the needed methods to access/update the
 * schema data.
 */
const schemaDataAccessor = {
	/**
	 * Returns the unique identifier as string of the schema.
	 */
	getSchemaId(schema) {
		return schema.id;
	},
	/**
	 * Returns the name of the schema.
	 */
	getSchemaName(schema) {
		return schema.name;
	},
	/**
	 * Returns the number of elements in the schema.
	 */
	getSchemaSize(schema) {
		return schema.elements.length;
	},
	/**
	 * Returns all the elements of the schema in an array.
	 */
	getSchemaElements(schema) {
		return schema.elements;
	},
	/**
	 * Returns the nth element of the schema.
	 */
	getSchemaElement(schema, index) {
		return schema.elements[index];
	},
	/**
	 * Returns the index of the given element,
	 * returns -1 if it is not in the schema.
	 */
	getSchemaElementIndex(schema, element) {
		return schema.elements.findIndex(elem => this.areElementsEqual(elem, element));
	},
	/**
	 * Returns the identifier of the element.
	 * Identifier must be a unique string.
	 */
	getElementId(element) {
		return element.id;
	},
	/**
	* Returns a label for the given element.
	*/
	getElementLabel(element) {
		return element.name;
	},
	/**
	* Returns the data corresponding to the given element and key.
	*/
  getRowData(element, key) {
		if (key === Columns.MANDATORY.key) {
			return element.mandatory ? '*' : '';
		}
    return element[key];
  },
	/**
	* Indicates if the two given elements are equal.
	*/
	areElementsEqual(element1, element2) {
		return element1.id === element2.id;
	},
};

const mapperClassNames = {
	root: 'mapper-table-container',
	titleBar: 'mapper-table-title-bar',
	title: 'mapper-table-title',
	filtersBar: 'mapper-table-filters-bar',
	table: 'mapper-table',
	header: 'mapper-table-header',
	body: 'mapper-table-body',
	row: 'mapper-table-row',
};

const sorterIcons = {
	none: null,
	ascending: 'talend-sort-asc',
	descending: 'talend-sort-desc',
};

function newColumn(col) {
	return {
		key: col.key,
		label: col.label,
	};
}

function addSorter(column) {
	const key = column.key;
	column.sorter = new Sorter(key, key, key, sorterIcons);
	column.headExtraProps = {
		iconPosition: 'right',
		link: true,
	};
	return column;
}

const inputColumns = [
	addSorter(newColumn(Columns.TYPE)),
	addSorter(newColumn(Columns.NAME)),
];

const outputColumns = [
	newColumn(Columns.MANDATORY),
	addSorter(newColumn(Columns.NAME)),
	addSorter(newColumn(Columns.TYPE)),
	addSorter(newColumn(Columns.DESC)),
];

const nameFilterId = 'name-filter';
const nameFilterExtra = {
	placeHolder: 'Filter...',
	dockable: true,
	navbar: true,
};

function createNameFilter() {
	return FilterFactory.createRegexpFilter(
		nameFilterId,
		Columns.NAME.key,
		false,
		nameFilterId,
		nameFilterExtra,
	);
}

const mandatoryFieldFilterId = 'mandatory-field-filter';
const mandatoryFieldFilterExtra = {
	label: 'Show Mandatory Fields (*) Only',
};

function createMandatoryFieldFilter() {
	return FilterFactory.createBooleanFilter(
		mandatoryFieldFilterId,
		Columns.MANDATORY.key,
		false,
		mandatoryFieldFilterId,
		mandatoryFieldFilterExtra,
	);
}

function createInputFilters() {
	return [createNameFilter()];
}

function createOutputFilters() {
	return [createNameFilter(), createMandatoryFieldFilter()];
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
	return new DataAccessorWithUndoRedo(schemaDataAccessor, new MappingAccessor(schemaDataAccessor));
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
	classNames: mapperClassNames,
	withTitle: true,
	withHeader: true,
	filters: createInputFilters(),
};

const output = {
	schema: finalizeSchema(outputSchemaUX),
	columns: outputColumns,
	classNames: mapperClassNames,
	withTitle: true,
	withHeader: true,
	filters: createOutputFilters(),
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
		return state.inputSchema;
	} else if (side === Constants.MappingSide.OUTPUT) {
		return state.outputSchema;
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
    return state.inputSchema;
  } else if (state.selection.side === Constants.MappingSide.OUTPUT) {
    return state.outputSchema;
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

class ConnectedDataMapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataAccessor: createDataAccessor(),
			inputSchema: this.props.input.schema,
			outputSchema: this.props.output.schema,
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

	registerFilters(dataAccessor, schema, filters) {
		for (let i = 0; i < filters.length; i += 1) {
			dataAccessor.addFilter(schema, filters[i].filter);
		}
	}

	initialize(dataAccessor, input, output) {
		dataAccessor.registerSchema(input.schema, Constants.MappingSide.INPUT);
		this.registerFilters(dataAccessor, input.schema, input.filters);
		dataAccessor.registerSchema(output.schema, Constants.MappingSide.OUTPUT);
		this.registerFilters(dataAccessor, output.schema, output.filters);
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
			preferences : {
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

	onFilterChange(filter, side) {
		this.state.dataAccessor.filterSchema(getSchema(this.state, side), filter.getId());
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.FILTERING,
				filterId: filter.getId(),
				side,
			},
			pendingItem: null,
			dnd: null,
			selection: filterSelection(prevState, prevState.selection),
			focused: filterFocused(prevState, prevState.focused),
			status: Constants.FILTERING_STATE_STATUS,
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

	onSortChange(sorter, side) {
		const schema = getSchema(this.state, side);
		if (this.state.dataAccessor.isActiveSorter(schema, sorter)) {
			switch (sorter.getOrder()) {
				case SortOrder.ASCENDING:
					sorter.setOrder(SortOrder.DESCENDING);
					this.state.dataAccessor.sort(schema);
					break;
				case SortOrder.DESCENDING:
					sorter.setOrder(SortOrder.ASCENDING);
					this.state.dataAccessor.clearSorter(schema);
					break;
				default:
					break;
			}
		} else {
			this.state.dataAccessor.setSorter(schema, sorter);
		}
		if (this.state.dataAccessor.hasSorter(schema)) {
			this.setState({
				trigger: {
					code: Constants.Events.SORT,
					sorterId: sorter.getId(),
					order: sorter.getOrder(),
					side,
				},
				status: Constants.StateStatus.SORT,
			});
		} else {
			this.setState({
				trigger: {
					code: Constants.Events.CLEAR_SORT,
					side,
				},
				status: Constants.StateStatus.SORT,
			});
		}
	}

	isSorterActive(sorter, side) {
		const schema = getSchema(this.state, side);
		return this.state.dataAccessor.isActiveSorter(schema, sorter);
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
			input,
			output,
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
					input={input}
					output={output}
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
