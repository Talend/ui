// private
function selectAllBetween(min, max, items) {
	return items.map((item, index) => {
		if (index >= min && index <= max) {
			return { ...item, isSelected: true };
		}
		return { ...item, isSelected: false };
	});
}

export function manageCtrlKey(indexSelected, items) {
	const itemsList = [...items];
	const itemSelected = itemsList[indexSelected] && itemsList[indexSelected].isSelected;
	if (itemSelected) {
		itemsList[indexSelected].isSelected = false;
	} else {
		itemsList[indexSelected].isSelected = true;
	}
	return itemsList;
}

export function manageShiftKey(indexSelected, items) {
	const itemSelected = items[indexSelected].isSelected && items[indexSelected].isSelected === true;
	let firstIndex = 0;
	let lastIndex = 0;
	// get first item selected
	items.find((item, index) => {
		if (item.isSelected) {
			firstIndex = index;
			return true;
		}
		return false;
	});
	// get last item selected
	const itemsReversed = [...items].reverse();
	itemsReversed.find((item, index) => {
		if (item.isSelected && item.isSelected === true) {
			lastIndex = items.length - index - 1;
			return true;
		}
		return false;
	});
	if (itemSelected) {
		return selectAllBetween(firstIndex, indexSelected, items);
	}
	if (indexSelected < firstIndex) {
		return selectAllBetween(indexSelected, lastIndex, items);
	} else if (indexSelected > lastIndex) {
		return selectAllBetween(firstIndex, indexSelected, items);
	}
	return undefined;
}

export function deleteSelectedItems(items) {
	return items.filter(item => !item.isSelected);
}

/**
 * Need to reset items in their default mode to prevent multiple edition
 * @param items
 */
export function resetItems(items) {
	return items.map(currentItem => ({ ...currentItem, displayMode: 'DISPLAY_MODE_DEFAULT' }));
}
