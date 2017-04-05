import React, { PropTypes } from 'react';

import RJSForm from 'react-jsonschema-form/lib/index';

import { Action } from 'react-talend-components';

import BooleanField from './fields/BooleanField';
import ObjectField from './fields/ObjectField';
import StringField from './fields/StringField';
import ArrayField from './fields/ArrayField';
import FieldTemplate from './templates/FieldTemplate';
import ToggleWidget from './widgets/ToggleWidget';
import TabsWidget from './widgets/TabsWidget';
import KeyValueWidget from './widgets/KeyValueWidget';
import MultiSelectTagWidget from './widgets/MultiSelectTagWidget/MultiSelectTagWidget';
import DatalistWidget from './widgets/DatalistWidget/DatalistWidget';
import EnumerationWidget from './widgets/EnumerationWidget/EnumerationWidget';

/**
 * @type {string} After trigger name for field value has changed
 */
const TRIGGER_AFTER = 'after';

const customWidgets = {
	toggle: ToggleWidget,
	tabs: TabsWidget,
	keyValue: KeyValueWidget,
	multiSelectTag: MultiSelectTagWidget,
	datalist: DatalistWidget,
	enumeration: EnumerationWidget,
};

export function renderActionIcon(icon) {
	if (icon) {
		return <i className={icon} />;
	}
	return null;
}

export function renderActions(actions, handleActionClick) {
	if (actions) {
		return actions.map((action, index) => (
			<Action
				key={index}
				bsStyle={action.style}
				label={action.title}
				{...Object.assign(action, { onClick: handleActionClick(action.onClick) })}
			>
				{renderActionIcon(action.icon)}
				{action.label}
			</Action>)
		);
	}
	return (<Action
		bsStyle="primary"
		onClick={() => {}}
		type="submit"
		label="Submit"
	/>);
}

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.handleSchemaChange = this.handleSchemaChange.bind(this);
		this.handleSchemaSubmit = this.handleSchemaSubmit.bind(this);
		this.handleActionClick = this.handleActionClick.bind(this);
	}

	handleSchemaSubmit(changes) {
		if (this.props.onSubmit) {
			this.props.onSubmit(changes);
		}
	}

	/**
	 * Handle changes only if modified field has "ui:trigger" option
	 * @param changes New formData
	 * @param id Form id is provided
	 * @param name Name of the modified field
	 * @param value New value of the field
	 * @param options Options from uiSchema for this field
	 */
	handleSchemaChange(changes, id, name, value, options) {
		const triggers = options && options.trigger;
		if (triggers && triggers.indexOf(TRIGGER_AFTER) !== -1) {
			if (this.props.onChange) {
				this.props.onChange(changes, id, name, value);
			}
		}
	}

	handleActionClick(onClick) {
		if (onClick) {
			return (event, data) => onClick(event, { ...data, ...this.form.state });
		}
		return () => {};
	}

	render() {
		const schema = this.props.data && this.props.data.jsonSchema;
		if (!schema) {
			throw Error('You must provide data with valid JSON Schema');
		}

		const widgets = {
			...customWidgets,
			...this.props.widgets || {},
		};

		const formData = this.props.data && this.props.data.properties;

		const customFields = {
			ArrayField,
			BooleanField,
			ObjectField,
			StringField,
		};

		const customFormContext = {
			handleSchemaChange: this.handleSchemaChange,
			handleAction: this.props.handleAction,
		};

		return (
			<RJSForm
				{...this.props}
				schema={schema}
				uiSchema={this.props.data && this.props.data.uiSchema}
				formData={formData}
				formContext={customFormContext}
				fields={customFields}
				FieldTemplate={FieldTemplate}
				widgets={widgets}
				onChange={undefined}
				onSubmit={this.handleSchemaSubmit}
				ref={(c) => {
					this.form = c;
				}}
			>
				<div className={this.props.buttonBlockClass}>
					{renderActions(this.props.actions, this.handleActionClick)}
				</div>
			</RJSForm>
		);
	}
}

export const DataPropTypes = PropTypes.shape({
	jsonSchema: PropTypes.object.isRequired,
	uiSchema: PropTypes.object,
	properties: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
});

export const ActionsPropTypes = PropTypes.arrayOf(PropTypes.shape({
	style: PropTypes.string,
	type: PropTypes.oneOf(['submit', 'reset', 'button']),
	onClick: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.string,
	title: PropTypes.string,
}));

Form.propTypes = {
	data: DataPropTypes.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	actions: ActionsPropTypes,
	buttonBlockClass: PropTypes.string,
	handleAction: PropTypes.func,
	widgets: PropTypes.object,
};

Form.defaultProps = {
	buttonBlockClass: 'form-actions',
};

export default Form;
