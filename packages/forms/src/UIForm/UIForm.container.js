import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React from 'react';

import UIFormTranslatedComponent from './UIForm.component';
import { formPropTypes } from './utils/propTypes';
import { merge } from '@talend/json-schema-form-core';

function addErrorObject(formSchema) {
	if (!formSchema.errors) {
		return { errors: {}, ...formSchema };
	}
	return formSchema;
}

function reinitState(newFormSchema) {
	return function() {
		return {
			initialState: addErrorObject(newFormSchema),
			liveState: addErrorObject(newFormSchema),
		};
	};
}

function change(properties) {
	return function(prevState) {
		return {
			...prevState,
			liveState: { ...prevState.liveState, properties: properties },
		};
	};
}

function setErrors(errors) {
	return function(prevState) {
		return {
			...prevState,
			liveState: { ...prevState.liveState, errors },
		};
	};
}

function submit(newProperties) {
	return function(prevState) {
		const newFormSchema = { ...prevState.liveState, properties: newProperties };
		return {
			initialState: newFormSchema,
			liveState: newFormSchema,
		};
	};
}

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
			this.setState(reinitState(nextProps.data));
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
		this.setState(change(payload.properties));

		if (this.props.onChange) {
			this.props.onChange(event, payload);
		}
	}

	onSubmit(_, properties) {
		this.setState(submit(properties));
	}

	onReset() {
		this.setState(prevState => ({ ...prevState, liveState: prevState.initialState }));
	}

	onTrigger(event, payload) {
		return this.props.onTrigger(event, payload).then(data => {
			if (data.errors) {
				this.setErrors(event, data.errors);
			}
			return data;
		});
	}

	/**
	 * Set all fields validation in state
	 * @param errors the validation errors
	 */
	setErrors(event, errors) {
		this.setState(setErrors(errors));
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
