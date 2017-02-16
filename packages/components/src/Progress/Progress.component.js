import React, { PropTypes } from 'react';
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

function Progress({ id, percent, tooltip }) {
	const normalizedPercent = normalize(percent);
	const style = { width: `${normalizedPercent}%` };

	const rootClassNames = classNames(
		theme.progress,
		{ [theme.hidden]: normalizedPercent === 0 },
	);

	let progress = (
		<div style={style} className={theme['progress-percent']} />
	);

	if (tooltip) {
		progress = (
			<TooltipTrigger label={tooltip} tooltipPlacement="bottom">
				{progress}
			</TooltipTrigger>
		);
	}

	return (
		<div id={id} className={rootClassNames}>
			{progress}
		</div>
	);
}

Progress.propTypes = {
	id: PropTypes.string,
	percent: PropTypes.number,
	tooltip: PropTypes.string,
};

export default Progress;
