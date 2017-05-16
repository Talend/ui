import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UIFormComponent from './UIForm.component';

import {
	createForm,
	removeForm,
	mutateValue,
	validateAll,
} from './actions';

class UIForm extends React.Component {
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
	 * Create form on mount
	 */
	componentWillMount() {
		this.props.createForm(
			this.props.formName,
			this.props.data.properties,
		);
	}

	/**
	 * Remove form on unmount
	 */
	componentWillUnmount() {
		this.props.removeForm(this.props.formName);
	}

	/**
	 * Update the model and validation
	 * If onChange is provided, it is triggered
	 * @param schema The schema
	 * @param value The new value
	 * @param error The validation error
	 */
	onChange(schema, value, error) {
		this.props.mutateValue(
			this.props.formName,
			schema,
			value,
			error
		);
		if (this.props.onChange) {
			this.props.onChange({
				jsonSchema: this.props.data.jsonSchema,
				uiSchema: this.props.data.uiSchema,
				properties: this.props.form.properties, // TODO fix that, old props
			});
		}
	}

	/**
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 * @param properties the properties values
	 * @param errors the validations errors
	 */
	onSubmit(event, properties, errors) {
		event.preventDefault();
		const isValid = !Object.keys(errors).length;
		if (isValid) {
			this.props.onSubmit(event, properties);
		} else {
			this.props.validateAll(
				this.props.formName,
				errors
			);
		}
	}

	render() {
		const { data, form, ...restProps } = this.props;

		return (
			<UIFormComponent
				{...restProps}
				jsonSchema={data.jsonSchema}
				uiSchema={data.uiSchema}
				properties={form.properties}
				errors={form.errors}
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
		formName: PropTypes.string.isRequired,
		/** The change callback. */
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
		 * Return format : string
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		validation: PropTypes.func,

		/**
		 * Form data from store.
		 * This is injected by react-redux. See mapStateToProps
		 */
		form: PropTypes.shape({
			/** Form properties values */
			properties: PropTypes.object,
			/** Form validations errors */
			errors: PropTypes.object,
		}),
		/**
		 * Form creation action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		createForm: PropTypes.func,
		/**
		 * Form removal action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		removeForm: PropTypes.func,
		/**
		 * Value mutation action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		mutateValue: PropTypes.func,
		/**
		 * Form validation action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		validateAll: PropTypes.func,
	};
}

UIForm.defaultProps = {
	form: {
		properties: {},
		errors: {},
	},
};

function mapStateToProps(state, ownProps) {
	return { form: state.forms[ownProps.formName] };
}

function mapDispatchToProps(dispatch) {
	return {
		createForm: bindActionCreators(createForm, dispatch),
		removeForm: bindActionCreators(removeForm, dispatch),
		mutateValue: bindActionCreators(mutateValue, dispatch),
		validateAll: bindActionCreators(validateAll, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UIForm);
