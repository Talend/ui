import React from 'react';
import classNames from 'classnames';
import { FormatValue } from '@talend/react-components';
import { Tooltip } from '../Tooltip/Tooltip.component';
import styles from './KeyValueTooltip.component.scss';
import { ChartStyle } from '../../types';

export interface KeyValueTooltipProps {
	entries: TooltipEntry[];
	chartStyle?: ChartStyle;
}

function KeyValueTooltip({ entries, chartStyle = ChartStyle.VALUE }: KeyValueTooltipProps) {
	return (
		<Tooltip>
			<dl
				className={classNames(
					styles['key-value-tooltip'],
					styles[`key-value-tooltip--${chartStyle}`],
				)}
			>
				{entries.map(({ key, value }) => (
					<div className={styles['key-value-tooltip__entry']} key={key}>
						<dt className={styles['key-value-tooltip__key']}>{key}</dt>
						<dd>
							<FormatValue className={styles['key-value-tooltip__value']} value={value} />
						</dd>
					</div>
				))}
			</dl>
		</Tooltip>
	);
}

export interface TooltipEntry {
	key: string;
	value: string;
}

export default Object.assign(KeyValueTooltip, {
	ChartStyle,
});
