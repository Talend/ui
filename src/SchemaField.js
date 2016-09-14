import React from 'react';

import { optionsList } from 'react-jsonschema-form/lib/utils';
import RJSSchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import Checkbox from './Checkbox';
import ShowIf from './ShowIf';

const Input = (props) => <FormGroup>
	<ControlLabel>{props.name}</ControlLabel>
	<FormControl
		type={props.type}
		value={props.formData || props.schema.default}
		required={props.required}
		onChange={props.onChange}
	/>
</FormGroup>;


Input.defaultProps = {
	required: false,
	type: 'text',
};

Input.propTypes = {
	type: React.PropTypes.string,
	name: React.PropTypes.string,
	required: React.PropTypes.bool,
	schema: React.PropTypes.object.isRequired,
	formData: React.PropTypes.string,
	onChange: React.PropTypes.func,
};

const Dropdown = (props) => <FormGroup>
	<ControlLabel>{props.name}</ControlLabel>
	<FormControl
		componentClass="select"
		label={props.name}
		onChange={props.onChange}
		value={props.formData || props.schema.default}
	/>
</FormGroup>;

Dropdown.propTypes = {
	name: React.PropTypes.string,
	schema: React.PropTypes.object.isRequired,
	formData: React.PropTypes.string,
	value: React.PropTypes.string,
	auto: React.PropTypes.bool,
	allowBlank: React.PropTypes.bool,
	onChange: React.PropTypes.func,
};

const fieldsMap = {
	integer: Input,
	string: Input,
	password: Input,
	boolean: Checkbox,
	showIf: ShowIf,
};

class SchemaField extends React.Component {

	constructor(props) {
		super(props);
		this.handleSchemaChange.bind(this);
	}

	handleSchemaChange(schema) {
		console.debug('SCHEMA CHANGE', schema);
	}

	render() {
		if (Array.isArray(this.props.schema.enum)) {
			return (<Dropdown {...this.props} />);
		}

		const FieldComponent = fieldsMap[this.props.schema.type] || RJSSchemaField;
		return (<FieldComponent {...this.props} onSchemaChange={this.handleSchemaChange} />);
	}
}

SchemaField.propTypes = {
	schema: React.PropTypes.object,
};

export default SchemaField;
