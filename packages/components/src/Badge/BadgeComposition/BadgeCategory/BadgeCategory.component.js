import React from 'react';
import PropTypes from 'prop-types';
import TooltipTrigger from '../../../TooltipTrigger';
import badgeCssModule from '../../Badge.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(badgeCssModule);

const BadgeCategory = ({ label }) => (
	<TooltipTrigger label={label} tooltipPlacement="top">
		<span key="category" aria-label={label} className={theme('tc-badge-category')}>
			{label}
		</span>
	</TooltipTrigger>
);

BadgeCategory.propTypes = {
	label: PropTypes.string.isRequired,
};

export default BadgeCategory;
