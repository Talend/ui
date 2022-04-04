import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import GeoChart, { GeoChartProps } from './GeoChart.component';
import { getGeoChartConfig } from './GeoChart.utils';

export default {
	title: 'Dataviz/GeoChart',
	component: GeoChart,
	decorators: [
		(fn: () => React.ReactNode) => (
			<div
				style={{
					width: 500,
					height: 500,
				}}
			>
				{fn()}
			</div>
		),
	],
	args: {
		columnName: 'Geo key',
		onSelection: action('onSelection'),
	},
	loaders: [
		async ({ name }: Story) => ({
			chartConfig: await getGeoChartConfig(name.replaceAll(' ', '_')),
		}),
	],
};

const Default: Story<GeoChartProps> = (props, { loaded }) => <GeoChart {...loaded} {...props} />;

export const CONTINENT = Default.bind({});
CONTINENT.args = {
	data: [
		{ key: 'Asia', value: 10 },
		{ key: 'Amérique du Nord', value: 20 },
	],
};

export const COUNTRY = Default.bind({});
COUNTRY.args = {
	data: [
		{ key: 'Russie', value: 10 },
		{ key: 'China', value: 20 },
	],
};

export const US_STATE = Default.bind({});
US_STATE.args = {
	data: [
		{ key: 'California', value: 2 },
		{ key: 'New Jersey', value: 52 },
		{ key: 'Texas', value: 45 },
	],
};

export const CA_PROVINCE_TERRITORY = Default.bind({});
CA_PROVINCE_TERRITORY.args = {
	data: [
		{ key: 'British Columbia', value: 2 },
		{ key: 'Quebec', value: 52 },
	],
};

export const NA_STATE = Default.bind({});
NA_STATE.args = {
	data: [
		{ key: 'British Columbia', value: 2 },
		{ key: 'Quebec', value: 200 },
		{ key: 'California', value: 130 },
		{ key: 'New Jersey', value: 40 },
	],
};

export const MX_ESTADO = Default.bind({});
MX_ESTADO.args = {
	data: [
		{ key: 'Sinaloa', value: 10 },
		{ key: 'Guanajuato', value: 20 },
	],
};

export const FR_DEPARTEMENT = Default.bind({});
FR_DEPARTEMENT.args = {
	data: [
		{ key: 'Loire-Atlantique', value: 10 },
		{ key: 'Vendée', value: 20 },
	],
};

export const FR_REGION = Default.bind({});
FR_REGION.args = {
	data: [
		{ key: 'Occitanie', value: 10 },
		{ key: 'Martinique', value: 20 },
	],
};

export const FR_REGION_LEGACY = Default.bind({});
FR_REGION_LEGACY.args = {
	data: [
		{ key: 'Bretagne', value: 10 },
		{ key: 'Picardie', value: 20 },
	],
};
