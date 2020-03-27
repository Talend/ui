import { useState, useEffect } from 'react';
import get from 'lodash/get';

const DATE_FILTER_ID = 'date-range';

export default function useTimeRange(groups, { addFilters, removeFilters, startName, endName }) {
	const getGroupTimeRange = () => {
		let globalStart;
		let globalEnd;
		groups.forEach(group => {
			const { items } = group;
			const itemStart = get(items[0], startName);
			const itemEnd = get(items[items.length - 1], endName);
			if (!globalStart || globalStart > itemStart) {
				globalStart = itemStart;
			}
			if (!globalEnd || globalEnd < itemEnd) {
				globalEnd = itemEnd;
			}
		});

		const globalStartDate = new Date(globalStart);
		globalStartDate.setMinutes(0);
		globalStartDate.setSeconds(0);
		globalStartDate.setMilliseconds(0);

		const globalEndDate = new Date(globalEnd);
		globalEndDate.setMinutes(0);
		globalEndDate.setSeconds(0);
		globalEndDate.setMilliseconds(0);
		globalEndDate.setHours(globalEndDate.getHours() + 1);

		return [globalStartDate.getTime(), globalEndDate.getTime()];
	};

	const [timeRange, setTimeRange] = useState(getGroupTimeRange);

	useEffect(() => {
		if (timeRange) {
			const [startTimestamp, endTimestamp] = timeRange;
			const filter = {
				id: DATE_FILTER_ID,
				predicate: item =>
					(!startTimestamp || get(item, startName) >= startTimestamp) &&
					(!endTimestamp || get(item, startName) <= endTimestamp),
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
