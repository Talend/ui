import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	Tooltip as ReakitTooltip,
	TooltipArrow,
	TooltipReference,
	useTooltipState,
} from 'reakit/Tooltip';
import tokens from '../../tokens';

const StyledTooltipReference = styled(TooltipReference)`
	display: inline-block;
`;

const StyledTooltipArrow = styled(TooltipArrow)`
	svg {
		fill: ${tokens.doveGray};
	}
`;

const StyledTooltip = styled(ReakitTooltip)`
	max-width: 25rem;
	padding-left: ${tokens.smaller};
	padding-right: ${tokens.smaller};
	font-size: 1.2rem;
	color: ${tokens.white};
	background: ${tokens.doveGray};
	border-radius: ${tokens.rectRadius};
	z-index: 99999;
`;

const Tooltip = React.forwardRef(({ children, title, placement, visible, ...rest }, ref) => {
	const tooltipState = useTooltipState({
		placement,
		visible,
		gutter: 15,
	});
	return (
		<>
			<StyledTooltipReference {...tooltipState} {...children.props} ref={ref}>
				{referenceProps => React.cloneElement(children, referenceProps)}
			</StyledTooltipReference>
			{title && (
				<StyledTooltip {...tooltipState} {...rest}>
					<StyledTooltipArrow {...tooltipState} />
					{title}
				</StyledTooltip>
			)}
		</>
	);
});

Tooltip.defaultProps = {
	placement: 'auto',
	visible: false,
};

Tooltip.propTypes = {
	title: PropTypes.string,
	placement: PropTypes.string,
	visible: PropTypes.bool,
};

export default React.memo(Tooltip);
