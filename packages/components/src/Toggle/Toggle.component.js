import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import theme from './Toggle.scss';

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
function Toggle({ id, label, className, intermediate, ...props }) {
	let dataFeature;
	let dataChecked = 0;

	if (!props.disabled && props['data-feature']) {
		dataFeature = props['data-feature'];
		dataFeature += props.checked ? '.disable' : '.enable';
	}

	if (intermediate) {
		dataChecked = 1;
	} else if (props.checked) {
		dataChecked = 2;
	}

	const classes = classNames(
		theme['tc-toggle'],
		'checkbox tc-toggle switch checkbox',
		className,
		{
			'tc-toggle-disabled': props.disabled,
			[theme['tc-toggle-disabled']]: props.disabled,
		}
	);

	return (
		<div className={classes}>
			<label htmlFor={id} data-feature={dataFeature}>
				<input
					type="checkbox"
					id={id}
					data-checked={dataChecked}
					{...omit(props, 'data-feature')}
				/>
				<span>{label}</span>
			</label>
		</div>
	);
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
