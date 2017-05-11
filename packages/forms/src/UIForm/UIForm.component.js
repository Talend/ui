import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { merge, validate } from 'talend-json-schema-form-core';

import Widget from './Widget';
import { validateAll } from './utils/validation';
import { mutateValue } from './utils/properties';

class UIForm extends React.Component {
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema, properties } = props.data;
		this.state = {
			mergedSchema: merge(jsonSchema, uiSchema),
			properties: { ...properties },
			validations: {},
		};
		console.log(this.state.mergedSchema)

		this.consolidate = this.consolidate.bind(this);
		this.submit = this.submit.bind(this);
	}

	/**
	 * Update the state with the new schema.
	 * @param jsonSchema
	 * @param uiSchema
	 * @param properties
	 */
	componentWillReceiveProps({ jsonSchema, uiSchema, properties }) {
		if (!jsonSchema || !uiSchema || !properties) {
			return;
		}
		this.setState(() => ({
			mergedSchema: merge(jsonSchema, uiSchema),
			properties: { ...properties },
			validations: {},
		}));
	}

	/**
	 * Consolidate form with the new value.
	 * This updates the validation on the modified field.
	 * @param event The change event
	 * @param schema The schema of the changed field
	 * @param value The new field value
	 */
	consolidate(event, schema, value) {
		this.setState(prevState => ({
			properties: mutateValue(prevState.properties, schema.key, value),
			validations: {
				...prevState.validations,
				[schema.key]: validate(schema, value),
			},
		}));
	}

	/**
	 * Triggers a validation and update state.
	 * @returns {boolean} true if the form is valid, false otherwise
	 */
	isValid() {
		const validations = validateAll(this.state.mergedSchema, this.state.properties);
		const keys = Object.keys(validations);
		for (const key of keys) {
			if (!validations[key].valid) {
				this.setState(() => ({ validations }));
				return false;
			}
		}
		return true;
	}

	/**
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 */
	submit(event) {
		event.preventDefault();
		if (this.isValid()) {
			this.props.onSubmit(event, this.state.properties);
		}
	}

	render() {
		const { formName } = this.props;
		const { properties, validations } = this.state;

		return (
			<form onSubmit={this.submit}>
				{
					this.state.mergedSchema.map((nextSchema, index) => (
						<Widget
							key={index}
							formName={formName}
							onChange={this.consolidate}
							schema={nextSchema}
							properties={properties}
							validations={validations}
						/>
					))
				}
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		data: PropTypes.shape({
			jsonSchema: PropTypes.object,
			uiSchema: PropTypes.array,
			properties: PropTypes.object,
		}),
		formName: PropTypes.string,
		onSubmit: PropTypes.func.isRequired,
	};
}

export default reduxForm({
	form: 'form', // a unique name for this form
})(UIForm);
