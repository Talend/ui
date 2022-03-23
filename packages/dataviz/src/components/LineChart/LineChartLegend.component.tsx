import React from 'react';
import classNames from 'classnames';
import styles from './LineChart.scss';

import { LineChartOptions,  LineOptions } from './LineChart.types';


export interface LineChartLegendProps {
	payload?: any[],
	external: {
		chartOptions: LineChartOptions,
		linesConfig: LineOptions[],
		align: string | undefined,
	},
}

export const CustomLegend = ({ payload, external }: LineChartLegendProps) => {
	const { chartOptions, linesConfig, align } = external;

	const getLineIconBackground = (strokeDasharray: string | number | undefined, color: string) => {
		console.log('stroke : ', strokeDasharray);
		if(strokeDasharray) {
			return `repeating-linear-gradient(to right, ${color} 0, ${color} 10px,transparent 10px,transparent 12px)`;
		} else {
			return color;
		}
	}

	const getContentJustification = (align: string | undefined) => {
		if(align === 'left') {
			return 'flex-start';
		} else if(align === 'center') {
			return 'center';
		} else {
			return 'flex-end'
		}
	}

	if (payload && payload.length) {
	  return (
		<div
			className={classNames(styles["line-chart-custom-legend-wrapper"])}
			style={{ justifyContent: getContentJustification(align)}}
		>
			{linesConfig.map(config => (
				<p>
					<div
					className={classNames(styles["line-chart-custom-legend-line-icon"])}
					style={{ background: getLineIconBackground(config.rechartsOptions?.strokeDasharray, config.color)}}
					/>
					<span className={classNames(styles["line-chart-custom-legend-line-label"])}>
						{ config.legendLabel? config.legendLabel : config.key }
					</span>

				</p>
			))}
		</div>
	  );
	}

	return null;
};
