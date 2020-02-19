import { useMemo } from 'react';

export default function useGroups(data, { groupIdName, groupLabelName, startName, endName }) {
	return useMemo(() => {
		const groupsDict = data.reduce((accu, item) => {
			const groupId = item[groupIdName] || 'default';
			let group = accu[groupId];
			if (!group) {
				group = {
					id: groupId,
					label: item[groupLabelName] || 'Default',
					items: [],
				};
				accu[groupId] = group;
			}
			group.items.push(item);
			return accu;
		}, {});

		const groups = Object.values(groupsDict);
		groups.forEach(group => {
			group.items.sort((item1, item2) => item1[startName] - item2[startName]);

			let maxLevel = 0;
			group.items = group.items.map((item, index) => {
				const itemStart = item[startName];
				let itemLevel = 0;
				for (let i = 0; i < index; i++) {
					const cursor = group.items[i];
					if (itemStart >= cursor[startName] && itemStart < cursor[endName]) {
						itemLevel++;
					}
				}

				maxLevel = Math.max(maxLevel, itemLevel);

				return itemLevel === 0 ? item : { ...item, _timelineLevel: itemLevel };
			});
			group.maxLevel = maxLevel;
		});

		return groups;
	}, [data, groupIdName, groupLabelName]);
}
