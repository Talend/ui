import React from 'react';

import RJSSchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import { optionsList, asNumber } from 'react-jsonschema-form/lib/utils';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import Checkbox from './Checkbox';

const Input = ({ formData, name, onChange, schema, required, type }) => <FormGroup>
	<ControlLabel>{name}</ControlLabel>
	<FormControl
		type={type}
		value={formData || schema.default}
		required={required}
		onChange={(e) => onChange(e.target.value)}
	/>
</FormGroup>;


Input.defaultProps = {
	required: false,
};

Input.propTypes = {
	formData: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
	]),
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	required: React.PropTypes.bool,
	schema: React.PropTypes.object.isRequired,
	type: React.PropTypes.string,
};

const Number = (props) => <Input
	{...props}
	type="number"
	onChange={(val) => props.onChange(asNumber(val))}
/>;

Number.propTypes = {
	onChange: React.PropTypes.func,
};

const Dropdown = ({ name, onChange, schema }) => <FormGroup>
	<ControlLabel>{name}</ControlLabel>
	<FormControl
		componentClass="select"
		label={name}
		onChange={(e) => onChange(e.target.value)}
	>
			{optionsList(schema).map((o, i) => <option key={i} value={o.value}>{o.label}</option>)}
	</FormControl>
</FormGroup>;

Dropdown.propTypes = {
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	schema: React.PropTypes.object.isRequired,
};

const fieldsMap = {
	integer: Number,
	string: Input,
	password: Input,
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
		const FieldComponent = fieldsMap[this.props.schema.type] || RJSSchemaField;
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
