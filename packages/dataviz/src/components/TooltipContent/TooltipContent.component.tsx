import React from 'react';
import classNames from 'classnames';
import { FormatValue } from '@talend/react-components';
import styles from './TooltipContent.component.scss';
import { ChartStyle } from '../../types';

export interface TooltipContentProps {
	entries: TooltipEntry[];
	chartStyle?: ChartStyle;
}

function TooltipContent({ entries, chartStyle = ChartStyle.VALUE }: TooltipContentProps) {
	return (
		<dl className={classNames(styles['dataviz-tooltip'], styles[`dataviz-tooltip--${chartStyle}`])}>
			{entries.map(({ key, value }) => (
				<div className={styles['dataviz-tooltip__entry']} key={key}>
					<dt className={styles['dataviz-tooltip__key']}>{key}</dt>
					<dd>
						<FormatValue className={styles['dataviz-tooltip__value']} value={value} />
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

export default Object.assign(TooltipContent, {
	ChartStyle,
});
