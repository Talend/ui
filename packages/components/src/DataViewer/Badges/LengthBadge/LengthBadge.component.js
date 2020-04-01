import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import theme from './LengthBadge.scss';

/**
 * Return a badge with the given length value.
 */
export default function LengthBadge({ lengthValue, className }) {
	return (
		<sup
			key="length-badge"
			className={classNames(theme['tc-length-badge'], 'tc-length-badge', 'badge', className)}
		>
			{lengthValue}
		</sup>
	);
}

LengthBadge.propTypes = {
	lengthValue: PropTypes.number.isRequired,
	className: PropTypes.string,
};
