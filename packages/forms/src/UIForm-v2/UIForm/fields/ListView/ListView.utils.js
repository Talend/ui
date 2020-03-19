/**
 * Define
 * - the displayed items from all items and filter criteria
 * - the toggleAll status from displayed items checked status
 * @param { Array } items All the items
 * @param { string } searchCriteria The filter criteria
 * @returns { Object } The items related state
 */
export function getItemsProps(items, searchCriteria) {
	const displayedItems = searchCriteria
		? items.filter(item => item.label.toLowerCase().includes(searchCriteria.toLowerCase()))
		: items;
	const toggleAllChecked = displayedItems.every(item => item.checked);

	return {
		displayedItems,
		items,
		searchCriteria,
		toggleAllChecked,
	};
}

/**
 * Define the items from schema, and init the items related state
 * @param { Object } schema The merged schema
 * @param { Array } value the listView value
 * @param { string } searchCriteria The filter criteria
 * @param { function } onChange The toggle callback
 * @returns { Object } The items related state
 */
export function initItems(schema, value, searchCriteria, onChange) {
	const items = schema.titleMap.map((option, index) => ({
		checked: value.indexOf(option.value) !== -1,
		index,
		label: option.name,
		onChange,
		value: option.value,
	}));

	return {
		...getItemsProps(items, searchCriteria),
		emptyLabel: schema.emptyLabel,
		headerLabel: schema.title,
		noResultLabel: schema.noResultLabel,
		required: schema.required,
		searchPlaceholder: schema.placeholder,
	};
}

/**
 * Update the check status of the list items
 * @param { Array } items The listView items
 * @param { Array } value The listView value
 * @param { string } searchCriteria The filter criteria
 * @returns { Object } The items related state
 */
export function updateItems(items, value, searchCriteria) {
	function updateChecked(item) {
		const checked = value.includes(item.value);
		if (item.checked !== checked) {
			return {
				...item,
				checked,
			};
		}
		return item;
	}

	const newItems = items.map(updateChecked);
	return getItemsProps(newItems, searchCriteria);
}
