import React from 'react';

import RJSSchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';

import Checkbox from './controls/Checkbox';
import Dropdown from './controls/Dropdown';
import Input from './controls/Input';
import InputNumber from './controls/Input.number';
import InputPassword from './controls/Input.password';

const fieldsMap = {
	integer: InputNumber,
	string: Input,
	password: InputPassword,
	boolean: Checkbox,
	showIf: Checkbox,
};

export function SchemaException(message) {
	this.message = message;
	this.name = 'SchemaException';
}

class SchemaField extends React.Component {

	constructor(props) {
		if (props.schema && Object.keys(props.schema).length === 0) {
			throw new SchemaException('You must provide a schema');
		}
		super(props);
	}

	render() {
		if (Array.isArray(this.props.schema.enum)) {
			return (<Dropdown {...this.props} />);
		}
		const uiWidgetType = this.props.schema['ui:widget'] && this.props.schema['ui:widget'].toLowerCase();
		const fieldType = this.props.schema.type && this.props.schema.type.toLowerCase();
		const schemaType =  uiWidgetType || fieldType;
		const FieldComponent = fieldsMap[schemaType] || RJSSchemaField;
		if (!FieldComponent) {
			throw new SchemaException(`Unknown property ${this.props.schema.type}`);
		}
		return (<FieldComponent {...this.props} />);
	}
}

SchemaField.propTypes = {
	schema: React.PropTypes.object.isRequired,
};

export default SchemaField;
