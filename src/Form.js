import React from 'react';

import RJSForm from 'react-jsonschema-form';

import Button from 'react-bootstrap/lib/Button';

import SchemaField from './SchemaField';
import RadioOrSelectWidget from './widgets/RadioOrSelectWidget';

const customWidgets = {
	radioOrSelectWidget: RadioOrSelectWidget,
};

const customUiSchema = {
	'ui:widget': 'radioOrSelectWidget',
};

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.handleSchemaChange = this.handleSchemaChange.bind(this);
	}

	handleSchemaChange(change) {
		// TODO: Handle Schema Change
		return this.props.onChange && this.props.onChange(change);
	}

	render() {
		const schema = (this.props.data && this.props.data.jsonSchema) ||
			this.props.jsonSchema || this.props.schema;
		const uiSchema = {
			...((this.props.data && this.props.data.uiSchema) || this.props.uiSchema),
			...customUiSchema,
		};
		const formData = (this.props.data && this.props.data.properties) || this.props.formData;
		const fields = { SchemaField };
		return (
			<RJSForm
				{...this.props}
				schema={schema}
				uiSchema={uiSchema}
				formData={formData}
				fields={fields}
				widgets={customWidgets}
				onChange={this.handleSchemaChange}
			>
				<Button bsStyle="link">Cancel</Button>
				<Button bsStyle="primary" type="submit">Submit</Button>
			</RJSForm>
		);
	}
}

Form.propTypes = {
	data: React.PropTypes.shape({
		jsonSchema: React.PropTypes.object,
		uiSchema: React.PropTypes.object,
		properties: React.PropTypes.object,
		formData: React.PropTypes.object,
	}),
	jsonSchema: React.PropTypes.object,
	uiSchema: React.PropTypes.object,
	formData: React.PropTypes.object,
	schema: React.PropTypes.object,
	onChange: React.PropTypes.func,
};

export default Form;
