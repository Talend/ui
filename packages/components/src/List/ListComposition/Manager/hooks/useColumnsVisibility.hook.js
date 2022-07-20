import { difference } from 'lodash';
import { useMemo, useState } from 'react';

export function useColumnsVisibility(storageKey, initialVisibleColumns = []) {
	const [columnsVisibility, _setColumnsVisibility] = useState(() => {
		let visibleColumns = null;
		if (storageKey) {
			const columnsVisibility = localStorage.getItem(storageKey);
			visibleColumns = columnsVisibility && JSON.parse(columnsVisibility);
		}
		if (!visibleColumns)
			visibleColumns = initialVisibleColumns.map(key => ({ key, visible: true }));
		return visibleColumns;
	});

	const visibleColumns = useMemo(
		() => columnsVisibility.filter(({ visible }) => !!visible).map(({ key }) => key),
		[columnsVisibility],
	);

	const setVisibleColumns = (columns, nextVisibleColumns) => {
		if (storageKey && columns.length) {
			const nextColumnsVisibility = columns.map(({ dataKey }) => ({
				key: dataKey,
				visible:
					(nextVisibleColumns || visibleColumns).includes(dataKey) ||
					!columnsVisibility.find(({ key }) => key === dataKey),
			}));
			localStorage.setItem(storageKey, JSON.stringify(nextColumnsVisibility));
			_setColumnsVisibility(nextColumnsVisibility);
		}
	};

	return {
		visibleColumns,
		setVisibleColumns,
	};
}
