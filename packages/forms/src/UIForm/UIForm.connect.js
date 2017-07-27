import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UIFormComponent from './UIForm.component';
import { formPropTypes, extractFormProps } from './utils/propTypes';

import {
	createForm,
	removeForm,
	updateForm,
	updateFormData,
	updateFormDataAddArrayItem,
	updateFormDataRemoveArrayItem,
	updateFormDataReorderArrayItem,
	setError,
	setErrors,
} from './actions';

class UIForm extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onArrayAdd = this.onArrayAdd.bind(this);
		this.onArrayRemove = this.onArrayRemove.bind(this);
		this.onArrayReorder = this.onArrayReorder.bind(this);
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
	 * @param event The change event
	 * @param payload { formName, schema, value, error } The change payload
	 * formName: The form name
	 * schema: The schema
	 * value: The new value
	 * error: The validation error
	 */
	onChange(event, payload) {
		this.props.updateFormData(
			payload.formName,
			payload.schema,
			payload.value,
			payload.error
		);
		if (this.props.onChange) {
			this.props.onChange(event, payload);
		}
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
		this.props.updateFormDataAddArrayItem(
			payload.formName,
			payload.schema,
			payload.index,
			payload.value
		);
		if (this.props.onChange) {
			this.props.onChange(event, payload);
		}
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
		this.props.updateFormDataRemoveArrayItem(
			payload.formName,
			payload.schema,
			payload.index
		);
		if (this.props.onChange) {
			this.props.onChange(event, payload);
		}
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
		this.props.updateFormDataReorderArrayItem(
			payload.formName,
			payload.schema,
			payload.previousIndex,
			payload.nextIndex
		);
		if (this.props.onChange) {
			this.props.onChange(event, payload);
		}
	}

	render() {
		const { form } = this.props;

		return (
			<UIFormComponent
				{...extractFormProps(this.props)}

				jsonSchema={form.jsonSchema}
				uiSchema={form.uiSchema}
				properties={form.properties}
				errors={form.errors}
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
				setError={this.props.setError}
				setErrors={this.props.setErrors}
				updateForm={this.props.updateForm}
			/>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		...formPropTypes,

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
		 * Form update action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		updateForm: PropTypes.func,
		/**
		 * Value mutation action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		updateFormData: PropTypes.func,

		/**
		 * Value mutation : add an item in an array identified by schema.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		updateFormDataAddArrayItem: PropTypes.func,
		/**
		 * Value mutation : remove an item in an array identified by schema.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		updateFormDataRemoveArrayItem: PropTypes.func,
		/**
		 * Value mutation : reorder an item in an array identified by schema.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		updateFormDataReorderArrayItem: PropTypes.func,
		/**
		 * Partial form validation action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		setError: PropTypes.func,
		/**
		 * Form validation action.
		 * This is injected by react-redux. See mapDispatchToProps
		 */
		setErrors: PropTypes.func,
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
		updateFormData: bindActionCreators(updateFormData, dispatch),
		updateFormDataAddArrayItem: bindActionCreators(updateFormDataAddArrayItem, dispatch),
		updateFormDataRemoveArrayItem: bindActionCreators(updateFormDataRemoveArrayItem, dispatch),
		updateFormDataReorderArrayItem: bindActionCreators(updateFormDataReorderArrayItem, dispatch),
		updateForm: bindActionCreators(updateForm, dispatch),
		setError: bindActionCreators(setError, dispatch),
		setErrors: bindActionCreators(setErrors, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UIForm);
