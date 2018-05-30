import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext as dndContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react';  // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';  // eslint-disable-line import/no-extraneous-dependencies
import {
	DraggableComponent as draggable,
	IconsProvider,
	Table,
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
};

function buildElement(elem, index, types, descriptions) {
	const type = types[index];
	let description = null;
	if (descriptions) {
		description = descriptions[index];
	} else {
		description = `Description of ${elem}: bla bla bla`;
	}
	return {
		id: `${index}`,
		name: elem,
		type,
		description,
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
		(elem, index) => buildElement(elem, index, schema.types, schema.descriptions)
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
};

const columns1 = [Columns.NAME, Columns.TYPE, Columns.DESC];
const columns2 = [Columns.NAME, Columns.TYPE];

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

const columns3 = [
	{
		key: Columns.NAME.key,
		label: Columns.NAME.label,
		cellRenderer: draggableCell,
		cellExtraProps: draggableCellExtraProps,
	},
	Columns.TYPE,
	Columns.DESC,
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
			default:
				return 'No data available!';
		}
	},
};

const storyClassnames = {
	table: 'story-table',
};

const defaultClassnames = {
	table: 'default-table',
};

const initialStateWithDnD = { draggable: true };

class ConnectedTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = props.initialState;
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

	getTableClassName() {
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
			table: this.getTableClassName(),
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
};

const TableWithDND = dndContext(HTML5Backend)(ConnectedTable);

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
				initialState={initialStateWithDnD}
				elements={schema3.elements}
				columns={columns3}
				withHeader={true}
				onScroll={action('onScroll called!')}
			/>
		);
	});
