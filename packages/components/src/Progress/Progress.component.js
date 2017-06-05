import React, { PropTypes } from 'react';
import classNames from 'classnames';

import TooltipTrigger from '../TooltipTrigger';

import theme from './Progress.scss';

// value can be specified to inscrease rapidity of the progress bar
const DEFAULT_TIME_TO_COMPLETE = '5s';

function normalize(percent) {
	if (percent > 100) {
		return 100;
	}
	if (percent < 0) {
		return 0;
	}
	return percent;
}

function Progress({ id, percent, tooltip, infinite, contained, timeToComplete }) {
	const normalizedPercent = infinite ? 100 : normalize(percent);
	const style = {
		width: `${normalizedPercent}%`,
		animationDuration: timeToComplete ? `${timeToComplete}s` : DEFAULT_TIME_TO_COMPLETE,
	};

	const rootClassNames = classNames(
		theme.progress,
		{
			[theme.hidden]: normalizedPercent === 0,
			[theme.fixed]: !contained,
		}
	);
	const progressionClassNames = classNames(
		theme['progress-percent'],
		{ [theme.infinite]: !!infinite }
	);

	let progress = <div style={style} className={progressionClassNames} />;

	if (tooltip) {
		progress = (
			<TooltipTrigger label={tooltip} tooltipPlacement="bottom">
				{progress}
			</TooltipTrigger>
		);
	}

	return <div id={id} className={rootClassNames}>{progress}</div>;
}

Progress.propTypes = {
	id: PropTypes.string,
	percent: PropTypes.number,
	tooltip: PropTypes.string,
	infinite: PropTypes.bool,
	contained: PropTypes.bool,
	timeToComplete: PropTypes.number,
};

export default Progress;
