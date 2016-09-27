import React from 'react';

import RJSForm from 'react-jsonschema-form';
import Button from 'react-bootstrap/lib/Button';

import SchemaField from './SchemaField';

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.handleSchemaChange = this.handleSchemaChange.bind(this);
	}

	handleSchemaChange(change) {
		// TODO: Handle Schema Change
	}

	render() {
		return (<RJSForm
			schema={this.props.schema}
			formData={this.props.formData}
			onSubmit={this.props.onSubmit}
			fields={{ SchemaField }}
			onChange={this.handleSchemaChange}
		>
			<Button bsStyle="primary" type="submit">
				<i className="fa fa-pencil" />Save
			</Button>
		</RJSForm>
		);
	}
}

Form.propTypes = {
	formData: React.PropTypes.object,
	onSubmit: React.PropTypes.func.isRequired,
	schema: React.PropTypes.object.isRequired,
};

export default Form;
