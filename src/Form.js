import React from 'react';

import RJSForm from 'react-jsonschema-form';
import Button from 'react-bootstrap/lib/Button';

import SchemaField from './SchemaField';

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = { formData: {} };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(change) {
		this.setState({ formData: change.formData });
	}

	render() {
		return (<RJSForm
			schema={this.props.schema}
			formData={this.props.formData || this.state.formData}
			onSubmit={this.props.onSubmit}
			onChange={this.props.onChange || this.handleChange}
			fields={{ SchemaField }}
		>
			<div>
				<Button bsStyle="primary">
					<i className="fa icon-edit" />Save
				</Button>
			</div>
		</RJSForm>);
	}
}

Form.propTypes = {
	schema: React.PropTypes.object.isRequired,
	formData: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onSubmit: React.PropTypes.func.isRequired,
};

export default Form;
