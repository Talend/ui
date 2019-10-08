import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';

import theme from './TimeZone.scss';

function TimeZone(props) {
	return (
		<TooltipTrigger
			label={props.timezone}
			tooltipPlacement="top"
			className={theme['timezone-tooltip']}
		>
			<Icon name="talend-info-circle" />
		</TooltipTrigger>
	);
}

TimeZone.propTypes = {
	timezone: PropTypes.string,
};

export default TimeZone;
