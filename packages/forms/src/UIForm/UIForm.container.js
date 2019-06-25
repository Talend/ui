import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React from 'react';

import UIFormTranslatedComponent from './UIForm.component';
import { formPropTypes } from './utils/propTypes';

/**
 * add error object on a formSchema if it doesn't exist
 * @param {FormSchema} formSchema
 * @return {FormSchema}
 */
function addErrorObject(formSchema) {
	if (!formSchema.errors) {
		return { errors: {}, ...formSchema };
	}
	return formSchema;
}

/**
 * reinit liveState with empty errors if it doesn't exist
 * @param {FormSchema} newFormSchema
 * @param {State} prevState
 * @return {State}
 */
const reinitLiveState = newFormSchema => () => ({
	liveState: addErrorObject(newFormSchema),
});

/**
 * update live state with new properties derived from user interacting
 * with the form
 * @param {Object} properties
 * @param {State} prevState
 * @return {State}
 */
const setLiveStateProperties = properties => prevState => ({
	...prevState,
	liveState: { ...prevState.liveState, properties },
});

/**
 * update liveState formSchema with errors
 * @param {Object} errors
 * @param {State} prevState
 * @return {State}
 */
const setLiveStateErrors = errors => prevState => ({
	...prevState,
	liveState: { ...prevState.liveState, errors },
});

/**
 * update initialState with liveState after a user submission of the form
 * @param {Object} newProperties
 * @param {State} prevState
 * @return {State}
 */
const setLiveAsInitialState = prevState => ({
	...prevState,
	initialState: prevState.liveState,
});

/**
 * update liveState with initialState, reseting form
 * @param {State} prevState
 * @return {State}
 */
const setInitialStateAsLiveState = prevState => ({
	...prevState,
	liveState: prevState.initialState,
});

export default class UIForm extends React.Component {
	static displayName = 'Container(UIForm)';
	constructor(props) {
		super(props);
		this.state = {
			initialState: addErrorObject(this.props.data),
			liveState: addErrorObject(this.props.data),
		};
		this.onChange = this.onChange.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.setErrors = this.setErrors.bind(this);
	}

	/**
	 * Update live and initialState with the new schema
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this.setState(reinitLiveState(nextProps.data));
		}
		if (nextProps.initialData !== this.props.initialData) {
			this.setState({
				initialState: addErrorObject(nextProps.initialData),
				liveState: addErrorObject(nextProps.initialData),
			});
		}
	}

	/**
	 * Update the model and validation
	 * If onChange is provided, it is triggered
	 * @param event The change event
	 * @param payload { schema, value, error } The change payload
	 * schema: The schema
	 * value: The new value
	 * error: The validation error
	 */
	onChange(event, payload) {
		this.setState(setLiveStateProperties(payload.properties));

		if (this.props.onChange) {
			this.props.onChange(event, payload);
		}
	}

	/**
	 * On user submit change local state and call this.props.onSubmit
	 * @param event submit event
	 * @param {Object} properties
	 * @param {Object} mergedSchema
	 */
	onSubmit(event, properties, mergedSchema) {
		this.setState(setLiveAsInitialState);
		if (typeof this.props.onSubmit === 'function') {
			this.props.onSubmit(event, properties, mergedSchema);
		}
	}

	/**
	 * On user reset change local state and call this.props.onReset
	 */
	onReset(event) {
		this.setState(setInitialStateAsLiveState);
		if (typeof this.props.onReset === 'function') {
			this.props.onReset(event);
		}
	}

	onTrigger(event, payload) {
		return this.props.onTrigger(event, payload).then(data => {
			const liveState = this.state.liveState;
			if (data.errors) {
				let errors = data.errors;
				if (typeof data.errors === 'function') {
					errors = data.errors(liveState.errors);
				}
				this.setErrors(event, errors);
			}
			if (data.properties) {
				let properties = data.properties;
				if (typeof properties === 'function') {
					properties = properties(liveState.properties);
				}

				const { schema, value, oldProperties } = payload;
				this.onChange(event, {
					schema,
					value,
					oldProperties,
					properties,
					formData: properties,
				});
			}
			return data;
		});
	}

	/**
	 * Set all fields validation in state
	 * @param errors the validation errors
	 * @param callback callback to call after setState
	 */
	setErrors(event, errors, callback) {
		this.setState(setLiveStateErrors(errors), callback);

		if (this.props.onErrors) {
			this.props.onErrors(event, errors);
		}
	}

	render() {
		const props = omit(this.props, 'data');
		return (
			<UIFormTranslatedComponent
				{...this.state.liveState}
				{...props}
				onChange={this.onChange}
				onTrigger={this.onTrigger}
				onSubmit={this.onSubmit}
				onReset={this.onReset}
				setErrors={this.setErrors}
			>
				{this.props.children}
			</UIFormTranslatedComponent>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		...formPropTypes,
		/**
		 * if initial data is present set initial state with it
		 * if not use juste data
		 * if initial data update
		 * update initialData and liveData with it
		 */
		initialData: PropTypes.shape({
			/** Json schema that specify the data model */
			jsonSchema: PropTypes.object,
			/** UI schema that specify how to render the fields */
			uiSchema: PropTypes.array,
			/**
			 * Form fields values.
			 * Note that it should contains @definitionName for triggers.
			 */
			properties: PropTypes.object,
			/**
			 * Form fields errors.
			 */
			errors: PropTypes.object,
		}),
		/** Form schema configuration */
		data: PropTypes.shape({
			/** Json schema that specify the data model */
			jsonSchema: PropTypes.object,
			/** UI schema that specify how to render the fields */
			uiSchema: PropTypes.array,
			/**
			 * Form fields values.
			 * Note that it should contains @definitionName for triggers.
			 */
			properties: PropTypes.object,
			/**
			 * Form fields errors.
			 */
			errors: PropTypes.object,
		}),
		/**
		 * Actions buttons to display at the bottom of the form.
		 * If not provided, a single submit button is displayed.
		 */
		actions: UIFormTranslatedComponent.propTypes.actions,
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
		 * The errors callback.
		 * Prototype: function onErrors(event, errors)
		 */
		onErrors: PropTypes.func,
		/**
		 * Trigger callback.
		 * Prototype: function onTrigger(event, { trigger, schema, properties })
		 */
		onTrigger: PropTypes.func,
		/** Custom templates */
		templates: PropTypes.object,
		/** Custom widgets */
		widgets: PropTypes.object,
		/** Display mode: example 'text' */
		displayMode: PropTypes.string,
	};
}
