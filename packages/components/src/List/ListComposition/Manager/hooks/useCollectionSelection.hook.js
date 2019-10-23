import { useState } from 'react';

export default function useCollectionSelection(
	collection = [],
	initialSelectedIds = [],
	idKey = 'id',
) {
	const [selectedIds, setSelectedIds] = useState(initialSelectedIds);

	function isSelected(item) {
		const itemId = item[idKey];
		return selectedIds.some(itemKey => itemKey === itemId);
	}

	function onToggleItem(item) {
		const itemId = item[idKey];
		const dataIndex = selectedIds.indexOf(itemId);
		const newSelectedIds = selectedIds.slice(0);
		if (dataIndex > -1) {
			newSelectedIds.splice(dataIndex, 1);
		} else {
			newSelectedIds.push(itemId);
		}
		setSelectedIds(newSelectedIds);
	}

	function onToggleAll() {
		if (collection.length === selectedIds.length) {
			setSelectedIds([]);
		} else {
			setSelectedIds(collection.map(item => item[idKey]));
		}
	}

	return {
		isSelected,
		allIsSelected: selectedIds.length > 0 && selectedIds.length === collection.length,
		selectedIds,
		setSelectedIds,
		onToggleAll,
		onToggleItem,
	};
}
