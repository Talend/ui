import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UIFormComponent from './UIForm.component';

import {
	createForm,
	changeForm,
	removeForm,
	mutateValue,
	validate,
	validateAll,
} from './actions';

class UIForm extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	/**
	 * Create form on mount
	 */
	componentWillMount() {
		this.props.createForm(
			this.props.formName,
			this.props.data.jsonSchema,
			this.props.data.uiSchema,
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
	 * @param formName The form name
	 * @param schema The schema
	 * @param value The new value
	 * @param error The validation error
	 */
	onChange(formName, schema, value, error) {
		this.props.mutateValue(
			formName,
			schema,
			value,
			error
		);
		if (this.props.onChange) {
			this.props.onChange(
				schema,
				value,
				this.props.form.properties // TODO fix that, old props
			);
		}
	}

	render() {
		const { form } = this.props;

		return (
			<UIFormComponent
				formName={this.props.formName}
				id={this.props.id}
				jsonSchema={form.jsonSchema}
				uiSchema={form.uiSchema}
				properties={form.properties}
				errors={form.errors}

				customValidation={this.props.customValidation}
				onSubmit={this.props.onSubmit}
				onTrigger={this.props.onTrigger}
				widgets={this.props.widgets}

				onChange={this.onChange}
				onFormChange={this.props.onFormChange}
				onValidate={this.props.onValidate}
				onValidateAll={this.props.onValidateAll}
			/>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		/** Form schema initial configuration */
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
		 * Prototype: function customValidation(schema, value, properties)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/** The form name that will be used to create ids */
		formName: PropTypes.string.isRequired,
		/** The form id */
		id: PropTypes.string,
		/**
		 * The change callback.
		 * Prototype: function onChange(schema, value, properties)
		 */
		onChange: PropTypes.func,
		/** Form submit callback */
		onSubmit: PropTypes.func.isRequired,
		/**
		 * Tigger callback.
		 * Prototype: function onTrigger(type, schema, value, properties)
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,
		/** Custom widgets */
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types

		/**
		 * Form data from store.
		 * This is injected by react-redux. See mapStateToProps
		 */
		form: PropTypes.shape({
			/** Json schema that specify the data model */
			jsonSchema: PropTypes.object,
			/** UI schema that specify how to render the fields */
			uiSchema: PropTypes.array,
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
		 * Form change action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		onFormChange: PropTypes.func,
		/**
		 * Partial form validation action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		onValidate: PropTypes.func,
		/**
		 * Form validation action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		onValidateAll: PropTypes.func,
	};
}

UIForm.defaultProps = {
	form: {
		jsonSchema: {},
		uiSchema: [],
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
		onFormChange: bindActionCreators(changeForm, dispatch),
		onValidate: bindActionCreators(validate, dispatch),
		onValidateAll: bindActionCreators(validateAll, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UIForm);
