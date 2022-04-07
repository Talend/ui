import React from 'react';
import classNames from 'classnames';
import styles from './LineChart.scss';

import { LineOptions } from './LineChart.types';


export interface LineChartLegendProps {
	payload?: any[],
	external: {
		linesConfig: LineOptions[],
		align: 'left' | 'center' | 'right',
		showInactives?: boolean
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
	const { linesConfig, align, showInactives } = external;

	const getLineIconBackground = (dashed: boolean | undefined, color: string) => {
		if(dashed) {
			return `repeating-linear-gradient(to right, ${color} 0, ${color} 10px,transparent 10px,transparent 12px)`;
		}
		return color;

	};

	const linesToShow = showInactives ? linesConfig : linesConfig.filter(lineConfig => lineConfig.status !== 'inactive');

	if (payload && payload.length) {
	  return (
		<ul
			className={classNames(styles['line-chart-custom-legend-wrapper'])}
			style={{ justifyContent: getContentJustification(align)}}
		>
			{linesToShow.map(config => (
				<li id={`legend_item_${config.key}`} key={config.key}>
					<div
						className={classNames({
							[styles['line-chart-custom-legend-button--inactive']] : config?.status === 'inactive'
						})}
						role='button'
						onClick={() => onLegendClicked(config.key)}
						onKeyPress={() => onLegendClicked(config.key)}
						onMouseEnter={() => onLegendHovered(config.key)}
						onMouseLeave={() => onLegendHovered('')}
						tabIndex={0}
					>
						<div
							className={classNames(styles['line-chart-custom-legend-line-icon'])}
							style={{ background: getLineIconBackground(config.dashed, config.color)}}
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
