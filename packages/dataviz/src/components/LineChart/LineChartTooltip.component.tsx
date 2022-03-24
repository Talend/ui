import React from 'react';
import classNames from 'classnames';
import styles from './LineChart.scss';

import { LineChartOptions,  LineOptions } from './LineChart.types';


export interface LineChartTooltipProps {
	active?: boolean,
	payload?: any[],
	label?: string,
	external: {
		chartOptions: LineChartOptions,
		linesConfig: LineOptions[],
	},
}

export const CustomTooltip = ({ active, payload, label, external }: LineChartTooltipProps) => {
	const { chartOptions, linesConfig } = external;

	const getLineUnit = (axis: 'left' | 'right' | undefined) => axis === 'right' ? chartOptions.rightYAxisOptions?.rechartsOptions?.unit : chartOptions.leftYAxisOptions?.rechartsOptions?.unit ;

	const getLineIconBackground = (strokeDasharray: string | number | undefined, color: string) => {
		if(strokeDasharray) {
			return `repeating-linear-gradient(to right, ${color} 0, ${color} 10px,transparent 10px,transparent 12px)`;
		}
		return color;
	};

	if (active && payload && payload.length) {
	  return (
		<div className={classNames(styles['line-chart-custom-tooltip-wrapper'])}>
			<p className={classNames(styles['line-chart-custom-tooltip-wrapper-title'])}>{label}</p>
			{linesConfig.map(config => (
		  		<p>
					<div
						className={classNames(
							styles['line-chart-custom-tooltip-line-icon'],
							)}
						style={{ background: getLineIconBackground(config.rechartsOptions?.strokeDasharray, config.color)}}
					/>
					<span className={classNames(styles['line-chart-custom-tooltip-line-label'])}>
						{ config.tooltipLabel ? config.tooltipLabel : config.key }
					</span>
					:
					<span className={classNames(styles['line-chart-custom-tooltip-line-value'])}>
						{payload.find(item => item.dataKey === config.key).value}
					</span>
					<span className={classNames(styles['line-chart-custom-tooltip-line-unit'])}>
						{getLineUnit(config.axis)}
					</span>
		  		</p>
			))}
		</div>
	  );
	}

	return null;
};
