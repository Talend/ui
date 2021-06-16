import { GeoChartConfig } from './GeoChart.component';

const DEFAULT_LABEL_PROPERTY = 'name';
const STATE_CODE_VALUE_PROPERTIES = ['iso_3166_2'];

// Define file name only, will be used in a dynamic import()
type SupportedGeoChart = Omit<GeoChartConfig, 'topology'> & { file: string };
const SUPPORTED_CHARTS: { [key: string]: SupportedGeoChart } = {
	CONTINENT: {
		file: 'continents',
		labelProperty: 'continent',
		valueProperties: ['continent', 'continent_fr'],
	},
	CONTINENT_CODE: {
		file: 'continents',
		labelProperty: 'continent',
		valueProperties: ['code'],
	},
	COUNTRY: {
		file: 'world',
		valueProperties: ['name', 'name_fr', 'name_en'],
	},
	COUNTRY_CODE_ISO2: {
		file: 'world',
		valueProperties: ['iso_a2'],
	},
	COUNTRY_CODE_ISO3: {
		file: 'world',
		valueProperties: ['iso_a3'],
	},
	US_STATE: {
		file: 'US',
		valueProperties: ['name'],
	},
	US_STATE_CODE: {
		file: 'US',
		valueProperties: STATE_CODE_VALUE_PROPERTIES,
	},
	CA_PROVINCE_TERRITORY: {
		file: 'CA',
		valueProperties: ['name'],
	},
	CA_PROVINCE_TERRITORY_CODE: {
		file: 'CA',
		valueProperties: STATE_CODE_VALUE_PROPERTIES,
	},
	NA_STATE: {
		file: 'US_CA',
		valueProperties: ['name'],
	},
	NA_STATE_CODE: {
		file: 'US_CA',
		valueProperties: STATE_CODE_VALUE_PROPERTIES,
	},
	MX_ESTADO: {
		file: 'MX',
		valueProperties: ['name'],
	},
	MX_ESTADO_CODE: {
		file: 'MX',
		valueProperties: STATE_CODE_VALUE_PROPERTIES,
	},
	FR_DEPARTEMENT: {
		file: 'FR',
		valueProperties: ['name'],
	},
	FR_REGION: {
		file: 'FR',
		layer: 'regions',
		valueProperties: ['region'],
	},
	FR_REGION_LEGACY: {
		file: 'FR',
		layer: 'regions_legacy',
		valueProperties: ['region_legacy'],
	},
};

export function getGeoChartSupportedDomains(): string[] {
	return Object.keys(SUPPORTED_CHARTS);
}

export async function getGeoChartConfig(domain: string): Promise<GeoChartConfig> {
	const { file, ...chartConfig } = SUPPORTED_CHARTS[domain];
	return {
		...chartConfig,
		labelProperty: chartConfig.labelProperty || DEFAULT_LABEL_PROPERTY,
		topology: await import(
			/* webpackChunkName: "[request]" */
			`./maps/${file}.topo.json`
		),
	};
}
