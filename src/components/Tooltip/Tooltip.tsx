import React from 'react';
import { useTooltipState } from 'reakit/Tooltip';

import * as S from './Tooltip.style';

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
				<S.TooltipReference {...tooltipState} {...children.props} ref={ref}>
					{referenceProps => React.cloneElement(children, referenceProps)}
				</S.TooltipReference>
				{title && (
					<S.Tooltip {...tooltipState} {...rest}>
						<S.TooltipArrow {...tooltipState} />
						{title}
					</S.Tooltip>
				)}
			</>
		);
	},
);

export default Tooltip;
