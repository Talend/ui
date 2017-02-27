// private
function selectAllBetween(min, max, items) {
	return items
		.filter((item, index) => index >= min && index <= max)
		.map((item, index) => index);
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
	let result = selectedItems;
	const itemFound = selectedItems.find(currentItem => currentItem === item.index);
	const indexMinimumSelected = Math.min(...selectedItems);
	// if item existing, remove it
	if (itemFound !== undefined) {
		result = selectAllBetween(indexMinimumSelected, item.index, items);
	}	else {
		// add all between the min/max and the selected
		const indexMaximumSelected = Math.max(...selectedItems);
		// select all "before" values
		if (item.index < indexMinimumSelected) {
			// select all between index and minimum
			result = selectAllBetween(item.index, indexMaximumSelected, items);
		} else if (item.index > indexMaximumSelected) {
			// select all between maximum and index
			result = selectAllBetween(indexMinimumSelected, item.index, items);
		}
	}
	return result;
}

export function deleteSelectedItems(items, selectedItems) {
	const result = items.filter((item, index) => {
		const selectedItem = selectedItems.find(it => it === index);
		return selectedItem === undefined;
	});
	return result;
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

