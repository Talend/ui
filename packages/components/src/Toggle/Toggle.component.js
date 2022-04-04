import PropTypes from 'prop-types';
import classNames from 'classnames';

import Checkbox from '../Checkbox';

/**
 * The Toggle component is basically a fancy checkbox.
 * Properties:
 * @param id {string}: the id to be used for htmlFor and maybe QA
 * @param label {string}: a status label to be shown near toggle
 * @param className {string}: className to be added to root div
 * @param props {object}: all props passed down to the input
 *
 * Required: [ id, onChange ]
 * Defaults: { checked: false, disabled: false, label: '', className: '' }
 *
 * @return XML(JSX) React pure component
 */
function Toggle({ className, ...props }) {
	return new Checkbox({
		className: classNames(
			'switch tc-toggle',
			{
				'tc-toggle-disabled': props.disabled,
			},
			className,
		),
		...props,
	});
}

Toggle.displayName = 'Toggle';

Toggle.defaultProps = {
	disabled: false,
	checked: false,
	intermediate: false,
	label: '',
	className: '',
};

Toggle.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	checked: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	intermediate: PropTypes.bool,
	className: PropTypes.string,
	'data-feature': PropTypes.string,
};

export default Toggle;
