import React from 'react';
import {
	useTooltipState as useReakitTooltipState,
	Tooltip as ReakitTooltip,
	TooltipProps as ReakitTooltipProps,
	TooltipArrow as ReakitTooltipArrow,
	TooltipReference as ReakitTooltipReference,
} from 'reakit';

import styles from './Tooltip.module.scss';

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

export type TooltipProps = React.PropsWithChildren<any> &
	ReakitTooltipProps & {
		title?: string;
	};

const Tooltip: React.FC<TooltipProps> = ({ children, title, ...rest }: TooltipProps) => {
	const tooltipState = useReakitTooltipState({
		...rest,
		animated: 250,
		gutter: 15,
		unstable_flip: true,
		unstable_preventOverflow: true,
	});
	return (
		<>
			<ReakitTooltipReference {...tooltipState} ref={children.ref} {...children.props}>
				{referenceProps => React.cloneElement(children, referenceProps)}
			</ReakitTooltipReference>
			{title && (
				<ReakitTooltip className={styles.tooltip} {...tooltipState} {...rest}>
					<div className={styles.container}>
						<ReakitTooltipArrow className={styles.arrow} {...tooltipState} />
						{title}
					</div>
				</ReakitTooltip>
			)}
		</>
	);
};

export default Tooltip;
