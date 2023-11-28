import PropTypes from 'prop-types';

import theme from './TimeZone.module.scss';
import { Icon, Tooltip } from '@talend/design-system';

function TimeZone(props) {
	return (
		<Tooltip label={props.timezone} tooltipPlacement="top">
			<span className={theme['timezone-tooltip']}>
				<Icon name="talend-info-circle" className={theme.icon} />
			</span>
		</Tooltip>
	);
}

TimeZone.propTypes = {
	timezone: PropTypes.string,
};

export default TimeZone;
