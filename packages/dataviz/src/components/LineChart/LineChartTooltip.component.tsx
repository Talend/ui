import React from 'react';
import classNames from 'classnames';
import styles from './LineChart.scss';

import { LineOptions } from './LineChart.types';
// import { values } from 'lodash';


export interface LineChartTooltipProps {
	active?: boolean,
	payload?: any[],
	label?: string,
	external: {
		xformatter?: (value: any) => string,
		leftUnit?: string | number,
		rightUnit?: string | number,
		linesConfig: LineOptions[],
	},
}

export const CustomTooltip = ({ active, payload, label, external }: LineChartTooltipProps) => {
	const { linesConfig, leftUnit, rightUnit, xformatter } = external;

	const getLineUnit = (axis: 'left' | 'right' | undefined) => axis === 'right' ? rightUnit : leftUnit ;

	const getLineIconBackground = (dashed: boolean | undefined, color: string) => {
		if(dashed) {
			return `repeating-linear-gradient(to right, ${color} 0, ${color} 10px,transparent 10px,transparent 12px)`;
		}
		return color;
	};

	const getItemDisplayValue = (payloadTable: any[], lineConfig: LineOptions) => {
		const initialValue = payloadTable.find(item => item.dataKey === lineConfig.key).value;

		return lineConfig.tooltipFormatter ? lineConfig.tooltipFormatter(initialValue) : initialValue;
	};

	const labelDisplayValue = label && xformatter ? xformatter(label) : label;

	if (active && payload && payload.length) {
	  return (
		<div className={classNames(styles['line-chart-custom-tooltip-wrapper'])}>
			<div className={classNames(styles['line-chart-custom-tooltip-wrapper-title'])}>{labelDisplayValue}</div>
			{linesConfig.map(config => (
		  		<div id={`tooltip_item_${config.key}`}>
					<div
						className={classNames(
							styles['line-chart-custom-tooltip-line-icon'],
							)}
						style={{ background: getLineIconBackground(config.dashed, config.color)}}
					/>
					<span className={classNames(styles['line-chart-custom-tooltip-line-label'])}>
						{ config.tooltipLabel ? config.tooltipLabel : config.key }
					</span>
					:
					<span className={classNames(styles['line-chart-custom-tooltip-line-value'])}>
						{getItemDisplayValue(payload, config)}
					</span>
					<span className={classNames(styles['line-chart-custom-tooltip-line-unit'])}>
						{getLineUnit(config.axis)}
					</span>
		  		</div>
			))}
		</div>
	  );
	}

	return null;
};
