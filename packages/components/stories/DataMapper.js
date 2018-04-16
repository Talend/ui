import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';
import { DataMapper as Mapper } from '../src/index';
import { isSelected } from '../src/DataMapper/Schema/Schema';
import * as Constants from '../src/DataMapper/Constants';
import DefaultDataAccessor from '../src/DataMapper/DefaultDataAccessor';
import DataAccessorWithUndoRedo from '../src/DataMapper/DataAccessorWithUndoRedo';
import SchemaConfiguration from '../src/DataMapper/Schema/SchemaConfiguration';
import ListConfiguration from '../src/DataMapper/Schema/ListConfiguration';
import FilterComponents from '../src/DataMapper/Schema/Filters/FilterComponents';
import NameFilter, { ID as NameFilterId } from '../src/DataMapper/Schema/Filters/NameFilter';
import MandatoryFieldFilter, { ID as MandatoryFieldFilterId } from '../src/DataMapper/Schema/Filters/MandatoryFieldFilter';
import NameSorter, { ID as NameSorterId } from '../src/DataMapper/Schema/Sorters/NameSorter';
import MandatoryFieldSorter, { ID as MandatoryFieldSorterId } from '../src/DataMapper/Schema/Sorters/MandatoryFieldSorter';
import { Order } from '../src/DataMapper/Schema/Sorters/Sorter';
import MappingConfiguration from '../src/DataMapper/Mapper/MappingConfiguration.js';
import MappingCanvas from '../src/DataMapper/Mapper/MappingCanvas.js';
import MappingSVG from '../src/DataMapper/Mapper/MappingSVG.js';
import MappingActions from '../src/DataMapper/Mapper/MappingActions.js';
import AutoMapping from '../src/DataMapper/Mapper/AutoMapping.js';
import { Actions, ActionBar, IconsProvider } from '../src/index';

const inputSchema1 = {
	id: 'schema_1',
	name: 'user_info',
	elements: [
		'firstname',
		'lastname',
		'street',
		'zip',
		'city',
		'state',
		'birthday',
		'company',
	],
};

const inputSchema2 = {
	id: 'schema_2',
	name: 'user_info_full',
	elements: [
		'firstname',
		'lastname',
		'street',
		'zip',
		'city',
		'state',
		'birthday',
		'company',
		'favorite_color',
		'favorite_number',
		'favorite_movie',
		'favorite_song',
		'favorite_video_game',
		'favorite_dessert',
		'favorite_country',
		'favorite_football_player',
		'favorite_writer',
	],
};

const outputSchema1 = {
	id: 'schema_3',
	name: 'customer_data',
	elements: [
		'name',
		'city',
		'state',
		'company',
		'birthday',
		'age',
		'identifier',
		'code',
	],
};

const outputSchema2 = {
	id: 'schema_4',
	name: 'customer_data_full',
	elements: [
		'name',
		'city',
		'state',
		'company',
		'birthday',
		'age',
		'identifier',
		'code',
		'favorite_color',
		'favorite_number',
		'favorite_movie',
		'favorite_song',
		'favorite_video_game',
		'favorite_dessert',
		'favorite_country',
		'favorite_football_player',
		'favorite_writer',
	],
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

const descriptions = [
	'Ab esse ad posse valet, a posse ad esse non valet consequentia',
	'A bove ante, ab asino retro, a stulto undique caveto',
	'Actus dicatur bonus qui est conformis legi et rationi',
	'Adversus periculum naturalis ratio permittit se defendere',
	'An nescis, mi fili, quantilla prudentia mundus regatur',
	'Cælum non animum mutant qui trans mare currunt',
	'Consuetudo est jus quodam moribus institutum, quod pro lege usurpatur ubi deficit lex',
	'De primis socialismi germanici lineamentis apud Lutherum, Kant, Fichte, Hegel et Marx',
	'Domus accipere debemus, non proprietatem domus, sed domicilium',
	'Duplex legum incertudino ; altera ubi lex nulla præscribitur, altera ubi ambigua et obscura',
	'Entitas ipsa involvit aptitudinem ad extorquendum certum assensum',
	'Ex nudo pacto oritur actio nudum a solemnitate sed non nudum a causa',
	'Exemplum est argumentatio in qua ex uno singulari infertur, quod fieri potest a pari, vel a contrario, vel a fortiori',
	'Felix qui potuit rerum cognoscere causas',
	'Homo sum, humani nil a me alienum puto',
	'Ignorantia juris neminem excusat (Ignorantia juris neminem excusat)',
	'Juris præcepta sunt hæc : honeste vivere, alterum non lædere, suum cuique tribuere',
	'Lex naturalis non scribitur, sed profluit quodam naturali fonte in singulis exprimititur',
	'Libido sciendi',
	'Lux in tenebris',
	'Nec ut emat melius, nec ut vendat, quidquam simulabit aut dissimulabit vir bonus',
];

const names = [
	'name',
	'firstname',
	'lastname',
	'date',
	'address',
	'city',
	'state',
	'zip',
	'country',
	'area',
	'company',
	'industry',
	'site',
	'info',
	'reference',
	'birthday',
	'code',
	'employer',
	'incomes',
	'tax',
	'skills',
	'language',
	'place',
	'zone',
	'news',
	'data',
];

const types = [
	'string',
	'text',
	'boolean',
	'double',
	'float',
	'date',
	'Email',
	'URL',
	'address',
	'City',
	'FR Postal Code',
	'state',
	'picklist',
	'currency',
	'textarea',
	'reference',
	'First Name',
	'Address Line.',
	'US County',
	'US State Code',
	'FR Postal Code',
	'US Phone',
	'Code',
	'number',
	'bytes',
	'image',
	'price',
	'Account number',
	'identifier',
	'UID',
	'description',
	'comments',
];

const emptyMapping = [];

const initialMapping = [
	{
		source: 'lastname',
		target: 'name',
	},
	{
		source: 'lastname',
		target: 'identifier',
	},
	{
		source: 'city',
		target: 'city',
	},
	{
		source: 'zip',
		target: 'code',
	},
];

const noMandatoryFields = {
	size: 1,
	val: 1,
};

const oneMandatoryFieldOfTwo = {
	size: 2,
	val: 0,
}

const oneMandatoryFieldOfThree = {
	size: 3,
	val: 1,
}

function createDataAccessor() {
	return new DataAccessorWithUndoRedo(new DefaultDataAccessor());
}

const schemaConfiguration = new SchemaConfiguration();
const listConfiguration = new ListConfiguration();

const mappingCanvasConfig = new MappingConfiguration(MappingCanvas, MappingActions);
const mappingSVGConfig = new MappingConfiguration(MappingSVG, MappingActions);
const mappingConfigWithAutoMap = new MappingConfiguration(MappingSVG, AutoMapping);

const filterComponents = new FilterComponents();

function clone(object) {
	return JSON.parse(JSON.stringify(object));
}

function createSchema(id, name, elementName, size) {
	let elements = [];
	for (let i = 0; i < size; i += 1) {
		elements = elements.concat(`${elementName}_${i}`);
	}
	return { id, name, elements };
}

function randomInt(max) {
	return Math.floor((Math.random() * max));
}

function randomType() {
	const nbrOfTypes = types.length;
	const index = randomInt(nbrOfTypes);
	return types[index];
}

function randomMandatory(mandatoryParams) {
	return randomInt(mandatoryParams.size) > mandatoryParams.val ;
}

function buildMandatory() {
	return randomMandatory(oneMandatoryFieldOfTwo);
}

function randomName() {
	const nbrOfNames = names.length;
	const index = randomInt(nbrOfNames);
	return names[index];
}

function randomDescription() {
	const nbrOfDesc = descriptions.length;
	const index = randomInt(nbrOfDesc);
	return descriptions[index];
}

function buildRandomElement(index, mandatoryParams) {
	return {
		id: `${index}`,
		name: randomName(),
		type: randomType(),
		description: randomDescription(),
		mandatory: randomMandatory(mandatoryParams),
	};
}

function createRandomSchema(id, name, size, mandatoryParams) {
	let elements = [];
	for (let i = 0; i < size; i += 1) {
		elements = elements.concat(buildRandomElement(i, mandatoryParams));
	}
	return { id, name, elements };
}

function buildElement(elem, index, withMandatoryFields, types, descriptions, mandatories) {
	let type = null;
	if (types) {
		type = types[index];
	} else {
		type = randomType();
	}
	let description = null;
	if (descriptions) {
		description = descriptions[index];
	} else {
		description = `Description of ${elem}: `;
	}
	let mandatory = withMandatoryFields;
	if (withMandatoryFields) {
		if (mandatories) {
			mandatory = mandatories[index];
		} else {
			mandatory = buildMandatory();
		}
	}
	return {
		id: `${index}`,
		name: elem,
		type,
		description,
		mandatory,
	};
}

function finalizeSchema(schema, withMandatoryFields) {
	const result = {
		id: schema.id,
		name: schema.name,
	};
	const elements = schema.elements.map(
		(elem, index) => buildElement(elem, index, withMandatoryFields,
			schema.types, schema.descriptions, schema.mandatories)
	);
	result.elements = elements;
	return result;
}

function buildMappingItem(item, inputSchema, outputSchema) {
	return {
		source: inputSchema.elements.find(elem => elem.name === item.source),
		target: outputSchema.elements.find(elem => elem.name === item.target),
	};
}

function finalizeMapping(mapping, inputSchema, outputSchema) {
	return mapping.map(item => buildMappingItem(item, inputSchema, outputSchema));
}

function createShuffledMapping(inputSchema, outputSchema, size) {
	let mapping = [];
	const inputElements = inputSchema.elements.slice();
	const outputElements = outputSchema.elements.slice();
	for (let i = 0; i < size; i += 1) {
		const sourceIndex = Math.floor(Math.random() * inputElements.length);
		const targetIndex = Math.floor(Math.random() * outputElements.length);
		const source = inputElements[sourceIndex];
		const target = outputElements[targetIndex];
		mapping = mapping.concat({
			source,
			target,
		});
		inputElements.splice(sourceIndex, 1);
		outputElements.splice(targetIndex, 1);
	}
	return mapping;
}

function createOneToOneMapping(inputSchema, outputSchema, size) {
	let mapping = [];
	for (let i = 0; i < size; i += 1) {
		mapping = mapping.concat({
			source: inputSchema.elements[i],
			target: outputSchema.elements[i],
		});
	}
	return mapping;
}

function createMapping(inputSchema, outputSchema, shuffle, size) {
	if (shuffle) {
		return createShuffledMapping(inputSchema, outputSchema, size);
	}
	return createOneToOneMapping(inputSchema, outputSchema, size);
}

function createFilter(dataAccessor, key, schema) {
	let filter = null;
	switch (key) {
		case MandatoryFieldFilterId:
			filter = new MandatoryFieldFilter(false);
			break;
		case NameFilterId:
			filter = new NameFilter(false);
			break;
		default:
			break;
	}
	if (filter) {
		// register filter in dataAccessor
		dataAccessor.addFilter(schema, filter);
	}
	return filter;
}

function initializeFilters(dataAccessor, schema, keys) {
	let filters = [];
	for (let i = 0; i < keys.length; i += 1) {
		const filter = createFilter(dataAccessor, keys[i], schema);
		if (filter) {
			filters = filters.concat(filter);
		}
	}
	return filters;
}

function createSorter(sorterId, order) {
	let sorter = null;
	switch (sorterId) {
		case NameSorterId:
			sorter = new NameSorter(order);
			break;
		case MandatoryFieldSorterId:
			sorter = new MandatoryFieldSorter(order);
			break;
		default:
			break;
	}
	return sorter;
}

function initializeSorters(sorterIds) {
	let result = {
		sorters: {},
		order: Order.ASCENDING,
	};
	for (let i = 0; i < sorterIds.length; i += 1) {
		const sorterId = sorterIds[i];
		const sorter = createSorter(sorterId, result.order);
		if (sorter) {
			result.sorters[sorterId] = sorter;
		}
	}
	return result;
}

function getSorter(state, sorterId, side) {
	if (state.sorters[side] && state.sorters[side].sorters && state.sorters[side].sorters[sorterId]) {
		return state.sorters[side].sorters[sorterId];
	}
	return null;
}

function getSortOrder(state, side) {
	if (state.sorters[side] && state.sorters[side].order) {
		return state.sorters[side].order;
	}
	return Order.ASCENDING; // default sort order
}

function prefs(showAll, gradientStops50, gradientStops100) {
	return { showAll, gradientStops50, gradientStops100 };
}

function getDefaultPreferences() {
	return prefs(false, null, null);
}

const defaultGradientStops = [
	{
		key: 51,
		offset: 0,
	},
	{
		key: 51,
		offset: 100,
	},
];

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

const showAllPrefs = prefs(true, null, null);
const alternativePrefs = prefs(true, defaultGradientStops50, defaultGradientStops100);
const alternativePrefs2 = prefs(true, defaultGradientStops50, defaultGradientStops);

const icons = {
	'talend-cog': talendIcons['talend-cog'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-trash': talendIcons['talend-trash'],
	'talend-undo': talendIcons['talend-undo'],
	'talend-redo': talendIcons['talend-redo'],
	'talend-eye': talendIcons['talend-eye'],
	'talend-eye-slash': talendIcons['talend-eye-slash'],
	'talend-sort-asc': talendIcons['talend-sort-asc'],
	'talend-sort-desc': talendIcons['talend-sort-desc'],
	'talend-sort-az': talendIcons['talend-sort-az'],
};

const MainActions = {
	UNDO: 'undo',
	REDO: 'redo',
	SHOW_ALL: 'show-all',
	CLEAR: 'clear',
	CLEAR_ALL: 'clear-all',
	SORT: 'sort',
	SORT_ORDER: 'sort-order',
	CLEAR_SORT: 'clear-sort',
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

function getSortAction(sorterId, order, side, onSort) {
	function sortAction() {
		onSort(sorterId, order, side);
	}
	return sortAction;
}

function getClearSortAction(side, clearSort) {
	function clearSortAction() {
		clearSort(side);
	}
	return clearSortAction;
}

function getSortItems(dataAccessor, state, sorters, side, getAction) {
	let items = [];
	items = items.concat(
		{
			label: 'None',
			onClick: getClearSortAction(side, getAction(MainActions.CLEAR_SORT)),
		},
	);
	const sorterKeys = Object.keys(sorters);
	const onSort = getAction(MainActions.SORT);
	for (let i = 0; i < sorterKeys.length; i += 1) {
		const sorterId = sorterKeys[i];
		const sorter = sorters[sorterId];
		items = items.concat(
			{
				label: sorter.getLabel(),
				icon: sorter.getIcon(),
				onClick: getSortAction(sorterId, getSortOrder(state, side), side, onSort),
			},
		);
	}
	return items;
}

function getSortLabel(dataAccessor, state, side) {
	const schema = getSchema(state, side);
	if (dataAccessor.hasSorter(schema)) {
		return dataAccessor.getSorter(schema).getLabel();
	}
	return 'None';
}

function getSortIcon(dataAccessor, state, side) {
	const schema = getSchema(state, side);
	if (dataAccessor.hasSorter(schema)) {
		return dataAccessor.getSorter(schema).getIcon();
	}
	return null;
}

function getSorterActions(state, side, getAction) {
	if (!state.sorters[side]) {
		return {};
	}
	const dataAccessor = state.dataAccessor;
	const sorters = state.sorters[side].sorters;
	const order = state.sorters[side].order;
	const onSort = getAction(MainActions.SORT);
	return {
		displayMode: ActionBar.DISPLAY_MODES.DROPDOWN,
		label: getSortLabel(dataAccessor, state, side),
		icon: getSortIcon(dataAccessor, state, side),
		items: getSortItems(dataAccessor, state, sorters, side, getAction),
		emptyDropdownLabel: 'No option',
	};
}

function getSortOrderLabel(state, side) {
	return state.sorters[side].order;
}

function getSortOrderIcon(state, side) {
	switch (state.sorters[side].order) {
		case Order.ASCENDING:
			return 'talend-sort-asc';
		case Order.DESCENDING:
			return 'talend-sort-desc';
		default:
			return null;
	}
}

function getOrderAction(order, side, onChangeOrder) {
	function orderAction() {
		onChangeOrder(side, order);
	}
	return orderAction;
}

function getOrderActions(state, side, getAction) {
	const onChangeOrder = getAction(MainActions.SORT_ORDER);
	return {
		displayMode: ActionBar.DISPLAY_MODES.DROPDOWN,
		label: getSortOrderLabel(state, side),
		icon: getSortOrderIcon(state, side),
		items: [
			{
				label: Order.ASCENDING,
				icon: 'talend-sort-asc',
				onClick: getOrderAction(Order.ASCENDING, side, onChangeOrder),
			},
			{
				label: Order.DESCENDING,
				icon: 'talend-sort-desc',
				onClick: getOrderAction(Order.DESCENDING, side, onChangeOrder),
			},
		],
		emptyDropdownLabel: 'No option',
	};
}

function getMainActions(state, getAction) {
	const dataAccessor = state.dataAccessor;
	return {
		left: [
			{
				displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
				actions: [
					getSorterActions(state, Constants.MappingSide.INPUT, getAction),
					getOrderActions(state, Constants.MappingSide.INPUT, getAction),
				],
			},
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
			{
				displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
				actions: [
					getSorterActions(state, Constants.MappingSide.OUTPUT, getAction),
					getOrderActions(state, Constants.MappingSide.OUTPUT, getAction),
				],
			},
		],
	};
}

/**
* Default empty state
*/
const emptyState = {
	inputSchema: {},
	outputSchema: {},
	mapping: [],
	dnd: null,
	pendingItem: null,
	selection: null,
	focused: null,
	preferences: getDefaultPreferences(),
	filters: {},
	sorters: {},
};

function getInitialSorters(inputSorters, outputSorters) {
	return {
		input: initializeSorters(inputSorters),
		output: initializeSorters(outputSorters),
	};
}

function getDefaultInitialState() {
	const dataAccessor = createDataAccessor();
	const inputSchema = finalizeSchema(inputSchema2, false);
	const outputSchema = finalizeSchema(outputSchema2, true);
	const mapping = finalizeMapping(initialMapping, inputSchema, outputSchema);
	return {
		...emptyState,
		dataAccessor,
    inputSchema,
    outputSchema,
		mapping,
		filters: {
			input: initializeFilters(dataAccessor, inputSchema, [NameFilterId]),
			output: initializeFilters(dataAccessor, outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
		sorters: getInitialSorters([NameSorterId], [NameSorterId, MandatoryFieldSorterId]),
	};
}

function getEmptyInitialState() {
	const dataAccessor = createDataAccessor();
	const inputSchema = finalizeSchema(inputSchema2, false);
	const outputSchema = finalizeSchema(outputSchema2, true);
	return {
		...emptyState,
		dataAccessor,
    inputSchema,
    outputSchema,
		mapping: emptyMapping,
		filters: {
			input: initializeFilters(dataAccessor, inputSchema, [NameFilterId]),
			output: initializeFilters(dataAccessor, outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
		sorters: getInitialSorters([NameSorterId], [NameSorterId, MandatoryFieldSorterId]),
	};
}

function getBigSchemaInitialState(inputSchemaSize, outputSchemaSize, mappingSize, preferences) {
	const dataAccessor = createDataAccessor();
	const schema1 = createSchema('big_schema_1', 'Big input schema', 'input_element', inputSchemaSize);
	const schema2 = createSchema('big_schema_2', 'Big output schema', 'output_element', outputSchemaSize);
	const tempMap = createMapping(schema1, schema2, true, mappingSize);
	const inputSchema = finalizeSchema(schema1, false);
	const outputSchema = finalizeSchema(schema2, true);
	const mapping = finalizeMapping(tempMap, inputSchema, outputSchema);
	return {
		...emptyState,
		dataAccessor,
    inputSchema,
    outputSchema,
		mapping,
		preferences,
		filters: {
			input: initializeFilters(dataAccessor, inputSchema, [NameFilterId]),
			output: initializeFilters(dataAccessor, outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
		sorters: getInitialSorters([NameSorterId], [NameSorterId, MandatoryFieldSorterId]),
	};
}

function getRandomInitialState(
	inputSchemaParams,
	outputSchemaParams,
	mappingSize,
	preferences,
) {
	const inputSchema = createRandomSchema(
		inputSchemaParams.id,
		inputSchemaParams.name,
		inputSchemaParams.size,
		inputSchemaParams.mandatoryParams,
	);
	const outputSchema = createRandomSchema(
		outputSchemaParams.id,
		outputSchemaParams.name,
		outputSchemaParams.size,
		outputSchemaParams.mandatoryParams,
	);
	const mapping = createMapping(inputSchema, outputSchema, true, mappingSize);
	const dataAccessor = createDataAccessor();
	return {
		...emptyState,
		dataAccessor,
    inputSchema,
    outputSchema,
		mapping,
		preferences,
		filters: {
			input: initializeFilters(dataAccessor, inputSchema, [NameFilterId]),
			output: initializeFilters(dataAccessor, outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
		sorters: getInitialSorters([NameSorterId], [NameSorterId, MandatoryFieldSorterId]),
	};
}

function getUXInitialState(mappingSize, preferences) {
	const dataAccessor = createDataAccessor();
	const inputSchema = finalizeSchema(inputSchemaUX, false);
	const outputSchema = finalizeSchema(outputSchemaUX, true);
	const mapping = createMapping(inputSchema, outputSchema, true, mappingSize);
	return {
		...emptyState,
		dataAccessor,
    inputSchema,
    outputSchema,
		mapping,
		preferences,
		filters: {
			input: initializeFilters(dataAccessor, inputSchema, [NameFilterId]),
			output: initializeFilters(dataAccessor, outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
		sorters: getInitialSorters([NameSorterId], [NameSorterId, MandatoryFieldSorterId]),
	};
}

function initializeCache(state) {
	state.dataAccessor.populateCache(state.inputSchema, Constants.MappingSide.INPUT);
	state.dataAccessor.populateCache(state.outputSchema, Constants.MappingSide.OUTPUT);
	return state;
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
    case Constants.Keys.UP:
      newSelectedElemIndex = selectedElemIndex - 1;
      if (newSelectedElemIndex < 0) {
        newSelectedElemIndex = size - 1;
      }
      break;
    case Constants.Keys.DOWN:
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
		(!mappingInProgress && dataAccessor.haveSameName(elem, selection.element))
		|| (mappingInProgress
				&& dataAccessor.haveSameName(elem, selection.element)
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
	if (code === Constants.Keys.RIGHT) {
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
    case Constants.Keys.UP:
      return navigateUpDown(state, nav);
    case Constants.Keys.DOWN:
      return navigateUpDown(state, nav);
    case Constants.Keys.LEFT:
			return switchSchema(state, false, mapper, usePosition);
		case Constants.Keys.RIGHT:
			return switchSchema(state, false, mapper, usePosition);
		case Constants.Keys.ENTER:
      return switchSchema(state, true, mapper, usePosition);
		default:
			break;
  }
  return state.selection;
}

function arePositionsClosed(pos1, pos2, delta) {
	return Math.abs(pos1.x - pos2.x) <= delta && Math.abs(pos1.y - pos2.y) <= delta;
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
		this.state = props.initialState;
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
		this.updateMapperRef = this.updateMapperRef.bind(this);
		this.onUndo = this.onUndo.bind(this);
		this.onRedo = this.onRedo.bind(this);
		this.onSort = this.onSort.bind(this);
		this.onChangeSortOrder = this.onChangeSortOrder.bind(this);
		this.clearSort = this.clearSort.bind(this);
		this.getMainAction = this.getMainAction.bind(this);
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
		return ev.keyCode === Constants.Keys.UNDO && ev.ctrlKey;
	}

	handleRedo(ev) {
		return ev.keyCode === Constants.Keys.REDO && ev.ctrlKey;
	}

	handleStartConnection(ev) {
		if (ev.keyCode === Constants.Keys.ENTER
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
		return ev.keyCode === Constants.Keys.ENTER
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.pendingItem != null
			&& this.state.selection.side !== this.state.pendingItem.side;
	}

	handleNavigation(ev) {
		const key = ev.keyCode;
		const isValidKey = key === Constants.Keys.UP
										|| key === Constants.Keys.DOWN;
		const isValidSwitch = (key === Constants.Keys.LEFT || key === Constants.Keys.RIGHT)
			&& this.state.pendingItem == null;
		return !isSelectionEmpty(this.state.selection)
			&& (isValidKey || isValidSwitch);
	}

	handleFirstSelect(ev) {
		const isValidKey = ev.keyCode === Constants.Keys.LEFT
			|| ev.keyCode === Constants.Keys.RIGHT;
		return isValidKey && isSelectionEmpty(this.state.selection);
	}

	handleEscape(ev) {
		const isValidKey = ev.keyCode === Constants.Keys.ESCAPE;
		return isValidKey && this.state.pendingItem != null;
	}

	handleDelete(ev) {
		const isValidKey = ev.keyCode === Constants.Keys.DELETE;
		return isValidKey
			&& !isSelectionEmpty(this.state.selection)
			&& this.state.selection.connected != null;
	}

	isPreventDefaultNeeded(ev) {
		return ((ev.keyCode === Constants.Keys.LEFT || ev.keyCode === Constants.Keys.RIGHT)
			&& this.state.pendingItem != null)
			|| ev.keyCode === Constants.Keys.ENTER;
	}

	performMapping(sourceElement, targetElement, selectionSide) {
		let selectedSourceElement = sourceElement;
		let selectedTargetElement = targetElement;
		if (selectionSide === Constants.MappingSide.OUTPUT) {
			selectedSourceElement = targetElement;
			selectedTargetElement = sourceElement;
		}
		this.setState(prevState => ({
			trigger: null,
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
			trigger: null,
			mapping: prevState.dataAccessor.clearMapping(prevState.mapping),
			selection: clearConnected(prevState.selection),
			pendingItem: null,
			dnd: null,
			status: Constants.MAPPING_STATE_STATUS,
		}));
	}

	clearConnection() {
		this.setState(prevState => ({
			trigger: null,
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
				pos: null,
			},
			status: Constants.StateStatus.DND,
		});
		return { element, side };
	}

	dndInProgress(pos) {
		if (this.state.dnd.pos != null
			&& arePositionsClosed(this.state.dnd.pos, pos, 3)) {
			// do not update state
			return;
		}
		this.setState(prevState => ({
			trigger: {
				code: Constants.Events.DND_IN_PROGRESS,
			},
			dnd: {
				source: prevState.dnd.source,
				target: null,
				pos,
			},
			status: Constants.StateStatus.DND,
		}));
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
					pos: null,
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

	onFilterChange(side, filter) {
		if (side === Constants.MappingSide.INPUT) {
			this.state.dataAccessor.filterSchema(this.state.inputSchema, filter.getId());
		} else {
			this.state.dataAccessor.filterSchema(this.state.outputSchema, filter.getId());
		}
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

	onSort(sorterId, order, side) {
		const dataAccessor = this.state.dataAccessor;
		const sorter = getSorter(this.state, sorterId, side);
		if (sorter) {
			const schema = getSchema(this.state, side);
			sorter.setOrder(order);
			if (!dataAccessor.hasSorter(schema) || dataAccessor.getSorter(schema).getId() !== sorterId) {
				dataAccessor.setSorter(schema, sorter);
			} else {
				dataAccessor.sort(schema);
			}
			this.setState({
				trigger: {
					code: Constants.Events.SORT,
					sorterId,
					order,
					side,
				},
				status: Constants.StateStatus.SORT,
			});
		}
	}

	onChangeSortOrder(side, order) {
		const dataAccessor = this.state.dataAccessor;
		this.state.sorters[side].order = order;
		const schema = getSchema(this.state, side);
		if (dataAccessor.hasSorter(schema)) {
			const sorter = dataAccessor.getSorter(schema);
			sorter.setOrder(order);
			dataAccessor.sort(schema);
		}
		this.setState({
			trigger: {
				code: Constants.Events.SORT_ORDER,
				order,
				side,
			},
			status: Constants.StateStatus.SORT,
		});
	}

	clearSort(side) {
		this.state.dataAccessor.clearSorter(getSchema(this.state, side));
		this.setState({
			trigger: {
				code: Constants.Events.CLEAR_SORT,
				side,
			},
			status: Constants.StateStatus.SORT,
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
			case MainActions.SORT:
				return this.onSort;
			case MainActions.CLEAR_SORT:
				return this.clearSort;
			case MainActions.SORT_ORDER:
				return this.onChangeSortOrder;
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
			mappingConfiguration,
			schemaConfiguration,
		} = this.props;
		return (
			<div>
				<ActionBar
					className="main-tools"
					actions={getMainActions(this.state, this.getMainAction)}
				/>
				<Mapper
					dataAccessor={this.state.dataAccessor}
					ref={this.updateMapperRef}
					mapperId={mapperId}
					mappingConfiguration={mappingConfiguration}
					schemaConfiguration={schemaConfiguration}
					inputSchema={this.state.inputSchema}
					mapping={this.state.mapping}
					outputSchema={this.state.outputSchema}
					performMapping={this.performMapping}
					draggable={Constants.Configs.DRAGGABLE}
					selection={this.state.selection}
					pendingItem={this.state.pendingItem}
					onSelect={this.selectElement}
					preferences={this.state.preferences}
					onEnterElement={this.onEnterElement}
					onLeaveElement={this.onLeaveElement}
					focused={this.state.focused}
					dnd={this.state.dnd}
					dndListener={this}
					filters={this.state.filters}
					filterComponents={filterComponents}
					onFilterChange={this.onFilterChange}
					trigger={this.state.trigger}
					status={this.state.status}
				/>
			</div>
		);
	}
}

ConnectedDataMapper.propTypes = {
	initialState: PropTypes.object,
	mapperId: PropTypes.string,
	mappingConfiguration: PropTypes.object,
	schemaConfiguration: PropTypes.object,
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
	))
	.addWithInfo('default (canvas)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getDefaultInitialState())}
			mappingConfiguration={mappingCanvasConfig}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('empty (canvas)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getEmptyInitialState())}
			mappingConfiguration={mappingCanvasConfig}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('50-mapped (canvas)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getBigSchemaInitialState(50, 50, 50, showAllPrefs))}
			mappingConfiguration={mappingCanvasConfig}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('default (svg)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getDefaultInitialState())}
			mappingConfiguration={mappingSVGConfig}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('50-mapped (svg)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getBigSchemaInitialState(50, 50, 50, showAllPrefs))}
			mappingConfiguration={mappingSVGConfig}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('default (svg, list)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getDefaultInitialState())}
			mappingConfiguration={mappingSVGConfig}
			schemaConfiguration={listConfiguration}
		/>;
	})
	.addWithInfo('50-mapped (svg, list)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getBigSchemaInitialState(50, 50, 50, alternativePrefs))}
			mappingConfiguration={mappingSVGConfig}
			schemaConfiguration={listConfiguration}
		/>;
	})
	.addWithInfo('size:100 mapped:50 (svg, list)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getBigSchemaInitialState(100, 100, 50, alternativePrefs))}
			mappingConfiguration={mappingSVGConfig}
			schemaConfiguration={listConfiguration}
		/>;
	}).addWithInfo('UX proto', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getUXInitialState(0, alternativePrefs))}
			mappingConfiguration={mappingConfigWithAutoMap}
			schemaConfiguration={listConfiguration}
		/>;
	}).addWithInfo('Random', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={
				initializeCache(
					getRandomInitialState(
						{
							id: 'f4d51fg5d1fvg',
							name: 'CUSTOMERS-25K PREP',
							size: 50,
							mandatoryParams: noMandatoryFields,
						},
						{
							id: 'sdgf5fsdf45',
							name: 'SALESFORCE.ACCOUNT',
							size: 50,
							mandatoryParams: oneMandatoryFieldOfThree,
						},
						20,
						alternativePrefs,
					)
				)
			}
			mappingConfiguration={mappingConfigWithAutoMap}
			schemaConfiguration={listConfiguration}
		/>;
	}).addWithInfo('300-300', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={
				initializeCache(
					getRandomInitialState(
						{
							id: 'fgs2525sdf5',
							name: '300-ELEM-IN',
							size: 300,
							mandatoryParams: noMandatoryFields,
						},
						{
							id: '62ds5csd5',
							name: '300-ELEM-OUT',
							size: 300,
							mandatoryParams: oneMandatoryFieldOfThree,
						},
						0,
						alternativePrefs,
					)
				)
			}
			mappingConfiguration={mappingConfigWithAutoMap}
			schemaConfiguration={listConfiguration}
		/>;
	});
