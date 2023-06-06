import { cloneElement, useState } from 'react';
import { randomUUID } from '@talend/utils';

import type { PropsWithChildren, FC } from 'react';
import {
	Tooltip as ReakitTooltip,
	TooltipArrow as ReakitTooltipArrow,
	TooltipProps as ReakitTooltipProps,
	TooltipReference as ReakitTooltipReference,
	useTooltipState as useReakitTooltipState,
} from 'reakit/Tooltip';

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

export type TooltipProps = PropsWithChildren<any> &
	ReakitTooltipProps & {
		title?: string;
	};

const Tooltip: FC<TooltipProps> = ({ children, title, baseId, ...rest }: TooltipProps) => {
	const [uuid] = useState<string>(randomUUID());
	const tooltipState = useReakitTooltipState({
		...rest,
		animated: 250,
		gutter: 15,
		unstable_flip: true,
		unstable_preventOverflow: true,
		baseId: baseId || uuid,
	});

	return (
		<>
			<ReakitTooltipReference {...tooltipState} ref={children.ref} {...children.props}>
				{referenceProps => cloneElement(children, referenceProps)}
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
