import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';
import { storiesOf } from '@storybook/react';  // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';  // eslint-disable-line import/no-extraneous-dependencies
import {
	SimpleTable,
	ClassNameProvider,
	RowRenderer,
	HeaderRenderer,
	Cell,
	DraggableComponent,
	IconsProvider,
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

function finalizeSchema(schema) {
	const result = {
		id: schema.id,
		name: schema.name,
	};
	const elements = schema.elements.map(
		(elem, index) => buildElement(elem, index, schema.types, schema.descriptions)
	);
	result.elements = elements;
	return result;
}

const schema1 = finalizeSchema(dataPrepSchema);
const schema2 = finalizeSchema(salesForceAccountSchema);

const ColumnKey = {
  NAME: 'name',
	DRAG_NAME: 'drag-name',
  TYPE: 'type',
  DESC: 'desc',
};

const columnKeys1 = [ColumnKey.NAME, ColumnKey.TYPE];
const columnKeys2 = [ColumnKey.DRAG_NAME, ColumnKey.TYPE, ColumnKey.DESC];

const rowRenderer = new RowRenderer();
const headerRenderer = new HeaderRenderer();

class DraggableRowRenderer extends RowRenderer {

	constructor() {
		super();
		this.draggableCell = DraggableComponent(Cell);
	}

	getCellComponent(columnKey) {
		if (columnKey === ColumnKey.DRAG_NAME) {
			return this.draggableCell;
		}
		return super.getCellComponent(columnKey);
	}

	getExtraProps(columnKey) {
		if (columnKey === ColumnKey.DRAG_NAME) {
			return {
				beginDrag(element) {
					return element;
				},
				canDrop(sourceItem, targetElement) {
					return sourceItem.id !== targetElement.id;
				},
				drop() {
				},
				endDrag() {
				},
			};
		}
		return super.getExtraProps(columnKey);
	}

}

const draggableRowRenderer = new DraggableRowRenderer();

class MyRowDataGetter {

  getId(element) {
    return element.id;
	}

	getHeaderData(columnKey) {
		switch (columnKey) {
			case ColumnKey.DRAG_NAME:
				return 'Name';
			case ColumnKey.NAME:
        return 'Name';
			case ColumnKey.TYPE:
				return 'Type';
			case ColumnKey.DESC:
				return 'Description';
			default:
				return columnKey;
		}
	}

	getRowData(element, columnKey) {
    switch (columnKey) {
			case ColumnKey.DRAG_NAME:
				return element.name;
			case ColumnKey.NAME:
        return element.name;
			case ColumnKey.TYPE:
				return element.type;
			case ColumnKey.DESC:
				return element.description;
			default:
				return 'No data available!';
		}
	}

}

const classNameProvider = new ClassNameProvider();
const rowDataGetter = new MyRowDataGetter();

const initialStateWithDnD = { draggable: true };

class ConnectedSimpleTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = props.initialState;
		this.onEnterRow = this.onEnterRow.bind(this);
		this.onLeaveRow = this.onLeaveRow.bind(this);
	}

	getForTable() {
		return classnames({
				'simple-table': true,
				'draggable-table': this.state.draggable,
		});
  }

	getForHeader(columnKey) {
		return `simple-table-header-${columnKey}`;
	}

	getForRow(element) {
		const classNames = {
			'simple-table-row': true,
			highlighted: this.state.highlighted && this.state.highlighted.id === element.id,
			draggable: this.state.draggable,
		};
		return classnames(classNames);
  }

	getForRowData(element, columnKey) {
    return `simple-table-row-data-${columnKey}`;
  }

	onEnterRow(element) {
		this.setState({
			highlighted: element,
		});
	}

	onLeaveRow(element) {
		this.setState({
			highlighted: null,
		});
	}

	render() {
		const {
			elements,
			columnKeys,
			onScroll,
			onClick,
			onDoubleClick,
		} = this.props;
		return (
			<SimpleTable
			  elements={elements}
	      columnKeys={columnKeys}
	      classNameProvider={this}
	      rowDataGetter={rowDataGetter}
	      rowRenderer={draggableRowRenderer}
				headerRenderer={headerRenderer}
	      onScroll={onScroll}
	      onClick={onClick}
	      onDoubleClick={onDoubleClick}
	      onEnterRow={this.onEnterRow}
	      onLeaveRow={this.onLeaveRow}
			/>
		);
	}

}

ConnectedSimpleTable.propTypes = {
	initialState: PropTypes.object,
	elements: PropTypes.array,
	columnKeys: PropTypes.array,
	onScroll: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
};

const SimpleTableWithDND = DragDropContext(HTML5Backend)(ConnectedSimpleTable);

const stories = storiesOf('SimpleTable', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => (
		<div id="simple-table-container">
			<IconsProvider />
			{story()}
		</div>
	))
	.addWithInfo('Simple Table', () => {
		return (
			<div>
				<SimpleTable
				  elements={schema1.elements}
		      columnKeys={columnKeys1}
		      rowDataGetter={rowDataGetter}
		      rowRenderer={rowRenderer}
					classNameProvider={classNameProvider}
		      onScroll={action('onScroll called!')}
		      onClick={action('onClick called!')}
		      onDoubleClick={action('onDoubleClick called!')}
					onEnterRow={action('onEnterRow called!')}
					onLeaveRow={action('onLeaveRow called!')}
				/>
			</div>
		);
	})
	.addWithInfo('Simple Table with header and dnd', () => {
		return (
			<div>
				<SimpleTableWithDND
					initialState={initialStateWithDnD}
					elements={schema2.elements}
					columnKeys={columnKeys2}
					onScroll={action('onScroll called!')}
					onClick={action('onClick called!')}
					onDoubleClick={action('onDoubleClick called!')}
				/>
			</div>
		);
	});
