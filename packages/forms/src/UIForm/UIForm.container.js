import React, { PropTypes } from 'react';
import UIFormComponent from './UIForm.component';
import { formPropTypes, extractFormProps } from './utils/propTypes';

import { formReducer, modelReducer, validationReducer } from './reducers';
import {
	createForm,
	updateForm,
	updateFormData,
	updateFormDataAddArrayItem,
	updateFormDataRemoveArrayItem,
	updateFormDataReorderArrayItem,
	setError,
	setErrors,
} from './actions';

export default class UIForm extends React.Component {
	constructor(props) {
		super(props);

		const action = createForm(
			this.props.formName,
			this.props.data.jsonSchema,
			this.props.data.uiSchema,
			this.props.data.properties,
		);
		this.state = formReducer(undefined, action)[this.props.formName];

		this.onArrayAdd = this.onArrayAdd.bind(this);
		this.onArrayRemove = this.onArrayRemove.bind(this);
		this.onArrayReorder = this.onArrayReorder.bind(this);
		this.onChange = this.onChange.bind(this);
		this.updateForm = this.updateForm.bind(this);
		this.setError = this.setError.bind(this);
		this.setErrors = this.setErrors.bind(this);
	}

	/**
	 * Update the model and validation
	 * If onChange is provided, it is triggered
	 * @param event The change event
	 * @param payload { formName, schema, value, error } The change payload
	 * formName: The form name
	 * schema: The schema
	 * value: The new value
	 * error: The validation error
	 */
	onChange(event, payload) {
		const action = updateFormData(
			payload.formName,
			payload.schema,
			payload.value,
			payload.error
		);
		this.setState(
			{
				properties: modelReducer(this.state.properties, action),
				errors: validationReducer(this.state.errors, action),
			},
			this.props.onChange && (() => { this.props.onChange(event, payload); })
		);
	}

	/**
	 * Add an item in an form data array
	 * @param event The event that triggered this add
	 * @param payload { formName, schema, index, value } The add payload
	 * formName: The form name
	 * schema: The array schema
	 * index: The index where to insert the value
	 * value: The new value to insert
	 */
	onArrayAdd(event, payload) {
		const action = updateFormDataAddArrayItem(
			payload.formName,
			payload.schema,
			payload.index,
			payload.value
		);
		this.setState(
			{
				properties: modelReducer(this.state.properties, action),
			},
			this.props.onChange && (() => { this.props.onChange(event, payload); })
		);
	}

	/**
	 * Remove an item in an form data array
	 * @param event The event that triggered this removal
	 * @param payload { formName, schema, index } The removal payload
	 * formName: The form name
	 * schema: The array schema
	 * index: The index where to remove
	 */
	onArrayRemove(event, payload) {
		const action = updateFormDataRemoveArrayItem(
			payload.formName,
			payload.schema,
			payload.index
		);
		this.setState(
			{
				properties: modelReducer(this.state.properties, action),
				errors: validationReducer(this.state.errors, action),
			},
			this.props.onChange && (() => { this.props.onChange(event, payload); })
		);
	}

	/**
	 * Reorder an item in an form data array
	 * @param event The event that triggered this removal
	 * @param payload { formName, schema, previousIndex, nextIndex } The removal payload
	 * formName: The form name
	 * schema: The array schema
	 * previousIndex: The index where is the item to move
	 * nextIndex: The index where the item will be moved
	 */
	onArrayReorder(event, payload) {
		const action = updateFormDataReorderArrayItem(
			payload.formName,
			payload.schema,
			payload.previousIndex,
			payload.nextIndex
		);
		this.setState(
			{
				properties: modelReducer(this.state.properties, action),
				errors: validationReducer(this.state.errors, action),
			},
			this.props.onChange && (() => { this.props.onChange(event, payload); })
		);
	}

	/**
	 * Set partial fields validation in state
	 * @param formName the form name
	 * @param errors the validation errors
	 */
	setError(formName, errors) {
		const action = setError(formName, errors);
		this.setState({ errors: validationReducer(this.state.errors, action) });
	}

	/**
	 * Set all fields validation in state
	 * @param formName the form name
	 * @param errors the validation errors
	 */
	setErrors(formName, errors) {
		const action = setErrors(formName, errors);
		this.setState({ errors: validationReducer(this.state.errors, action) });
	}

	/**
	 * Update the form, the model and errors
	 * @param formName The form name
	 * @param jsonSchema The model schema
	 * @param uiSchema The UI schema
	 * @param properties The values
	 * @param errors The validation errors
	 */
	updateForm(formName, jsonSchema, uiSchema, properties, errors) {
		const action = updateForm(formName, jsonSchema, uiSchema, properties, errors);
		const nextState = formReducer(
			{ [formName]: this.state },
			action
		)[formName];

		this.setState(nextState);
	}

	render() {
		const { jsonSchema, uiSchema, properties, errors } = this.state;

		return (
			<UIFormComponent
				{...extractFormProps(this.props)}

				jsonSchema={jsonSchema}
				uiSchema={uiSchema}
				properties={properties}
				errors={errors}
				initialData={this.props.data}

				actions={this.props.actions}
				customValidation={this.props.customValidation}
				onTrigger={this.props.onTrigger}
				widgets={this.props.widgets}

				onArrayAdd={this.onArrayAdd}
				onArrayRemove={this.onArrayRemove}
				onArrayReorder={this.onArrayReorder}
				onChange={this.onChange}
				onReset={this.props.onReset}
				setError={this.setError}
				setErrors={this.setErrors}
				updateForm={this.updateForm}
			/>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		...formPropTypes,

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
		 * Actions buttons to display at the bottom of the form.
		 * If not provided, a single submit button is displayed.
		 */
		actions: UIFormComponent.propTypes.actions,
		/**
		 * Custom validation function.
		 * Prototype: function customValidation(schema, value, properties)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/**
		 * The change callback.
		 * Prototype: function onChange(event, { schema, value, properties })
		 */
		onChange: PropTypes.func,
		/**
		 * Tigger callback.
		 * Prototype: function onTrigger(event, { type, schema, value, properties })
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,
		/** Custom widgets */
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};
}
