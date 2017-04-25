// private
function selectAllBetween(min, max, items) {
	return items.map((item, index) => ({
		...item,
		isSelected: (index >= min && index <= max),
	}));
}

export function manageCtrlKey(indexSelected, items) {
	const itemsList = [...items];
	const itemSelected = itemsList[indexSelected] && itemsList[indexSelected].isSelected;

	itemsList[indexSelected].isSelected = !itemSelected;

	return itemsList;
}

export function manageShiftKey(indexSelected, items) {
	const itemSelected = items[indexSelected].isSelected && items[indexSelected].isSelected === true;
	const firstIndex = items.findIndex(item => item.isSelected);
	const itemsReversed = [...items].reverse();
	const index = itemsReversed.findIndex(item => (item.isSelected && item.isSelected === true));
	const lastIndex = items.length - index - 1;

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
	return items.filter((item) => !item.isSelected);
}

/**
 * Need to reset items in their default mode to prevent multiple edition
 * @param items
 */
export function resetItems(items) {
	return items.map((currentItem) => (
		{
			...currentItem,
			displayMode: 'DISPLAY_MODE_DEFAULT',
		}
	));
}
