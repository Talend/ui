import React from 'react';
import PropTypes from 'prop-types';
import TooltipTrigger from '../TooltipTrigger';
import { getTheme } from '../theme';
import ratioBarTheme from './RatioBar.scss';

const theme = getTheme(ratioBarTheme);
const minPercentage = 5;

export function RatioBarLine({ percentage, tooltipLabel, className, value }) {
	const canGrow = percentage >= minPercentage;

	if (!value || value < 0) return null;

	const content = (
		<div
			className={theme(
				'tc-ratio-bar-line',
				{
					'tc-ratio-bar-line-grow': canGrow,
				},
				className,
			)}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			style={{
				flexBasis: `${Math.max(percentage, minPercentage)}%`,
			}}
		/>
	);

	if (!tooltipLabel) {
		return content;
	}

	return (
		<TooltipTrigger label={tooltipLabel} tooltipPlacement="bottom">
			{content}
		</TooltipTrigger>
	);
}
RatioBarLine.propTypes = {
	percentage: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	tooltipLabel: PropTypes.string,
	className: PropTypes.string.isRequired,
};

export function RatioBarComposition({ children }) {
	return <div className={theme('tc-ratio-bar')}>{children}</div>;
}
RatioBarComposition.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
