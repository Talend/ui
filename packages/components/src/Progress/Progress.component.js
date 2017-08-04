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

function Progress({ id, percent, tooltip, infinite, contained }) {
	const normalizedPercent = infinite ? 100 : normalize(percent);
	const style = { width: `${normalizedPercent}%` };

	const rootClassNames = classNames(
		theme.progress,
		{
			[theme.hidden]: normalizedPercent === 0,
			[theme.fixed]: !contained,
			[theme.infinite]: infinite,
		}
	);

	let progress = (
		<div style={style} className={theme['progress-percent']}>
			{ infinite && <div className={theme['infinite-indicator']} /> }
		</div>
	);

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
};

export default Progress;
