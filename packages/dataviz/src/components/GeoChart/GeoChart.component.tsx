import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { rgb, RGBColor } from 'd3-color';
import { select as d3select, Selection } from 'd3-selection';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { geoIdentity, geoPath, GeoPath } from 'd3-geo';
import { zoom as d3zoom } from 'd3-zoom';
import { FeatureCollection } from 'geojson';
import { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import throttle from 'lodash/throttle';
import Icon from '@talend/react-components/lib/Icon';

import TooltipContent, { TooltipEntry } from '../TooltipContent/TooltipContent.component';
import styles from './GeoChart.scss';

// Rename ugly d3 types
type ColorScale = ScaleLinear<RGBColor, RGBColor>;
type SvgPath = Selection<SVGPathElement, unknown, null, undefined>;
type Svg = Selection<SVGSVGElement, unknown, null, undefined>;
type SvgG = Selection<SVGGElement, unknown, null, undefined>;

export interface Entry {
	key: string;
	value: number;
}

export interface GeoChartConfig {
	topology: Topology;
	/** the name of the `objects` collection to use (first one will be used if not provided) */
	layer?: string;
	labelProperty?: string;
	valueProperties: string[];
}

export interface GeoChartProps {
	chartConfig: GeoChartConfig;
	data: Entry[];
	columnName: string;
	onSelection: (key: string) => void;
}

interface TooltipPosition {
	x: number;
	y: number;
}

// Don't worry, chart will fit it's container
const width = 250;
const height = 200;

// Reuse collator for better performance
const COLLATOR = new Intl.Collator(undefined, {
	usage: 'search',
	sensitivity: 'base',
	ignorePunctuation: true,
});

function findEntry(
	data: Entry[],
	properties: { [name: string]: string | number },
	chartConfig: GeoChartConfig,
): Entry | undefined {
	// Match configured fields
	return data.find(entry =>
		chartConfig.valueProperties.some(
			property => COLLATOR.compare(entry.key, `${properties[property]}`) === 0,
		),
	);
}

function renderFeature(
	path: SvgPath,
	colorScale: ColorScale,
	setTooltipEntry: (tooltipEntry: TooltipEntry | null) => void,
	setTooltipPosition: (tooltipPosition: TooltipPosition | null) => void,
	onSelection: (key: string) => void,
	entry?: Entry,
	label?: string,
): void {
	path.attr(
		'class',
		classNames('geo-chart__feature', {
			'geo-chart__feature--disabled': !entry,
		}),
	);
	if (entry) {
		path
			.attr('data-key', entry.key)
			.attr('data-value', entry.value)
			.style('fill', colorScale(+entry.value)?.toString() || '')
			.on('click', () => onSelection(entry.key))
			.on('mouseover', d3Event => {
				// if we have both label and entry key: "label (key): value", otherwise "label: value" or "key: value"
				const tooltipLabel = `${label || entry.key}${
					label && entry.key !== label ? ` (${entry.key})` : ''
				}`;
				setTooltipEntry({
					key: tooltipLabel,
					value: `${entry.value}`,
				});
				setTooltipPosition({
					x: d3Event.x,
					y: d3Event.y,
				});
			})
			.on(
				'mousemove',
				throttle(
					d3Event =>
						d3Event &&
						setTooltipPosition({
							x: d3Event.x,
							y: d3Event.y,
						}),
					30,
				),
			)
			.on('mouseout', () => {
				setTooltipEntry(null);
				setTooltipPosition(null);
			});
	}
}

function createSvg(parent: HTMLDivElement): Svg {
	return d3select(parent)
		.append('svg')
		.attr('viewBox', `0 0 ${width} ${height}`);
}

function clearChart(container: HTMLDivElement): void {
	d3select(container)
		.selectAll('svg')
		.remove();
}

function getScale(data: Entry[]): ColorScale {
	const values = data.map(entry => entry.value);
	return scaleLinear<RGBColor>()
		.domain([Math.min(...values), Math.max(...values)])
		.range([rgb(styles.scaleMinColor), rgb(styles.scaleMaxColor)]);
}

function getGeoPath(featureCollection: FeatureCollection): GeoPath {
	// we use the same projection for all maps: custom projections have to be applied to the topojson file
	const projection = geoIdentity()
		.scale(1)
		.fitSize([width, height], featureCollection);
	return geoPath().projection(projection);
}

function getFeatureCollection(chartConfig: GeoChartConfig): FeatureCollection {
	// Use configured layer or first available
	const topology = chartConfig.topology;
	const layer = chartConfig.layer || Object.keys(topology.objects)[0];
	// convert topojson to geojson
	return feature(topology, topology.objects[layer]) as FeatureCollection;
}

function registerZoom(
	svg: Svg,
	container: SvgG,
	zoomInButtonRef: HTMLButtonElement,
	zoomOutButtonRef: HTMLButtonElement,
): void {
	const zoom = d3zoom<SVGSVGElement, unknown>()
		.scaleExtent([1, 100])
		.on('zoom', d3Event => {
			const currentTransform = d3Event.transform;
			container.attr('transform', currentTransform);
		});

	d3select(zoomInButtonRef).on('click', () => {
		zoom.scaleBy(svg.transition().duration(250), 2);
	});

	d3select(zoomOutButtonRef).on('click', () => {
		zoom.scaleBy(svg.transition().duration(250), 1 / 2);
	});

	svg.call(zoom);
}

function GeoChart({ data, columnName, onSelection, chartConfig }: GeoChartProps): JSX.Element {
	const containerRef = useRef<HTMLDivElement>(null);
	const zoomInButtonRef = useRef<HTMLButtonElement>(null);
	const zoomOutButtonRef = useRef<HTMLButtonElement>(null);
	const { t } = useTranslation();
	const [tooltipEntry, setTooltipEntry] = useState<TooltipEntry | null>();
	const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>();

	useEffect(() => {
		if (
			chartConfig &&
			containerRef.current &&
			zoomInButtonRef.current &&
			zoomOutButtonRef.current
		) {
			clearChart(containerRef.current);

			const colorScale = getScale(data);
			const featureCollection = getFeatureCollection(chartConfig);
			const svg = createSvg(containerRef.current);
			const container = svg.append('g').attr('data-test', 'preparation.chart.geochart');

			container
				.selectAll('path')
				.data(featureCollection.features)
				.enter()
				.append('path')
				.each(function(d) {
					const matchedEntry = d.properties
						? findEntry(data, d.properties, chartConfig)
						: undefined;
					const label = chartConfig.labelProperty && d.properties?.[chartConfig.labelProperty];
					renderFeature(
						d3select(this),
						colorScale,
						setTooltipEntry,
						setTooltipPosition,
						onSelection,
						matchedEntry,
						label,
					);
				})
				.attr('d', getGeoPath(featureCollection));

			registerZoom(svg, container, zoomInButtonRef.current, zoomOutButtonRef.current);
		}
	}, [data, chartConfig, onSelection, setTooltipEntry, setTooltipPosition]);

	return (
		<div className={styles['geo-chart']}>
			<h1 className={styles['geo-chart__title']} data-test="preparation.chart.title">
				{t('GEO_DISTRIBUTION', {
					column_name: columnName,
					defaultValue: '{{column_name}} distribution',
				})}
			</h1>
			<div className={styles['geo-chart__zoom']}>
				<button
					ref={zoomInButtonRef}
					title={t('ZOOM_IN', {
						defaultValue: 'Zoom in',
					})}
					className={styles['geo-chart__zoom-button']}
					data-feature="preparation.chart.zoom-in"
				>
					<Icon name="talend-plus-circle" className={styles['geo-chart__zoom-icon']} />
				</button>
				<button
					ref={zoomOutButtonRef}
					title={t('ZOOM_OUT', {
						defaultValue: 'Zoom out',
					})}
					className={styles['geo-chart__zoom-button']}
					data-feature="preparation.chart.zoom-out"
				>
					<Icon name="talend-minus-circle" className={styles['geo-chart__zoom-icon']} />
				</button>
			</div>
			<div ref={containerRef} />
			{tooltipPosition && tooltipEntry && (
				<div
					style={{
						position: 'fixed',
						left: `${tooltipPosition.x - 3}px`,
						top: `${tooltipPosition.y + 3}px`,
					}}
				>
					<TooltipContent entries={[tooltipEntry]} />
				</div>
			)}
		</div>
	);
}

export default GeoChart;
