import React from 'react';
import {
	useTooltipState as useReakitTooltipState,
	Tooltip as ReakitTooltip,
	TooltipArrow as ReakitTooltipArrow,
	TooltipReference as ReakitTooltipReference,
} from 'reakit';

import theme from './Tooltip.module.scss';

export type Placement =
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

export type TooltipProps = React.PropsWithChildren<any> & {
	title?: string;
	placement?: Placement;
	visible?: boolean;
};

const Tooltip = ({
	children,
	title,
	placement = 'auto',
	visible = false,
	...rest
}: TooltipProps) => {
	const tooltipState = useReakitTooltipState({
		animated: 250,
		gutter: 15,
		placement,
		visible,
	});
	return (
		<>
			<ReakitTooltipReference {...tooltipState} ref={children.ref} {...children.props}>
				{referenceProps => React.cloneElement(children, referenceProps)}
			</ReakitTooltipReference>
			{title && (
				<ReakitTooltip className={theme.tooltip} {...tooltipState} {...rest}>
					<div className={theme.container}>
						<ReakitTooltipArrow className={theme.arrow} {...tooltipState} />
						{title}
					</div>
				</ReakitTooltip>
			)}
		</>
	);
};

export default Tooltip;
