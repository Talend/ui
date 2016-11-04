import React, { PropTypes } from 'react';
import classNames from 'classnames';
import theme from './CircularProgress.scss';

const SIZE = {
	small: 'small',
	default: 'default',
	large: 'large',
};

/**
 * @param {object} props react props
 * @example
<CircularProgress size="large" />
 */
function CircularProgress({ size, light }) {
	const classes = classNames(theme.loader, {
		[theme.loaderlight]: light,
		[theme.small]: size === SIZE.small,
		[theme.default]: size === SIZE.default,
		[theme.large]: size === SIZE.large,
	});
	return (
		<svg
			className={classes}
			x="0px"
			y="0px"
			viewBox="0 0 50 50"
		>
			<circle className={theme.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
		</svg>
	);
}

CircularProgress.propTypes = {
	size: PropTypes.oneOf([SIZE.small, SIZE.default, SIZE.large]),
	light: PropTypes.bool,
};

CircularProgress.defaultProps = {
	size: SIZE.default,
};

export default CircularProgress;
