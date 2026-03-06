/* eslint-disable import/no-unresolved */
vi.mock('@talend/assets-api', async () => {
	const fs = await import('fs');
	const path = await import('path');
	const mock = {
		getJSON: async assetUrl => {
			const filePath = path.resolve(process.cwd(), assetUrl.replace('/dist/', ''));
			return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		},
		getURL: vi.fn(() => '/url'),
	};
	return {
		default: mock,
		...mock,
	};
});

import { render } from '@testing-library/react';

import GeoChart from './GeoChart.component';
import { getGeoChartConfig } from './GeoChart.utils';
import styles from './GeoChart.module.css';

describe('GeoChart component', () => {
	let defaultProps;
	beforeEach(async () => {
		vi.resetAllMocks();
		defaultProps = {
			data: [
				{ key: 'Occitanie', value: 10 },
				{ key: 'Martinique', value: 20 },
			],
			columnName: 'name',
			onSelection: vi.fn(),
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
			/>
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
			/>
		);

		expect(document.querySelectorAll('[data-key="TX"]')).toHaveLength(1);
		expect(document.querySelectorAll('[data-key="New York"]')).toHaveLength(0);
	});
});
