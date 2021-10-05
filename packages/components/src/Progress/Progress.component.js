import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import TooltipTrigger from '../TooltipTrigger';

import theme from './Progress.scss';

function normalize(percent) {
	if (percent > 100) {
		return 100;
	}
	if (percent < 0) {
		return 0;
	}
	return percent;
}

function Progress({ id, percent, tooltip, infinite, contained }) {
	const normalizedPercent = infinite ? 100 : normalize(percent);
	const style = { width: `${normalizedPercent}%` };

	const rootClassNames = classNames(theme.progress, {
		[theme.hidden]: normalizedPercent === 0,
		[theme.fixed]: !contained,
		[theme.infinite]: infinite,
	});

	let progress = (
		<div style={style} className={theme['progress-percent']}>
			{infinite && <div className={theme['infinite-indicator']} />}
		</div>
	);

	if (tooltip) {
		progress = (
			<TooltipTrigger label={tooltip} tooltipPlacement="bottom">
				{progress}
			</TooltipTrigger>
		);
	}

	let a11yProps;
	if (!infinite) {
		a11yProps = {
			role: 'progressbar',
			'aria-valuenow': normalizedPercent,
			'aria-valuemin': 0,
			'aria-valuemax': 100,
		};
	} else {
		a11yProps = {
			role: 'status',
			'aria-busy': true,
		};
	}

	return (
		<div id={id} className={rootClassNames} aria-label={tooltip} {...a11yProps}>
			{progress}
		</div>
	);
}

Progress.displayName = 'Progress';

Progress.propTypes = {
	id: PropTypes.string,
	percent: PropTypes.number,
	tooltip: PropTypes.string.isRequired,
	infinite: PropTypes.bool,
	contained: PropTypes.bool,
};

export default Progress;
