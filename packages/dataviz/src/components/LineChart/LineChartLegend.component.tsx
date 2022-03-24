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
	onLegendClicked?: (key: string) => void,
	onLegendHovered?: (key: string) => void

}

function getContentJustification(align: string | undefined) {
	if(align === 'left') {
		return 'flex-start';
	} else if(align === 'center') {
		return 'center';
	}
	return 'flex-end';

};

export const CustomLegend = ({
	payload,
	external,
	onLegendClicked = () => {},
	onLegendHovered = () => {}

}: LineChartLegendProps) => {
	const { linesConfig, align } = external;

	const getLineIconBackground = (strokeDasharray: string | number | undefined, color: string) => {
		if(strokeDasharray) {
			return `repeating-linear-gradient(to right, ${color} 0, ${color} 10px,transparent 10px,transparent 12px)`;
		}
		return color;

	};

	if (payload && payload.length) {
	  return (
		<ul
			className={classNames(styles['line-chart-custom-legend-wrapper'])}
			style={{ justifyContent: getContentJustification(align)}}
		>
			{linesConfig.map(config => (
				<li>
					<div
						role='button'
						onClick={() => onLegendClicked(config.key)}
						onKeyPress={() => onLegendClicked(config.key)}
						onMouseEnter={() => onLegendHovered(config.key)}
						onMouseLeave={() => onLegendHovered('')}
						tabIndex={0}
					>
						<div
						className={classNames(styles['line-chart-custom-legend-line-icon'])}
						style={{ background: getLineIconBackground(config.rechartsOptions?.strokeDasharray, config.color)}}
						/>
						<span className={classNames(styles['line-chart-custom-legend-line-label'])}>
							{ config.legendLabel? config.legendLabel : config.key }
						</span>

					</div>
				</li>
			))}
		</ul>
	  );
	}

	return null;
};
