import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React from 'react';

import UIFormComponent from './UIForm.component';
import { formPropTypes } from './utils/propTypes';

export default class UIForm extends React.Component {
	static displayName = 'Container(UIForm)';
	constructor(props) {
		super(props);
		this.state = { ...this.props.data };
		if (!this.state.errors) {
			this.state.errors = {};
		}
		this.onChange = this.onChange.bind(this);
		this.setErrors = this.setErrors.bind(this);
	}

	/**
	 * Update the state with the new schema.
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({
			...nextProps.data,
		});
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
		this.setState({
			properties: payload.properties,
		});

		if (!this.props.onChange) {
			return;
		} else if (this.props.moz) {
			this.props.onChange(payload);
		} else {
			this.props.onChange(event, payload);
		}
	}

	/**
	 * Set all fields validation in state
	 * @param errors the validation errors
	 */
	setErrors(event, errors) {
		this.setState({ errors });

		if (this.props.onErrors) {
			this.props.onErrors(event, errors);
		}
	}

	render() {
		const props = omit(this.props, 'data');

		return (
			<UIFormComponent
				{...this.state}
				{...props}
				onChange={this.onChange}
				setErrors={this.setErrors}
			>
				{this.props.children}
			</UIFormComponent>
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
		 * The errors callback.
		 * Prototype: function onErrors(event, errors)
		 */
		onErrors: PropTypes.func,
		/**
		 * Trigger callback.
		 * Prototype: function onTrigger(event, { trigger, schema, properties })
		 */
		onTrigger: PropTypes.func,
		/** Custom widgets */
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};
}
