import { useMemo, useState } from 'react';

const isVisible = (dataKey, columnsVisibility, initialVisibleColumns) => {
	if (columnsVisibility) {
		const column = columnsVisibility.find(col => col.dataKey === dataKey);
		return column ? column.visible : true;
	} else if (initialVisibleColumns.length) return initialVisibleColumns.includes(dataKey);
	return true;
};

export function useColumnsVisibility(storageKey, initialVisibleColumns = []) {
	const [columnsVisibility, setColumnsVisibility] = useState(() => {
		let visibleColumns;
		if (storageKey) {
			const nextColumnsVisibility = localStorage.getItem(storageKey);
			visibleColumns = nextColumnsVisibility && JSON.parse(nextColumnsVisibility);
		}
		return visibleColumns;
	});

	const visibleColumns = useMemo(
		() => columnsVisibility?.filter(({ visible }) => !!visible).map(({ dataKey }) => dataKey),
		[columnsVisibility],
	);

	const setVisibleColumns = (columns, nextVisibleColumns) => {
		if (columns.length) {
			const nextColumnsVisibility = columns.map(({ dataKey }) => ({
				dataKey,
				visible: nextVisibleColumns.includes(dataKey),
			}));
			if (storageKey) localStorage.setItem(storageKey, JSON.stringify(nextColumnsVisibility));
			setColumnsVisibility(nextColumnsVisibility);
		}
	};

	const updateColumns = columns =>
		setVisibleColumns(
			columns,
			columns
				.filter(({ dataKey }) => isVisible(dataKey, columnsVisibility, initialVisibleColumns))
				.map(({ dataKey }) => dataKey),
		);

	return {
		visibleColumns,
		setVisibleColumns,
		updateColumns,
	};
}
