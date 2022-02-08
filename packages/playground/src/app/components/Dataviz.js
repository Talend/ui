import React from 'react';
import {
	getHorizontalBarChartTooltip,
	HorizontalBarChart,
	TooltipContent,
	ValueType,
} from '@talend/react-dataviz';
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

export function Dataviz() {
	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<div style={{ height: 300, width: 300 }}>
				<HorizontalBarChart
					data={data}
					getTooltipContent={entry => (
						<TooltipContent entries={getHorizontalBarChartTooltip(entry, ValueType.OCCURRENCES)} />
					)}
				/>
			</div>
		</Layout>
	);
}
