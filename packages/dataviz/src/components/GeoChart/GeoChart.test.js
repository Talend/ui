/* eslint-disable import/no-unresolved */
jest.mock('@talend/assets-api', () => ({
	getJSON: async url => {
		return new Promise(resolve => resolve(require(url.replace('/dist', '../../..'))));
	},
	getURL: jest.fn(() => '/url'),
}));

import React from 'react';
import { render } from '@testing-library/react';

import GeoChart from './GeoChart.component';
import { getGeoChartConfig } from './GeoChart.utils';
import styles from './GeoChart.module.scss';

describe('GeoChart component', () => {
	let defaultProps;
	beforeEach(async () => {
		jest.resetAllMocks();
		defaultProps = {
			data: [
				{ key: 'Occitanie', value: 10 },
				{ key: 'Martinique', value: 20 },
			],
			columnName: 'name',
			onSelection: jest.fn(),
		};
	});

	it('Should match data', async () => {
		const chartConfig = await getGeoChartConfig('FR_REGION');
		render(<GeoChart {...defaultProps} chartConfig={chartConfig} />);

		expect(document.querySelectorAll(`.${styles['geo-chart__feature']}`)).toHaveLength(18);
		expect(document.querySelectorAll(`.${styles['geo-chart__feature--disabled']}`)).toHaveLength(
			16,
		);
		expect(document.querySelectorAll('[data-key="Occitanie"][data-value="10"]')).toHaveLength(1);
	});

	it('Should be case and punctuation insensitive', async () => {
		const chartConfig = await getGeoChartConfig('FR_REGION');
		render(
			<GeoChart
				{...defaultProps}
				chartConfig={chartConfig}
				data={[{ key: 'Occi tanié', value: 10 }]}
			/>,
		);
		expect(document.querySelectorAll('[data-key="Occi tanié"][data-value="10"]')).toHaveLength(1);
	});

	it('Should match data in configured properties only', async () => {
		const chartConfig = await getGeoChartConfig('US_STATE_CODE');
		render(
			<GeoChart
				{...defaultProps}
				chartConfig={chartConfig}
				data={[
					{ key: 'TX', value: 10 },
					{ key: 'New York', value: 10 },
				]}
			/>,
		);

		expect(document.querySelectorAll('[data-key="TX"]')).toHaveLength(1);
		expect(document.querySelectorAll('[data-key="New York"]')).toHaveLength(0);
	});
});
