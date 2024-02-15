import PropTypes from 'prop-types';

import { SizedIcon, StackVertical } from '@talend/design-system';

import TooltipTrigger from '../../TooltipTrigger';

function TimeZone(props) {
	return (
		<TooltipTrigger label={props.timezone} tooltipPlacement="top">
			<StackVertical gap="0" display="inline" margin={{ left: 'XS', right: 0, top: 0, bottom: 0 }}>
				<SizedIcon
					color="var(--coral-color-accent-icon, hsla(204, 88%, 40%, 1))"
					name="information-filled"
					size="M"
				/>
			</StackVertical>
		</TooltipTrigger>
	);
}

TimeZone.propTypes = {
	timezone: PropTypes.string,
};

export default TimeZone;
