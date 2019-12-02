import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

export default function Fieldset(props) {
	const { children, className, hideLegend, legend, ...restProps } = props;

	return (
		<fieldset {...restProps} className={classnames('form-group', className)}>
			<legend className={classnames({ 'sr-only': hideLegend })}>{legend}</legend>
			{children}
		</fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Fieldset.propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
		legend: PropTypes.string.isRequired,
		hideLegend: PropTypes.bool,
	};
}
