import * as React from 'react';
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
		fill: ${tokens.colors.doveGray};
	}
`;

const StyledTooltip = styled(ReakitTooltip)`
	max-width: 25rem;
	padding-left: ${tokens.space.smaller};
	padding-right: ${tokens.space.smaller};
	font-size: 1.2rem;
	color: ${tokens.colors.white};
	background: ${tokens.colors.doveGray};
	border-radius: ${tokens.radii.rectRadius};
	z-index: ${tokens.zIndices.tooltips};
`;

type Placement =
	| 'auto-start'
	| 'auto'
	| 'auto-end'
	| 'top-start'
	| 'top'
	| 'top-end'
	| 'right-start'
	| 'right'
	| 'right-end'
	| 'bottom-end'
	| 'bottom'
	| 'bottom-start'
	| 'left-end'
	| 'left'
	| 'left-start';

export type TooltipProps = {
	title?: string;
	placement?: Placement;
	visible?: boolean;
	children?: any;
};

const Tooltip = React.forwardRef(
	({ children, title, placement = 'auto', visible = false, ...rest }: TooltipProps, ref) => {
		const tooltipState = useTooltipState({
			placement,
			visible,
			gutter: 15,
		});
		return (
			<>
				<StyledTooltipReference {...tooltipState} {...children.props} ref={ref}>
					{(referenceProps) => React.cloneElement(children, referenceProps)}
				</StyledTooltipReference>
				{title && (
					<StyledTooltip {...tooltipState} {...rest}>
						<StyledTooltipArrow {...tooltipState} />
						{title}
					</StyledTooltip>
				)}
			</>
		);
	},
);

export default React.memo(Tooltip);
