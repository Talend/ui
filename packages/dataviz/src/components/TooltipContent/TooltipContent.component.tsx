import React from 'react';
import styles from './TooltipContent.component.scss';

export interface TooltipContentProps {
	entries: TooltipEntry[];
}
function TooltipContent({ entries }: TooltipContentProps) {
	return (
		<dl className={styles['dataviz-tooltip']}>
			{entries.map(({ key, value }) => (
				<div className={styles['dataviz-tooltip__entry']} key={key}>
					<dt className={styles['dataviz-tooltip__key']}>{key}</dt>
					<dd>
						<span className={styles['dataviz-tooltip__value']}>{value}</span>
					</dd>
				</div>
			))}
		</dl>
	);
}

export interface TooltipEntry {
	key: string;
	value: string;
}

export default TooltipContent;
