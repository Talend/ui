import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS, { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';
import theme from './CircularProgress.scss';
import getDefaultT from '../translate';

const RADIUS = 20;
const DIAMETER = 50;
const CENTER_POSITION = 25;
const CIRCUMFERENCE = Math.PI * (RADIUS * 2);

function getCircleStyle(percent) {
	if (percent) {
		return {
			strokeDasharray: CIRCUMFERENCE,
			strokeDashoffset: ((100 - percent) / 100) * CIRCUMFERENCE,
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
function CircularProgress({ size, light, percent, className, t }) {
	const classes = classNames('tc-circular-progress', className, theme.loader, {
		[theme.loaderlight]: light,
		[theme.animate]: !percent,
		[theme.fixed]: percent,
		[theme.small]: size === SIZE.small,
		[theme.default]: size === SIZE.default,
		[theme.large]: size === SIZE.large,
	});

	const percentLabel =
		percent &&
		t('CIRCULAR_PROGRESS_LOADING_PERCENT', {
			defaultValue: '{{percent}}%',
			percent,
		});
	return (
		<svg
			focusable="false"
			className={classes}
			viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
			aria-busy="true"
			aria-label={t('CIRCULAR_PROGRESS_LOADING', {
				defaultValue: 'Loading {{percent}}',
				percent: percentLabel,
			})}
		>
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
	percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	t: PropTypes.func,
};

CircularProgress.defaultProps = {
	size: SIZE.default,
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(CircularProgress);
