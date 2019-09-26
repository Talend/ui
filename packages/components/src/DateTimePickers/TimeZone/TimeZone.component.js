import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';

function TimeZone(props) {
	return (
		<TooltipTrigger
			label={props.timezone}
			tooltipPlacement="top"
			style={{ height: '32px', display: 'flex', alignItems: 'center' }}
		>
			<Icon name="talend-info-circle" style={{ display: 'block' }} />
		</TooltipTrigger>
	);
}

TimeZone.propTypes = {
	timezone: PropTypes.string,
};

export default TimeZone;
