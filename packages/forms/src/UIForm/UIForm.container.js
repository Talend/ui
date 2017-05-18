import React, { PropTypes } from 'react';
import UIFormComponent from './UIForm.component';

import { modelReducer, validationReducer } from './reducers';
import { mutateValue, validate, validateAll } from './actions';

export default class UIForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			properties: { ...props.data.properties },
			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onValidate = this.onValidate.bind(this);
		this.onValidateAll = this.onValidateAll.bind(this);
	}

	/**
	 * Update the model and validation
	 * If onChange is provided, it is triggered
	 * @param schema The schema
	 * @param value The new value
	 * @param error The validation error
	 */
	onChange(schema, value, error) {
		const action = mutateValue(this.props.formName, schema, value, error);
		this.setState(
			{
				properties: modelReducer(this.state.properties, action),
				errors: validationReducer(this.state.errors, action),
			},
			() => {
				if (this.props.onChange) {
					this.props.onChange({
						jsonSchema: this.props.data.jsonSchema,
						uiSchema: this.props.data.uiSchema,
						properties: this.state.properties,
					});
				}
			}
		);
	}

	/**
	 * Set partial fields validation in state
	 * @param formName the form name
	 * @param errors the validation errors
	 */
	onValidate(formName, errors) {
		const action = validate(formName, errors);
		this.setState({ errors: validationReducer(this.state.errors, action) });
	}

	/**
	 * Set all fields validation in state
	 * @param formName the form name
	 * @param errors the validation errors
	 */
	onValidateAll(formName, errors) {
		const action = validateAll(formName, errors);
		this.setState({ errors: validationReducer(this.state.errors, action) });
	}

	render() {
		const { data, ...restProps } = this.props;
		const { properties, errors } = this.state;

		return (
			<UIFormComponent
				{...restProps}
				jsonSchema={data.jsonSchema}
				uiSchema={data.uiSchema}
				properties={properties}
				errors={errors}
				onChange={this.onChange}
				onValidate={this.onValidate}
				onValidateAll={this.onValidateAll}
			/>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		/** Form schema configuration */
		data: PropTypes.shape({
			/** Json schema that specify the data model */
			jsonSchema: PropTypes.object,
			/** UI schema that specify how to render the fields */
			uiSchema: PropTypes.array,
			/**
			 * Form fields initial values.
			 * Note that it should contains @definitionName for triggers.
			 */
			properties: PropTypes.object,
		}),
		/**
		 * Custom validation function.
		 * Prototype: function customValidation(properties, fieldName, value)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/** The form name that will be used to create ids */
		formName: PropTypes.string,
		/** The change callback. It takes  */
		onChange: PropTypes.func,
		/** Form submit callback */
		onSubmit: PropTypes.func.isRequired,
		/**
		 * Tigger > after callback.
		 * Prototype: function onTrigger(properties, schema, value)
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,
	};
}
