import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { DataMapper as Mapper } from '../src/index';
import { isSelected } from '../src/DataMapper/Schema/Schema';
import * as Constants from '../src/DataMapper/Constants';
import DefaultDataAccessor from '../src/DataMapper/DefaultDataAccessor';
import DataAccessorWrapper from '../src/DataMapper/DataAccessorWrapper';
import SchemaConfiguration from '../src/DataMapper/Schema/SchemaConfiguration';
import ListConfiguration from '../src/DataMapper/Schema/ListConfiguration';
import FilterComponents from '../src/DataMapper/Schema/Filters/FilterComponents';
import NameFilter, { ID as NameFilterId } from '../src/DataMapper/Schema/Filters/NameFilter';
import MandatoryFieldFilter, { ID as MandatoryFieldFilterId } from '../src/DataMapper/Schema/Filters/MandatoryFieldFilter';
import { IconsProvider } from '../src/';

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

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

const schemaConfiguration = new SchemaConfiguration();
const listConfiguration = new ListConfiguration();

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

function randomMandatory(a, b) {
	return randomInt(b) > a ;
}

function buildMandatory() {
	return randomMandatory(0, 2);
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

function buildRandomElement(index, a, b) {
	return {
		id: `${index}`,
		name: randomName(),
		type: randomType(),
		description: randomDescription(),
		mandatory: randomMandatory(a, b),
	};
}

function createRandomSchema(id, name, size, a, b) {
	let elements = [];
	for (let i = 0; i < size; i += 1) {
		elements = elements.concat(buildRandomElement(i, a, b));
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

function createFilter(key, schema) {
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

function initializeFilters(schema, keys) {
	let filters = [];
	for (let i = 0; i < keys.length; i += 1) {
		const filter = createFilter(keys[i], schema);
		if (filter) {
			filters = filters.concat(filter);
		}
	}
	return filters;
}

function prefs(showAll, withGradient, gradientStops, gradientMargin) {
	return { showAll, withGradient, gradientStops, gradientMargin };
}

function getDefaultPreferences() {
	return prefs(false, false, [], 0);
}

const defaultGradientStops = [
	{
		key: 1,
		offset: 0,
	},
	{
		key: 2,
		offset: 20,
	},
];

const gradientStops3 = [
	{
		key: 11,
		offset: 0,
	},
	{
		key: 11,
		offset: 10,
	},
	{
		key: 13,
		offset: 15,
	},
];

const gradientStops4 = [
	{
		key: 61,
		offset: 0,
	},
	{
		key: 61,
		offset: 5,
	},
	{
		key: 66,
		offset: 10,
	},
	{
		key: 66,
		offset: 100,
	},
];

const gradientStops6 = [
	{
		key: 61,
		offset: 0,
	},
	{
		key: 61,
		offset: 10,
	},
	{
		key: 66,
		offset: 20,
	},
	{
		key: 66,
		offset: 80,
	},
	{
		key: 61,
		offset: 90,
	},
	{
		key: 61,
		offset: 100,
	},
];

const showAllPrefs = prefs(true, false, [], 0);
const fullPrefs = prefs(true, true, defaultGradientStops, 50);
const alternativePrefs3 = prefs(true, true, gradientStops3, 150);
const alternativePrefs4 = prefs(true, true, gradientStops4, 100);
const alternativePrefs6 = prefs(true, true, gradientStops6, 150);

/**
* Default empty state
*/
const emptyState = {
	dataAccessor,
	inputSchema: {},
	outputSchema: {},
	mapping: [],
	dnd: null,
	pendingItem: null,
	selection: null,
	focused: null,
	preferences: getDefaultPreferences(),
	filters: {},
};

function getDefaultInitialState() {
	const inputSchema = finalizeSchema(inputSchema2, false);
	const outputSchema = finalizeSchema(outputSchema2, true);
	const mapping = finalizeMapping(initialMapping, inputSchema, outputSchema);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping,
		filters: {
			input: initializeFilters(inputSchema, [NameFilterId]),
			output: initializeFilters(outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
	};
}

function getEmptyInitialState() {
	const inputSchema = finalizeSchema(inputSchema2, false);
	const outputSchema = finalizeSchema(outputSchema2, true);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping: emptyMapping,
		filters: {
			input: initializeFilters(inputSchema, [NameFilterId]),
			output: initializeFilters(outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
	};
}

function getBigSchemaInitialState(inputSchemaSize, outputSchemaSize, mappingSize, preferences) {
	const schema1 = createSchema('big_schema_1', 'Big input schema', 'input_element', inputSchemaSize);
	const schema2 = createSchema('big_schema_2', 'Big output schema', 'output_element', outputSchemaSize);
	const tempMap = createMapping(schema1, schema2, true, mappingSize);
	const inputSchema = finalizeSchema(schema1, false);
	const outputSchema = finalizeSchema(schema2, true);
	const mapping = finalizeMapping(tempMap, inputSchema, outputSchema);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping,
		preferences,
		filters: {
			input: initializeFilters(inputSchema, [NameFilterId]),
			output: initializeFilters(outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
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
		inputSchemaParams.a,
		inputSchemaParams.b,
	);
	const outputSchema = createRandomSchema(
		outputSchemaParams.id,
		outputSchemaParams.name,
		outputSchemaParams.size,
		outputSchemaParams.a,
		outputSchemaParams.b,
	);
	const mapping = createMapping(inputSchema, outputSchema, true, mappingSize);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping,
		preferences,
		filters: {
			input: initializeFilters(inputSchema, [NameFilterId]),
			output: initializeFilters(outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
	};
}

function getUXInitialState(mappingSize, preferences) {
	const inputSchema = finalizeSchema(inputSchemaUX, false);
	const outputSchema = finalizeSchema(outputSchemaUX, true);
	const mapping = createMapping(inputSchema, outputSchema, true, mappingSize);
	return {
		...emptyState,
    inputSchema,
    outputSchema,
		mapping,
		preferences,
		filters: {
			input: initializeFilters(inputSchema, [NameFilterId]),
			output: initializeFilters(outputSchema, [NameFilterId, MandatoryFieldFilterId]),
		},
	};
}

function initializeCache(state) {
	state.dataAccessor.populateCache(state.inputSchema);
	state.dataAccessor.populateCache(state.outputSchema);
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

function appendConnected(mapping, source, target, side) {
	const connected = dataAccessor.getConnectedElements(mapping, source, side);
	if (connected != null) {
		return connected.concat(target);
	}
	return [target];
}

function select(mapping, element, side) {
	return {
		element,
		connected: dataAccessor.getConnectedElements(mapping, element, side),
		side,
	};
}

function getSelection(ctrl, mapping, selection, element, side) {
	if (isSelected(dataAccessor, selection, element, side) && ctrl) {
		return null;
	}
	return select(mapping, element, side);
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

function removeConnections(mapping, selection) {
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

function getNextElement(schema, element, nav) {
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

	const selection = state.selection;
  const schema = getCurrentSelectedSchema(state);
	let newSelectedElement = getNextElement(schema, selection.element, nav);

	if (state.pendingItem != null
		&& state.pendingItem.side !== selection.side
		&& selection.side === Constants.MappingSide.OUTPUT) {
		// do not select an already connected output elements
		while (dataAccessor.isElementMapped(state.mapping, newSelectedElement, selection.side)) {
			newSelectedElement = getNextElement(schema, newSelectedElement, nav);
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
function findTargetElement(schema, selection, mappingInProgress) {
	const elements = dataAccessor.getSchemaElements(schema, true);
	return elements.find(elem =>
		(!mappingInProgress && dataAccessor.haveSameName(elem, selection.element))
		|| (mappingInProgress
				&& dataAccessor.haveSameName(elem, selection.element)
				&& (selection.connected == null || !dataAccessor.includes(selection.connected, elem)))
	);
}

function findNonConnectedTargetElement(schema, mapping, side) {
	for (let i = 0; i < dataAccessor.getSchemaSize(schema, true); i += 1) {
		const elem = dataAccessor.getSchemaElement(schema, i, true);
		if (!dataAccessor.isElementMapped(mapping, elem, side)) {
			return elem;
		}
	}
	return null;
}

function switchSchema(state, mappingInProgress) {
  const selection = state.selection;
	const targetSide = Constants.switchMappingSide(selection.side);
	let targetElem = null;
  if (!mappingInProgress
		&& selection.connected != null
		&& selection.connected.length > 0) {
		targetElem = selection.connected[0];
  }
	const targetSchema = getSchema(state, targetSide);
	if (targetElem == null) {
  	// try to find an element with the same name
   	targetElem = findTargetElement(targetSchema, selection, mappingInProgress);
	}
  if (targetElem == null) {
    // get the first element in target schema
		if (mappingInProgress) {
			// for connexion context we try to get a non connected element
			targetElem = findNonConnectedTargetElement(targetSchema, state.mapping, targetSide);
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

function firstSelect(state) {
	const element = dataAccessor.getSchemaElement(state.inputSchema, 0, true);
	return {
		element,
		connected: dataAccessor.getConnectedElements(state.mapping, element,
			Constants.MappingSide.INPUT),
		side: Constants.MappingSide.INPUT,
	};
}

function navigate(state, nav) {
  switch (nav) {
    case Constants.Keys.UP:
      return navigateUpDown(state, nav);
    case Constants.Keys.DOWN:
      return navigateUpDown(state, nav);
    case Constants.Keys.SWITCH_SCHEMA:
			return switchSchema(state, false);
		case Constants.Keys.ENTER:
      return switchSchema(state, true);
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
	}

	handleKeyEvent(ev) {
		let reveal = false;
		if (this.handleFirstSelect(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				trigger: null,
				selection: firstSelect(prevState),
			}));
			reveal = true;
		} else if (this.handleNavigation(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				trigger: null,
				selection: navigate(prevState, ev.keyCode),
			}));
			reveal = true;
		} else if (this.handleStartConnection(ev)) {
			ev.preventDefault();
			this.setState(prevState => ({
				trigger: null,
				selection: navigate(prevState, ev.keyCode),
				pendingItem: {
					element: prevState.selection.element,
					side: prevState.selection.side,
				},
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
				selection: select(prevState.mapping, fromElement, fromSide),
			}));
		} else if (this.handleDelete(ev)) {
			this.clearConnection();
		} else if (this.isPreventDefaultNeeded(ev)) {
			ev.preventDefault();
		}
		if (reveal) {
			// reveal
			const mapperInstance = this.mapper.getDecoratedComponentInstance();
			mapperInstance.reveal(this.state.selection);
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyEvent);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyEvent);
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
		const isValidSwitch = key === Constants.Keys.SWITCH_SCHEMA
			&& this.state.pendingItem == null;
		return !isSelectionEmpty(this.state.selection)
			&& (isValidKey || isValidSwitch);
	}

	handleFirstSelect(ev) {
		const isValidKey = ev.keyCode === Constants.Keys.SWITCH_SCHEMA;
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
		return (ev.keyCode === Constants.Keys.SWITCH_SCHEMA
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
				connected: appendConnected(prevState.mapping,
																	selectedSourceElement,
																	selectedTargetElement,
																	selectionSide),
				side: selectionSide,
			},
			pendingItem: null,
			dnd: null,
		}));
	}

	clearMapping() {
		this.setState(prevState => ({
			trigger: null,
			mapping: prevState.dataAccessor.clearMapping(prevState.mapping),
			selection: clearConnected(prevState.selection),
			pendingItem: null,
			dnd: null,
		}));
	}

	clearConnection() {
		this.setState(prevState => ({
			trigger: null,
			mapping: removeConnections(prevState.mapping, prevState.selection),
			selection: clearConnected(prevState.selection),
			pendingItem: null,
			dnd: null,
		}));
	}

	selectElement(ctrl, element, side) {
		if (this.state.pendingItem == null) {
			this.setState(prevState => ({
				trigger: null,
				selection: getSelection(ctrl, prevState.mapping,
					prevState.selection, element, side),
			}));
		} else if (this.state.pendingItem.side === side) {
			// stop the link process
			this.setState(prevState => ({
				trigger: null,
				selection: getSelection(ctrl, prevState.mapping,
					prevState.selection, element, side),
				pendingItem: null,
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
		});
	}

	onEnterElement(element, side) {
		this.setState({
			trigger: {
				code: Constants.Events.ENTER_ELEM,
				element,
				side,
			},
			focused: getFocused(element, side),
		});
	}

	onLeaveElement(element, side) {
		this.setState({
			trigger: {
				code: Constants.Events.LEAVE_ELEM,
				element,
				side,
			},
			focused: null,
		});
	}

	onShowAll() {
		this.setState(prevState => ({
			trigger: null,
			preferences : {
				showAll: !prevState.preferences.showAll,
				withGradient: prevState.preferences.withGradient,
				gradientStops: prevState.preferences.gradientStops,
				gradientMargin: prevState.preferences.gradientMargin,
			},
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
			trigger: null,
			dnd: {
				source: prevState.dnd.source,
				target: null,
				pos,
			},
		}));
	}

	canDrop(sourceItem, targetItem) {
		let update = true;
		if (this.state.dnd != null) {
			if (this.state.dnd.target != null
				&& this.state.dnd.target.element === targetItem.element
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

	drop(element) {
		this.setState({
			trigger: null,
			dnd: null,
		});
	}

	endDrag() {
		this.setState({
			trigger: null,
			dnd: null,
		});
	}

	onFilterChange(side, filter) {
		if (side === Constants.MappingSide.INPUT) {
			this.state.dataAccessor.filterSchema(this.state.inputSchema, filter.getId());
		} else {
			this.state.dataAccessor.filterSchema(this.state.outputSchema, filter.getId());
		}
		this.setState(prevState => ({
			trigger: null,
			pendingItem: null,
			dnd: null,
			selection: filterSelection(prevState, prevState.selection),
			focused: filterFocused(prevState, prevState.focused),
		}));
	}

	updateMapperRef(ref) {
		this.mapper = ref;
	}

	render() {
		const {
			mapperId,
			mappingRenderer,
			schemaConfiguration,
		} = this.props;
		return (
			<Mapper
				dataAccessor={this.state.dataAccessor}
				ref={this.updateMapperRef}
				mapperId={mapperId}
				mappingRenderer={mappingRenderer}
				schemaConfiguration={schemaConfiguration}
				inputSchema={this.state.inputSchema}
				mapping={this.state.mapping}
				outputSchema={this.state.outputSchema}
				performMapping={this.performMapping}
				clearMapping={this.clearMapping}
				clearConnection={this.clearConnection}
				draggable={Constants.Configs.DRAGGABLE}
				selection={this.state.selection}
				pendingItem={this.state.pendingItem}
				onSelect={this.selectElement}
				preferences={this.state.preferences}
				onShowAll={this.onShowAll}
				onEnterElement={this.onEnterElement}
				onLeaveElement={this.onLeaveElement}
				focused={this.state.focused}
				dnd={this.state.dnd}
				dndInProgress={this.dndInProgress}
				beginDrag={this.beginDrag}
				canDrop={this.canDrop}
				drop={this.drop}
				endDrag={this.endDrag}
				filters={this.state.filters}
				filterComponents={filterComponents}
				onFilterChange={this.onFilterChange}
				trigger={this.state.trigger}
			/>
		);
	}
}

ConnectedDataMapper.propTypes = {
	initialState: PropTypes.object,
	mapperId: PropTypes.string,
	mappingRenderer: PropTypes.string,
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
			mappingRenderer={Constants.Connection.RENDERER.CANVAS}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('empty (canvas)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getEmptyInitialState())}
			mappingRenderer={Constants.Connection.RENDERER.CANVAS}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('50-mapped (canvas)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getBigSchemaInitialState(50, 50, 50, showAllPrefs))}
			mappingRenderer={Constants.Connection.RENDERER.CANVAS}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('default (svg)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getDefaultInitialState())}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('50-mapped (svg)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getBigSchemaInitialState(50, 50, 50, showAllPrefs))}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			schemaConfiguration={schemaConfiguration}
		/>;
	})
	.addWithInfo('default (svg, list)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getDefaultInitialState())}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			schemaConfiguration={listConfiguration}
		/>;
	})
	.addWithInfo('50-mapped (svg, list)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getBigSchemaInitialState(50, 50, 50, alternativePrefs4))}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			schemaConfiguration={listConfiguration}
		/>;
	})
	.addWithInfo('size:100 mapped:50 (svg, list)', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getBigSchemaInitialState(100, 100, 50, alternativePrefs4))}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			schemaConfiguration={listConfiguration}
		/>;
	}).addWithInfo('UX proto', () => {
		return <ConnectedDataMapper
			mapperId="mapper"
			initialState={initializeCache(getUXInitialState(15, alternativePrefs4))}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
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
							a: 1,
							b: 1,
						},
						{
							id: 'sdgf5fsdf45',
							name: 'SALESFORCE.ACCOUNT',
							size: 50,
							a: 1,
							b: 3,
						},
						20,
						alternativePrefs4,
					)
				)
			}
			mappingRenderer={Constants.Connection.RENDERER.SVG}
			schemaConfiguration={listConfiguration}
		/>;
	});
