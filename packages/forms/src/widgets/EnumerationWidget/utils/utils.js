// private
function selectAllBetween(min, max, items) {
	return items.map((item, index) => {
		if (index >= min && index <= max) {
			return index;
		}
		return undefined;
	}).filter((item) => item !== undefined);
}

export function manageCtrlKey(item, selectedItems) {
	const itemFound = selectedItems.find(currentItem => currentItem === item.index);
	// if index present, remove it
	if (itemFound !== undefined) {
		return selectedItems.filter((indexSelected) => indexSelected !== item.index);
	}

	selectedItems.push(item.index);

	return selectedItems;
}

export function manageShiftKey(item, selectedItems, items) {
	const itemFound = selectedItems.find(currentItem => currentItem === item.index);
	const indexMinimumSelected = Math.min(...selectedItems);
	// if item existing, remove it
	if (itemFound !== undefined) {
		return selectAllBetween(indexMinimumSelected, item.index, items);
	}
		// add all between the min/max and the selected
	const indexMaximumSelected = Math.max(...selectedItems);
		// select all "before" values
	if (item.index < indexMinimumSelected) {
			// select all between index and minimum
		return selectAllBetween(item.index, indexMaximumSelected, items);
	} else if (item.index > indexMaximumSelected) {
			// select all between maximum and index
		return selectAllBetween(indexMinimumSelected, item.index, items);
	}

	return undefined;
}

export function deleteSelectedItems(items, selectedItems) {
	return items.filter((item, index) => {
		const selectedItem = selectedItems.find(it => it === index);
		return selectedItem === undefined;
	});
}

export function computeSelectedOnDelete(selectedItems, index) {
	return selectedItems
		.filter(selectedIndex => selectedIndex !== index)
		.map(selectedIndex => {
			if (selectedIndex > index) {
				return selectedIndex - 1;
			}
			return selectedIndex;
		});
}

