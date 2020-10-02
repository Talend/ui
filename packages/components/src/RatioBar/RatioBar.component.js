import React from 'react';
import PropTypes from 'prop-types';
import TooltipTrigger from '../TooltipTrigger';
import { getTheme } from '../theme';
import qualityBarTheme from './QualityBar.scss';

const theme = getTheme(qualityBarTheme);
const minPercentage = 5;

export function RatioBarLine({ percentage, tooltipLabel, className, value }) {
	const canGrow = percentage >= minPercentage;
	return (
		value > 0 && (
			<TooltipTrigger label={tooltipLabel} tooltipPlacement="bottom">
				<div
					className={theme(
						'ds-quality-bar-line',
						{
							'ds-quality-bar-line-grow': canGrow,
						},
						className,
					)}
					// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
					tabIndex={0}
					style={{
						flexBasis: `${Math.max(percentage, minPercentage)}%`,
					}}
				/>
			</TooltipTrigger>
		)
	);
}
RatioBarLine.propTypes = {
	percentage: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	tooltipLabel: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
};

export function RatioBar({ children }) {
	return <div className={theme('ds-quality-bar')}>{children}</div>;
}
RatioBar.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
