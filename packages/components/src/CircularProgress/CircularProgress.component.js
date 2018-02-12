import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';

import theme from './CircularProgress.scss';

const RADIUS = 20;
const DIAMETER = 50;
const CENTER_POSITION = 25;
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
function CircularProgress({ size, light, percent, className }) {
	const classes = classNames('tc-circular-progress', className, theme.loader, {
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
	className: PropTypes.string,
	size: PropTypes.oneOf(Object.keys(SIZE).map(key => SIZE[key])),
	light: PropTypes.bool,
	percent: PropTypes.number,
};

CircularProgress.defaultProps = {
	size: SIZE.default,
};

export default CircularProgress;
