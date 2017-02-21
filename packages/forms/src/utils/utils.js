// private
function selectAllBetween(min, max, items) {
	const result = [];
	for (let indexToAdd = 0; indexToAdd < items.length; indexToAdd++) {
		if (indexToAdd >= min && indexToAdd <= max) {
			result.push(indexToAdd);
		}
	}
	return result;
}


export function manageCtrlKey(item, selectedItems) {
	const itemFound = selectedItems.find((currentItem) => currentItem === item.index);
	if (itemFound !== undefined) {
		const indexToRemove = selectedItems.findIndex((indexSelected) => (indexSelected === itemFound));
		selectedItems.splice(indexToRemove, 1);
	}	else {
		selectedItems.push(item.index);
	}
	return selectedItems;
}

export function manageShiftKey(item, selectedItems, items) {
	let result = selectedItems;
	const itemFound = selectedItems.find((currentItem) => currentItem === item.index);
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
	const result = [];
	for (let index = 0; index < items.length; index++) {
		let found = false;
		selectedItems.forEach((selectedIndex) => {
			if (selectedIndex === index) {
				found = true;
			}
		});
		if (!found) {
			result.push(items[index]);
		}
	}
	return result;
}

export function computeSelectedOnDelete(selectedItems, index) {
	const result = selectedItems;
	// if selected item, remove from selected items array
	const indexToRemove = result.findIndex((indexSelected) => (indexSelected === index));
	result.splice(indexToRemove, 1);
	// Need to recompute all index in selected items
	for (let j = indexToRemove; j < result.length; j++) {
		result[j] --;
	}

	return result;
}

