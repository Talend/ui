import { difference } from 'lodash';
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
			const nextColumnsVisibility = columns.map(({ dataKey }) => ({
				key: dataKey,
				visible:
					visibleColumns.includes(dataKey) || !columnsVisibility.find(({ key }) => key === dataKey),
			}));
			localStorage.setItem(storageKey, JSON.stringify(nextColumnsVisibility));
			_setColumnsVisibility(nextColumnsVisibility);
		}
	};

	return {
		columnsVisibility,
		setColumnsVisibility,
	};
}
