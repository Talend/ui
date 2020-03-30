import { useMemo } from 'react';
import get from 'lodash/get';

const timesOverlap = (time1, time2) =>
	(!time1.end && !time2.end) || // 2 running
	(!time1.end && time1.start <= time2.end) || // first is running
	(!time2.end && time2.start <= time1.end) || // second is running
	(time1.start >= time2.start && time1.start <= time2.end) || // first starts during second run
	(time1.end >= time2.start && time1.end <= time2.end) || // first ends during second run
	(time2.start >= time1.start && time2.start <= time1.end) || // second starts during first run
	(time2.end >= time1.start && time2.end <= time1.end); // second ends during first run

export default function useGroups(data, { groupIdName, groupLabelName, startName, endName }) {
	return useMemo(() => {
		const groupsDict = data.reduce((accu, item) => {
			const groupId = get(item, groupIdName) || 'default';
			let group = accu[groupId];
			if (!group) {
				group = {
					id: groupId,
					label: get(item, groupLabelName) || 'Default',
					items: [],
				};
				accu[groupId] = group;
			}
			group.items.push(item);
			return accu;
		}, {});

		const groups = Object.values(groupsDict).sort((group1, group2) =>
			group1.label.localeCompare(group2.label),
		);
		groups.forEach(group => {
			group.items.sort((item1, item2) => get(item1, startName) - get(item2, startName));

			let maxLevel = 0;
			const itemsWithLevel = [];
			group.items.forEach(item => {
				const itemStart = get(item, startName);
				const itemEnd = get(item, endName);
				const itemsThatOverlap = itemsWithLevel.filter(cursor =>
					timesOverlap(
						{ start: itemStart, end: itemEnd },
						{ start: get(cursor, startName), end: get(cursor, endName) },
					),
				);

				let itemLevel = 0;
				while (itemsThatOverlap.some(({ _timelineLevel }) => _timelineLevel === itemLevel)) {
					itemLevel++;
				}

				maxLevel = Math.max(maxLevel, itemLevel);

				itemsWithLevel.push({ ...item, _timelineLevel: itemLevel });
			});
			group.items = itemsWithLevel;
			group.maxLevel = maxLevel;
		});

		return groups.slice(0, 1);
		// return groups;
	}, [data, groupIdName, groupLabelName]);
}
