import React from 'react';
import { mount } from 'enzyme';
import GeoChart from './GeoChart.component';
import { getGeoChartConfig } from './GeoChart.utils';
import styles from './GeoChart.scss';

function getTopo(url) {
	const last = url.split('/').pop();
	return require(`../../../assets/maps/${last}`);
}

describe('GeoChart component', () => {
	let defaultProps;
	let originalfetch;
	beforeEach(async () => {
		jest.resetAllMocks();
		originalfetch = global.fetch;
		global.fetch = jest.fn(url => ({ ok: true, json: () => Promise.resolve(getTopo(url)) }));
		defaultProps = {
			data: [
				{ key: 'Occitanie', value: 10 },
				{ key: 'Martinique', value: 20 },
			],
			columnName: 'name',
			chartConfig: await getGeoChartConfig('FR_REGION'),
			onSelection: jest.fn(),
		};
	});
	afterEach(() => {
		global.fetch = originalfetch;
	});

	it('Should match data', () => {
		const component = mount(<GeoChart {...defaultProps} />).render();

		expect(component.find(`.${styles['geo-chart__feature']}`)).toHaveLength(18);
		expect(component.find(`.${styles['geo-chart__feature--disabled']}`)).toHaveLength(16);
		expect(component.find('[data-key="Occitanie"][data-value="10"]')).toHaveLength(1);
	});

	it('Should be case and punctuation insensitive', () => {
		const component = mount(
			<GeoChart {...defaultProps} data={[{ key: 'Occi tanié', value: 10 }]} />,
		).render();

		expect(component.find('[data-key="Occi tanié"][data-value="10"]')).toHaveLength(1);
	});

	it('Should match data in configured properties only', async () => {
		const chartConfig = await getGeoChartConfig('US_STATE_CODE');
		const component = mount(
			<GeoChart
				{...defaultProps}
				chartConfig={chartConfig}
				data={[
					{ key: 'TX', value: 10 },
					{ key: 'New York', value: 10 },
				]}
			/>,
		).render();
		expect(global.fetch).toHaveBeenCalled();

		expect(component.find('[data-key="TX"]')).toHaveLength(1);
		expect(component.find('[data-key="New York"]')).toHaveLength(0);
	});
});
