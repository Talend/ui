import React, { PropTypes } from 'react';
import UIFormComponent from './UIForm.component';

import { modelReducer, validationReducer } from './reducers';
import { mutateValue, validateAll } from './actions';

export default class UIForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			properties: { ...props.data.properties },
			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	/**
	 * Update the properties.
	 */
	componentWillReceiveProps({ properties }) {
		if (!properties) {
			return;
		}

		this.setState({
			properties: { ...properties },
		});
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
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 * @param properties the properties values
	 * @param errors the validation errors
	 */
	onSubmit(event, properties, errors) {
		const isValid = !Object.keys(errors).length;
		if (isValid) {
			this.props.onSubmit(event, properties);
		} else {
			const action = validateAll(this.props.formName, errors);
			this.setState({ errors: validationReducer(this.state.errors, action) });
		}
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
				onSubmit={this.onSubmit}
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
		/** The form name that will be used to create ids */
		formName: PropTypes.string,
		/** The change callback. It takes  */
		onChange: PropTypes.func,
		/** Form submit callback */
		onSubmit: PropTypes.func.isRequired,
		/**
		 * Tigger > after callback.
		 * Prototype: function onTrigger(properties, fieldName, value)
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,
		/**
		 * Custom validation function.
		 * Prototype: function validation(properties, fieldName, value)
		 * Return format : { valid: true|false, error: { message: 'my validation message' } }
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		validation: PropTypes.func,
	};
}
