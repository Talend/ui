import PropTypes from 'prop-types';

export const formPropTypes = {
	/** Form element configuration: auto complete */
	autoComplete: PropTypes.string,
	/** Form element configuration: charsets */
	acceptCharset: PropTypes.string,
	/**
	 *  Form element configuration: submit action.
	 *  This will be prevented if you provide an onSubmit props
	 */
	action: PropTypes.string,
	/**
	 * Form custom classname
	 */
	className: PropTypes.string,
	/** Form definition: encoding type */
	encType: PropTypes.string,
	/** Form definition: form id */
	id: PropTypes.string,
	/**
	 *  Form element configuration: submit method.
	 *  This will be prevented if you provide an onSubmit props
	 */
	method: PropTypes.string,
	/** Form definition: reset callback */
	onReset: PropTypes.func,
	/** Form definition: submit callback. This will prevent default submit behavior */
	onSubmit: PropTypes.func,
	/** Form definition: prevent html 5 validations */
	noHtml5Validate: PropTypes.bool,
	/**
	 *  Form element configuration: submit target.
	 *  This will be prevented if you provide an onSubmit props
	 */
	target: PropTypes.string,
};

export function extractFormProps(props) {
	const formProps = {};
	Object.keys(formPropTypes).forEach(key => {
		formProps[key] = props[key];
	});
	return formProps;
}
