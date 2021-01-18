import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as d3 from 'd3';
import styles from './BoxPlot.component.scss';

const formatNumber = d3.format(',');

export interface BoxPlotData {
	q1: number;
	q2: number;
	median: number;
	mean: number;
	min: number;
	max: number;
}

export interface BoxPlotProps {
	id?: string;
	boxPlotData: BoxPlotData;
	height: number;
	width: number;
}

/*
 * Component imported "as-is" from TDP
 */
function Boxplot({ id, width, height, boxPlotData }: BoxPlotProps): JSX.Element {
	const { t } = useTranslation();
	const containerRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (boxPlotData && containerRef.current) {
			const margin = { top: 30, right: 80, bottom: 70, left: 80 };
			const boxWidth = width - margin.left - margin.right;
			const boxHeight = height - margin.top - margin.bottom;
			const duration = 1000;

			d3.select(containerRef.current)
				.select('svg')
				.remove();

			const svg = d3
				.select(containerRef.current)
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.attr('class', styles.box)
				.append('g')
				.attr('transform', `translate(${margin.left},${margin.top})`);

			const quartileData = [boxPlotData.q1, boxPlotData.median, boxPlotData.q2];

			// Compute the new vertical-scale.
			const vScale = d3
				.scaleLinear()
				.domain([boxPlotData.min, boxPlotData.max])
				.range([boxHeight, 0]);

			// central vertical Axis
			const center = svg.append('g');
			center
				.append('line')
				.attr('class', styles['box-plot__center'])
				.attr('x1', boxWidth / 2)
				.attr('y1', () => vScale(boxPlotData.min))
				.attr('x2', boxWidth / 2)
				.attr('y2', () => vScale(boxPlotData.max))
				.style('opacity', 1e-6)
				.transition()
				.duration(duration)
				.style('opacity', 1);

			// box plot
			const boxPlot = svg.append('g');

			// top box
			const boxTop = boxPlot
				.append('g')
				.selectAll('rect')
				.data([quartileData]);

			boxTop
				.enter()
				.append('rect')
				.attr('x', 0)
				.attr('y', d => vScale(d[2]))
				.attr('width', boxWidth)
				.attr('height', () => vScale(boxPlotData.q2));

			boxTop
				.transition()
				.duration(duration)
				.attr('height', d => vScale(d[1]) - vScale(d[2]));

			// bottom box.
			const boxBottom = boxPlot
				.append('g')
				.selectAll('rect')
				.data([quartileData]);

			boxBottom
				.enter()
				.append('rect')
				.attr('x', 0)
				.attr('y', () => vScale(boxPlotData.q2))
				.attr('width', boxWidth)
				.attr('height', d => vScale(d[0]) - vScale(d[2]));

			boxBottom
				.transition()
				.duration(duration * 1.5)
				.ease(d3.easeBounce)
				.attr('y', d => vScale(d[1]))
				.attr('height', d => vScale(d[0]) - vScale(d[1]));

			const max = boxPlotData.max;
			// whiskers
			const topWhiskerPolyg = `0,${vScale(max)} ${boxWidth},${vScale(max)} ${boxWidth -
				20},${vScale(max) - 20} ${vScale(max) + 20},${vScale(max) - 20}`;

			const min = boxPlotData.min;
			const bottomWhiskerPolyg = `0,${vScale(min)} ${boxWidth},${vScale(min)} ${boxWidth -
				20},${vScale(min) + 20} 20,${vScale(min) + 20}`;

			const gWhisker = svg.append('g');

			const gWhiskerTop = gWhisker.append('g');

			gWhiskerTop
				.append('polygon')
				.attr('class', styles['box-plot__whiskerPolyg'])
				.attr('points', topWhiskerPolyg);

			gWhiskerTop
				.append('text')
				.attr('class', styles['box-plot__max-min-labels'])
				.attr('x', boxWidth / 2)
				.attr('y', vScale(boxPlotData.max) / 2)
				.text(
					t('MAXIMUM', {
						defaultValue: 'Maximum',
					}),
				)
				.style('opacity', 1)
				.attr('text-anchor', 'middle')
				.transition()
				.duration(duration)
				.attr('y', -22)
				.style('opacity', 1);

			const gWhiskerBottom = gWhisker.append('g');

			gWhiskerBottom
				.append('polygon')
				.attr('class', styles['box-plot__whiskerPolyg'])
				.attr('points', bottomWhiskerPolyg);

			gWhiskerBottom
				.append('text')
				.attr('class', styles['box-plot__max-min-labels'])
				.attr('x', boxWidth / 2)
				.attr('y', vScale(boxPlotData.min) / 2)
				.text(t('MINIMUM', 'Minimum'))
				.style('opacity', 1)
				.attr('text-anchor', 'middle')
				.transition()
				.duration(duration)
				.attr('y', vScale(boxPlotData.min) + 30);

			// mean circle
			const gMean = svg.insert('g');
			gMean
				.append('circle')
				.attr('class', styles['box-plot__mean'])
				.attr('r', 17)
				.attr('cx', boxWidth / 2)
				.attr('cy', () => vScale(boxPlotData.mean))
				.style('opacity', 1)
				.transition()
				.duration(duration * 2)
				.attr('r', 7)
				.style('opacity', 1);

			gMean
				.append('circle')
				.attr('r', 1.5)
				.attr('cx', boxWidth / 2)
				.attr('cy', () => vScale(boxPlotData.mean))
				.style('opacity', 1e-6)
				.style('shape-rendering', 'geometricPrecision')
				.transition()
				.duration(duration * 2)
				.style('opacity', 1);

			// text values
			const gTexts = svg.append('g');
			// max
			gTexts
				.append('text')
				.attr('class', styles['box-plot__max-min-labels'])
				.attr('x', boxWidth / 2)
				.attr('y', vScale(boxPlotData.min) / 2)
				.text(formatNumber(boxPlotData.max))
				.style('opacity', 1)
				.attr('text-anchor', 'middle')
				.transition()
				.duration(duration)
				.attr('y', vScale(boxPlotData.max) - 10);

			// min
			gTexts
				.append('text')
				.attr('class', styles['box-plot__max-min-labels'])
				.attr('x', boxWidth / 2)
				.attr('y', vScale(boxPlotData.min) / 2)
				.text(formatNumber(boxPlotData.min))
				.style('opacity', 1)
				.attr('text-anchor', 'middle')
				.transition()
				.duration(duration)
				.attr('y', vScale(boxPlotData.min) + 17);

			gTexts
				.append('text')
				.attr('class', styles['box-plot__mean-labels'])
				.attr('x', boxWidth / 2)
				.attr('y', () => {
					if (boxHeight - vScale(boxPlotData.mean - boxPlotData.min) < 15) {
						return vScale(boxPlotData.mean) - 10;
					} else if (boxHeight - vScale(boxPlotData.max - boxPlotData.mean) < 15) {
						return vScale(boxPlotData.mean) + 15;
					}
					return vScale(boxPlotData.mean) - 10;
				})
				.text(`${t('MEAN', 'Mean')}${t('COLON', ':')}${formatNumber(boxPlotData.mean)}`)
				.style('opacity', 1e-6)
				.attr('text-anchor', 'middle')
				.transition()
				.duration(duration * 2)
				.style('opacity', 1);

			// lower quantile value
			gTexts
				.append('text')
				.attr('class', styles['box-plot__low-quantile-labels'])
				.attr('x', boxWidth + 5)
				.attr('y', vScale(boxPlotData.min) / 2)
				.text(formatNumber(boxPlotData.q1))
				.style('opacity', 1)
				.attr('text-anchor', 'start')
				.transition()
				.duration(duration)
				.attr('y', vScale(boxPlotData.q1) + 20);

			// lower quantile text
			gTexts
				.append('text')
				.attr('class', styles['box-plot__low-quantile-labels'])
				.attr('x', 10)
				.attr('y', vScale(boxPlotData.min) / 2)
				.text(t('LOWER_QUANTILE', 'Lower quantile'))
				.style('opacity', 1)
				.attr('text-anchor', 'end')
				.transition()
				.duration(duration)
				.attr('y', vScale(boxPlotData.q1) + 20);

			// upper quantile value
			gTexts
				.append('text')
				.attr('class', styles['box-plot__up-quantile-labels'])
				.attr('x', 10)
				.attr('y', vScale(boxPlotData.min) / 2)
				.text(t('UPPER_QUANTILE', 'Upper quantile'))
				.style('opacity', 1)
				.attr('text-anchor', 'end')
				.transition()
				.duration(duration)
				.attr('y', vScale(boxPlotData.q2) - 10);

			// upper quantile text
			gTexts
				.append('text')
				.attr('class', styles['box-plot__up-quantile-labels'])
				.attr('x', boxWidth + 5)
				.attr('y', vScale(boxPlotData.min) / 2)
				.text(formatNumber(boxPlotData.q2))
				.style('opacity', 1)
				.attr('text-anchor', 'start')
				.transition()
				.duration(duration)
				.attr('y', vScale(boxPlotData.q2) - 10);

			// median value
			gTexts
				.append('text')
				.attr('class', styles['box-plot__mean-labels'])
				.attr('x', boxWidth - 5)
				.text(formatNumber(boxPlotData.median))
				.style('opacity', 1e-6)
				.attr('text-anchor', 'end')
				.attr('y', () => {
					return boxPlotData.median >= boxPlotData.mean
						? vScale(boxPlotData.median) + 15
						: vScale(boxPlotData.median) - 5;
				})
				.transition()
				.duration(duration * 3)
				.style('opacity', 1);

			// median text
			gTexts
				.append('text')
				.attr('class', styles['box-plot__mean-labels'])
				.attr('x', 5)
				.text(t('MEDIAN', 'Median'))
				.style('opacity', 1e-6)
				.attr('text-anchor', 'start')
				.attr('y', () => {
					return boxPlotData.median >= boxPlotData.mean
						? vScale(boxPlotData.median) + 15
						: vScale(boxPlotData.median) - 5;
				})
				.transition()
				.duration(duration * 3)
				.style('opacity', 1);
		}
	}, [boxPlotData, height, t, width]);

	return <div id={id} ref={containerRef} className={styles['box-plot']} />;
}

export default Boxplot;
