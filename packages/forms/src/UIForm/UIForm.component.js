import React, { PropTypes } from 'react';
import { merge } from 'talend-json-schema-form-core';

import { TRIGGER_AFTER } from './utils/triggers';
import { formPropTypes } from './utils/propTypes';
import { validateValue, validateAll } from './utils/validation';
import Widget from './Widget';
import Buttons from './fields/Button/Buttons.component';

export default class UIForm extends React.Component {
	constructor(props) {
		super(props);
		const { jsonSchema, uiSchema } = props;
		this.state = {
			mergedSchema: merge(jsonSchema, uiSchema),
		};

		this.onChange = this.onChange.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	/**
	 * Update the state with the new schema.
	 * @param jsonSchema
	 * @param uiSchema
	 */
	componentWillReceiveProps({ jsonSchema, uiSchema }) {
		if (!jsonSchema || !uiSchema) {
			return;
		}
		this.setState({
			mergedSchema: merge(jsonSchema, uiSchema),
		});
	}

	/**
	 * Fire callbacks while interacting with form fields
	 * - onChange: for each field change
	 * - onTrigger: when trigger is provided and its value is "after"
	 * @param event The event that triggered the callback
	 * @param payload { schema, value } The field schema and its new value
	 */
	onChange(event, { schema, value }) {
		const {
			formName,
			onChange,
			properties,
			customValidation,
		} = this.props;
		const error = validateValue(schema, value, properties, customValidation);
		const payload = { formName, schema, value, error, properties };
		onChange(event, payload);

		const { triggers } = schema;
		if (triggers && triggers.includes(TRIGGER_AFTER)) {
			this.onTrigger(event, { type: TRIGGER_AFTER, ...payload });
		}
	}

	/**
	 * Triggers an onTrigger callback that is allowed to modify the form
	 * @param event The event that triggered the callback
	 * @param payload The trigger payload
	 * type The type of trigger
	 * schema The field schema
	 * value The field value
	 */
	onTrigger(event, payload) {
		const { formName, updateForm, onTrigger, setError, properties } = this.props;
		if (!onTrigger) {
			return null;
		}

		return onTrigger(
			event,
			{
				...payload,
				formName,
				properties,
			}
		)
			.then(newForm => updateForm(
				formName,
				newForm.jsonSchema,
				newForm.uiSchema,
				newForm.properties,
				newForm.errors)
			)
			.catch(({ errors }) => setError(formName, errors));
	}

	/**
	 * Set the original data and schema
	 * Triggers reset callback if form is valid
	 * @param event the reset event
	 */
	onReset(event) {
		this.props.updateForm(
			this.props.formName,
			this.props.initialData.jsonSchema,
			this.props.initialData.uiSchema,
			this.props.initialData.properties
		);
		this.props.setErrors(this.props.formName, {});

		if (this.props.onReset) {
			this.props.onReset(event);
		}
	}

	/**
	 * Triggers submit callback if form is valid
	 * @param event the submit event
	 */
	onSubmit(event) {
		if (this.props.onSubmit) {
			event.preventDefault();
		}

		const { mergedSchema } = this.state;
		const { formName, properties, customValidation } = this.props;
		const errors = validateAll(mergedSchema, properties, customValidation);
		this.props.setErrors(formName, errors);

		const isValid = !Object.keys(errors).length;
		if (this.props.onSubmit && isValid) {
			this.props.onSubmit(event, properties);
		}

		return isValid;
	}

	render() {
		const actions = this.props.actions || [{
			bsStyle: 'primary',
			title: 'Submit',
			type: 'submit',
			widget: 'button',
		}];

		return (
			<form
				acceptCharset={this.props.acceptCharset}
				action={this.props.action}
				autoComplete={this.props.autoComplete}
				encType={this.props.encType}
				id={this.props.id}
				method={this.props.method}
				name={this.props.formName}
				noValidate={this.props.noHtml5Validate}
				onReset={this.onReset}
				onSubmit={this.onSubmit}
				target={this.props.target}
			>
				{
					this.state.mergedSchema.map((nextSchema, index) => (
						<Widget
							id={this.props.id}
							key={index}
							formName={this.props.formName}
							onChange={this.onChange}
							onTrigger={this.onTrigger}
							schema={nextSchema}
							properties={this.props.properties}
							errors={this.props.errors}
							widgets={this.props.widgets}
						/>
					))
				}
				<Buttons
					id={`${this.props.id}-${this.props.formName}-actions`}
					onTrigger={this.onTrigger}
					schema={{ items: actions }}
				/>
			</form>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	UIForm.propTypes = {
		...formPropTypes,

		/** Form definition: Json schema that specify the data model */
		jsonSchema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		/** Form definition: UI schema that specify how to render the fields */
		uiSchema: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
		/**
		 *  Form definition: Form fields values.
		 *  Note that it should contains @definitionName for triggers.
		 */
		properties: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		/** Form definition: The forms errors { [fieldKey]: errorMessage } */
		errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		/** Form definition: The forms initial data */
		initialData: PropTypes.shape({
			jsonSchema: PropTypes.object,
			uiSchema: PropTypes.array,
			properties: PropTypes.object,
		}),

		/**
		 * Actions buttons to display at the bottom of the form.
		 * If not provided, a single submit button is displayed.
		 */
		actions: PropTypes.arrayOf(Buttons.propTypes.schema),
		/**
		 * User callback: Custom validation function.
		 * Prototype: function customValidation(schema, value, properties)
		 * Return format : errorMessage String | falsy
		 * This is triggered on fields that has their uiSchema > customValidation : true
		 */
		customValidation: PropTypes.func,
		/**
		 * User callback: Trigger > after callback.
		 * Prototype: function onTrigger(event, { type, schema, value, properties })
		 * This is executed on changes on fields with uiSchema > triggers : ['after']
		 */
		onTrigger: PropTypes.func,
		/** Custom widgets */
		widgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types

		/** State management impl: The change callback */
		onChange: PropTypes.func.isRequired,
		/** State management impl: Set Partial fields validation error */
		setError: PropTypes.func,
		/** State management impl: Set All fields validations errors */
		setErrors: PropTypes.func,
		/** State management impl: The form update callback */
		updateForm: PropTypes.func.isRequired,
	};
}

UIForm.defaultProps = {
	noHtml5Validate: true,
};
