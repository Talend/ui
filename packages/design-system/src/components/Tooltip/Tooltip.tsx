import React from 'react';
import {
	Tooltip as ReakitTooltip,
	TooltipArrow as ReakitTooltipArrow,
	TooltipProps as ReakitTooltipProps,
	TooltipReference as ReakitTooltipReference,
	unstable_useId as useId,
	useTooltipState as useReakitTooltipState,
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

const Tooltip: React.FC<TooltipProps> = ({ children, title, baseId, ...rest }: TooltipProps) => {
	const { id: reakitId } = useId();
	const tooltipState = useReakitTooltipState({
		...rest,
		animated: 250,
		gutter: 15,
		unstable_flip: true,
		unstable_preventOverflow: true,
		baseId: baseId || reakitId,
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
