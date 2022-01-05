import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';

export default function Checkbox({ id, className, label, intermediate, ...props }) {
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

	return (
		<div
			className={classNames('checkbox tc-checkbox', className, {
				'tc-checkbox-disabled': props.disabled,
			})}
		>
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

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
	disabled: false,
	checked: false,
	intermediate: false,
	label: '',
};

Checkbox.propTypes = {
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
