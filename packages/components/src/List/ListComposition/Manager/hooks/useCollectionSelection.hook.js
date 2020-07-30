import { useState, useEffect, useCallback } from 'react';

export default function useCollectionSelection(
	collection = [],
	initialSelectedIds = [],
	idKey = 'id',
) {
	const [selectedIds, setSelectedIds] = useState(initialSelectedIds);

	const filterSelectionFromCollection = useCallback(
		selection =>
			collection.filter(item => item && selection.includes(item[idKey])).map(item => item[idKey]),
		[idKey, collection],
	);

	useEffect(() => {
		setSelectedIds(oldIds => {
			if (oldIds.length === 0) {
				return oldIds;
			}
			return filterSelectionFromCollection(oldIds);
		});
	}, [collection, filterSelectionFromCollection]);

	function isSelected(item) {
		if (!item) {
			return false;
		}

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
		setSelectedIds(filterSelectionFromCollection(newSelectedIds));
	}

	function onToggleAll() {
		if (collection.length === selectedIds.length) {
			setSelectedIds([]);
		} else {
			setSelectedIds(collection.filter(item => !!item).map(item => item[idKey]));
		}
	}

	return {
		isSelected,
		allIsSelected: selectedIds.length > 0 && selectedIds.length === collection.length,
		selectedIds,
		onToggleAll,
		onToggleItem,
		setSelectedIds,
	};
}
