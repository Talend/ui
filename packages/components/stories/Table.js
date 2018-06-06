import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext as dndContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react';  // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';  // eslint-disable-line import/no-extraneous-dependencies
import {
	DataAccessorWithSorterAndFilter,
	DraggableComponent as draggable,
	FilterFactory,
	IconsProvider,
	Sorter,
	SortOrder,
	Table,
	TableActionHeader,
	TableCell,
} from '../src/index';

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
	let mandatory = false;
	if (mandatories) {
		mandatory = mandatories[index];
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
	const elements = sourceElements.map(
		(elem, index) => buildElement(elem, index, schema.types, schema.descriptions, schema.mandatories)
	);
	result.elements = elements;
	return result;
}

const schema1 = finalizeSchema(salesForceAccountSchema, 10);
const schema2 = finalizeSchema(dataPrepSchema);
const schema3 = finalizeSchema(salesForceAccountSchema);

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

/*
 * This constant allows to specify which drag sources and drop targets are compatible.
 */
const DRAGGABLE_ELEMENT_TYPE = 'element';

const draggableCell = draggable(TableCell, DRAGGABLE_ELEMENT_TYPE);

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
	addSorter(newColumn(Columns.NAME)),
	addSorter(newColumn(Columns.TYPE)),
	addSorter(newColumn(Columns.DESC)),
];

const columns6 = [
	addDnd(newColumn(Columns.MANDATORY)),
	addSorter(newColumn(Columns.NAME)),
	addSorter(newColumn(Columns.TYPE)),
	addSorter(newColumn(Columns.DESC)),
];

const rowDataGetter = {
  getElementId(element) {
    return element.id;
	},
	getRowData(element, columnKey) {
    switch (columnKey) {
			case Columns.NAME.key:
        return element.name;
			case Columns.TYPE.key:
				return element.type;
			case Columns.DESC.key:
				return element.description;
			case Columns.MANDATORY.key:
				return element.mandatory ? '*' : '';
			default:
				return 'No data available!';
		}
	},
};

const storyClassnames = {
	root: 'story-table',
};

const defaultClassnames = {
	root: 'default-table',
};

class ConnectedTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			draggable: props.draggable,
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

	getRootClassName() {
		return classnames({
			'table-with-dnd': this.state.draggable,
		});
	}

	getRowClassName(element) {
		const classNames = {
			highlighted: this.state.highlighted && this.state.highlighted.id === element.id,
			'draggable-row': this.state.draggable,
		};
		return classnames(classNames);
	}

	getRowClassNames(elements) {
		let rowClassNames = [];
		for (let i = 0; i < elements.length; i += 1) {
			rowClassNames = rowClassNames.concat(this.getRowClassName(elements[i]));
		}
		return rowClassNames;
	}

	render() {
		const {
			elements,
			columns,
			withHeader,
			onScroll,
		} = this.props;
		const allClassnames = {
			root: this.getRootClassName(),
			rows: this.getRowClassNames(elements),
		};
		return (
			<Table
				elements={elements}
				columns={columns}
				classnames={allClassnames}
				rowDataGetter={rowDataGetter}
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
const nameFilterExtra = {
	placeHolder: 'Filter...',
	dockable: true,
	navbar: true,
};

const mandatoryFieldFilterId = 'mandatory-field-filter';
const mandatoryFieldFilterExtra = {
	label: 'Show Mandatory Fields (*) Only',
};

function createFilters() {
	const nameFilter = FilterFactory.createRegexpFilter(
		nameFilterId,
		Columns.NAME.key,
		false,
		nameFilterId,
		nameFilterExtra,
	);
	const mandatoryFieldFilter = FilterFactory.createBooleanFilter(
		mandatoryFieldFilterId,
		Columns.MANDATORY.key,
		false,
		mandatoryFieldFilterId,
		mandatoryFieldFilterExtra,
	);
	return [nameFilter, mandatoryFieldFilter];
}

class SortedFilteredTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			elements: props.elements,
			draggable: props.draggable,
		};
		this.dataAccessor = new DataAccessorWithSorterAndFilter(props.elements, rowDataGetter);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
		this.registerFilters(props.filters, this.dataAccessor);
	}

	registerFilters(filters, dataAccessor) {
		if (filters) {
			for (let i = 0; i < filters.length; i += 1) {
				const filter = filters[i].filter;
				if (filter) {
					dataAccessor.addFilter(filter);
				}
			}
		}
	}

	onFilterChange(filter) {
		this.dataAccessor.filter(filter.getId());
		this.setState({
			elements: this.dataAccessor.getElements(true),
		});
	}

	onSortChange(sorter) {
		if (this.dataAccessor.isActiveSorter(sorter)) {
			switch (sorter.getOrder()) {
				case SortOrder.ASCENDING:
					sorter.setOrder(SortOrder.DESCENDING);
					this.dataAccessor.sort();
					break;
				case SortOrder.DESCENDING:
					sorter.setOrder(SortOrder.NONE);
					this.dataAccessor.clearSorter();
					break;
				default:
					break;
			}
		} else {
			const activeSorter = this.dataAccessor.getSorter();
			if (activeSorter) {
				activeSorter.setOrder(SortOrder.NONE);
			}
			sorter.setOrder(SortOrder.ASCENDING);
			this.dataAccessor.setSorter(sorter);
		}
		this.setState({
			elements: this.dataAccessor.getElements(true),
		});
	}

	hasSorters(columns) {
		return columns.find(col => col.sorter);
	}

	getRowClassNames() {
		let rowClassNames = [];
		for (let i = 0; i < this.state.elements.length; i += 1) {
			rowClassNames = rowClassNames.concat(classnames({'draggable-row': this.state.draggable}));
		}
		return rowClassNames;
	}

	getRootClassName() {
		return classnames({
			'table-with-dnd': this.state.draggable,
			'sorted-table': this.hasSorters(this.props.columns),
			'filtered-table': this.props.filters,
		});
	}

	render() {
		const {
			columns,
			filters,
			title,
		} = this.props;
		const allClassnames = {
			root: this.getRootClassName(),
			rows: this.getRowClassNames(),
		};
		return (
			<Table
				title={title}
				elements={this.state.elements}
				columns={columns}
				classnames={allClassnames}
				rowDataGetter={this.dataAccessor}
				withHeader={true}
				filters={filters}
				onFilterChange={this.onFilterChange}
				onSortChange={this.onSortChange}
			/>
		);
	}

}

SortedFilteredTable.propTypes = {
	elements: PropTypes.array,
	columns: PropTypes.array,
	filters: PropTypes.array,
	title: PropTypes.string,
	draggable: PropTypes.bool,
};

const SortedFilteredTableWithDND = dndContext(HTML5Backend)(SortedFilteredTable);

const stories = storiesOf('Table', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<IconsProvider />
			{story()}
		</div>
	))
	.addWithInfo('Table', () => {
		return (
			<Table
			  elements={schema1.elements}
	      columns={columns1}
				classnames={storyClassnames}
				withHeader={true}
			/>
		);
	})
	.addWithInfo('Table (as list)', () => {
		return (
			<Table
			  elements={schema2.elements}
	      columns={columns2}
				classnames={defaultClassnames}
	      onEnterRow={action('onEnterRow called!')}
				onLeaveRow={action('onLeaveRow called!')}
			/>
		);
	})
	.addWithInfo('Table with drag and drop', () => {
		return (
			<TableWithDND
				elements={schema3.elements}
				columns={columns3}
				withHeader={true}
				onScroll={action('onScroll called!')}
				draggable={true}
			/>
		);
	})
	.addWithInfo('Table with filters', () => {
		return (
			<SortedFilteredTable
				elements={schema3.elements}
				columns={columns4}
				filters={createFilters()}
				title={schema3.name}
			/>
		);
	})
	.addWithInfo('Table with sorters', () => {
		return (
			<SortedFilteredTable
				elements={schema3.elements}
				columns={columns5}
			/>
		);
	})
	.addWithInfo('Table with dnd, sorters & filters', () => {
		return (
			<SortedFilteredTableWithDND
				elements={schema3.elements}
				columns={columns6}
				filters={createFilters()}
				title={schema3.name}
				draggable={true}
			/>
		);
	});
