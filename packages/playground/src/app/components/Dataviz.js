import { useState, useEffect } from 'react';
import {
	GeoChart,
	getGeoChartConfig,
	getHorizontalBarChartTooltip,
	HorizontalBarChart,
	KeyValueTooltip,
	ValueType,
} from '@talend/react-dataviz';
import { ErrorBoundary } from '@talend/react-cmf';
import Layout from '@talend/react-components/lib/Layout';
import SidePanel from '@talend/react-containers/lib/SidePanel';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';

const data = [
	{
		key: 'Entry fully matching filter',
		value: 2145,
		filteredValue: 2145,
	},
	{
		key: 'Entry not matching filter',
		value: 1500,
		filteredValue: 0,
	},
	{
		key: 'Entry partially matching filter',
		value: 3200,
		filteredValue: 2080,
	},
];

const geo = [
	{ key: 'Asia', value: 10 },
	{ key: 'Amérique du Nord', value: 20 },
];

export function Dataviz() {
	const [chartsConfig, setConfig] = useState();
	useEffect(() => {
		async function load() {
			try {
				const config = await getGeoChartConfig('CONTINENT');
				setConfig(config);
			} catch (error) {
				console.error(error);
			}
		}
		load();
	}, []);

	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<div style={{ height: 300, width: 300 }}>
				<HorizontalBarChart
					data={data}
					getTooltipContent={entry => (
						<KeyValueTooltip entries={getHorizontalBarChartTooltip(entry, ValueType.OCCURRENCES)} />
					)}
				/>
			</div>
			<div style={{ height: 500, width: 500 }}>
				<ErrorBoundary>
					<GeoChart
						data={geo}
						columnName="Geo key"
						chartConfig={chartsConfig}
						getTooltipContent={entry => (
							<KeyValueTooltip
								entries={getHorizontalBarChartTooltip(entry, ValueType.OCCURRENCES)}
							/>
						)}
					/>
				</ErrorBoundary>
			</div>
		</Layout>
	);
}
