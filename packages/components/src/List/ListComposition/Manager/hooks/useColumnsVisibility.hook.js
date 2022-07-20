import { useMemo, useState } from 'react';

const isVisible = (dataKey, nextVisibleColumns, columnsVisibility, initialVisibleColumns) => {
	let visible = false;
	if (nextVisibleColumns) {
		visible = nextVisibleColumns.includes(dataKey);
	} else {
		if (columnsVisibility) {
			const columnInCV = columnsVisibility.find(({ key }) => key === dataKey);
			if (!!columnInCV) {
				visible = columnInCV.visible;
			} else {
				visible = true;
			}
		} else {
			if (initialVisibleColumns.length) {
				visible = initialVisibleColumns.includes(dataKey);
			} else {
				visible = true;
			}
		}
	}
	return visible;
};

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
			const nextColumnsVisibility = columns.map(({ dataKey }) => {
				return {
					key: dataKey,
					visible: isVisible(dataKey, nextVisibleColumns, columnsVisibility, initialVisibleColumns),
				};
			});
			if (storageKey) localStorage.setItem(storageKey, JSON.stringify(nextColumnsVisibility));
			_setColumnsVisibility(nextColumnsVisibility);
		}
	};

	return {
		visibleColumns,
		setVisibleColumns,
	};
}
