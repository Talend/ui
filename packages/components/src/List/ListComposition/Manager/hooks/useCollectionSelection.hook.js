import { useState, useEffect } from 'react';

export default function useCollectionSelection(
	collection = [],
	initialSelectedIds = [],
	idKey = 'id',
) {
	const [selectedIds, setSelectedIds] = useState(initialSelectedIds);

	useEffect(() => {
		// Filter selected items to only preserve the ones that exist in the collection
		if (selectedIds.length === 0) {
			return;
		}

		const availableIds = collection.map(item => item[idKey]);
		const filteredSelection = selectedIds.filter(id => availableIds.includes(id));

		setSelectedIds(filteredSelection);
	}, [selectedIds, collection]);

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
		onToggleAll,
		onToggleItem,
	};
}
