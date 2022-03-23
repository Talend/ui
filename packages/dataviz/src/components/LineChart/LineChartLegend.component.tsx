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
	legendClicked?: (key: string) => void,
	legendHovered?: (key: string) => void

}

export const CustomLegend = ({
	payload,
	external,
	legendClicked = (key) => {},
	legendHovered = (key) => {}

}: LineChartLegendProps) => {
	const { chartOptions, linesConfig, align } = external;

	const getLineIconBackground = (strokeDasharray: string | number | undefined, color: string) => {
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
		<ul
			className={classNames(styles["line-chart-custom-legend-wrapper"])}
			style={{ justifyContent: getContentJustification(align)}}
		>
			{linesConfig.map(config => (
				<li
					onClick={() => legendClicked(config.key)}
					onMouseEnter={() => legendHovered(config.key)}
					onMouseLeave={() => legendHovered('')}
				>
					<div
					className={classNames(styles["line-chart-custom-legend-line-icon"])}
					style={{ background: getLineIconBackground(config.rechartsOptions?.strokeDasharray, config.color)}}
					/>
					<span className={classNames(styles["line-chart-custom-legend-line-label"])}>
						{ config.legendLabel? config.legendLabel : config.key }
					</span>

				</li>
			))}
		</ul>
	  );
	}

	return null;
};
