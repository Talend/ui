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
		showInactives?: boolean
	},
}

export const CustomTooltip = ({ active, payload, label, external }: LineChartTooltipProps) => {
	const { linesConfig, leftUnit, rightUnit, xformatter, showInactives } = external;

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

	const linesToShow = showInactives ? linesConfig : linesConfig.filter(lineConfig => lineConfig.status !== 'inactive');

	if (active && payload && payload.length) {
	  return (
		<div className={classNames(styles['line-chart-custom-tooltip'])}>
			<div className={classNames(styles['line-chart-custom-tooltip__title'])}>{labelDisplayValue}</div>
			{linesToShow.map(config => (
		  		<div
					id={`tooltip_item_${config.key}`}
					className={classNames({
						[styles['line-chart-custom-tooltip__line-item--inactive']] : config?.status === 'inactive'
					})}
		  		>
					<div
						className={classNames(
							styles['line-chart-custom-tooltip__line-icon'],
							)}
						style={{ background: getLineIconBackground(config.dashed, config.color)}}
					/>
					<span className={classNames(styles['line-chart-custom-tooltip__line-label'])}>
						{ config.tooltipLabel ? config.tooltipLabel : config.key }
					</span>
					:
					<span className={classNames(styles['line-chart-custom-tooltip__line-value'])}>
						{getItemDisplayValue(payload, config)}
					</span>
					<span className={classNames(styles['line-chart-custom-tooltip__line-unit'])}>
						{getLineUnit(config.axis)}
					</span>
		  		</div>
			))}
		</div>
	  );
	}

	return null;
};
