import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';

/**
 * The Toggle component is basically a fancy checkbox like you have in your iphone.
 * Properties:
 * @param id {string}: the id to be used for htmlFor and maybe QA
 * @param label {string}: a status label to be shown near toggle
 * @param className {string}: className to be added to root div
 * @param props {object}: all props passed down to the input
 *
 * Required: [ id, onChange ]
 * Defaults: { checked: false, disabled: false, label: '', className: 'switch checkbox' }
 *
 * @return XML(JSX) React pure component
 */
function Toggle({ id, label, className, ...props }) {
	let dataFeature;

	if (!props.disabled && props['data-feature']) {
		dataFeature = props['data-feature'];
		dataFeature += props.checked ? '.disable' : '.enable';
	}

	return (
		<div className={classNames('checkbox tc-toggle', className)}>
			<label htmlFor={id} data-feature={dataFeature}>
				<input type="checkbox" id={id} {...omit(props, 'data-feature')} />
				<span>{label}</span>
			</label>
		</div>
	);
}

Toggle.displayName = 'Toggle';

Toggle.defaultProps = {
	disabled: false,
	checked: false,
	label: '',
	className: 'switch checkbox',
};

Toggle.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	checked: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	'data-feature': PropTypes.string,
};

export default Toggle;
