import React from 'react';
import classNames from 'classnames';
import styles from './LineChart.scss';

import { LineOptions } from './LineChart.types';
import { LineIcon } from './LineChartLineIcon.component';


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

	const linesToShow = showInactives ? linesConfig : linesConfig.filter(lineConfig => lineConfig.status !== 'inactive');

	if (payload && payload.length) {
	  return (
		<ul
			className={classNames(styles['line-chart-custom-legend'])}
			style={{ justifyContent: getContentJustification(align)}}
		>
			{linesToShow.map(config => (
				<li id={`legend_item_${config.key}`} key={config.key}>
					<div
						className={classNames({
							[styles['line-chart-custom-legend__button--inactive']] : config?.status === 'inactive'
						})}
						role='button'
						onClick={() => onLegendClicked(config.key)}
						onKeyPress={() => onLegendClicked(config.key)}
						onMouseEnter={() => onLegendHovered(config.key)}
						onMouseLeave={() => onLegendHovered('')}
						tabIndex={0}
					>
						<LineIcon color={config.color} dashed={config?.dashed} />

						<span className={classNames(styles['line-chart-custom-legend__line-label'])}>
							{ config.legendLabel ?? config.key }
						</span>

					</div>
				</li>
			))}
		</ul>
	  );
	}

	return null;
};
