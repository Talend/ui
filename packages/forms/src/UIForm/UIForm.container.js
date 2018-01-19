import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React from 'react';

import UIFormComponent from './UIForm.component';
import { formPropTypes, extractFormProps } from './utils/propTypes';
import { mutateValue } from './utils/properties';

const OMIT_PROPS = ['data', 'onChange', 'onTrigger', 'onReset'];

export default class UIForm extends React.Component {
	static displayName = 'Container(UIForm)';
	constructor(props) {
		super(props);
		this.state = {
			...this.props.data,
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.onReset = this.onReset.bind(this);
		this.setErrors = this.setErrors.bind(this);
	}

	/**
	 * Update the state with the new schema.
	 * @param jsonSchema
	 * @param uiSchema
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
		if (this.props.moz) {
			this.setState({
				properties: mutateValue(this.state.properties, event.schema.key, event.value),
			});
			if (this.props.onChange) {
				this.props.onChange(event);
			}
		} else {
			this.setState({
				properties: mutateValue(this.state.properties, payload.schema.key, payload.value),
			});
			if (this.props.onChange) {
				this.props.onChange(event, payload);
			}
		}
	}

	onReset(event) {
		this.setState({
			properties: this.props.data.properties,
		});
		if (this.props.onReset) {
			this.props.onReset(event);
		}
	}

	/**
	 * Set all fields validation in state
	 * @param errors the validation errors
	 */
	setErrors(errors) {
		this.setState({ errors });
	}

	render() {
		const props = omit(this.props, OMIT_PROPS);

		return (
			<UIFormComponent
				initialData={this.props.data}
				onChange={this.onChange}
				onReset={this.onReset}
				setErrors={this.setErrors}
				{...this.state}
				{...props}
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
		 * Trigger callback.
		 * Prototype: function onTrigger(event, { trigger, schema, properties })
		 */
		onTrigger: PropTypes.func,
		/** Custom widgets */
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};
}
