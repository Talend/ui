import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import GeoChart, { Entry } from './GeoChart.component';
import { getGeoChartConfig, getGeoChartSupportedDomains } from './GeoChart.utils';

const SAMPLE_DATA: { [key in string]: Entry[] } = {
	CONTINENT: [
		{ key: 'Asia', value: 10 },
		{ key: 'Amérique du Nord', value: 20 },
	],
	CONTINENT_CODE: [
		{ key: 'EUR', value: 10 },
		{ key: 'ASI', value: 20 },
	],
	COUNTRY: [
		{ key: 'Russie', value: 10 },
		{ key: 'China', value: 20 },
	],
	COUNTRY_CODE_ISO2: [
		{ key: 'US', value: 10 },
		{ key: 'RU', value: 20 },
	],
	COUNTRY_CODE_ISO3: [
		{ key: 'USA', value: 10 },
		{ key: 'RUS', value: 20 },
	],
	US_STATE: [
		{ key: 'California', value: 2 },
		{ key: 'New Jersey', value: 52 },
		{ key: 'Texas', value: 45 },
	],
	US_STATE_CODE: [
		{ key: 'CA', value: 2 },
		{ key: 'NJ', value: 52 },
		{ key: 'TX', value: 45 },
	],
	CA_PROVINCE_TERRITORY: [
		{ key: 'British Columbia', value: 2 },
		{ key: 'Quebec', value: 52 },
	],
	CA_PROVINCE_TERRITORY_CODE: [
		{ key: 'BC', value: 2 },
		{ key: 'QC', value: 52 },
	],
	NA_STATE: [
		{ key: 'British Columbia', value: 2 },
		{ key: 'Quebec', value: 200 },
		{ key: 'California', value: 130 },
		{ key: 'New Jersey', value: 40 },
	],
	NA_STATE_CODE: [
		{ key: 'BC', value: 2 },
		{ key: 'QC', value: 52 },
	],
	MX_ESTADO: [
		{ key: 'Sinaloa', value: 10 },
		{ key: 'Guanajuato', value: 20 },
	],
	MX_ESTADO_CODE: [
		{ key: 'SIN', value: 10 },
		{ key: 'GUA', value: 20 },
	],
	FR_DEPARTEMENT: [
		{ key: 'Loire-Atlantique', value: 10 },
		{ key: 'Vendée', value: 20 },
	],
	FR_REGION: [
		{ key: 'Occitanie', value: 10 },
		{ key: 'Martinique', value: 20 },
	],
	FR_REGION_LEGACY: [
		{ key: 'Bretagne', value: 10 },
		{ key: 'Picardie', value: 20 },
	],
};

const stories = storiesOf('Dataviz/GeoChart', module).addDecorator(fn => (
	<div
		style={{
			width: 500,
			height: 500,
		}}
	>
		{fn()}
	</div>
));

// eslint-disable-next-line
const storyStore = (window as any).__STORYBOOK_STORY_STORE__;

getGeoChartSupportedDomains().map(async domain => {
	const chartConfig = await getGeoChartConfig(domain);
	storyStore.startConfiguring();
	stories.add(domain, () => (
		<GeoChart
			chartConfig={chartConfig}
			data={SAMPLE_DATA[domain]}
			columnName="Geo key"
			onSelection={action('onSelection')}
		/>
	));
	storyStore.finishConfiguring();
});
