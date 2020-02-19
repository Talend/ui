import { useState, useEffect } from 'react';

const DATE_FILTER_ID = 'date-range';

export default function useTimeRange(groups, { addFilters, removeFilters, startName, endName }) {
	const getGroupTimeRange = () => {
		let globalStart;
		let globalEnd;
		groups.forEach(group => {
			const { items } = group;
			const itemStart = items[0][startName];
			const itemEnd = items[items.length - 1][endName];
			if (!globalStart || globalStart > itemStart) {
				globalStart = itemStart;
			}
			if (!globalEnd || globalEnd < itemEnd) {
				globalEnd = itemEnd;
			}
		});

		const globalStartDate = new Date(globalStart);
		globalStartDate.setHours(0);
		globalStartDate.setMinutes(0);
		globalStartDate.setSeconds(0);
		globalStartDate.setMilliseconds(0);

		const globalEndDate = new Date(globalEnd);
		globalEndDate.setHours(0);
		globalEndDate.setMinutes(0);
		globalEndDate.setSeconds(0);
		globalEndDate.setMilliseconds(0);
		globalEndDate.setDate(globalEndDate.getDate() + 1);

		return [globalStartDate.getTime(), globalEndDate.getTime()];
	};

	const [timeRange, setTimeRange] = useState(getGroupTimeRange);

	useEffect(() => {
		if (timeRange) {
			const [startTimestamp, endTimestamp] = timeRange;
			const filter = {
				id: DATE_FILTER_ID,
				predicate: item =>
					(!startTimestamp || item[startName] >= startTimestamp) &&
					(!endTimestamp || item[startName] <= endTimestamp),
			};
			removeFilters(DATE_FILTER_ID);
			addFilters(filter);
		}
	}, [timeRange]);

	// function setTimestampRange([startDate, endDate]) {
	// 	const startTimestamp = startDate instanceof Date ? startDate.getTime() : startDate;
	// 	const endTimestamp = endDate instanceof Date ? endDate.getTime() : endDate;
	// 	setTimeRange([startTimestamp, endTimestamp]);
	// }

	return [timeRange, setTimeRange];
}
