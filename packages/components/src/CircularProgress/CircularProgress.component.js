import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import theme from './CircularProgress.scss';

const RADIUS = 20;
const DIAMETER = 50;
const CENTER_POSITION = 25;
const SIZE = {
	small: 'small',
	default: 'default',
	large: 'large',
};
const CIRCUMFERENCE = Math.PI * (RADIUS * 2);

function getCircleStyle(percent) {
	if (percent) {
		return {
			strokeDasharray: CIRCUMFERENCE,
			strokeDashoffset: (100 - percent) / 100 * CIRCUMFERENCE,
		};
	}
	return {
		strokeDasharray: CIRCUMFERENCE / 10,
		strokeDashoffset: 0,
	};
}

/**
 * @param {object} props react props
 * @example
 <CircularProgress size="large" />
 */
function CircularProgress({ size, light, percent }) {
	const classes = classNames(theme.loader, {
		[theme.loaderlight]: light,
		[theme.animate]: !percent,
		[theme.fixed]: percent,
		[theme.small]: size === SIZE.small,
		[theme.default]: size === SIZE.default,
		[theme.large]: size === SIZE.large,
	});

	return (
		<svg focusable="false" className={classes} viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
			<circle
				className={theme.path}
				r={RADIUS}
				cx={CENTER_POSITION}
				cy={CENTER_POSITION}
				fill="none"
				style={getCircleStyle(percent)}
			/>
		</svg>
	);
}

CircularProgress.displayName = 'CircularProgress';

CircularProgress.propTypes = {
	size: PropTypes.oneOf([SIZE.small, SIZE.default, SIZE.large]),
	light: PropTypes.bool,
	percent: PropTypes.number,
};

CircularProgress.defaultProps = {
	size: SIZE.default,
};

export default CircularProgress;
