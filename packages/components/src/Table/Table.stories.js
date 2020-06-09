import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext as dndContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies
import Table from '.';
import IconsProvider from '../IconsProvider';
import draggable from '../Draggable';

const dataPrepSchema = {
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

const salesForceAccountSchema = {
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
};

function buildElement(elem, index, types, descriptions, mandatories) {
	const type = types[index];
	let description = null;
	if (descriptions) {
		description = descriptions[index];
	} else {
		description = `Description of ${elem}: bla bla bla`;
	}
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

function finalizeSchema(schema, size) {
	const result = {
		id: schema.id,
		name: schema.name,
	};
	let sourceElements = schema.elements;
	if (size) {
		sourceElements = schema.elements.slice(0, size);
	}
	const elements = sourceElements.map((elem, index) =>
		buildElement(elem, index, schema.types, schema.descriptions, schema.mandatories),
	);
	result.elements = elements;
	return result;
}

const schema1 = finalizeSchema(salesForceAccountSchema, 10);
const schema2 = finalizeSchema(dataPrepSchema);
const schema3 = finalizeSchema(salesForceAccountSchema);

const Columns = {
	NAME: {
		id: 'my-table-name',
		key: 'name',
		label: 'Name',
	},
	TYPE: {
		id: 'my-table-type',
		key: 'type',
		label: 'Type',
	},
	DESC: {
		id: 'my-table-desc',
		key: 'description',
		label: 'Description',
	},
	MANDATORY: {
		id: 'my-table-mandatory',
		key: 'mandatory',
		label: '',
	},
};

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

const sorterIcons = {
	none: null,
	ascending: 'talend-sort-asc',
	descending: 'talend-sort-desc',
};

const sorterKeys = [Columns.NAME.key, Columns.TYPE.key, Columns.DESC.key];

function newColumn(col) {
	return {
		key: col.key,
		label: col.label,
	};
}

function addSortExtraProps(column) {
	column.headExtraProps = {
		iconPosition: 'right',
		link: true,
	};
	return column;
}

/*
 * This constant allows to specify which drag sources and drop targets are compatible.
 */
const DRAGGABLE_ELEMENT_TYPE = 'element';

const draggableCell = draggable(Table.Cell, DRAGGABLE_ELEMENT_TYPE);

const draggableCellExtraProps = {
	// for the drag and drop behaviour
	beginDrag(element) {
		action(`Begin drag element ${element.name}`).call();
		return element;
	},
	canDrop(sourceItem, targetElement) {
		return sourceItem.id !== targetElement.id;
	},
	drop(sourceItem, targetElement) {
		action(`You have dropped element ${sourceItem.name} onto element ${targetElement.name}`).call();
	},
	endDrag() {
		action('Drag and drop is finished!').call();
	},
	// for the click behaviour
	onClick(element) {
		action(`You have clicked on element ${element.name}`).call();
	},
};

function addDnd(column) {
	column.cellRenderer = draggableCell;
	column.cellExtraProps = draggableCellExtraProps;
	return column;
}

const columns1 = [Columns.NAME, Columns.TYPE, Columns.DESC];

const columns2 = [Columns.NAME, Columns.TYPE];

const columns3 = [addDnd(newColumn(Columns.NAME)), Columns.TYPE, Columns.DESC];

const columns4 = [Columns.MANDATORY, Columns.NAME, Columns.TYPE, Columns.DESC];

const columns5 = [
	addSortExtraProps(newColumn(Columns.NAME)),
	addSortExtraProps(newColumn(Columns.TYPE)),
	addSortExtraProps(newColumn(Columns.DESC)),
];

const columns6 = [
	addDnd(newColumn(Columns.MANDATORY)),
	addSortExtraProps(newColumn(Columns.NAME)),
	addSortExtraProps(newColumn(Columns.TYPE)),
	addSortExtraProps(newColumn(Columns.DESC)),
];

class ConnectedTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			highlighted: null,
		};
		this.onEnterRow = this.onEnterRow.bind(this);
		this.onLeaveRow = this.onLeaveRow.bind(this);
	}

	onEnterRow(element) {
		this.setState({
			highlighted: element,
		});
	}

	onLeaveRow() {
		this.setState({
			highlighted: null,
		});
	}

	getRowsClassName() {
		const rowsClassName = {};
		if (this.state.highlighted) {
			rowsClassName[this.state.highlighted.id] = 'highlighted';
		}
		return rowsClassName;
	}

	render() {
		const { elements, columns, withHeader, onScroll } = this.props;
		return (
			<Table
				elements={elements}
				columns={columns}
				rowsClassName={this.getRowsClassName()}
				withHeader={withHeader}
				onScroll={onScroll}
				onEnterRow={this.onEnterRow}
				onLeaveRow={this.onLeaveRow}
			/>
		);
	}
}

ConnectedTable.propTypes = {
	initialState: PropTypes.object,
	elements: PropTypes.array,
	columns: PropTypes.array,
	withHeader: PropTypes.bool,
	onScroll: PropTypes.func,
	draggable: PropTypes.bool,
};

const TableWithDND = dndContext(HTML5Backend)(ConnectedTable);

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
		className: nameFilterId,
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
		className: mandatoryFieldFilterId,
	};
}

function createFilters() {
	const nameFilter = createNameFilter();
	const mandatoryFieldFilter = createMandatoryFieldFilter();
	return [nameFilter, mandatoryFieldFilter];
}

function createSorter() {
	return {
		direction: SortDirection.NONE,
		icons: sorterIcons,
	};
}

function createSorters(keys) {
	const sorters = {};
	for (let i = 0; i < keys.length; i += 1) {
		sorters[keys[i]] = createSorter();
	}
	return sorters;
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
	return (
		sorter.direction === SortDirection.ASCENDING || sorter.direction === SortDirection.DESCENDING
	);
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

class SortedFilteredTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			elements: props.elements,
			columns: props.columns,
			filters: props.filters,
			filteredElements: props.elements,
			sorters: props.sorters,
			sortedElements: props.elements,
		};
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
	}

	onFilterChange(id, active, params) {
		const filteredElements = updateFilteredElements(
			this.state.elements,
			this.state.filters,
			id,
			active,
			params,
		);
		const sortedElements = updateSortedElements(
			filteredElements,
			this.state.sorters,
			this.state.columns,
		);
		this.setState(prevState => ({
			filteredElements,
			filters: updateFilters(prevState.filters, id, active, params),
			sortedElements,
		}));
	}

	onSortChange(columnKey) {
		const updatedSorters = updateSorters(this.state.sorters, this.state.columns, columnKey);
		this.setState(prevState => ({
			sorters: updatedSorters,
			sortedElements: updateSortedElements(
				prevState.filteredElements,
				updatedSorters,
				prevState.columns,
			),
		}));
	}

	render() {
		return (
			<Table
				title={this.props.title}
				elements={this.state.sortedElements}
				columns={this.state.columns}
				withHeader
				filters={this.state.filters}
				onFilterChange={this.onFilterChange}
				sorters={this.state.sorters}
				onSortChange={this.onSortChange}
			/>
		);
	}
}

SortedFilteredTable.propTypes = {
	elements: PropTypes.array,
	columns: PropTypes.array,
	filters: PropTypes.array,
	sorters: PropTypes.object,
	title: PropTypes.string,
};

const SortedFilteredTableWithDND = dndContext(HTML5Backend)(SortedFilteredTable);

const stories = storiesOf('Deprecated/Table', module);

stories
	.addDecorator(story => (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<IconsProvider />
			{story()}
		</div>
	))
	.add('Table', () => (
		<div className="story-table">
			<Table elements={schema1.elements} columns={columns1} withHeader />
		</div>
	))
	.add('Table (as list)', () => (
		<div className="default-table">
			<Table
				elements={schema2.elements}
				columns={columns2}
				onEnterRow={action('onEnterRow called!')}
				onLeaveRow={action('onLeaveRow called!')}
			/>
		</div>
	))
	.add('Table with drag and drop', () => (
		<div className="table-with-dnd">
			<TableWithDND
				elements={schema3.elements}
				columns={columns3}
				withHeader
				onScroll={action('onScroll called!')}
			/>
		</div>
	))
	.add('Table with filters', () => (
		<div className="filtered-table">
			<SortedFilteredTable
				elements={schema3.elements}
				columns={columns4}
				filters={createFilters()}
				title={schema3.name}
			/>
		</div>
	))
	.add('Table with sorters', () => (
		<div className="sorted-table">
			<SortedFilteredTable
				elements={schema3.elements}
				columns={columns5}
				sorters={createSorters(sorterKeys)}
			/>
		</div>
	))
	.add('Table with dnd, sorters & filters', () => (
		<div className={classnames('table-with-dnd', 'filtered-table', 'sorted-table')}>
			<SortedFilteredTableWithDND
				elements={schema3.elements}
				columns={columns6}
				filters={createFilters()}
				sorters={createSorters(sorterKeys)}
				title={schema3.name}
			/>
		</div>
	));
