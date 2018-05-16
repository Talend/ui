import PropTypes from 'prop-types';
import React from 'react';

import RJSForm from 'react-jsonschema-form/lib/index';
import Action from '@talend/react-components/lib/Actions/Action';

import { UIForm } from './UIForm';
import { wrapCustomWidget } from './UIForm/merge';
import BooleanField from './fields/BooleanField';
import ObjectField from './fields/ObjectField';
import StringField from './fields/StringField';
import ArrayField from './fields/ArrayField';
import FieldTemplate from './templates/FieldTemplate';
import ToggleWidget from './widgets/ToggleWidget';
import TabsWidget from './widgets/TabsWidget';
import KeyValueWidget from './widgets/KeyValueWidget';
import MultiSelectTagWidget from './widgets/MultiSelectTagWidget/MultiSelectTagWidget';
import DatalistWidget from './widgets/DatalistWidget';
import EnumerationWidget from './widgets/EnumerationWidget/EnumerationWidget';
import CodeWidget from './widgets/CodeWidget';
import ColumnsWidget from './widgets/ColumnsWidget';
import ListViewWidget from './widgets/ListViewWidget/ListViewWidget';
import { I18N_DOMAIN_FORMS } from './constants';

/**
 * @type {string} After trigger name for field value has changed
 */
const TRIGGER_AFTER = 'after';

export const customWidgets = {
	toggle: ToggleWidget,
	tabs: TabsWidget,
	keyValue: KeyValueWidget,
	multiSelectTag: MultiSelectTagWidget,
	datalist: DatalistWidget,
	enumeration: EnumerationWidget,
	code: CodeWidget,
	columns: ColumnsWidget,
	listview: ListViewWidget,
};

const customFields = {
	ArrayField,
	BooleanField,
	ObjectField,
	StringField,
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
			</Action>
		));
	}
	return <Action bsStyle="primary" onClick={() => {}} type="submit" label="Submit" />;
}

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSchemaChange = this.handleSchemaChange.bind(this);
		this.handleSchemaSubmit = this.handleSchemaSubmit.bind(this);
		this.handleActionClick = this.handleActionClick.bind(this);
	}

	handleSchemaSubmit(changes) {
		if (this.props.onSubmit) {
			this.props.onSubmit(null, changes);
		}
	}

	/**
	 * Handle changes only if modified field has "ui:trigger" option
	 * use onTrigger property to take advantage of this feature
	 * @param changes New formData
	 * @param id Form id is provided
	 * @param name Name of the modified field
	 * @param value New value of the field
	 * @param options Options from uiSchema for this field
	 */
	handleSchemaChange(changes, id, name, value, options) {
		const triggers = options && options.trigger;
		if (triggers && triggers.indexOf(TRIGGER_AFTER) !== -1) {
			if (this.props.onTrigger) {
				this.props.onTrigger(changes, id, name, value);
			}
		}
	}

	handleActionClick(onClick) {
		if (onClick) {
			return (event, data) => onClick(event, { ...data, ...(this.form && this.form.state) });
		}
		return () => {};
	}

	/**
	 * Handle changes of form @see https://github.com/mozilla-services/react-jsonschema-form
	 */
	handleChange(...args) {
		if (this.props.onChange) {
			this.props.onChange(null, ...args);
		}
	}

	render() {
		if (Array.isArray(this.props.data.uiSchema)) {
			return <UIForm {...this.props} />;
		} else if (this.props.uiform) {
			const props = Object.assign({}, this.props);
			props.moz = true;
			if (props.widgets) {
				Object.keys(props.widgets)
					.filter(key => props.widgets[key].displayName !== 'TFMigratedWidget')
					.forEach(key => {
						props.widgets[key] = wrapCustomWidget(props.widgets[key]);
					});
			}
			return <UIForm {...props} />;
		}
		const schema = this.props.data && this.props.data.jsonSchema;
		if (!schema) {
			throw Error('You must provide data with valid JSON Schema');
		}

		const widgets = {
			...customWidgets,
			...this.props.widgets,
		};

		const formData = this.props.data && this.props.data.properties;

		const fields = {
			...customFields,
			...this.props.fields,
		};

		const customFormContext = {
			handleSchemaChange: this.handleSchemaChange,
			handleAction: this.props.handleAction,
			...this.props.formContext,
		};

		return (
			<RJSForm
				{...this.props}
				schema={schema}
				uiSchema={this.props.data && this.props.data.uiSchema}
				formData={formData}
				formContext={customFormContext}
				fields={fields}
				FieldTemplate={FieldTemplate}
				widgets={widgets}
				onChange={this.handleChange}
				onSubmit={this.handleSchemaSubmit}
				ref={c => {
					this.form = c;
				}}
			>
				{this.props.children}
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
	properties: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
});

export const ActionsPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		style: PropTypes.string,
		type: PropTypes.oneOf(['submit', 'reset', 'button']),
		onClick: PropTypes.func,
		label: PropTypes.string,
		icon: PropTypes.string,
		title: PropTypes.string,
	}),
);

if (process.env.NODE_ENV !== 'production') {
	Form.propTypes = {
		uiform: PropTypes.bool,
		data: DataPropTypes.isRequired,
		onChange: PropTypes.func,
		onTrigger: PropTypes.func,
		onSubmit: PropTypes.func,
		actions: ActionsPropTypes,
		buttonBlockClass: PropTypes.string,
		handleAction: PropTypes.func,
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		formContext: PropTypes.func,
		children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
		fields: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};
}

Form.defaultProps = {
	buttonBlockClass: 'form-actions',
};

Form.displayName = 'TalendForm';

export { I18N_DOMAIN_FORMS };
export default Form;
