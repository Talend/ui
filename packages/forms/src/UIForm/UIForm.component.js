import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
	schemaDefaults,
	jsonref,
	merge,
	traverseSchema,
	traverseForm,
} from 'json-schema-form-core';

class UIForm extends React.Component {

	render() {
		const { jsonSchema, uiSchema, properties } = this.props.data || {};
		debugger;
		schemaDefaults;
		jsonref;
		merge;
		traverseSchema;
		traverseForm;
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div>
					<label htmlFor="firstName">First Name</label>
					<Field name="firstName" component="input" type="text" />
				</div>
				<div>
					<label htmlFor="lastName">Last Name</label>
					<Field name="lastName" component="input" type="text" />
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<Field name="email" component="input" type="email" />
				</div>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

UIForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
	form: 'form' // a unique name for this form
})(UIForm);
