import React from 'react';
import { storiesOf } from '@storybook/react';

import { IconsProvider } from '@talend/react-components';
import Table from '../src/Table';

import DataMapper from '../src/index';

const emptyInputSchema = {
	id: 'sd5c465s151cs',
	name: 'Empty Input Schema',
	elements: [],
};

const emptyOutputSchema = {
	id: '8ds5v1g4ds5',
	name: 'Empty Output Schema',
	elements: [],
};

/** Definition of input and output schema.
 * It is a column-based definition.
 * It is then transformed into row-based schema.
 */
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

const inputColumns = [Columns.TYPE, Columns.NAME];
const outputColumns = [Columns.MANDATORY, Columns.NAME, Columns.TYPE, Columns.DESC];

const inputSorterKeys = [Columns.NAME.key, Columns.TYPE.key];
const outputSorterKeys = [Columns.NAME.key, Columns.TYPE.key, Columns.DESC.key];

// FILTERS DEFINITION

const nameFilterId = 'name-filter';

function matchName(element, filterParams) {
	const value = filterParams.value;
	const name = element.name;
	return name.toLowerCase().includes(value.toLowerCase());
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
			// FIXME need to be i18n ready
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
			// FIXME need to be i18n ready
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

const autoMapping = [
	{
		label: 'AUTO MAP!',
		icon: 'talend-cog',
	}
];

function buildElement(elem, index, types, descriptions, mandatories) {
	const type = types ? types[index] : 'string';
	const description = descriptions ? descriptions[index] : `Description of ${elem}: bla bla bla`;
	let mandatory = '';
	if (mandatories && mandatories[index]) {
		mandatory = '*';
	}
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
	result.elements = schema.elements.map(
		(elem, index) => buildElement(elem, index,
			schema.types, schema.descriptions, schema.mandatories)
	);
	return result;
}

function randomInt(max) {
	return Math.floor((Math.random() * max));
}

const types = ['string', 'float', 'boolean', 'integer', 'date', 'address', 'unknown'];

function randomType() {
	return types[randomInt(types.length)];
}

function isMandatory(percent) {
	return randomInt(100) < percent;
}

function buildRandomSchema(id, name, size, mandatoryPercent) {
	const schema = {
		id,
		name,
	};
	let elements = [];
	for (let i = 0; i < size; i += 1) {
		const element = {
			id: `elem_id_${i}`,
			name: `element ${i}`,
			type: randomType(),
			description: `Description of element ${i}`,
			mandatory: isMandatory(mandatoryPercent)? '*' : '',
		};
		elements = elements.concat(element);
	}
	schema.elements = elements;
	return schema;
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

const base = {
	rowsClassName: {},
	withTitle: true,
	withHeader: true,
}

const emptyInput = {
	...base,
	schema: emptyInputSchema,
	columns: inputColumns,
	filters: createInputFilters(),
	sorterKeys: inputSorterKeys,
}

const input = {
	...emptyInput,
	schema: finalizeSchema(inputSchemaUX),
};

const largeInput = {
	...emptyInput,
	schema: buildRandomSchema('d51s11vsc1q', 'Large Input Schema', 100, 0),
};

const emptyOutput = {
	...base,
	schema: emptyOutputSchema,
	columns: outputColumns,
	filters: createOutputFilters(),
	sorterKeys: outputSorterKeys,
}

const output = {
	...emptyOutput,
	schema: finalizeSchema(outputSchemaUX),
};

const largeOutput = {
	...emptyOutput,
	schema: buildRandomSchema('e1v5h81d5g', 'Large Output Schema', 100, 30),
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
	)).addWithInfo('UX proto', () => (
		<DataMapper
			mappingActions={autoMapping}
			mappingKey={Columns.NAME.key}
			input={input}
			output={output}
			preferences={alternativePrefs}
		/>
	)).addWithInfo('Empty', () => (
		<DataMapper
			mappingActions={autoMapping}
			mappingKey={Columns.NAME.key}
			input={emptyInput}
			output={emptyOutput}
			preferences={alternativePrefs}
		/>
	)).addWithInfo('XXL', () => (
		<DataMapper
			mappingActions={autoMapping}
			mappingKey={Columns.NAME.key}
			input={largeInput}
			output={largeOutput}
			preferences={alternativePrefs}
		/>
	));
