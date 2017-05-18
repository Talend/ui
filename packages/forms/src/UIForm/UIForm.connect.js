import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UIFormComponent from './UIForm.component';

import {
	createForm,
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
			this.props.onChange(
				this.props.form.properties, // TODO fix that, old props
				schema,
				value
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
		formName: PropTypes.string.isRequired,
		/** The change callback. */
		onChange: PropTypes.func,
		/** Form submit callback */
		onSubmit: PropTypes.func.isRequired,
		/**
		 * Tigger > after callback.
		 * Prototype: function onTrigger(properties, schema, value)
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,

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
		onValidateAll: PropTypes.func,
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
		onValidate: bindActionCreators(validate, dispatch),
		onValidateAll: bindActionCreators(validateAll, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UIForm);
