import React from 'react';
import classNames from 'classnames';
import styles from './LineChart.scss';

import { LineOptions } from './LineChart.types';
import { LineIcon } from './LineChartLineIcon.component';

export interface LineChartLegendProps {
	payload?: any[];
	external: {
		linesConfig: LineOptions[];
		align: 'left' | 'center' | 'right';
		showInactives?: boolean;
		isRightAxisDisplayed?: boolean;
	};
	onLegendClicked?: (key: string) => void;
	onLegendHovered?: (key: string) => void;
}

export const CustomLegend = ({
	payload,
	external,
	onLegendClicked = () => {},
	onLegendHovered = () => {},
}: LineChartLegendProps) => {
	const { linesConfig, align, showInactives, isRightAxisDisplayed } = external;

	const linesToShow = showInactives
		? linesConfig
		: linesConfig.filter(lineConfig => lineConfig.status !== 'inactive');

	if (payload?.length) {
		return (
			<ul
				className={classNames(
					styles['line-chart-custom-legend'],
					styles[`line-chart-custom-legend--align-${align || 'right'}`],
					{ [styles['line-chart-custom-legend--shift-left']]: isRightAxisDisplayed },
				)}
			>
				{linesToShow.map(config => (
					<li key={config.key}>
						<div
							data-testid={`legend_item_${config.key}`}
							className={classNames(styles['line-chart-custom-legend-item'], {
								[styles['line-chart-custom-legend__button--inactive']]:
									config?.status === 'inactive',
							})}
							role="button"
							onClick={() => onLegendClicked(config.key)}
							onKeyPress={() => onLegendClicked(config.key)}
							onMouseEnter={() => onLegendHovered(config.key)}
							onMouseLeave={() => onLegendHovered('')}
							tabIndex={0}
						>
							<LineIcon color={config.color} dashed={config?.dashed} />

							<span className={classNames(styles['line-chart-custom-legend__line-label'])}>
								{config.legendLabel ?? config.key}
							</span>
						</div>
					</li>
				))}
			</ul>
		);
	}

	return null;
};
