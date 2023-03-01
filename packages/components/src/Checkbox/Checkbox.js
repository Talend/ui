import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';

export default function Checkbox({ id, className, label, intermediate, ...props }) {
	let dataFeature;
	let dataChecked = 0;
	const dataTracking = `${props['data-tracking']}-${props.checked ? 'on' : 'off'}`;

	if (!props.disabled && props['data-feature']) {
		dataFeature = props['data-feature'];
		dataFeature += props.checked ? '.disable' : '.enable';
	}

	if (intermediate) {
		dataChecked = 1;
	} else if (props.checked) {
		dataChecked = 2;
	}

	return (
		<div
			className={classNames(
				'checkbox tc-checkbox',
				{
					'tc-checkbox-disabled': props.disabled,
				},
				className,
			)}
		>
			<label htmlFor={id} data-feature={dataFeature}>
				<input
					type="checkbox"
					id={id}
					data-checked={dataChecked}
					data-tracking={dataTracking}
					{...omit(props, ['data-feature', 'data-tracking'])}
				/>
				<span>{label}</span>
			</label>
		</div>
	);
}

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
	disabled: false,
	checked: false,
	intermediate: false,
	label: '',
};

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.node,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	checked: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	intermediate: PropTypes.bool,
	className: PropTypes.string,
	'data-tracking': PropTypes.string,
	'data-feature': PropTypes.string,
};
