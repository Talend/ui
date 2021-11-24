import React from 'react';
import { BrushProps, Customized } from 'recharts';
import styles from './TooltipCursor.component.scss';

export type TooltipCursorProps = BrushProps & {
	dataFeature?: string;
};

/**
 * Custom component to allow data-x props
 * @param props
 */
function TooltipCursor({ x, y, width, height, dataFeature }: TooltipCursorProps): JSX.Element {
	return (
		<Customized
			component={() => (
				<foreignObject
					x={x}
					y={y}
					width={width}
					height={height}
					data-feature={dataFeature}
					className={styles['tooltip-cursor']}
					cursor="pointer"
					pointerEvents="all"
				/>
			)}
		/>
	);
}

export default TooltipCursor;
