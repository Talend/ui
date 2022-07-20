import { useState } from 'react';

export function useColumnsVisibility(storageKey) {
	const [columnsVisibility, _setColumnsVisibility] = useState(() => {
		let visibleColumns = null;
		if (storageKey) {
			const columnsVisibility = localStorage.getItem(storageKey);
			visibleColumns = columnsVisibility && JSON.parse(columnsVisibility);
		}
		return visibleColumns;
	});

	const setColumnsVisibility = (columns, visibleColumns) => {
		if (storageKey && columns.length) {
			const columnsVisibility = columns.map(({ dataKey }) => ({
				key: dataKey,
				visible: visibleColumns.includes(dataKey),
			}));
			localStorage.setItem(storageKey, JSON.stringify(columnsVisibility));
			_setColumnsVisibility(columnsVisibility);
		}
	};

	return {
		columnsVisibility,
		setColumnsVisibility,
	};
}
