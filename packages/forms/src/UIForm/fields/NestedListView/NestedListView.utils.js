/**
 * Build the ListView component props to match current state's values
 * @param {Array} items
 * @param {Object} value
 * @param {String} searchCriteria
 * @returns {Array}
 */
export function getDisplayedItems(items, value, searchCriteria) {
	return items.reduce((finalItems, item) => {
		const { children } = item;
		const itemValue = value[item.key] || [];

		// Filter children items if search criteria has been provided
		const finalChildren = searchCriteria
			? children.filter(({ label }) => label.toLowerCase().includes(searchCriteria.toLowerCase()))
			: children;

		if (finalChildren.length > 0) {
			const checked = item.key in value && children.some(child => itemValue.includes(child.value));

			finalItems.push({
				...item,
				checked,
				children: finalChildren.map(child => ({
					...child,
					checked: itemValue.includes(child.value),
				})),
			});
		}

		return finalItems;
	}, []);
}

/**
 * Define the items from schema, and init the items related state
 * @param { Object } schema The merged schema
 * @param { Array } value the listView value
 * @param { string } searchCriteria The filter criteria
 * @param { Object } callbacks
 * @param { Function } callbacks.onExpandToggle
 * @param { Function } callbacks.onParentChange
 * @param { Function } callbacks.onCheck
 * @returns { Array }
 */
export function initItems(schema, value, searchCriteria, callbacks) {
	const { onExpandToggle, onParentChange, onCheck } = callbacks;

	const items = schema.items.map(item => {
		const key = item.key[item.key.length - 1]; // This is ugly (get a parent "id")

		return {
			label: item.title,
			expanded: false,
			key,
			onExpandToggle,
			onChange: onParentChange,
			children: item.titleMap.map(option => ({
				label: option.name,
				value: option.value,
				onChange: onCheck,
			})),
		};
	});

	return {
		items,
		displayedItems: getDisplayedItems(items, value, searchCriteria),
	};
}
