import React from 'react';
import classNames from 'classnames';
import styles from './LineChart.scss';

import { LineOptions } from './LineChart.types';
import { LineIcon } from './LineChartLineIcon.component';

export interface LineChartTooltipProps {
	active?: boolean,
	payload?: any[],
	label?: string,
	external: {
		xformatter?: (value: any) => string,
		leftUnit?: string | number,
		rightUnit?: string | number,
		linesConfig: LineOptions[],
		showInactives?: boolean
	},
}

export const CustomTooltip = ({ active, payload, label, external }: LineChartTooltipProps) => {
	const { linesConfig, leftUnit, rightUnit, xformatter, showInactives } = external;

	const getLineUnit = (axis?: 'left' | 'right') => axis === 'right' ? rightUnit : leftUnit ;

	const getItemDisplayValue = (payloadTable: any[], lineConfig: LineOptions) => {
		const initialValue = payloadTable.find(item => item.dataKey === lineConfig.key).value;

		return lineConfig.tooltipFormatter ? lineConfig.tooltipFormatter(initialValue) : initialValue;
	};

	const labelDisplayValue = label && xformatter ? xformatter(label) : label;

	const linesToShow = showInactives ? linesConfig : linesConfig.filter(lineConfig => lineConfig.status !== 'inactive');

	if (active && payload?.length) {
	  return (
		<div className={classNames(styles['line-chart-custom-tooltip'])}>
			<div className={classNames(styles['line-chart-custom-tooltip__title'])}>{labelDisplayValue}</div>
			<ul>
				{linesToShow.map(config => (
					<li
						id={`tooltip_item_${config.key}`}
						className={classNames({
							[styles['line-chart-custom-tooltip__line-item--inactive']] : config?.status === 'inactive'
						})}
					>
						<LineIcon color={config.color} dashed={config?.dashed} />

						<span className={classNames(styles['line-chart-custom-tooltip__line-label'])}>
							{ config.tooltipLabel ?? config.key }
						</span>
						:
						<span className={classNames(styles['line-chart-custom-tooltip__line-value'])}>
							{getItemDisplayValue(payload, config)}
						</span>
						<span className={classNames(styles['line-chart-custom-tooltip__line-unit'])}>
							{getLineUnit(config.axis)}
						</span>
					</li>
				))}
			</ul>
		</div>
	  );
	}

	return null;
};
