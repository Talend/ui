import { useMemo, useState } from 'react';

export function useColumnsVisibility(storageKey, initialVisibleColumns = []) {
	const [columnsVisibility, _setColumnsVisibility] = useState(() => {
		let visibleColumns = null;
		if (storageKey) {
			const columnsVisibility = localStorage.getItem(storageKey);
			visibleColumns = columnsVisibility && JSON.parse(columnsVisibility);
		}
		return visibleColumns;
	});

	const visibleColumns = useMemo(
		() => columnsVisibility?.filter(({ visible }) => !!visible).map(({ key }) => key),
		[columnsVisibility],
	);

	const setVisibleColumns = (columns, nextVisibleColumns) => {
		if (columns.length) {
			const nextColumnsVisibility = columns.map(({ dataKey }) => ({
				key: dataKey,
				visible: !visibleColumns
					? initialVisibleColumns.length
						? initialVisibleColumns.includes(dataKey)
						: true
					: (nextVisibleColumns || visibleColumns).includes(dataKey) ||
					  !columnsVisibility.find(({ key }) => key === dataKey),
			}));
			if (storageKey) localStorage.setItem(storageKey, JSON.stringify(nextColumnsVisibility));
			_setColumnsVisibility(nextColumnsVisibility);
		}
	};

	return {
		visibleColumns,
		setVisibleColumns,
	};
}
