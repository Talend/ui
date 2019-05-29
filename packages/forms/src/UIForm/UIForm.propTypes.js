import PropTypes from 'prop-types';

export default {
	/**
	 * Buttons block schemas
	 */
	actions: PropTypes.array,
	/**
	 * Buttons block classname
	 */
	buttonBlockClass: PropTypes.string,
	/**
	 * Elements to insert before the buttons block
	 */
	children: PropTypes.element,
	/**
	 * Form custom classname
	 */
	className: PropTypes.string,
	/**
	 * User custom formats for validationn
	 */
	customFormats: PropTypes.object,
	/**
	 * User callback: Custom validation function.
	 * Prototype: function customValidation(schema, value, properties)
	 * Return format : errorMessage String | falsy
	 * This is triggered on fields that has their uiSchema > customValidation : true
	 */
	customValidation: PropTypes.func,
	/**
	 * Injection point used in buttons
	 */
	getComponent: PropTypes.func,
	/**
	 * Unique identifier
	 */
	id: PropTypes.string.isRequired,
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
	/** Display mode: example 'text' */
	displayMode: PropTypes.string,
	/** Translations */
	language: PropTypes.object,
	/** Form definition: prevent html 5 validations. This one is for compatibility, prefer 'noValidate' */
	noHtml5Validate: PropTypes.bool,
	/** Same as noHtml5Validate but in a standard name */
	noValidate: PropTypes.bool,
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
	/** Form definition: reset callback */
	onReset: PropTypes.func,
	/** Form definition: submit callback. This will prevent default submit behavior */
	onSubmit: PropTypes.func,
	/** Form definition: submit button hover callback */
	onSubmitEnter: PropTypes.func,
	/** Form definition: submit button hover end callback */
	onSubmitLeave: PropTypes.func,
	/**
	 * Trigger callback.
	 * Prototype: function onTrigger(event, { trigger, schema, properties })
	 */
	onTrigger: PropTypes.func,
	/** i18next translate function */
	t: PropTypes.func,
	/** Custom templates */
	templates: PropTypes.object,
	/** Keys that are in updating state */
	updating: PropTypes.array,
	/** Custom widgets */
	widgets: PropTypes.object,
};
