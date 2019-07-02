import React from 'react';
import TooltipTrigger from '../../TooltipTrigger';
import badgeCssModule from '../Badge.scss';
import { getTheme } from '../../theme';

const theme = getTheme(badgeCssModule);

const BadgeLabel = ({ aslink, category, label, children }) => {
	const labelTextClasses = theme({
		'tc-badge-label-text': !(!aslink && category),
		'tc-badge-label-text-with-categ': !aslink && category,
	});
	return (
		<div className={theme('tc-badge-label')}>
			<TooltipTrigger label={label} tooltipPlacement="top">
				<span key="label" className={labelTextClasses}>
					{label}
				</span>
			</TooltipTrigger>
			{children}
		</div>
	);
};

export default BadgeLabel;
