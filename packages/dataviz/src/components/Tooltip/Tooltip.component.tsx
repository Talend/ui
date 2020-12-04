import React from 'react';
import styles from './Tooltip.component.scss';

export interface TooltipProps {
	entries: TooltipEntry[];
}
function Tooltip({ entries }: TooltipProps) {
	return (
		<ul className={styles['dataviz-tooltip']}>
			{entries.map(({ key, value }) => (
				<li key={key}>
					{key}: <span className={styles['dataviz-tooltip__value']}>{value}</span>
				</li>
			))}
		</ul>
	);
}

export interface TooltipEntry {
	key: string;
	value: string;
}

export default Tooltip;
